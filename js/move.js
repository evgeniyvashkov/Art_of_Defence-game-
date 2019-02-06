export let move =(keyClick,hero,canvas,keyWhich)=>{

    let speed =  (hero.running_mode) ? hero.running_speed :5 ;
    if(65 in keyClick) {  
        if(hero.posX>-80) hero.posX -= speed;   
    }

    if(87 in keyClick){
        (hero.posY>276) ? hero.posY-=speed : hero.posY;        
    }

    if(83 in keyClick) {
        hero.posY < (canvas.height-hero.size+30) ? hero.posY+=speed : hero.posY;     
    }

    if(68 in keyClick) {
        if(hero.posX<canvas.width-hero.size+80) hero.posX +=speed ;
    }
}