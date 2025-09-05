
// ------------ quests -------------------------

let pinkGoal = 0;
let sunGoal = 0;
let carrotGoal = 0;
let questcount = 1;
const itemCatelog = [
    'sunflower',
    'carrot',
    'pinkflower', 
    'pumpkin'
];
// give a random quest
function createQuest(){
    //testing 
    // pinkGoal = 2;
    // sunGoal = 1;
        
    
    // determine item types based off level = itemTypes
    // if level = 1 => 1 item
    // if (1 < level < 3) => 2 items 
    // if (3 < level < 5) => 3 items 
    
    // determine quantity of each item = itemQuantity 
    // Math.floor(Math.random() * 10) + 1;
    
    // add each requirement to the quest object under itemRequirements
    // const requirement = Object.assign({}, {item:itemTypes, quantity:itemQuantity})
    // Object.assign(itemRequirements, requirement)
    
    // pinkGoal = Math.floor(Math.random() * 5) + 1;
    // sunGoal = Math.floor(Math.random() * 3) + 1;
    
    const quest = {
        level: level,
        itemRequirements: { // itemType:itemQuantity
            // 'sunflower':sunGoal,
            // 'pinkflower':pinkGoal
        },
        time: 120000, // 2 minutes
        reward: 1
    }
    
    const itemsNeeded = [];
    let itemAmounts = [];
    if(level < 2){
        // selects a random item for the quest
        itemsNeeded.push(itemCatelog[Math.floor(Math.random() * itemCatelog.length)]);
        itemAmounts.push(Math.floor(Math.random() * 10) + 1);
    }// else ... hjigher levels with loop
    
    for(let i = 0; i < itemsNeeded.length; i++){
        const requirement = Object.assign({}, {[`${itemsNeeded[i]}`]:itemAmounts[i]})
        Object.assign(quest.itemRequirements, requirement)
    }
    
    console.log(quest)
    
    document.querySelector('.quest-title').innerHTML = `Quest #${quest.level}:`;
    document.querySelector('.quest-description').innerHTML = `collect ${quest.itemRequirements['sunflower']} sunflowers and ${quest.itemRequirements['pinkflower']} pink flowers.`;
    
    return quest;
}
let questPoints = 0;
let hiveQuantity;
// check if quest is fufilled
function checkQuest(quest){
    
    // check hiveinventory everytime item is added
    
    for (const [questItem, questQuantity] of Object.entries(quest.itemRequirements)) {
        
        // if the hive contains any quest items
        hiveQuantity = hiveInventory.filter(item => item.name === questItem ).length
        
        // if you all the item types
        if (hiveQuantity === quest.itemRequirements[questItem]){
            questPoints++;
        }

        //if you have enough of the items
        if(questPoints === Object.entries(quest.itemRequirements).length){
            console.log('quest fufilled.')
            // start honeycomb timer

        }
    }
    
    // console.log('hiveQuantity', hiveQuantity)
    // console.log('questProgress[questItem]', questProgress)
    // console.log('quest Requirements: ', quest.itemRequirements)
    
    // console.log('questPoints:', questPoints)
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
