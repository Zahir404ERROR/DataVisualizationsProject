function Box(x, y, width, height, category){

    var x = x;
    var y = y;
    var height;
    var width;
    
    this.category = category;

    this.mouseOver = function(mouseX, mouseY) {
        if(mouseX>x&&mouseX<x+width&&mouseY>y&&mouseY<y+height){
            return this.category.name;
        }
        return false;
    }
    this.draw = function() {
        fill(category.colour);
        stroke(0);
        rect(x,y,width,height,5);
    }
}