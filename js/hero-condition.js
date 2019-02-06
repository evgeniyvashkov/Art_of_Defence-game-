 const CONDITIONS = {
     stand_right : 20,
     stand_left : 296,
     walk_right : 572,
     walk_left : 848,
     run_right : 1124,
     run_left : 1400,
     attack_right : 1676,
     attack_left : 1952,
 }

 export let setCondition=(key,hero)=>{

    switch(key){
        case 65:{                   // key A
            hero.walk(CONDITIONS.walk_left);
        } break;

        case 68:{                   //key D
            hero.walk(CONDITIONS.walk_right);
        } break;

        case 87:                    //key W
        case 83: {                  //key W
              if(hero.frame_vertical === CONDITIONS.stand_right) {
                  hero.walk(CONDITIONS.walk_right);
                } else 
                    if(hero.frame_vertical === CONDITIONS.stand_left) 
                        hero.walk(CONDITIONS.walk_left);
        } break;

        case 82:{                   //key R
            hero.run();
        } break;

        case 32:{                   //key SPACE
            hero.attacking = true;
            if(hero.frame_vertical === CONDITIONS.stand_right) {
                hero.attack(CONDITIONS.attack_right);
            } else 
                if(hero.frame_vertical === CONDITIONS.stand_left) 
                    hero.attack(CONDITIONS.attack_left);    
        } break;

    }
}




export let resetCondition=(key,hero)=>{
    //console.log('resetCondition working')
    switch(key){
        case 65:{                       // key A
            hero.stand(CONDITIONS.stand_left);
        } break;

        case 32:{
            hero.attacking = false;
            if(hero.frame_vertical === CONDITIONS.attack_right) {
                hero.stand(CONDITIONS.stand_right);
            } else 
                if(hero.frame_vertical ===CONDITIONS.attack_left) 
                    hero.stand(CONDITIONS.stand_left);
        } break;   
                           // key SPACE
        case 68:{                       // key D
            hero.stand(CONDITIONS.stand_right);
        } break;
        
        case 87:                        // key W
        case 83:{                       // key S
            if(hero.frame_vertical === CONDITIONS.walk_right||hero.frame_vertical===CONDITIONS.run_right) {
                hero.stand(CONDITIONS.stand_right);
            } else 
                if(hero.frame_vertical === CONDITIONS.walk_left || hero.frame_vertical===CONDITIONS.run_left)       hero.stand(CONDITIONS.stand_left);
        } break;
    }
}


