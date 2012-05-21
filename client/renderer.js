define(['../vendor/domReady!'], function(doc) {
  var renderer = new THREE.WebGLRenderer({ antialias: true, clearAlpha: 1 });
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor(0x000000, 1);
  doc.body.appendChild( renderer.domElement );
  return renderer;
});