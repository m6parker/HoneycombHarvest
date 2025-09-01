
//create inventory slots
function createInventorySlots(size){
    for(let i = 0; i < size; i++){
        const slot = document.createElement('div');
        slot.className = 'itemSlot';
        slot.classList.add('empty');
        document.querySelector('.inventory').appendChild(slot);
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
function emptyInventory(item, quantity){
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

// inventory update UI
function resetCurrentInventoryUI(){
    currentInventory.forEach(item => {
        addToInventory(item.name);
    });
}

//removes one item at a time
function removeFromInventory(itemName){
    // const slots = document.querySelectorAll('.itemSlot');
    const itemToRemove = (item) => item.name === itemName;
    console.log(currentInventory.findIndex(itemToRemove));
    console.log(currentInventory.indexOf(itemToRemove));

    currentInventory.splice(currentInventory.indexOf(itemToRemove), 1);
    console.log(currentInventory)

    // update ui
    //reflect currentInventpry updated
}



// ---------------------------- hive inventory ----------------------------
function createHiveInventorySlots(size){
    for(let i = 0; i < size; i++){
        const slot = document.createElement('div');
        slot.className = 'hiveSlot';
        slot.classList.add('empty');
        document.querySelector('.hive-inventory').appendChild(slot);
    }
}

//individual items into hive
function addItemToHive(item){
    const slots = document.querySelectorAll('.hiveSlot');
    let itemImage = document.createElement('img');
    item.className = `inv-${item.name}`;
    itemImage.src = item.src
    for(let i = 0; i < slots.length; i++){
        if(slots[i].classList.contains('empty')){
            slots[i].appendChild(itemImage);
            slots[i].classList.remove('empty');
            hiveInventory.push(Object.assign({}, {name:item.name, src:item.src}));
            break;
        }
    };
    hiveSpace--;
}

function addAllToHive(){
    const slots = document.querySelectorAll('.hiveSlot');
    currentInventory.forEach(item => {
        let itemImage = document.createElement('img');
        item.className = `inv-${item.name}`;
        itemImage.src = item.src
        for(let i = 0; i < slots.length; i++){
            if(slots[i].classList.contains('empty')){
                
                slots[i].appendChild(itemImage);
                slots[i].classList.remove('empty');
                
                // currentInventory.pop(item);
                hiveInventory.push(Object.assign({}, {name:item.name, src:item.src}));
                // removeFromInventory(item.name);
                break;
            }
        };
    });
}

// ---------------------------- greenhouse inventory ----------------------------

function createGreenhouseInventorySlots(size){
    for(let i = 0; i < size; i++){
        const slot = document.createElement('div');
        slot.className = 'greenhouseSlot';
        slot.classList.add('empty');
        document.querySelector('.greenhouse').appendChild(slot);
    }
}

function addToGreenHouse(){
    const slots = document.querySelectorAll('.greenhouseSlot');
    // let item = document.createElement('img');
    currentInventory.forEach(itemType => {
        // item = itemType;
        itemType.className = `inv-${itemType}`;
        for(let i = 0; i < slots.length; i++){
            if(slots[i].classList.contains('empty')){
                // hiveSpace--;
                slots[i].appendChild(itemType);
                slots[i].classList.remove('empty');
                inventorySpace--;
                break;
            }
        };
    });
    greenhouseInvenotry = currentInventory;
    currentInventory = [];
}
