function CovidVaccine() {
// Name for the visualisation to appear in the menu bar.
this.name = 'covid-vaccine';

// Each visualisation must have a unique ID with no special
// characters.
this.id = 'covid-vaccine';

let myMap;
let canvas;
const mappa = new Mappa('Leaflet');
const options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

this.setup = function() {
  canvas = createCanvas(640,640);
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas);
  fill(200, 100, 100);
  
  // Only redraw the point when the map changes and not every frame.
}

this.draw = function() {
  myMap.onChange(drawPoint);
}
function drawPoint(){
  clear();

  const nigeria = myMap.latLngToPixel(11.396396, 5.076543); 
  ellipse(nigeria.x, nigeria.y, 20, 20);
}
this.destroy = function() {
};
}