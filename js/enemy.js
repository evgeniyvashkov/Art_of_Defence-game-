export default class Enemy {
    constructor(image,hp,positionX,positionY,speed,type,damage,size,sound_attack,sound_step){
        this.sprite = image;
        this.hp = hp;
        this.positionX = positionX;
        this.positionY = positionY;
        this.speed = speed;
        this.type = type;
        this.damage = damage;
        this.frame_horizontal = 0 ;
        this.frame_vertical = 0 ;
        this._index = 0;
        this.size = size;
        this.life = 100;
        this.base_life = 100;
        this.die = false;
        this.attacking = false;
        this.sound_attack = sound_attack,
        this.sound_step = sound_step;
    }
    walk(dt){}
    attack(dt,hero){
        this.sound_attack.play(10);
        this.attacking = true;
        hero.current_life-= this.damage*dt;
        if(hero.current_life <= 0)  hero.die();
    }
    die(){}
    update(dt,hero){
        
        if(this.die) return;
        this._index+=this.speed*dt;    
        this.frame_horizontal =Math.floor(this._index)%8*this.size;
        this.frame_horizontal>=1582?this.frame_horizontal=0 : this.frame_horizontal;

        this.positionX > hero.posX+160 ? this.positionX -= this.speed*dt: this.positionX += this.speed*dt;
        this.positionY > hero.posY+100 ? this.positionY -= this.speed*dt: this.positionY += this.speed*dt;
        
       if(this.positionX > hero.posX +128 ){
           
           this.frame_vertical = 0 ;
           this.attacking = false;
           if((this.positionY -hero.posY)< 110 && (this.positionX-(hero.posX+160) < 10 )){
                this.frame_vertical = 512;//
                this.attack(dt,hero);
           }

       } 
       else {

           this.frame_vertical = 256;
           this.attacking = false;
           if((this.positionY - hero.posY)< 110 && (hero.posX - (this.positionX) < 10 )){
                this.frame_vertical = 768;
                this.attack(dt,hero);
           }
       } 

    }

}