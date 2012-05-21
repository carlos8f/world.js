define(function() {
  var ship;
  return function getShip(cb) {
    if (!ship) {
      var loader = new THREE.JSONLoader();
      loader.load('models/ship.js', function(geometry) {
        ship = new Ship(geometry);
        cb(ship);
      });
    }
    else {
      cb(ship);
    }
  };
});

function Ship(geometry) {
  this.friction = .8;
  this.restitution = .3;
  this.mass = 1;
  this.color = 0x444444;

  this.mesh = new Physijs.BoxMesh(geometry, Physijs.createMaterial(
    new THREE.MeshLambertMaterial({color: this.color}),
    this.friction,
    this.restitution
  ), this.mass);
};
