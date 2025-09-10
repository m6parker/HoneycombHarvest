
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
    //todo - need to remove old quest items in the hive from the count
    
    // determine quantity of each item = itemQuantity 
    // Math.floor(Math.random() * 10) + 1;
    
    // // level =5 // testing 
    
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
    
    let message = 'collect: ';
    for (const [questItem, questQuantity] of Object.entries(quest.itemRequirements)){
        message += `<li>${questQuantity} ${questItem}</li>`;
        totalItemsCount = parseInt(totalItemsCount) + parseInt(questQuantity);
    };
    
    document.querySelector('.quest-title').innerHTML = `Quest #${quest.level}:`;
    document.querySelector('.quest-description').innerHTML = message;
}

// check if quest is fufilled
function checkQuest(){
    const itemsCountingTowardsQuest = [];

    // for(const item of hiveInventory){
    for (const [index, item] of hiveInventory.entries()){
        // Item is not in quest requirements
        if(quest.itemRequirements[item.name] === undefined){ continue; }
        
        // Cant count item towards quest since already used
        if(item.cooking){ continue; }

        // The number of items counting towards the check are already greater than or equal to what the quest requires
        // ignores all extra items that match the quest.requirements
        if(itemsCountingTowardsQuest.filter(check => check.name === item.name).length >= quest.itemRequirements[item.name]){ continue; }

        // Conditions are all met for item to count towards quest
        itemsCountingTowardsQuest.push({index, item});
    }
    console.log(itemsCountingTowardsQuest)

    // Get the total number of items required for the quest
    const totalQuestItemsRequired = Object.values(quest.itemRequirements).reduce((acc, cur) => acc += cur, 0);

    // If the number of required items is the same as the eligible items in the inventory, the quest is completed
    const slots = document.querySelectorAll('.hiveSlot');
    if(itemsCountingTowardsQuest.length >= totalQuestItemsRequired){
        console.log('quest complete');

        // visually cooking
        for(const object of itemsCountingTowardsQuest){
            object.item.cooking = true;
            slots[object.index].classList.add('cooking');
        }

        completeQuest();
        // Check inventory in the case that the hive already contains the requiremnts for the next quest
        checkQuest();

        // cook 
        const lifespan = calculateRandomLifespan(itemsCountingTowardsQuest.length)
        setTimeout(createHoneycomb, lifespan, itemsCountingTowardsQuest);
        // createHoneycomb(itemsCountingTowardsQuest);
    }
}

// win quest
function completeQuest(){
    questcount++;
    level++;
    quest.level++;
    totalItemsCount = 0;
    createQuest();
    // spawnRandom(level, 'bee', hive);

    //todo - need better / more obvious win screen
}

function createHoneycomb(items){
    //remove items / ingredients
    const slots = document.querySelectorAll('.hiveSlot');
    for(const item of items){
        item.item.cooking = true;
        slots[item.index].firstChild.remove();
        slots[item.index].classList.add('empty');
        slots[item.index].classList.remove('cooking');
        hiveInventory.space += items.length;
    }
    // make honey
    addItemToLocationInventory(honeycombClusterImage, 'honeycombInv');
}

function calculateRandomLifespan(quantity){
    console.log(quantity)
    // more items will take longer

    return Math.floor(Math.random() * 60000) + 1000;
}
