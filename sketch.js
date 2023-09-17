
// Global variable to store the gallery object. The gallery object is
// a container for all the visualisations.
var gallery;

function setup() {
  // Create a canvas to fill the content div from index.html.
  canvasContainer = select('#app');
  var c = createCanvas(1024, 676);
  c.parent('app');

  // Create a new gallery object.
  gallery = new Gallery();

  // Add the visualisation objects here.
  gallery.addVisual(new TechDiversityRace());
  gallery.addVisual(new TechDiversityGender());
  gallery.addVisual(new PayGapTimeSeries());
  gallery.addVisual(new ClimateChange());
  gallery.addVisual(new UKFoodAttitudes());
  gallery.addVisual(new NutrientsTimeSeries());
  gallery.addVisual(new Waffle_Chart());
  gallery.addVisual(new CovidCases());
  gallery.addVisual(new AnimeFinder());

 
}

function draw() {
  background('#121212');
  if (gallery.selectedVisual != null) {
    gallery.selectedVisual.draw();
  }
  
}
