// put item in oprn inventory
function moveItem(slot, location){
    for (const [index, item] of currentInventory.entries()) {
        // console.log(`Index: ${index}, Value: ${item.name}`);
        if(slot.firstChild && item.src === slot.firstChild.src){
            
            if(location.space){
                currentInventory.splice(index, 1);
                // ui
                addItemToLocationInventory(item, location); // pass in location to reuse for other inv
                slot.firstChild.remove()
                slot.classList.add('empty');
                inventorySpace++;
            }
            break;
        }
    }
}

function takeItem(slot, slots){
    for (const [index, item] of slots.entries()) {
        if(slot.firstChild && item.src === slot.firstChild.src){
            if(beeSprite.space){
                slots.splice(index, 1);
                // ui
                addToInventory(item.name); // pass in bee 
                slot.firstChild.remove()
                slot.classList.add('empty');
                inventorySpace--;
                // hivespace++; // switch for each inv
            }
            break;
        }
    }
}


// pace in inventory
function addToInventory(itemType){
    const slots = document.querySelectorAll('.itemSlot');
    const item = document.createElement('img');
    item.src = `img/${itemType}.png`;
    item.className = `inv-${itemType}`;
    for(let i = 0; i < slots.length; i++){
        if(slots[i].classList.contains('empty')){
            slots[i].appendChild(item);
            slots[i].classList.remove('empty');
            // currentInventory.push(item);

            currentInventory.push(Object.assign({}, {name:itemType, src:item.src}));
            break;
        }
    };
    console.log('currentInventory: ', currentInventory)
}

//empty inventory
function emptyInventory(){
    const slots = document.querySelectorAll('.itemSlot');
    slots.forEach(slot => {
        while(slot.firstChild){ 
            slot.removeChild(slot.firstChild); }
    });

    //all slots usable again
    for(let i = 0; i < slots.length; i++){
        slots[i].classList.add('empty');
    }

    currentInventory = [];
    // resetCurrentInventory();
}

// creates all inventory grids ui
function createInventorySlots(size, location){
    let slotType, inventoryDiv;
    switch(location){
        case 'hive': { 
            slotType = 'hiveSlot';
            inventoryDiv = '.hive-inventory';
            break;
        }
        case 'greenhouse': {
            slotType = 'greenhouseSlot';
            inventoryDiv = '.greenhouse';
            break; 
        }
        case 'box': {
            slotType = 'boxSlot';
            inventoryDiv = '.box';
            break;
        }
        case 'inventory': {
            slotType = 'itemSlot';
            inventoryDiv = '.inventory';
        }
    }
    for(let i = 0; i < size; i++){
        const slot = document.createElement('div');
        slot.className = slotType;
        slot.classList.add('empty');
        document.querySelector(inventoryDiv).appendChild(slot);
    }
}

//individual items into open invenory
function addItemToLocationInventory(item, location){
    let slots, inventory;
    switch(location){
        case hiveSprite: { 
            slots = document.querySelectorAll('.hiveSlot');
            inventory = hiveInventory;
            break;
        }
        case greenhouseSprite: {
            slots = document.querySelectorAll('.greenhouseSlot'); 
            inventory = greenhouseInvenotry;
            break; 
        }
        case boxSprite: {
            slots = document.querySelectorAll('.boxSlot');
            inventory = boxInventory
            break;
        }
        default: { // put in bee
            slots = document.querySelectorAll('.itemSlot'); 
            inventory = currentInventory;
        }
    }
    
    let itemImage = document.createElement('img');
    item.className = `inv-${item.name}`;
    itemImage.src = item.src
    for(let i = 0; i < slots.length; i++){
        if(slots[i].classList.contains('empty')){
            slots[i].appendChild(itemImage);
            slots[i].classList.remove('empty');
            inventory.push(Object.assign({}, {name:item.name, src:item.src}));
            break;
        }
    };
    hiveSpace--;
}
