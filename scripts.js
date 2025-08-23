

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillStyle = 'black';
context.fillRect(100,100,canvas.width,canvas.height);

//garden map
const map = new Image();
map.src = 'img/tilemapExpanded.png';
//bee player
const bee = new Image();
bee.src = 'img/bee.png';
//beehive spawnpoint
const hive = new Image();
hive.src = 'img/hive.png';
//wall
// const wall = new Image();
// wall.src = 'img/heart.png';

class Sprite{
    constructor({position, image, height, width}){
        this.position = position;
        this.image = image;
        this.height = height;
        this.width = width;
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
        x: canvas.width/2,
        y: canvas.height/2.5
    },
    image: bee,
    width: 16,
    height: 16
});

const hiveSprite = new Sprite({
    position:{
        x: -300,
        y: -300
    },
    image: hive,
    width: 380,
    height: 350
});

// const wallSprite = new Sprite({
//     position:{
//         x: -500,
//         y: -500
//     },
//     image: wall
// });

//--------------- movement ----------------- //

const movables = [background, hiveSprite]//, wallSprite];

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
    hiveSprite.draw();
    beeSprite.draw();
    // wallSprite.draw();
    

    // TESTings
    // context.strokeStyle = 'blue';
    // context.strokeRect(
    //     hiveSprite.position.x+80,
    //     hiveSprite.position.y+50,
    //     hiveSprite.width,
    //     hiveSprite.height
    // );

    //collision
    inHive(hiveSprite)
    
    if(keys.w.pressed){
        movables.forEach(movable => { movable.position.y += 20 });
    }
    else if(keys.a.pressed){
        movables.forEach(movable => { movable.position.x += 20 });
    }
    else if(keys.s.pressed){
        movables.forEach(movable => { movable.position.y -= 20 });
    }
    else if(keys.d.pressed){
        movables.forEach(movable => { movable.position.x -= 20 });
    }

}
animate();

function inHive(sprite){
    if(
        beeSprite.position.x + beeSprite.width >= sprite.position.x   &&
        beeSprite.position.x <= sprite.position.x + sprite.width  &&
        beeSprite.position.y <= sprite.position.y + sprite.height &&
        beeSprite.position.y + beeSprite.height >= sprite.position.y 
    ){
        return true;
    }else{
        return false;
    }
}

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
            background.position.y -= 20;
            keys.w.pressed = true;
            break;
        case 'ArrowDown':
            background.position.y += 20;
            keys.s.pressed = true;
            break;
        case 'ArrowLeft':
            background.position.x -= 20;
            keys.a.pressed = true;
            break;
        case 'ArrowRight':
            background.position.x += 20;
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


// ------------ quests -------------------------

let pinkGoal;
let sunGoal;
// give a random quest
function createQuest(){
    pinkGoal = Math.floor(Math.random() * 10) + 1;
    sunGoal = Math.floor(Math.random() * 3) + 1;
    document.querySelector('.quest-description').innerHTML = `collect ${pinkGoal} pink flowers and ${sunGoal} sunflowers.`;
}

// check if quest is fufilled
// function checkQuest(pinkGoal, sunGoal){
//     if(pinkcount >= pinkGoal && suncount >= sunGoal){
//         completeQuest();
//     }
// }

// win quest
// function completeQuest(){
//     questcount++;
//     level++;
//     document.querySelector('.quest-description').innerHTML = 'you win';
//     document.querySelector('.quest-title').innerHTML = `Quest #${questcount}:`;
//     createQuest();
//     spawnRandom(level, 'bee', hive);

//     //todo - need better / more obvious win screen
// }

// -------------- start game ------------- //

let level = 1;
let inventorySpace = 14;
createInventorySlots(inventorySpace);
createQuest();

// todo:
// drawHive()
// spawnRandom(10, flowers, garden)
// spawnRandom(level, drones, hive)
// spawnRandom(level, enemy, garden)

// collision map - create in Tiled
// collision items - addToInventory()
// collision enemies - takeDamage()


// ----------------- buttons -------------------

// todo - limit inventory
// drop inventory
// const dropButton = document.querySelector('.drop-button');
// dropButton.addEventListener('click', () => {
//     emptyInventory();
//     spawnRandom(pinkcount, 'pinkflower', garden);
//     spawnRandom(suncount, 'sunflower', garden);

//     //reset variables
//     pinkcount = 0;
//     suncount = 0;
//     space = 1;
// });

// const pauseScreen = document.querySelector('.pause-container');
const pauseButton = document.querySelector('.pause-button');
pauseButton.addEventListener('click', () => {
    // pauseScreen.classList.toggle('hidden');
    pauseButton.classList.add('active');
    stopTimer();
});

// todo - pause banner instead of resume button
// todo - stop all movement
const resumeButton = document.querySelector('.resume-button');
resumeButton.addEventListener('click', () => {
    pauseButton.classList.remove('active');
    startTimer();
});

// const reloadButton = document.querySelector('.play-button');
// reloadButton.addEventListener('click', () =>{
//     location.reload();
// });


// ---------------- timer ----------------------

let startTime;
let timerInterval;
let elapsedTime = 0;
const timerDisplay = document.querySelector('.timer');

startTimer();

function formatTime(ms) {
    let date = new Date(ms);
    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function() {
        elapsedTime = Date.now() - startTime;
        timerDisplay.textContent = formatTime(elapsedTime);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timerDisplay.textContent = '00:00:00';
}