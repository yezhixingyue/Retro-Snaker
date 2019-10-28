var oGround = new Ground(BASE_X_POINT,BASE_Y_POINT,XLEN * SQUAREWIDTH,YLEN * SQUAREWIDTH)
oGround.init = function () {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.backgroundColor = '#0ff';
    document.body.appendChild(this.viewContent);
    this.SquareTable = [];

    for (var y = 0;y < YLEN; y++){
        this.SquareTable[y] = new Array(XLEN);
        for (var x = 0; x < XLEN; x++){
            if(y == 0 || y == YLEN - 1 || x == 0 || x == XLEN -1) {
                var newSquare = SquareFactory.create('Stone',x,y,'#000')
            } else {
                var newSquare = SquareFactory.create('Floor',x,y,FloorColor)
            }

            this.viewContent.appendChild(newSquare.viewContent);
            this.SquareTable[y][x] = newSquare
        }
    }
};
oGround.init();     //铺满背景色及游戏场景


oGround.remove = function (x,y) {

    this.viewContent.removeChild(this.SquareTable[y][x].viewContent)
    this.SquareTable[y][x] = null;
    
};
oGround.append = function (square) {
    // var oType = SquareFactory.create(type,x,y,color)
    // this.remove(x,y);
    this.viewContent.appendChild(square.viewContent)
    this.SquareTable[square.y][square.x] = square;
}
