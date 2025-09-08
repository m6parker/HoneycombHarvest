
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

let honeycombIngredients = [];
let hiveItems;
let hiveQuantity;
// check if quest is fufilled
function checkQuest(){
    // console.log(hiveInventory)
    // console.log("items", items)
    // console.log("hive inventory", hiveInventory)
    // check hiveinventory everytime item is added
    // check how many items it has of each 
    // remove from available quest requirements
    
    // {'sunflower': 2, "pink': 3}
    const questProgress = [];
    // for (const [questItem, questQuantity] of Object.entries(quest.itemRequirements)) {
    //     // if the hive contains any quest items
    //     // hiveItems = hiveInventory.filter(item => item.name === questItem);
    //     // hiveQuantity = hiveItems.length;

    //     HiveYamom.push(hiveInventory.filter(item => item.name === questItem && !item.cooking).length >= questQuantity);
    // }

    for(const inventoryItem of hiveInventory){
        if(Number.isNaN(quest.itemRequirements[inventoryItem.name])){ continue; } // Quest doesnt require this item

        // if(questProgress.filter(progressItem => progressItem.name)){ continue; }
        


        // if(questProgress.filter(checkItem => checkItem.name === inventoryItem.name && !inventoryItem.cooking).length >= quest.itemRequirements[inventoryItem.name]){ continue; }

        // if(quest.itemRequirements[inventoryItem.name] !== undefined){ questProgress.push(inventoryItem); }
        
    }

    // console.log('checking if requirements are false', questProgress);
    

    
    // console.log("hiveQuantity", hiveQuantity)
    
    // console.log(item.name, ": ", itemCount)
    /*
    honeycombIngredients = [
        "sunflower" : 0.5,    
        "sunflower" : 0.2,    
        "sunflower" : 0.99,
        "pumpkin" : 0.5,    
        ]
        */
       
       // console.log()
       // honeycombIngredients = hiveItems;
       
    if(questProgress.length === totalItemsCount){ // quest complete
        console.log('***** quest fufilled. *****');

        for(const item of questProgress){ item.cooking = true; }
        completeQuest();
        // Start hoeycomb Timer

        // hiveInventory.forEach(item => {

        //     ingredient = quest.itemRequirements.filter(questItem => questItem.name === item.name );
        //     honeycombIngredients.push(ingredient)
        // });
    }
}

// win quest
function completeQuest(){
    questcount++;
    level++;
    quest.level++;
    totalItemsCount = 0;
    // honeycombIngredients = [];
    createQuest();
    // document.querySelector('.quest-description').innerHTML = 'quest completed!';
    // document.querySelector('.quest-button').removeAttribute('disabled');
    // document.querySelector('.quest-title').innerHTML = `Quest #${questcount}:`;
    // createQuest();
    // spawnRandom(level, 'bee', hive);

    //todo - need better / more obvious win screen
}
