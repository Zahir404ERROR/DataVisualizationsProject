function UKFoodAttitudes() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'UK Food Attitudes 2018';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'uk-food-attitudes';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/food/attitudestoukfood-2018.csv', 'csv', 'header',
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

    // Create a select DOM element.
    this.select = createSelect();
    this.select.position(610, 600);

    // Fill the options with all company names.
    var questions = this.data.columns;
    // First entry is empty.
    for (let i = 1; i < questions.length; i++) {
      this.select.option(questions[i]);
    }

    this.present_angle = [72, 72, 72, 72, 72];
    this.increment = [];

  };

  this.destroy = function() {
    this.select.remove();
  };

  // Create a new pie chart object.
  this.pie = new PieChart(width / 2, height / 2, width * 0.4);

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Get the value of the company we're interested in from the
    // select item.
    var questionType = this.select.value();

    // Copy the row labels from the table (the first item of each row).
    var labels = this.data.getColumn(0);

    // Colour to use for each category.
    var colours = ['#3D087B', '#F43B86', '#FFE459', '#EC9B3B', '#47E4BB'];

    // Make a title.
    var title = 'Question: ' + questionType;



  

    
    // Get the column of raw data for questionType.
    var final_angle = this.data.getColumn(questionType);

    // Convert all data strings to numbers.
    final_angle = stringsToNumbers(final_angle);

    for (var i = 0; i < this.present_angle.length; i++) {
        this.increment[i] = (final_angle[i] - this.present_angle[i]) / 5;       
        this.present_angle[i] = this.present_angle[i] + this.increment[i];          
    }

    // Draw the pie chart!
    this.pie.draw(this.present_angle, labels, colours, title);
  };
}
