'use strict';
Physijs.scripts.worker = 'vendor/physijs_worker.js';

require(['../vendor/domReady!', 'render'], function (doc, render) {
  render();
  doc.getElementById('info').style.display = 'none';
});