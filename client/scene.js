define(function() {
  var scene = new Physijs.Scene({ reportsize: 200, fixedTimeStep: 1 / 30 });
  scene.setGravity(new THREE.Vector3( 0, 0, 0 ));
  return scene;
});