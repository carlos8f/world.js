'use strict';

require(['../vendor/domReady!'], function (doc) {
  Physijs.scripts.worker = 'vendor/physijs_worker.js';

  var initScene, render, clock, controls, setMousePosition, mouse_position,
    projector, renderer, stats, scene, ground, light, camera, planet, planets = [];

  initScene = function() {
    projector = new THREE.Projector;

    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
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
      0.1,
      10000
    );
    camera.position.z = 100;
    camera.position.y = 50;
    scene.add( camera );

    controls = new THREE.FlyControls( camera );
    controls.movementSpeed = 100;
    controls.rollSpeed = 1;
    controls.dragToLook = true;

    var starMaterial = new THREE.ParticleCanvasMaterial({
      color: 0xffffff,
      program: function ( context ) {
        // we get passed a reference to the canvas context
        context.beginPath();
        // and we just have to draw our shape at 0,0 - in this
        // case an arc from 0 to 2Pi radians or 360º - a full circle!
        context.arc( 0, 0, 1, 0,  Math.PI * 2, true );
        context.fill();
      }
    });

    for(var p = 0; p < 5000; p++) {
      var radius = 2000;
      var z = Math.random() * (2 * radius) - radius;
      var phi = Math.random() * Math.PI * 2;
      var theta = Math.asin(z / radius);

      var pX = Math.cos(theta) * Math.cos(phi) * radius,
        pY = Math.cos(theta) * Math.sin(phi) * radius,
        pZ = z,
        particle = new THREE.Particle(starMaterial);

      particle.position.set(pX, pY, pZ);
      particle.scale.x = particle.scale.y = 1;

      scene.add(particle);
    }

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