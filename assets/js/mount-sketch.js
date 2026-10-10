/* Places the p5 sketch inside <main> (the sketch stage).
   p5 appends its canvas to the end of <body> by default, which pushes it
   below the footer. Load this in <head> on every experiment page, before p5. */
(function () {
  function isSketch(n) {
    if (!n || n.nodeType !== 1) return false;
    var name = n.nodeName.toLowerCase();
    return name === 'canvas' || name === 'svg';
  }
  function mount(n) {
    var host = document.querySelector('main');
    if (host && n.parentNode === document.body) host.appendChild(n);
  }
  function sweep() {
    Array.prototype.slice.call(document.body.children).forEach(function (n) {
      if (isSketch(n)) mount(n);
    });
  }
  new MutationObserver(function (list) {
    list.forEach(function (m) {
      Array.prototype.forEach.call(m.addedNodes, function (n) { if (isSketch(n)) mount(n); });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', sweep);
  window.addEventListener('load', sweep);
})();
