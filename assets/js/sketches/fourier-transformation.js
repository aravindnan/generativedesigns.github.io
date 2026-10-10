/* Fourier Transformation
   Radial spectrum + waveform ring + ripple trail, drawn in black on a transparent canvas.
   Needs p5.js and p5.sound. The page talks to this file through window.FourierViz. */
(function () {
  'use strict';

  var W = 600, H = 600, CX = W / 2, CY = H / 2;
  var BANDS = 72;      // log-spaced frequency bands, mirrored left and right
  var RING_PTS = 120;  // points on the waveform ring
  var RING_R = 44;     // radius of the waveform ring
  var RIPPLES = 12;    // how many past rings are kept
  var RIPPLE_GAP = 4;  // distance between ripples
  var WAVE_AMP = 20;   // how far the waveform ring wobbles
  var BAR_R = 140;     // radius of the circle the bars grow from
  var BAR_OUT = 66;    // longest outward reach of a bar
  var BAR_IN = 36;     // longest inward reach of a bar
  var SHOW_PEAKS = true; // small dots that mark each bar's recent peak

  var TRACKS = {
    violin: { label: 'Violin', src: '../assets/audio/violin.mp3' },
    piano:  { label: 'Piano',  src: '../assets/audio/piano.mp3' },
    flute:  { label: 'Flute',  src: '../assets/audio/flute.mp3' }
  };

  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  var cnv, fft;
  var sound = null, curKey = null;
  var loading = false, failed = false, wantPlay = false;
  var volume = 0.6;
  var levels = [], peaks = [], edges = [], ripples = [];
  var bassSmooth = 0, waveGain = 3;

  (function init() {
    var k;
    for (k = 0; k < BANDS; k++) { levels.push(0); peaks.push(0); }
    // 1024 FFT bins grouped on a log scale (bin 2 to about bin 380)
    for (k = 0; k <= BANDS; k++) edges.push(Math.round(2 * Math.pow(190, k / BANDS)));
  })();

  /* ---------------------------------------------------------- audio */

  function finite(n) { return typeof n === 'number' && isFinite(n) ? n : 0; }

  function wake() {
    if (typeof userStartAudio === 'function') userStartAudio();
  }

  function loadTrack(key, done, fail) {
    var t = TRACKS[key];
    if (t.sound) { done(t.sound); return; }
    loadSound(
      t.src,
      function (s) { t.sound = s; t.progress = 1; done(s); },
      function (err) { if (window.console) console.error('Could not load ' + t.src, err); fail(); },
      function (p) { t.progress = finite(p); }
    );
  }

  function selectTrack(key, autoplay) {
    if (!TRACKS[key] || (key === curKey && (sound || loading))) return;
    if (sound) sound.stop();
    sound = null;
    curKey = key;
    failed = false;
    loading = true;
    wantPlay = !!autoplay;
    loadTrack(key, function (s) {
      if (key !== curKey) return;
      sound = s;
      loading = false;
      if (wantPlay) { wake(); sound.loop(); }
    }, function () {
      if (key !== curKey) return;
      loading = false;
      failed = true;
      wantPlay = false;
    });
  }

  function togglePlay() {
    wake();
    if (loading) { wantPlay = !wantPlay; return; }
    if (!sound) return;
    if (sound.isPlaying()) { sound.pause(); wantPlay = false; }
    else { sound.loop(); wantPlay = true; }
  }

  function seek(fraction) {
    if (!sound || loading) return;
    var t = Math.max(0, Math.min(0.999, fraction)) * finite(sound.duration());
    var was = sound.isPlaying();
    sound.jump(t);
    if (was) { if (sound.setLoop) sound.setLoop(true); }
    else sound.pause();
  }

  function setVolume(v) {
    volume = Math.max(0, Math.min(1, v));
    if (typeof outputVolume === 'function') outputVolume(volume);
  }

  /* The page's player reads this object. */
  window.FourierViz = {
    select: function (key) { selectTrack(key, true); },
    toggle: togglePlay,
    seek: seek,
    volume: setVolume,
    state: function () {
      var t = curKey ? TRACKS[curKey] : null;
      return {
        track: curKey,
        loading: loading,
        loadProgress: t ? finite(t.progress) : 0,
        error: failed,
        ready: !!sound && !loading,
        playing: !!sound && !!sound.isPlaying(),
        time: sound ? finite(sound.currentTime()) : 0,
        duration: sound ? finite(sound.duration()) : 0
      };
    }
  };

  /* ---------------------------------------------------------- p5 */

  window.setup = function () {
    cnv = createCanvas(W, H);
    cnv.mouseClicked(togglePlay);
    fft = new p5.FFT(0.8, 1024);
    setVolume(volume);
    selectTrack('violin', false);
  };

  function updateLevels(spec) {
    for (var b = 0; b < BANDS; b++) {
      var lo = edges[b], hi = Math.max(lo + 1, edges[b + 1]), sum = 0, n = 0;
      for (var k = lo; k < hi && k < spec.length; k++) { sum += spec[k]; n++; }
      var v = n ? sum / n : 0;
      v = Math.min(255, v * (1 + (b / BANDS) * 0.9)); // highs carry less energy, lift them a little
      levels[b] = Math.max(v, levels[b] * 0.86);       // instant attack, soft fall
      peaks[b] = Math.max(levels[b], peaks[b] - 1.6);  // peak markers fall slowly
    }
  }

  function ringOffsets(wave) {
    var maxAbs = 0, k;
    for (k = 0; k < wave.length; k++) maxAbs = Math.max(maxAbs, Math.abs(wave[k]));
    // gentle auto gain so quiet and loud tracks both fill the ring
    waveGain += (Math.min(6, 0.9 / Math.max(0.12, maxAbs)) - waveGain) * 0.05;
    var offs = [];
    for (k = 0; k < RING_PTS; k++) {
      var f = k / RING_PTS;
      var idx = Math.floor(Math.abs(2 * f - 1) * (wave.length - 1)); // mirrored so the ring closes cleanly
      offs.push(Math.max(-WAVE_AMP * 1.2, Math.min(WAVE_AMP * 1.2, wave[idx] * waveGain * WAVE_AMP)));
    }
    return offs;
  }

  function drawRing(offs, radius, k) {
    beginShape();
    for (var p = 0; p < RING_PTS; p++) {
      var a = -Math.PI / 2 + (p / RING_PTS) * Math.PI * 2;
      var r = radius + offs[p] * k;
      vertex(CX + Math.cos(a) * r, CY + Math.sin(a) * r);
    }
    endShape(CLOSE);
  }

  function outLen(v) { return 2 + Math.pow(v / 255, 1.35) * BAR_OUT; }
  function inLen(v) { return Math.pow(v / 255, 1.6) * BAR_IN; }

  // Each bar grows both ways from a base circle: outward with the level, inward on louder hits.
  function drawBars() {
    var b, s;
    strokeWeight(2.4);
    for (b = 0; b < BANDS; b++) {
      var f = ((b + 0.5) / BANDS) * Math.PI;
      var o = outLen(levels[b]), inner = inLen(levels[b]);
      stroke(0, 0, 0, 90 + 165 * (levels[b] / 255));
      for (s = -1; s <= 1; s += 2) {
        var a = -Math.PI / 2 + s * f, c = Math.cos(a), n = Math.sin(a);
        line(CX + c * (BAR_R - inner), CY + n * (BAR_R - inner), CX + c * (BAR_R + o), CY + n * (BAR_R + o));
      }
    }
    if (!SHOW_PEAKS) return;
    strokeWeight(3);
    stroke(0, 0, 0, 150);
    for (b = 0; b < BANDS; b++) {
      var g = ((b + 0.5) / BANDS) * Math.PI;
      var pr = BAR_R + outLen(peaks[b]) + 7;
      for (s = -1; s <= 1; s += 2) {
        var a2 = -Math.PI / 2 + s * g;
        point(CX + Math.cos(a2) * pr, CY + Math.sin(a2) * pr);
      }
    }
  }

  window.draw = function () {
    clear();

    var playing = !!sound && sound.isPlaying();
    var spec = fft.analyze();
    var wave = fft.waveform();

    updateLevels(spec);
    bassSmooth += (fft.getEnergy('bass') / 255 - bassSmooth) * 0.25;
    var offs = ringOffsets(wave);
    var breath = playing || reduceMotion ? 0 : Math.sin(millis() / 650) * 1.2;
    var ringR = RING_R + bassSmooth * 8 + breath; // the middle ring swells with the bass

    // trail: save a copy of the ring every few frames, older copies drift outward
    if (frameCount % 3 === 0) {
      if (playing) { ripples.unshift(offs); if (ripples.length > RIPPLES) ripples.pop(); }
      else if (ripples.length) ripples.pop();
    }

    noFill();

    // ripples
    var k;
    for (k = ripples.length - 1; k >= 0; k--) {
      stroke(0, 0, 0, (1 - k / RIPPLES) * 80);
      strokeWeight(1);
      drawRing(ripples[k], ringR + (k + 1) * RIPPLE_GAP, 0.85 - k * 0.04);
    }

    // live waveform ring
    stroke(0, 0, 0, 255);
    strokeWeight(2);
    drawRing(offs, ringR, 1);

    // spectrum
    drawBars();

    // state cue in the middle: spinner while loading, play triangle when paused
    if (loading) {
      noFill();
      stroke(0);
      strokeWeight(2.5);
      var t = millis() / 260;
      arc(CX, CY, 24, 24, t, t + Math.PI * 1.3);
    } else if (!playing) {
      noStroke();
      fill(0);
      triangle(CX - 5, CY - 11, CX - 5, CY + 11, CX + 13, CY);
    }
  };
})();