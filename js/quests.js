
// ------------ quests -------------------------

let pinkGoal = 0;
let sunGoal = 0;
let carrotGoal = 0;
let questcount = 1;
// give a random quest
function createQuest(){
    pinkGoal = Math.floor(Math.random() * 10) + 1;
    sunGoal = Math.floor(Math.random() * 3) + 1;
    document.querySelector('.quest-title').innerHTML = `Quest #${level}:`;
    document.querySelector('.quest-description').innerHTML = `collect ${pinkGoal} pink flowers and ${sunGoal} sunflowers.`;
}

// check if quest is fufilled
function checkQuest(pinkCount, suncount){
    console.log(pinkCount, suncount)
    if(
        pinkCount >= pinkGoal && 
        suncount >= sunGoal   &&
        carrotCount >= carrotGoal
    ){
        completeQuest();
        return true;
    }else{
        console.log('missing items')
        return false;
    }
}

// win quest
function completeQuest(){
    emptyInventory();
    questcount++;
    level++;
    document.querySelector('.quest-description').innerHTML = 'quest completed!';
    document.querySelector('.quest-button').removeAttribute('disabled');
    // document.querySelector('.quest-title').innerHTML = `Quest #${questcount}:`;
    // createQuest();
    // spawnRandom(level, 'bee', hive);

    //todo - need better / more obvious win screen
}
