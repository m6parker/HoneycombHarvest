
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
            inventorySpace--;
            break;
        }
    };
}

//empty inventory
let currentInventory = []
function emptyInventory(item, quantity){
    const slots = document.querySelectorAll('.itemSlot');
    slots.forEach(slot => {
        while(slot.firstChild){ currentInventory.push(slot.firstChild); slot.removeChild(slot.firstChild); }
    });

    //all slots usable again
    for(let i = 0; i < slots.length; i++){
        slots[i].classList.add('empty');
    }

    console.log(currentInventory)
}

//hive inventory 
function createHiveInventorySlots(size){
    for(let i = 0; i < size; i++){
        const slot = document.createElement('div');
        slot.className = 'itemSlot';
        slot.classList.add('empty');
        document.querySelector('.hive-inventory').appendChild(slot);
    }
}

function addToHive(itemType){
    const slots = document.querySelectorAll('.itemSlot');
    const item = document.createElement('img');
    item.src = `img/${itemType}.png`;
    item.className = `inv-${itemType}`;
    for(let i = 0; i < slots.length; i++){
        if(slots[i].classList.contains('empty')){
            slots[i].appendChild(item);
            slots[i].classList.remove('empty');
            inventorySpace--;
            break;
        }
    };
}


