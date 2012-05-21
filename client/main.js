'use strict';
Physijs.scripts.worker = 'vendor/physijs_worker.js';

require(['../vendor/domReady!', 'stars', 'render'], function (doc, stars, render) {
  doc.getElementById('info').style.display = 'none';
});