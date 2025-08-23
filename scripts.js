const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillStyle = 'black';
context.fillRect(100,100,canvas.width,canvas.height);

//garden map
const map = new Image();
map.src = 'img/gardenMap2.png';
//bee player
const bee = new Image();
bee.src = 'img/bee.png';

class Sprite{
    constructor({position, speed, image}){
        this.position = position;
        this.image = image;
    }

    draw(){
        context.drawImage(this.image,this.position.x, this.position.y);
    }
}

const background = new Sprite({
    position:{
        x: -500,
        y: -500
    },
    image: map
});


const beeSprite = new Sprite({
    position: {
        x: canvas.width/2 - bee.width/2,
        y: canvas.height/2 - bee.height/2
    },
    image: bee
});

//--------------- movement ----------------- //

const keys = {
    w: { pressed: false},
    a: { pressed: false},
    s: { pressed: false},
    d: { pressed: false}
}

function animate(){
    window.requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    beeSprite.draw();

    if(keys.w.pressed){background.position.y += 5}
    else if(keys.a.pressed){background.position.x += 5}
    else if(keys.s.pressed){background.position.y -= 5}
    else if(keys.d.pressed){background.position.x -= 5}
}
animate();

window.addEventListener('keydown', (e) => {
    // move the bee ten pixels depending on what key was pressed
    switch (e.key){
        case 'w':{keys.w.pressed = true; break;}
        case 'a':{keys.a.pressed = true; break;}
        case 's':{keys.s.pressed = true; break;}
        case 'd':{keys.d.pressed = true; break;}
    }
    switch(e.key){
        case 'ArrowUp':
            background.position.y -= 5;
            keys.w.pressed = true;
            break;
        case 'ArrowDown':
            background.position.y += 5;
            keys.s.pressed = true;
            break;
        case 'ArrowLeft':
            background.position.x -= 5;
            keys.a.pressed = true;
            break;
        case 'ArrowRight':
            background.position.x += 5;
            keys.d.pressed = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'w':{keys.w.pressed = false; break;}
        case 'a':{keys.a.pressed = false; break;}
        case 's':{keys.s.pressed = false; break;}
        case 'd':{keys.d.pressed = false; break;}
        case 'ArrowUp':{keys.w.pressed = false; break;}
        case 'ArrowLeft':{keys.a.pressed = false; break;}
        case 'ArrowDown':{keys.s.pressed = false; break;}
        case 'ArrowRight':{keys.d.pressed = false; break;}
    }
});

// ------------ inventory -------------------------

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
            space--;
            break;
        }
    };
}

//empty inventory
function emptyInventory(item, quantity){
    const slots = document.querySelectorAll('.itemSlot');
    slots.forEach(slot => {
        while(slot.firstChild){ slot.removeChild(slot.firstChild); }
    });

    //all slots usable again
    for(let i = 0; i < slots.length; i++){
        slots[i].classList.add('empty');
    }
}

// -------------- start game ------------- //

createInventorySlots(14);