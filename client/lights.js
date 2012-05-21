define(function() {
  var lights = [], light;
  // lights
  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1000, 5000, 5000 );
  lights.push(light);

  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( -1000, -5000, -5000 );
  lights.push(light);

  light = new THREE.AmbientLight( 0x555555 );
  lights.push(light);
  return lights;
});