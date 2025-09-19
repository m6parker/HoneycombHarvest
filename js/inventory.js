class Inventory{
    constructor(name, size, canAdd=true, items, shape='square'){
        this.name = name;
        this.size = size;
        this.shape = shape;
        this.canAdd = canAdd;
        this.items = items;

        //store items

        this.createInventorySlots(this.size, this.name, this.shape);

        // click each item in bee inventory to other inventories
        const slots = document.querySelectorAll('.beeSlot');
        slots.forEach(slot => {
            slot.addEventListener('click', ()=> {
                selectables.forEach(location => {
                    if(location.selected){
                        this.moveItem(slot, location);

                        // everytime an item is placed in the hive, check the quest status
                        if(location === hiveSprite){
                            checkQuest();
                        }
                    }
                });
            })
        });
    }

    
    // creates all inventory grids ui
    createInventorySlots(size, location, shape){
        for(let i = 0; i < size; i++){
            const slot = document.createElement('div');
            slot.className = `${location}Slot`;
            slot.classList.add('empty');
            if(shape==='hexagon'){slot.classList.add('hexagon')}
            document.querySelector(`.${location}-inventory`).appendChild(slot);
        }
    }

    // item from bee inventory to location inv
    moveItem(slot, location){
        for (const [index, item] of player.inventory.items.entries()) {
            if(slot.firstChild && item.src === slot.firstChild.src){
                if(location.space){
                    player.inventory.items.splice(index, 1);
                    // ui
                    this.addItemToLocationInventory(item, location); // pass in location to reuse for other inv
                    slot.firstChild.remove()
                    slot.classList.add('empty');
                    player.sprite.space++;
                }
                break;
            }
        }
    }

    // place item back into bee
    takeItem(slot, location, inventory){
        for (const [index, item] of inventory.entries()) {
            if(slot.firstChild && item.src === slot.firstChild.src){
                if(player.sprite.space){
                    // ui
                    this.addToInventory(item.name); // pass in bee 
                    slot.firstChild.remove()
                    slot.classList.add('empty');
                    location.space++;
                }
                break;
            }
        }
    }
    
    // pace in inventory
    addToInventory(itemType, itemQuality){
        console.log(player.inventory)
        const slots = document.querySelectorAll('.beeSlot');
        const item = document.createElement('img');
        item.src = `img/${itemType}.png`;
        item.className = `inv-${itemType}`;
        for(let i = 0; i < slots.length; i++){
            if(slots[i].classList.contains('empty')){
                slots[i].appendChild(item);
                slots[i].classList.remove('empty');
                player.inventory.items.push(Object.assign({}, {name:itemType, src:item.src, quality:itemQuality}));
                break;
            }
        };
        player.sprite.space--;
    }
    
    //empty inventory
    emptyInventory(){
        const slots = document.querySelectorAll('.beeSlot');
        slots.forEach(slot => {
            while(slot.firstChild){ 
                slot.removeChild(slot.firstChild); }
        });
    
        //all slots usable again
        for(let i = 0; i < slots.length; i++){
            slots[i].classList.add('empty');
        }
    
        player.inventory.items = [];
        // resetCurrentInventory();
    }

    //individual items into open invenory
    addItemToLocationInventory(item, location){
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
            case 'honeycombInv': {
                slots = document.querySelectorAll('.honeycombSlot');
                inventory = honeycombInventory
                break;
            }
            default: { // put in bee
                slots = document.querySelectorAll('.beeSlot'); 
                inventory = player.inventory.items;
            }
        }
        
        let itemImage = document.createElement('img');
        item.className = `inv-${item.name}`;
        itemImage.src = item.src
        for(let i = 0; i < slots.length; i++){
            if(slots[i].classList.contains('empty')){
                slots[i].appendChild(itemImage);
                slots[i].classList.remove('empty');
                inventory.push(Object.assign({}, {name:item.name, src:item.src, quality:item.quality}));
                break;
            }
        };
        location.space--;
    }

}
