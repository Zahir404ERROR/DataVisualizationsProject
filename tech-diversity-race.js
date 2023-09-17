function TechDiversityRace() {

    // Name for the visualisation to appear in the menu bar.
    this.name = 'Tech Diversity: Race';

    // Each visualisation must have a unique ID with no special
    // characters.
    this.id = 'tech-diversity-race';

    // Property to represent whether data has been loaded.
    this.loaded = false;

    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    this.preload = function() {
        var self = this;
        this.data = loadTable(
            './data/tech-diversity/race-2018.csv', 'csv', 'header',
            // Callback function to set the value
            // this.loaded to true.
            function(table) {
                self.loaded = true;
            });
    };

    let select;
    this.setup = function() {
        if (!this.loaded) {
            console.log('Data not yet loaded');
            return;
        }

        // Create a select DOM element.
        this.select = createSelect();

        // Set select position.
        this.select.position(width / 2 + 265, 600);
        textAlign(CENTER);


        this.present_angle = [60, 60, 60, 60, 60, 60];
        this.increment = [];

        // Fill the options with all company names.
        // ???

        for (let i = 1; i < this.data.getColumnCount() - 1; i++) {
            this.select.option(this.data.columns[i])

        }
        console.log(this.data);
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
        // Use a temporary hard-code example for now.
        var companyName = this.select.value();

        // Copy the row labels from the table (the first item of each row).
        var labels = this.data.getColumn(0);

        // Colour to use for each category.
        var colours = ['#3D087B', '#F43B86', '#FFE459', '#EC9B3B', '#47E4BB', '#BEAEE2'];

        // Make a title.
        var title = 'Employee diversity at ' + companyName;




        var final_angle = this.data.getColumn(companyName);
        // Convert all data strings to numbers.
        final_angle = stringsToNumbers(final_angle);

        for (var i = 0; i < this.present_angle.length; i++) {
            this.increment[i] = (final_angle[i] - this.present_angle[i]) / 10;
            this.present_angle[i] = this.present_angle[i] + this.increment[i];
        }
        this.pie.draw(this.present_angle, labels, colours, title);
        fill('#121212');
        ellipse(width / 2, height / 2, 200, 200);
    };
}