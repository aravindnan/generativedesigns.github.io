/* Places p5 canvases and controls in their stage containers instead of after
   the page content. Load this in <head> on every experiment page, before p5. */
(function () {
  function isCanvas(n) {
    if (!n || n.nodeType !== 1) return false;
    var name = n.nodeName.toLowerCase();
    return name === 'canvas' || name === 'svg';
  }
  function isControl(n) {
    if (!n || n.nodeType !== 1) return false;
    return /^(button|input|select|textarea)$/.test(n.nodeName.toLowerCase());
  }
  function mount(n) {
    if (n.parentNode !== document.body) return;
    var host = isCanvas(n)
      ? document.querySelector('main')
      : isControl(n)
        ? document.querySelector('#sketch-controls')
        : null;
    if (host) host.appendChild(n);
  }
  function sweep() {
    Array.prototype.slice.call(document.body.children).forEach(function (n) {
      if (isCanvas(n) || isControl(n)) mount(n);
    });
  }
  new MutationObserver(function (list) {
    list.forEach(function (m) {
      Array.prototype.forEach.call(m.addedNodes, function (n) {
        if (isCanvas(n) || isControl(n)) mount(n);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', sweep);
  window.addEventListener('load', sweep);
})();
