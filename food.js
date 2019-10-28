var f_x;
var f_y;
var food;

function getFood() {
    f_x = Math.ceil(Math.random() * (XLEN - 2));
    f_y = Math.ceil(Math.random() * (YLEN - 2));
    if (oGround.SquareTable[f_y][f_x].viewContent.style.backgroundColor != FloorColor) {
        this.getFood()
    } else {
        food = SquareFactory.create('Food', f_x, f_y, 'pink');
        oGround.remove(f_x, f_y);
        oGround.append(food)
    }

}
getFood()