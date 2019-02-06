export let render = (game,ctx,imagesBuffer,hero,canvas,dt,spells,enemyArr,gameEngine)=>{
    if (hero.death) {
        ctx.fillText(`THE END`, 400, 360);
        return cancelAnimationFrame(gameEngine)
    }
    ctx.clearRect(0,0,canvas.width,canvas.heigth)
    //background11
    ctx.drawImage(imagesBuffer[0],0,0,canvas.width,canvas.height);
    if(!game){return;}
    //hero
    ctx.drawImage(hero.sprite,
        hero.frame_horizontal,hero.frame_vertical,256,256,
        hero.posX,hero.posY,256,256);
    //hero heath bar
    ctx.fillStyle="#60BF3F";
    ctx.fillRect(hero.posX+90,hero.posY+30,hero.current_life,10);    
    //Spells
    ctx.drawImage(spells.attack,20,20,50,50);
    ctx.drawImage(spells.def,20,80,50,50);
    ctx.drawImage(spells.sprint,20,140,50,50);
    ctx.font = '24px Comic Sans MS';
    ctx.fillStyle="#A9491E";
    ctx.fillText(`ATTACK: ${hero.damage} ( SPACE )`,90,55)
    ctx.fillText(`DEFENCE: ${hero.defence}`,90,115)
    ctx.fillText(`${hero.running_mode?'runnnig mode':'walking mode'} ( R )`,90,170)


    //Health points and Score
    ctx.fillStyle = 'red';
    ctx.textStyle='black';
    ctx.font = '48px Comic Sans MS';
    ctx.fillText(`HP : ${Math.floor(hero.current_life)}`, 600, 60);
    ctx.strokeText(`HP : ${Math.floor(hero.current_life)}`, 600, 60);
    ctx.fillText(`Score : ${Math.floor(hero.score)}`, 600, 120);
    ctx.strokeText(`Score : ${Math.floor(hero.score)}`, 600, 120);
    //enemies 
    enemyArr.forEach((enemy)=>{
        if(enemy.die) return;
        //enemy health bar 
        ctx.fillRect(enemy.positionX+20,enemy.positionY-10,enemy.life*0.8,10);
        //enemy
        ctx.drawImage(enemy.sprite,
        enemy.frame_horizontal,enemy.frame_vertical,226,256,
        enemy.positionX,enemy.positionY,113,128,
        )   
    });
    enemyArr.forEach((enemy)=>{
        if(enemy.die) return;
        if(hero.attacking && enemy.attacking) {
            enemy.life -= hero.damage
            if(enemy.life === 0) {
            enemy.die=true;
            
            hero.score+=5;
            if(Math.random()>0.90) {
                if(hero.current_life<90){
                hero.current_life+=10;
                }
                console.log('Greeting!')
            };
            }    
        }
    })


    hero.update(dt);
    enemyArr.forEach((enemy)=>{
        if(!enemy) return;
        enemy.update(dt,hero)
    });

}