define(function() {
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20000);
  camera.position.z = 20;
  camera.position.y = 5;
  return camera;
});