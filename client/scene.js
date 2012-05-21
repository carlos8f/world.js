define(['camera', 'lights', 'stars', 'ship'], function(camera, lights, stars, getShip) {
  var scene = new Physijs.Scene({ reportsize: 200, fixedTimeStep: 1 / 30 });
  scene.setGravity(new THREE.Vector3( 0, 0, 0 ));

  scene.add(camera);

  // Add lights
  for (var i in lights) {
    scene.add(lights[i]);
  }

  // Add stars
  scene.add(stars);

  // Add ship
  getShip(function(ship) {
    scene.add(ship.mesh);
  });

  return scene;
});