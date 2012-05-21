'use strict';

define(['scene'], function(scene) {
  var starMaterial = new THREE.ParticleBasicMaterial({
    map: THREE.ImageUtils.loadTexture('images/disc.png'),
    size: 3,
    vertexColors: true,
    sizeAttenuation: false
  });

  var outerStars = new THREE.Geometry;

  for(var p = 0; p < 10000; p++) {
    var radius = 10000;
    var z = Math.random() * (2 * radius) - radius;
    var phi = Math.random() * Math.PI * 2;
    var theta = Math.asin(z / radius);

    var vertex = new THREE.Vector3;
    vertex.x = Math.cos(theta) * Math.cos(phi) * radius;
    vertex.y = Math.cos(theta) * Math.sin(phi) * radius;
    vertex.z = z;

    outerStars.vertices.push(vertex);
    var color = new THREE.Color(0xffffff);
    color.setHSV(1.0, 0.0, Math.random());
    outerStars.colors.push(color);
  }
  var stars = new THREE.ParticleSystem(outerStars, starMaterial);
  scene.add(stars);
  return stars;
});