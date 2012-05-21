define(['lights', 'stars'], function(lights, stars) {
  var scene = new Physijs.Scene({ reportsize: 200, fixedTimeStep: 1 / 30 });
  scene.setGravity(new THREE.Vector3( 0, 0, 0 ));

  // Add lights
  for (var i in lights) {
    scene.add(lights[i]);
  }

  // Add stars
  scene.add(stars);

  return scene;
});