define(['scene'], function(scene) {
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    20000
  );
  camera.position.z = 1000;
  scene.add(camera);
  return camera;
});