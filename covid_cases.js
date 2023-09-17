function CovidCases() {

// Name for the visualisation to appear in the menu bar.
this.name = 'Covid Cases';
  
// Each visualisation must have a unique ID with no special
// characters.
this.id = 'covid-cases';

// Property to represent whether data has been loaded.
this.loaded = false;
var cases;
var year;
var flag;

// Preload the data. This function is called automatically by the
// gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/worldcities.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
      cases = loadTable(
        './data/time_series_covid_19_confirmed.csv', 'csv', 'header',
        // Callback function to set the value
        // this.loaded to true.
        function(table) {
          self.loaded = true;
        });
};

  this.setup = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }


  };

  this.destroy = function() {
  };


  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Get the column of raw data of longitudes and Latitudes of Cities so we can draw them
    var col_lat = this.data.getColumn('lat');
    var col_long = this.data.getColumn('lng');

    // Convert all data strings to numbers.
    col_lat = stringsToNumbers(col_lat);
    col_long = stringsToNumbers(col_long);

    // Get the column of raw data of longitudes and Latitudes of covid cases so we can draw them
    var colcov_lat = cases.getColumn('Lat');
    var colcov_long = cases.getColumn('Long');

    // Convert all data strings to numbers.
    colcov_lat = stringsToNumbers(colcov_lat);
    colcov_long = stringsToNumbers(colcov_long);

    // Get the column of raw data of longitudes and Latitudes of covid cases so we can draw them
    var colcov_cases = cases.getColumn('Cases');

    // Get the column of country names
    var colcountry_name = cases.getColumn('Country/Region');

    // Convert all data strings to numbers.
    colcov_cases = stringsToNumbers(colcov_cases);

    noStroke();
    fill(100);
    for (var r = 0; r < col_long.length; r++) {
      var from_long = col_long[r];
      var from_lat = col_lat[r];

      // maps long and lat value  to fit within the convas.
      var x = map(from_long,-180,180,0,width);
      var y = map(from_lat,-90,90,height,0);
    
      // maps a secondary long and lat value to fit within the convas.
      var from_long2 = col_long[r+100];
      var from_lat2 = col_lat[r+1];
      
      // maps the secondary long and lat value  to fit within the convas.
      var x2 = map(from_long2,-180,180,0,width);
      var y2 = map(from_lat2,-90,90,height,0);
    
      // Draws a small line beteen the two cities.
      line(x, y, x2, y2);
      
      // Draws a dot in the first city
      ellipse(x,y,1.5,1.5);
    }
    
    noStroke();
    fill('#f43b8590');
    for (var r = 0; r < colcov_long.length; r++) {
      var fromcov_long = colcov_long[r];
      var fromcov_lat = colcov_lat[r];
      var fromcov_cases = colcov_cases[r];
      var fromcov_country_name = colcountry_name[r];

      // maps long and lat value  to fit within the convas.
      var x = map(fromcov_long,-180,180,0,width);
      var y = map(fromcov_lat,-90,90,height,0);
      
      // maps size of circle based on cases.
      var size = map(fromcov_cases,0,800000,0,5);
      // Draws Circle.
      Animation(x,y,size); 

      let d = dist(mouseX,mouseY,x, y);
      flag = d<size/2;

      if (flag) {
        push();
        fill(0,200);
        rect(mouseX+20, mouseY-10, 320, 200, 20);
        fill('#f43b8590');
        Animation(x,y,size); 
        textAlign(CENTER);
        textSize(14);
        console.log('hi');
        text(fromcov_country_name, mouseX+25, mouseY+5, 320, 20);
        text(fromcov_cases, mouseX+25, mouseY+26, 320, 20);
        pop();
      }
      
      push();
        ellipse(x,y,2);      
      pop();
    }
  };
}
