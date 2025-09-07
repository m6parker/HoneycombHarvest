
// ------------ quests -------------------------

let pinkGoal = 0;
let sunGoal = 0;
let carrotGoal = 0;
let questcount = 1;
const beginnerItemCatelog = [
    'sunflower'
];

const intermediateItemCatelog=[
    'sunflower',
    'pinkflower'
];

const expertItemCatelog = [
    'sunflower',
    'carrot',
    'pinkflower',
    'pumpkin'
];
 

let totalItemsCount = 0;
// give a random quest
function createQuest(){
    // determine item types based off level = itemTypes
    // if level = 1 => 1 item
    // if (1 < level < 3) => 2 items 
    // if (3 < level < 5) => 3 items 
    
    // determine quantity of each item = itemQuantity 
    // Math.floor(Math.random() * 10) + 1;
    
    // // level =5 // testing 

    console.log('create', quest)
    
    let itemsNeeded = [];
    let itemAmounts = [];
    if(level < 2){
        // selects a random item for the quest
        // itemsNeeded.push(beginnerItemCatelog[Math.floor(Math.random() * beginnerItemCatelog.length)]);
        itemsNeeded = beginnerItemCatelog;
        itemAmounts.push(Math.floor(Math.random() * 3) + 1);
    }else if(level > 1 && level < 5){
        itemsNeeded = intermediateItemCatelog;
        for(let i =0; i < intermediateItemCatelog.length; i++){
            itemAmounts.push(Math.floor(Math.random() * 5) + 1);
        };
    }else{ // level: 5+
        itemsNeeded = expertItemCatelog;
        for(let i =0; i < expertItemCatelog.length; i++){
            itemAmounts.push(Math.floor(Math.random() * 10) + 1);
        };
    }

    for(let i = 0; i < itemsNeeded.length; i++){
        Object.assign(quest.itemRequirements, {[`${itemsNeeded[i]}`]:itemAmounts[i]})
    }
    
    console.log(quest.itemRequirements)

    let message = 'collect: ';
    for (const [questItem, questQuantity] of Object.entries(quest.itemRequirements)){
        message += `<li>${questQuantity} ${questItem}</li>`;
    };
    
    document.querySelector('.quest-title').innerHTML = `Quest #${quest.level}:`;
    document.querySelector('.quest-description').innerHTML = message;
    
    // return quest;
}
let questPoints = 0;
let hiveItem;
let hiveQuantity;
// check if quest is fufilled
function checkQuest(){
    console.log('check', quest)
    
    // check hiveinventory everytime item is added
    // check how many items it has of each 
    // remove from available quest requirements
    
    for (const [questItem, questQuantity] of Object.entries(quest.itemRequirements)) {
        
        // if the hive contains any quest items
        hiveItem = hiveInventory.filter(item => item.name === questItem ).length
        
        // if you all the item types
        if (hiveItem === quest.itemRequirements[questItem]){
            // if you have the correct amounts
            if(hiveQuantity >= quest.itemRequirements[questQuantity]){
                questPoints++;
            }
        }

        //if you have enough of the items
        // console.log(questQuantity)
        // todo move to cReateQuest not check quest, need to check amounts that were made on creation
        totalItemsCount = parseInt(totalItemsCount) + parseInt(questQuantity); 
        console.log(totalItemsCount)
    
        if(questPoints === totalItemsCount){
            console.log('quest fufilled.')
            completeQuest();
    
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
    questcount++;
    level++;
    quest.level++;
    createQuest();
    // document.querySelector('.quest-description').innerHTML = 'quest completed!';
    // document.querySelector('.quest-button').removeAttribute('disabled');
    // document.querySelector('.quest-title').innerHTML = `Quest #${questcount}:`;
    // createQuest();
    // spawnRandom(level, 'bee', hive);

    //todo - need better / more obvious win screen
}
