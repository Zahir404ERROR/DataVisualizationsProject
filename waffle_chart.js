function Waffle_Chart() {
this.name = 'Waffle Chart';

// Each visualisation must have a unique ID with no special
// characters.
this.id = 'waffle-chart';  

var data;
var waffles = [];
var waffle; 

this.preload = function() {
	data = loadTable("./data/finalData.csv", "csv", "header");
}

this.setup = function() {
	var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
		"Sunday"
	];

	var values = ['Take-away', 'Cooked from fresh', 'Ready meal', 'Ate out',
		'Skipped meal', 'Left overs'
	]

	for (var index = 0; index < days.length; index++) {
		if (index<4) {
			waffles.push(new Waffle(60 + (index*220),20,200,200,8,8,data,days[index], values));	
		}
		else {
			waffles.push(new Waffle(160 + (index-4)*220,240,200,200,8,8,data,days[index], values));		
		}
	}
}

this.destroy = function() {
};

this.draw = function() {
	for (var index = 0; index < waffles.length; index++) {
		waffles[index].draw();
	}
	
	for (var index = 0; index < waffles.length; index++) {
		waffles[index].checkMouse(mouseX,mouseY);
	}
}
}
