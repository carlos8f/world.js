'use strict';

require(['../vendor/domReady!'], function (doc) {
  Physijs.scripts.worker = 'vendor/physijs_worker.js';

  var initScene, render, applyForce, setMousePosition, mouse_position,
    ground_material, box_material,
    projector, renderer, stats, scene, ground, light, camera, box, boxes = [];

  initScene = function() {
    projector = new THREE.Projector;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMapEnabled = false;
    // renderer.shadowMapSoft = true;
    document.body.appendChild( renderer.domElement );

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    document.body.appendChild( stats.domElement );

    scene = new Physijs.Scene({ reportsize: 50, fixedTimeStep: 1 / 30 })
    scene.setGravity(new THREE.Vector3( 0, 0, 0 ));

    camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set( 60, 50, 60 );
    camera.lookAt( scene.position );
    scene.add( camera );

    // Light
    light = new THREE.DirectionalLight( 0xFFFFFF );
    light.position.set( 20, 40, -15 );
    light.target.position.copy( scene.position );
    light.castShadow = false;

    scene.add( light );

    // Materials
    ground_material = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/rocks.jpg' ) }),
      .8, // high friction
      .4 // low restitution
    );
    ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
    ground_material.map.repeat.set( 3, 3 );

    box_material = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/plywood.jpg' ) }),
      .4, // low friction
      .6 // high restitution
    );
    box_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
    box_material.map.repeat.set( .25, .25 );

    // Ground
    ground = new Physijs.BoxMesh(
      new THREE.CubeGeometry(100, 1, 100),
      ground_material,
      0 // mass
    );
    ground.receiveShadow = false;
    scene.add( ground );

    requestAnimationFrame( render );

    for ( var i = 0; i < 10; i++ ) {
      box = new Physijs.BoxMesh(
        new THREE.CubeGeometry( 4, 4, 4 ),
        box_material
      );
      box.position.set(
        Math.random() * 50 - 25,
        10 + Math.random() * 5,
        Math.random() * 50 - 25
      );
      box.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      box.castShadow = false;
      scene.add( box );
      boxes.push( box );
    }

    renderer.domElement.addEventListener( 'mousemove', setMousePosition );

    document.getElementById('info').innerHTML = '';
  };

  render = function() {
    applyForce();
    scene.simulate();
    renderer.render( scene, camera);
    stats.update();
    requestAnimationFrame( render );
  };

  setMousePosition = function( evt ) {
    // Find where mouse cursor intersects the ground plane
    var vector = new THREE.Vector3(
      ( evt.clientX / renderer.domElement.clientWidth ) * 2 - 1,
      -( ( evt.clientY / renderer.domElement.clientHeight ) * 2 - 1 ),
      .5
    );
    projector.unprojectVector( vector, camera );
    vector.subSelf( camera.position ).normalize();

    var coefficient = (box.position.y - camera.position.y) / vector.y
    mouse_position = camera.position.clone().addSelf( vector.multiplyScalar( coefficient ) );
  };

  applyForce = function() {
    if (!mouse_position) return;
    var strength = 400, distance, effect, offset, box;

    for ( var i = 0; i < boxes.length; i++ ) {
      box = boxes[i];
      distance = mouse_position.distanceTo( box.position ),
      effect = mouse_position.clone().subSelf( box.position ).normalize().multiplyScalar( strength / distance ).negate(),
      offset = mouse_position.clone().subSelf( box.position );
      box.applyImpulse( effect, offset );
    }
  };

  initScene();
});