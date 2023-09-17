function AnimeFinder() {
  // Name for the visualisation to appear in the menu bar.
  this.name = 'Anime Finder';
     
  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'anime-finder';
    
  // Property to represent whether data has been loaded.
  this.loaded = false;


  var data;
  var animes = [];
  var anime; 
  var Names;
  var Ratings;
  var Votes;
  var Tags;
  var Synopsis;
  var episodes;
  let x = [];
  var max;
  var flag;
  var dropdown;

  this.preload = function() 
  {
    var self = this;
    this.data = loadTable
    (
      './data/anime.csv/animes.csv', 'csv', 'header',
      // Callback function to set the value
      
      function(table) 
      {
        self.loaded = true;
      }

    );
  };


  this.setup = function() 
  {
    Names = this.data.getColumn('Name');
    Ratings = this.data.getColumn('Rating Score');
    Ratings = stringsToNumbers(Ratings);
    Votes = this.data.getColumn('Number Votes');
    Votes = stringsToNumbers(Votes);
    episodes=  this.data.getColumn('Episodes');
    episodes = stringsToNumbers(episodes);
    Tags = this.data.getColumn('Tags');
    Photos = this.data.getColumn('Anime-PlanetID');
    Synopsis = this.data.getColumn('Synopsis');
    
        // Set select position.
        dropdown = createSelect();
        // Position the dropdown menu
        dropdown.position(150,200);
        // Set options
        dropdown.option(0);
        dropdown.option(1);
        dropdown.option(2);
        dropdown.option(3);
        dropdown.option(4);
    for(var i=0; i<this.data.getRowCount(); i++)
    {
      x[i] = random(0,width);
    }
  };  


  this.draw = function()
  {



    if (!this.loaded) 
    {
      console.log('Data not yet loaded');
      return;
    }    
    for (let index = 1; index <= 4; index++) {
      var ln = map(index,
        0.93,5,
        0,height);

      stroke(255);
      line(0, ln, width, ln);
      
    }
 
    for(var i=0; i<this.data.getRowCount(); i++)
    {
      var temp1 = map(episodes[i], 
        0,2603,
        0,((dropdown.value()+1)/7)*150);
      max= map(Ratings[i],
        dropdown.value(), 5,
        0, height);
      var red =  map(Votes[i],
        0, 153675,
        0, 255);
      var green = 255 - red;

      console.log(dropdown.value());
      if (Ratings[i]>dropdown.value()) {
       
      noStroke();
      fill(red, green, 150, 100);
      ellipse(x[i], height-max,temp1 , temp1);
       
      }
      let d = dist(mouseX,mouseY,x[i], height-max);
      flag = d<temp1/2;
      if (flag) {
        fill(red, green, 0, 155);
        ellipse(x[i], height-max,temp1 , temp1);
        fill(0,200);
        rect( mouseX+20, mouseY-10, 320, 200, 20);
        fill(255);
        textAlign(CENTER);
        textSize(14);
        text(Names[i], mouseX+25, mouseY+5, 320, 20);
        var url = 'https://www.anime-planet.com/images/anime/covers/thumbs/'+Photos[i]+'.jpg'
        img = createImg(url);
        img.hide();
        image(img, mouseX+40, mouseY+30,100,140); 
        fill(255);
        textAlign(LEFT);
        textSize(12);
        text('Rating : '+ Ratings[i], mouseX+150, mouseY+30, 320, 20);
        text('Tags : '+ Tags[i], mouseX+150, mouseY+50, 190, 60);
        text('Synopsis : '+ Synopsis[i], mouseX+150, mouseY+115, 190, 60);
      
      }
      
    }
  }
  
  function mouseClicked() {
    if (flag) {
      console.log(flag);
      window.open("http://www.google.com");
    }
  }
  
  this.destroy = function() {
  };
}