
// ------------ quests -------------------------

let pinkGoal = 0;
let sunGoal = 0;
let carrotGoal = 0;
let questcount = 1;
// give a random quest
function createQuest(){
    //testing 
    pinkGoal = 1;
    sunGoal = 1;
    // pinkGoal = Math.floor(Math.random() * 3) + 1;
    // sunGoal = Math.floor(Math.random() * 3) + 1;

    const quest = {
        level: level,
        itemRequirements: {
            'sunflower':sunGoal,
            'pinkflower':pinkGoal
        },
        time: 120000, // 2 minutes
        reward: 1
    }

    console.log(quest)

    document.querySelector('.quest-title').innerHTML = `Quest #${quest.level}:`;
    // document.querySelector('.quest-description').innerHTML = `collect ${pinkCount} pink flowers and ${sunGoal} sunflowers.`;
    document.querySelector('.quest-description').innerHTML = `collect ${quest.itemRequirements[0]} sunflowers and ${quest.itemRequirements[1]} pink flowers.`;

    return quest;
}

// check if quest is fufilled
function checkQuest(quest){
    
    // check hiveinventory everytime item is added
    
    for (const [questItem, questQuantity] of Object.entries(quest.itemRequirements)) {
        // console.log(`${questItem}: ${questQuantity}`);
        
        const hiveQuantity = hiveInventory.filter(item => item.name === questItem ).length
        questProgress[questItem] = hiveQuantity;
        
        if (quest.itemRequirements[questItem].quantity === questProgress[questItem].quantity){
            console.log('quest point')
        }
    }
        
    console.log('quest Requirements: ', quest.itemRequirements)
    console.log('hive Inventory: ', hiveInventory)
    console.log('questProgress: ', questProgress);


    // check currentInv
    // compare quantities with quest
    // if(
    //     pinkCount >= quest.itemQuantities[1] && 
    //     suncount >= quest.itemQuantities[0]
    // ){
    //     completeQuest();
    //     return true;
    // }else{
    //     console.log('missing items')
    //     return false;
    // }
}

// win quest
function completeQuest(){
    if(hiveSprite.space){ addToHive(); }
    // emptyInventory();
    questcount++;
    level++;
    document.querySelector('.quest-description').innerHTML = 'quest completed!';
    document.querySelector('.quest-button').removeAttribute('disabled');
    // document.querySelector('.quest-title').innerHTML = `Quest #${questcount}:`;
    // createQuest();
    // spawnRandom(level, 'bee', hive);

    //todo - need better / more obvious win screen
}
