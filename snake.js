var snake = new Snake();
snake.head = null;
snake.tail = null;
this.direction = 0;
var DIRECTIONENUM = {
    LEFT:{ x : -1,y : 0 },
    RIGHT:{ x : 1, y : 0},
    UP:{ x : 0, y : -1},
    DOWN:{ x : 0, y : 1}
}
//蛇初始化
snake.init = function () {
    var snakeHead = SquareFactory.create('SnakeHead',3,1,' #A23400');
    var snakeBody1 = SquareFactory.create('SnakeBody',2,1,' #64A600');
    var snakeBody2 = SquareFactory.create('SnakeBody',1,1,' #64A600');

    //拆地板方法，蛇添加方法
    oGround.remove(snakeHead.x,snakeHead.y);
    oGround.append(snakeHead);
    oGround.remove(snakeBody1.x,snakeBody1.y);
    oGround.append(snakeBody1);
    oGround.remove(snakeBody2.x,snakeBody2.y);
    oGround.append(snakeBody2);

    //把蛇链接起来  形成双向链表
    snakeHead.next = snakeBody1;
    snakeHead.last = null;
    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;
    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    this.head = snakeHead;
    this.tail = snakeBody2;
    this.direction = DIRECTIONENUM.RIGHT;

}

snake.init(oGround)

//move 
snake.move = function (ground) {
    var square = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    console.log(square)
}
snake.move(oGround)

snake.strategy = {
    Move:function(ground,snake,square,fromEat) {
        //发生移动时 在头部和身体中间插入新的链表链接点(即身体一部分) 
        var tempHead = snake.head.next();
        var newBody = SquareFactory.create('SnakeBody',snake.head.x,snake.head.y)
        newBody.next = tempHead;
        tempHead.last = newBody;
        ground.remove(snake.head.x,snake.head.y);
        ground.append(tempHead);
        //新脑袋 （建立 及 插入到链表中）
        var newHead = SquareFactory.create('SnakeHead',square.x,square.y)
        newHead.next = tempHead;
        tempHead.last = newHead;
        ground.remove(square.x,square.y);
        ground.append(newHead);
        snake.head = newHead;
        snake.head.last = null;
        //删除尾巴
        if(!fromEat){
            var floor = SquareFactory.create('Floor',snake.tail.x,snake.tail.y);
            ground.remove(floor.x,floor.y);
            ground.append(floor);
            snake.tail = snake.tail.last;
            snake.tail.next = null;
        }
    } 
}