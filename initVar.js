//游戏场景  宽度系数-每行有多少个方块   高度系数-控制总共有多少行
var XLEN = 30;
var YLEN = 30;

//每个方块的宽度
var SQUAREWIDTH = 20;

//游戏场景的位置
var BASE_X_POINT = 200;
var BASE_Y_POINT = 100;

//定义蛇的移动时间间隔
var INTERVAL = 300;


function Square(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height
}
Square.prototype.touch = function () {
    console.log('touch')
}

var Floor = tool.extends(Square);
var Stone = tool.extends(Square);
var Food = tool.single(Square);
var SnakeHead = tool.single(Square);
var SnakeBody = tool.extends(Square);
var Ground = tool.single(Square);

