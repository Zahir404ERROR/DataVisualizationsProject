function TechDiversityGender() {

    // Name for the visualisation to appear in the menu bar.
    this.name = 'Tech Diversity: Gender';

    // Each visualisation must have a unique ID with no special
    // characters.
    this.id = 'tech-diversity-gender';

    // Layout object to store all common plot layout parameters and
    // methods.
    this.layout = {
        // Margin positions around the plot. Left and bottom margins are
        // bigger so there is space for axis and tick labels on the canvas.
        leftMargin: 130,
        rightMargin: width,
        topMargin: 30,
        bottomMargin: height,
        pad: 5,

        plotWidth: function() {
            return this.rightMargin - this.leftMargin;
        },

        // Boolean to enable/disable background grid.
        grid: true,

        // Number of axis tick labels to draw so that they are not drawn on
        // top of one another.
        numXTickLabels: 10,
        numYTickLabels: 8,
    };

    // Middle of the plot: for 50% line.
    this.midX = (this.layout.plotWidth() / 2) + this.layout.leftMargin;

    // Default visualisation colours.
    this.femaleColour = color('#F43B86');
    this.maleColour = color('#FFE459');

    // Property to represent whether data has been loaded.
    this.loaded = false;
    var j;
    var y;

    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    this.preload = function() {
        var self = this;
        this.data = loadTable(
            './data/tech-diversity/gender-2018.csv', 'csv', 'header',
            // Callback function to set the value
            // this.loaded to true.
            function(table) {
                self.loaded = true;
            });

    };

    this.setup = function() {
        // Font defaults.
        textSize(16);
        this.present_length = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.increment = [];
        j = 0;
        y = 0;
    };

    this.destroy = function() {};

    this.draw = function() {
        if (!this.loaded) {
            console.log('Data not yet loaded');
            return;
        }

        // Draw Female/Male labels at the top of the plot.
        this.drawCategoryLabels();

        var lineHeight = (height - this.layout.topMargin) /
            this.data.getRowCount();

        var lineHeight = (height - this.layout.topMargin) /
            this.data.getRowCount();


        if ((mouseX - this.layout.leftMargin) / this.layout.plotWidth() > 0.095 && (mouseX - this.layout.leftMargin) / this.layout.plotWidth() < 0.905) {
            var mousePercentage = 100 * (mouseX - this.layout.leftMargin) / this.layout.plotWidth();
        } else {
            var mousePercentage = 50;
        }

        // Loop over every row in the data.
        for (var i = 0; i < this.data.getRowCount(); i++) {

            // Calculate the y position for each company.
            var lineY = (lineHeight * i) + this.layout.topMargin;

            //let rows = data.getRows();
            // Create an object that stores data from the current row.
            var company = {
                // Gets the company name from csv and it in name object
                name: this.data.getString(i, 0),
                // Gets the percentage (converts from string in csv to float) of females in the company from the data and stores it in female property
                female: this.data.getNum(i, 1),
                // Gets the percentage (converts from string in csv to float) of males in the company from the data and stores it in male property
                male: this.data.getNum(i, 2)
            };

            // Draw the company name in the left margin.
            fill(255);
            noStroke();
            textAlign('right', 'top');
            text(company.name,
                this.layout.leftMargin - this.layout.pad,
                lineY);


            var final_length = this.mapPercentToWidth(company.female);

            var increment = 0;

            if (j <= final_length) {
                // Draw female employees rectangle.
                fill(this.femaleColour);
                rect(this.layout.leftMargin,
                    lineY,
                    j,
                    lineHeight - this.layout.pad);
                j = j + 2;
            } else {
                // Draw female employees rectangle.
                fill(this.femaleColour);
                rect(this.layout.leftMargin,
                    lineY,
                    final_length,
                    lineHeight - this.layout.pad);
            }

            if (y <= this.mapPercentToWidth(company.male)) {
                // Draw female employees rectangle.
                fill(this.maleColour);
                rect(this.layout.rightMargin,
                    lineY, -y,
                    lineHeight - this.layout.pad);
                y = y + 3;
            } else {
                // Draw male employees rectangle.
                fill(this.maleColour);
                rect(this.layout.rightMargin,
                    lineY, -this.mapPercentToWidth(company.male),
                    lineHeight - this.layout.pad);
            }


        }

        // Draw 50% line
        stroke(255);
        strokeWeight(1);
        line(this.midX,
            this.layout.topMargin,
            this.midX,
            this.layout.bottomMargin);


        // Draw line at mouseX
        stroke(255);
        strokeWeight(1);
        line(this.mapPercentToWidth(mousePercentage) + this.layout.leftMargin,
            this.layout.topMargin,
            this.mapPercentToWidth(mousePercentage) + this.layout.leftMargin,
            this.layout.bottomMargin);
        textAlign('center', 'top');

        fill(255);
        text(Math.round(mousePercentage) + '%',
            this.mapPercentToWidth(mousePercentage) + this.layout.leftMargin,
            this.layout.pad);

    };

    this.drawCategoryLabels = function() {
        fill(255);
        noStroke();
        textAlign('left', 'top');
        text('Female',
            this.layout.leftMargin,
            this.layout.pad);
        textAlign('center', 'top');
        text('50%',
            this.midX,
            this.layout.pad);
        textAlign('right', 'top');
        text('Male',
            this.layout.rightMargin,
            this.layout.pad);
    };

    this.mapPercentToWidth = function(percent) {
        return map(percent,
            0,
            100,
            0,
            this.layout.plotWidth());
    };

}