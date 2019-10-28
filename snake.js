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
    var snakeHead = SquareFactory.create('SnakeHead',3,1,'#A23400');
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
    console.log(square.touch(),'111',snake.strategy)
    if(typeof this.strategy[square.touch()] === 'function') {
        this.strategy[square.touch()](oGround,this,square,false) 
    }
}


snake.strategy = {
    Move:function(ground,snake,square,fromEat) {
        //发生移动时 在头部和身体中间插入新的链表链接点(即身体一部分) 
        var tempHead = snake.head.next;
        var newBody = SquareFactory.create('SnakeBody',snake.head.x,snake.head.y,'#64A600')
        newBody.next = tempHead;
        tempHead.last = newBody;
        ground.remove(snake.head.x,snake.head.y);
        ground.append(newBody);
        //新脑袋 （建立 及 插入到链表中）
        var newHead = SquareFactory.create('SnakeHead',square.x,square.y,'#A23400')
        newHead.next = newBody;
        newBody.last = newHead;
        ground.remove(square.x,square.y);
        ground.append(newHead);
        snake.head = newHead;
        snake.head.last = null;
        //删除尾巴
        if(!fromEat){
            var floor = SquareFactory.create('Floor',snake.tail.x,snake.tail.y,FloorColor);
            ground.remove(floor.x,floor.y);
            ground.append(floor);
            snake.tail = snake.tail.last;
            snake.tail.next = null;
        }
    } ,
    Eat:function (ground,snake,square){
        GAMESTORE ++ ;
        console.log(this)
        this.Move(ground,snake,square,true);
        getFood()
    },
    Dead:function (){
        clearInterval(timer)
        alert('游戏结束，你的得分为' + GAMESTORE)
    }
}

snake.move(oGround)

var timer
function gameRun() {
    timer = setInterval(function() {
        snake.move(oGround)
    }, INTERVAL)

    // 上下左右
    document.onkeydown = function(e) {
        var keyNum = window.event ? e.keyCode : e.which;
        if (keyNum === 38 && snake.direction != DIRECTIONENUM.DOWN) {
            snake.direction = DIRECTIONENUM.UP
        } else if (keyNum === 40 && snake.direction != DIRECTIONENUM.UP) {
            snake.direction = DIRECTIONENUM.DOWN
        } else if (keyNum === 37 && snake.direction != DIRECTIONENUM.RIGHT) {
            snake.direction = DIRECTIONENUM.LEFT
        } else if (keyNum === 39 && snake.direction != DIRECTIONENUM.LEFT) {
            snake.direction = DIRECTIONENUM.RIGHT
        }
    }
    // var result = game.snake.move(game)
}
gameRun()