define(['../vendor/domReady!'], function(doc) {
  var stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  stats.domElement.style.zIndex = 100;
  doc.body.appendChild( stats.domElement );
  return stats;
});