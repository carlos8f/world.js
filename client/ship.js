define(function() {
  return function getShip(cb) {
    var loader = new THREE.JSONLoader();
    loader.load('models/ship.js', function(geometry) {
      var ship = new Ship(geometry);
      cb(ship);
    });
  };
});

function Ship(geometry) {
  var material = new THREE.MeshLambertMaterial({color: 0x444444});

  THREE.Mesh.call( this, geometry, material );
};

Ship.prototype = new THREE.Mesh();