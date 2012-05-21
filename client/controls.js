define(['camera'], function(camera) {
  var controls = new THREE.FlyControls( camera );
  controls.movementSpeed = 100;
  controls.rollSpeed = 1;
  controls.dragToLook = true;
  return controls;
});