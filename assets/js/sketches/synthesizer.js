/* Synthesizer
   Nine pads, each tied to a note. Play them with the number keys 1-9, or tap / click / slide
   across the pads (works on phones). Needs p5.js and p5.sound (p5.MonoSynth). */
(function () {
  'use strict';

  var W = 600, H = 600;
  var SIZE = 160, GAP = 14;                       // pad size and the gap between pads
  var NOTES = ['B4', 'A5', 'C6', 'D4', 'C5', 'D6', 'F4', 'E5', 'F6'];
  var KEYS = '123456789';
  var REST = 238;                            // resting pad colour (0-255): a very light gray; hover and press go black
  var FONT = '"Space Grotesk", Inter, system-ui, sans-serif';

  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  var synth, canvasEl, startedAt = 0;
  var holds = {};            // who is holding which pad: id -> pad index (pointers and keys)
  var order = [];            // ids in the order they were pressed; the last one is heard (mono synth)
  var press = [], hover = [], black = [], pulses = [];
  var hoverPad = -1;
  var pending = null;        // pad tapped before the browser allowed audio to start
  var cx = [], cy = [];

  (function init() {
    for (var i = 0; i < 9; i++) {
      press.push(0); hover.push(0); black.push(0);
      cx.push(W / 2 + ((i % 3) - 1) * (SIZE + GAP));
      cy.push(H / 2 + (Math.floor(i / 3) - 1) * (SIZE + GAP));
    }
  })();

  /* ---------------------------------------------------------- audio */

  function wake() { return typeof userStartAudio === 'function' ? userStartAudio() : null; }

  function audioRunning() {
    try { return getAudioContext().state === 'running'; } catch (e) { return true; }
  }

  function sound(i) {
    wake();
    if (!audioRunning()) { pending = i; return; }  // first tap on some phones: start audio, play on release
    synth.triggerAttack(NOTES[i], 0.8);
  }

  function setHold(id, i) {
    if (holds[id] === i) return;
    holds[id] = i;
    var k = order.indexOf(id);
    if (k >= 0) order.splice(k, 1);
    order.push(id);
    pulses.push({ i: i, t: millis() });
    sound(i);
  }

  function clearHold(id) {
    if (!(id in holds)) return;
    var i = holds[id];
    delete holds[id];
    var k = order.indexOf(id);
    if (k >= 0) order.splice(k, 1);
    if (order.length) { sound(holds[order[order.length - 1]]); return; }
    if (pending !== null) {                         // audio was locked: play a short note now
      var note = NOTES[pending];
      pending = null;
      var go = function () { synth.play(note, 0.8, 0, 0.35); };
      var p = wake();
      if (p && p.then) p.then(go); else go();
      return;
    }
    synth.triggerRelease();
  }

  function clearAll() { Object.keys(holds).forEach(clearHold); }

  /* ---------------------------------------------------------- input */

  function padAt(x, y) {
    var half = (SIZE + GAP) / 2;
    for (var i = 0; i < 9; i++) {
      if (Math.abs(x - cx[i]) <= half && Math.abs(y - cy[i]) <= half) return i;
    }
    return -1;
  }

  function toCanvas(e) {
    var r = canvasEl.getBoundingClientRect();  // the canvas is scaled down by CSS on small screens
    return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height };
  }

  function bindInput() {
    canvasEl.style.touchAction = 'manipulation';
    canvasEl.style.userSelect = 'none';
    canvasEl.style.webkitTapHighlightColor = 'transparent';

    canvasEl.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      var p = toCanvas(e), i = padAt(p.x, p.y);
      try { canvasEl.setPointerCapture(e.pointerId); } catch (err) { /* not critical */ }
      if (i >= 0) { e.preventDefault(); setHold('p' + e.pointerId, i); }
    });

    canvasEl.addEventListener('pointermove', function (e) {
      var p = toCanvas(e), i = padAt(p.x, p.y), id = 'p' + e.pointerId;
      if (id in holds) {                            // finger or button is down: slide between pads
        if (i < 0) clearHold(id); else setHold(id, i);
      } else if (e.buttons && i >= 0) {             // still pressed, slid back onto a pad
        setHold(id, i);
      } else if (e.pointerType === 'mouse') {       // plain hover on desktop
        hoverPad = i;
        canvasEl.style.cursor = i >= 0 ? 'pointer' : 'default';
      }
    });

    ['pointerup', 'pointercancel'].forEach(function (type) {
      canvasEl.addEventListener(type, function (e) { clearHold('p' + e.pointerId); });
    });
    canvasEl.addEventListener('pointerleave', function (e) {
      if (e.pointerType === 'mouse') { hoverPad = -1; canvasEl.style.cursor = 'default'; }
    });

    document.addEventListener('keydown', function (e) {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey || !e.key || e.key.length !== 1) return;
      var t = e.target && e.target.tagName;
      if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
      var i = KEYS.indexOf(e.key);
      if (i >= 0) setHold('k' + e.key, i);
    });
    document.addEventListener('keyup', function (e) { clearHold('k' + e.key); });
    window.addEventListener('blur', clearAll);
    document.addEventListener('visibilitychange', function () { if (document.hidden) clearAll(); });
  }

  /* ---------------------------------------------------------- drawing */

  function label(str, x, y, px, weight, gray, alpha) {
    var c = drawingContext;
    c.save();                                   // p5 caches its own fill colour, so put the canvas state back afterwards
    c.font = weight + ' ' + px + 'px ' + FONT;
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillStyle = 'rgba(' + gray + ',' + gray + ',' + gray + ',' + alpha + ')';
    c.fillText(str, x, y);
    c.restore();
  }

  window.setup = function () {
    var cnv = createCanvas(W, H);
    canvasEl = cnv.elt;
    rectMode(CENTER);
    synth = new p5.MonoSynth();
    startedAt = millis();
    bindInput();
  };

  window.draw = function () {
    clear();
    var now = millis(), i, held = [];
    for (i = 0; i < 9; i++) held.push(0);
    Object.keys(holds).forEach(function (id) { held[holds[id]] = 1; });

    // press: the pad turns black at once and snaps back on release, so other pads never change colour.
    // The small size change eases; hover fades to black on the pad under the mouse only.
    for (i = 0; i < 9; i++) {
      black[i] = held[i] ? Math.min(1, black[i] + 0.7) : 0;
      press[i] += (held[i] - press[i]) * (held[i] ? 0.4 : 0.2);
      hover[i] += ((hoverPad === i ? 1 : 0) - hover[i]) * 0.3;
    }

    for (i = 0; i < 9; i++) {
      var appear = reduceMotion ? 1 : Math.max(0, Math.min(1, (now - startedAt - i * 60) / 520));
      var ease = 1 - Math.pow(1 - appear, 3);
      var s = SIZE * (0.9 + 0.1 * ease) * (1 - 0.05 * press[i]) * (1 + 0.012 * hover[i]);
      var on = Math.max(black[i], hover[i]);          // hover and press both go solid black
      var g = REST * (1 - on);

      noStroke();
      fill(g, g, g);
      rect(cx[i], cy[i], s, s, 4);

      label(String(i + 1), cx[i], cy[i] - 6, 46, 600, 255 * on, 1);
      label(NOTES[i], cx[i], cy[i] + 34, 14, 500, 140 + (255 - 140) * on, 1);
    }

    // press ripple: an outline that expands from the pad and fades
    if (!reduceMotion) {
      for (var k = pulses.length - 1; k >= 0; k--) {
        var e = (now - pulses[k].t) / 650;
        if (e >= 1) { pulses.splice(k, 1); continue; }
        var out = 1 - Math.pow(1 - e, 3);
        var ps = SIZE + out * 46;
        noFill();
        stroke(0, 0, 0, Math.pow(1 - e, 2) * 130);
        strokeWeight(1.5);
        rect(cx[pulses[k].i], cy[pulses[k].i], ps, ps, 4);
      }
    } else {
      pulses.length = 0;
    }
  };
})();