
// ------------ quests -------------------------

let pinkGoal = 0;
let sunGoal = 0;
let carrotGoal = 0;
let questcount = 1;
// give a random quest
function createQuest(){
    //testing 
    // pinkGoal = 1;
    // sunGoal = 1;
    pinkGoal = Math.floor(Math.random() * 10) + 1;
    sunGoal = Math.floor(Math.random() * 3) + 1;

    const quest = {
        level: level,
        itemRequirements: [
            sunGoal,
            pinkGoal    
        ],
        time: 120000, // 2 minutes
        reward: 1
    }

    console.log(quest)

    document.querySelector('.quest-title').innerHTML = `Quest #${quest.level}:`;
    // document.querySelector('.quest-description').innerHTML = `collect ${pinkCount} pink flowers and ${sunGoal} sunflowers.`;
    document.querySelector('.quest-description').innerHTML = `collect ${quest.itemRequirements[0]} sunflowers and ${quest.itemRequirements[1]} pink flowers.`;
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
    if(hiveSpace){ addToHive(); }
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
