class Player {
    constructor(src, sx, sy, sw, sh, x, y, w, h, xSpeed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.src = src;
        this.sx = sx;
        this.sy = sy;
        this.sw = sw;
        this.sh = sh;
        this.xSpeed = xSpeed;
    }

    drawplayerImage() {
        canvasContext.drawImage(this.src, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);
    }

    movePlayer() {
        //            console.log(this.x)
        if (leftKeyPressed) {
            this.x -= this.xSpeed;
            if (this.x < 0) {
                this.x = canvas.width;
            }
        }
        if (rightKeyPressed) {
            this.x += this.xSpeed;
            if (this.x > canvas.width) {
                this.x = 0;
            }
        }
    }
    hasHitEnemy(item) {
        return ((this.x + this.w) >= item.x &&
                this.x <= (item.x + item.w)) //xcollision

            &&
            (this.y >= item.y &&
                this.y <= (item.y + item.h)); //ycollision

    }
    
    hasHitPlayer(playerShip) {
        return this.hasHitItem(enemybullet);

    }
    hasCollided() {
        var self = this;
        var collided = false;

        enemybullets.forEach(function (enemybullet, i) {
            if (self.hasHitEnemy(enemybullet)) {
                
                if(enemybullet.y + enemybullet.h > self.y){ // has collided with playershop xy 
                   //console.log('class hit');
                    enemybullet.y = canvas.height;
                    lives--;
                    console.log(enemybullet.y);
                    
                }
                
                collided = true;
             
            }
        });
//        enemies = enemies.filter(item => item !== undefined); maybe move the enemy bullet to prevent overlay time issue 

        return collided;

    }
}
const RIGHT = 39;
const LEFT = 37;
const SPACE = 32;
var rightKeyPressed = false;
var leftKeyPressed = false;
var spaceKeyPressed = false;

function keyPressed(evt) {
    if (evt.keyCode == RIGHT) {
        rightKeyPressed = true;
    }
    if (evt.keyCode == LEFT) {
        leftKeyPressed = true;
    }
    if (evt.keyCode == SPACE) {
        if (playerBulletDelay) {
            drawBullet();
            playerBulletDelay = false;
            console.log(playerBulletDelay);
        }


        //drawEnemyBullet();
        spaceKeyPressed = true;
        //shooting = true;
    }
}

function keyReleased(evt) {
    if (evt.keyCode == RIGHT) {
        rightKeyPressed = false;
    }
    if (evt.keyCode == LEFT) {
        leftKeyPressed = false;
    }
}
