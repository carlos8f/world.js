'use strict';

require(['../vendor/domReady!'], function (doc) {
  Physijs.scripts.worker = 'vendor/physijs_worker.js';

  var initScene, render, clock, controls, setMousePosition, mouse_position,
    projector, renderer, stats, scene, ground, light, camera, planet, planets = [];

  initScene = function() {
    projector = new THREE.Projector;

    renderer = new THREE.WebGLRenderer({ antialias: true, clearAlpha: 1 });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x000000, 1);
    document.body.appendChild( renderer.domElement );

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    document.body.appendChild( stats.domElement );

    scene = new Physijs.Scene({ reportsize: 200, fixedTimeStep: 1 / 30 });
    scene.setGravity(new THREE.Vector3( 0, 0, 0 ));

    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      20000
    );
    camera.position.z = 1000;
    scene.add( camera );

    controls = new THREE.FlyControls( camera );
    controls.movementSpeed = 100;
    controls.rollSpeed = 1;
    controls.dragToLook = true;

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
    var starSystem = new THREE.ParticleSystem(outerStars, starMaterial);
    scene.add(starSystem);

    requestAnimationFrame( render );

    document.getElementById('info').innerHTML = '';
  };

  render = function() {
    controls.update( clock.getDelta() );
    scene.simulate();
    renderer.render( scene, camera);
    stats.update();
    requestAnimationFrame( render );
  };

  clock = new THREE.Clock();
  initScene();
});