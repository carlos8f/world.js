define(function(require) {
  var renderer = require('renderer')
    , camera = require('camera')
    , scene = require('scene')
    , controls = require('controls')
    , stats = require('stats')
    , clock = require('clock')
    ;

  return function render() {
    controls.update( clock.getDelta() );
    scene.simulate();
    renderer.render( scene, camera);
    stats.update();
    requestAnimationFrame( render );
  }
});