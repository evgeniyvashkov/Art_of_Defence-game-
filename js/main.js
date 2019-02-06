import {load_All_Images,imagesBuffer} from './loader.js';
import {render} from './render.js'
import Hero from './hero.js'
import {move} from './move.js'
import {setCondition,resetCondition} from './hero-condition.js'
import Enemy from './enemy.js'
import {randomPositiveX,randomNegativeX,randomY} from './random.js'



const requestAnimFrame = (()=>{
    return requestAnimationFrame       ||
        webkitRequestAnimationFrame ||
        mozRequestAnimationFrame    ||
        oRequestAnimationFrame      ||
        msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const START = document.getElementById('start_game');
const RESTART = document.getElementById('restart_game');
const main_theme = document.getElementById('title_audio');
const SOUNDS = {
    'goblin' : document.getElementById('goblin'),
    'goblin_step' : document.getElementById('step'),
    'step_hero' : document.getElementById('step_hero'),
    'attack_sound' : document.getElementById('attack_sound'),
    'attack_sword' : document.getElementById('sword')
}

console.log(SOUNDS.attack_sound,SOUNDS.step_hero)




let array_of_images = [
    '/img/bgimg.jpg',                   //0
    '/img/heroes/knight_sprite.png',     //1
    '/img/speels_icons/attack.png',     //2
    '/img/speels_icons/def.png',        //3
    '/img/speels_icons/sprint.png',     //4
    '/img/enemy/goblin.png'             //5
    ];                               

load_All_Images(array_of_images)
    .then (arrLoadedImage=>{
        const hero = new Hero(imagesBuffer[1],280,280,10,276,SOUNDS.attack_sword,SOUNDS.step_hero);
        const enemy = new Enemy(imagesBuffer[5],10,950,400,40,'creep',1,226,SOUNDS.attack_sound,SOUNDS.step);
        let enemyArr = [enemy];
        const keyClick = {};
        const spells = {
            attack:imagesBuffer[2],
            def:imagesBuffer[3],
            sprint:imagesBuffer[4],
        }

        setInterval(()=>{
            if(!game){return}
            if(enemyArr.length === 50) {enemy.enemyArr = [],console.log('50enemy')}
            let r =(Math.round(Math.random())) ? randomNegativeX(-150,-600) : randomPositiveX(900,1300); 
            enemyArr.push( new Enemy(imagesBuffer[5],10,r,randomY(400,620),randomY(10,70),'creep',1,226,SOUNDS.attack_sound,SOUNDS.step));

        },2000)



        document.addEventListener('keydown', (event)=>{
            keyClick[event.keyCode]=true; 
            setCondition(event.keyCode,hero)        
            move(keyClick, hero, canvas,event.keyCode)   
        })
        document.addEventListener('keyup',(event)=>{
            resetCondition(event.keyCode,hero)
            delete keyClick[event.keyCode];  
        })
        let game = false;
        let lastTime=Date.now();
        const gameEngine=()=>{
            let now = Date.now();
            let dt = (now-lastTime)/1000;
            render(game,ctx,imagesBuffer,hero,canvas,dt,spells,enemyArr,gameEngine);
            lastTime=now;
            requestAnimFrame(gameEngine);  
        };
        
       gameEngine();
START.addEventListener('click',(e)=>{
    game = true;
    main_theme.volume=0.05;
    console.log(SOUNDS)
})
RESTART.addEventListener('click',(e)=>{
    enemyArr=[];
    hero.current_life = 100;
    hero.death=false;
    hero.posX=280;
    hero.posY=280;
    hero.score = 0;
    })
 });


