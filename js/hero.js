export default class Hero {
    constructor(image,posX=350,posY=350,speed=1,size=276,sound_attack,sound_step){
        this.sprite = image;
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
        this.base_speed = 10;
        this.running_mode = false;
        this.running_speed = 10;
        this.size = 276;
        this.frame_horizontal = 0;
        this.frame_vertical = 20;
        this._index = 0;
        this.attacking= false;
        this.running_mode = false;
        this.life = 100;
        this.current_life = 100;
        this.score = 0;
        this.damage = 1;
        this.death = false;
        this.defence = 10;
        this.sound_attack = sound_attack;
        this.sound_step = sound_step;
    }

    update(dt){
        this._index+=this.speed*dt;    
        this.frame_horizontal =Math.floor(this._index)%8*this.size;
        this.frame_horizontal>=2484?this.frame_horizontal=0 : this.frame_horizontal;
    }

    walk(frame_vertical){
        if(!this.running_mode){
            this.frame_vertical=frame_vertical;
        } else {
           if(frame_vertical===848) this.frame_vertical=1400;
           if(frame_vertical===572) this.frame_vertical=1124;

        };
            

    }   
    run (){
        if(!this.running_mode) {
            this.running_mode = true;
        } else {
            this.running_mode = false;
            
        };
        
    }
    attack(frame_vertical){ 
        this.frame_vertical=frame_vertical;
        this.sound_attack.play();
        
        
    }
    stand(frame_vertical){
        this.frame_vertical = frame_vertical; 
    }
    die() {
        this.death = true;
    }

}