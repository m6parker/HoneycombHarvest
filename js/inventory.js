
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
            currentInventory.push(item);
            inventorySpace--;
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

function addToHive(){
    const slots = document.querySelectorAll('.hiveSlot');
    // let item = document.createElement('img');
    currentInventory.forEach(itemType => {
        // item = itemType;
        itemType.className = `inv-${itemType}`;
        for(let i = 0; i < slots.length; i++){
            if(slots[i].classList.contains('empty')){
                hiveSpace--;
                slots[i].appendChild(itemType);
                slots[i].classList.remove('empty');
                inventorySpace--;
                break;
            }
        };
    });
    hiveInvenotry = currentInventory;
    currentInventory = [];
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
                hiveSpace--;
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
