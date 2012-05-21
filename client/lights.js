define(function() {
  var lights = [], light;
  // lights
  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 1, 1 );
  lights.push(light);

  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( -1, -1, -1 );
  lights.push(light);

  light = new THREE.AmbientLight( 0x222222 );
  lights.push(light);
  return lights;
});