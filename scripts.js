

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

canvas.width = 1024;
canvas.height = 576;

context.fillStyle = 'black';
context.fillRect(100,100,canvas.width,canvas.height);

//garden map
const map = new Image();
map.src = 'img/tilemapExpanded.png';
//bee player
const beeImage = new Image();
beeImage.src = 'img/bee.png';
//beehive spawnpoint
const hive = new Image();
hive.src = 'img/beehive.png';
// flowers
const sunflowerImage = new Image();
sunflowerImage.src = 'img/sunflower.png';
const pinkFlowerImage = new Image();
pinkFlowerImage.src = 'img/pinkflower.png';
const carrotImage = new Image();
carrotImage.src = 'img/carrot.png';


// x, y, length, height
let flowerGarden = [750, 100, 850, 200];
let veggieGarden = [650, 500, 500, 350];
let honeycomb = [-200, -200, 130, 130];
let speed = 10;
// let inventoryItems = [];
//inventory items
let pinkCount = 0;
let suncount = 0;
let carrotCount = 0;

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
    image: beeImage,
    width: 16,
    height: 16
});

const hiveSprite = new Sprite({
    position:{
        x: -200,
        y: -200
    },
    image: hive,
    width: 100,
    height: 100
});

// const sunflower = new Sprite({
//     position:{
//         x: 450,
//         y: 250
//     },
//     image: sunflowerImage
// });

//--------------- movement ----------------- //


const items = [];
function spawnItems(itemImage, quantity, location){
    if(itemImage === beeImage){  }
    for (let i = 0; i < quantity; i++) {
        const item = spawnRandom(location, itemImage);
        items.push(item);
        movables.push(item);
    }
}


//TESTING
function drawGrid(context, canvas, cellSize = 50, color = 'rgba(200, 200, 200, 0.5)') {
    context.strokeStyle = color;
    context.lineWidth = 0.5;
    
    // Draw vertical lines
    for (let x = 0; x < canvas.width; x += cellSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y < canvas.height; y += cellSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
    }
    
    // Draw coordinate labels (optional)
    context.fillStyle = 'black';
    context.font = '10px Arial';
    for (let x = 0; x < canvas.width; x += cellSize) {
        context.fillText(x, x, 10);
    }
    for (let y = 0; y < canvas.height; y += cellSize) {
        context.fillText(y, 0, y + 10);
    }
}

const keys = {
    w: { pressed: false},
    a: { pressed: false},
    s: { pressed: false},
    d: { pressed: false}
}

const movables = [background, hiveSprite]; // sprites
const moveableBoundaries = [flowerGarden, veggieGarden, honeycomb] // images

function animate(){
    window.requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    hiveSprite.draw();
    beeSprite.draw();
    // sunflower.draw();

    items.forEach(item => item.draw());

    //testing
    drawGrid(context, canvas, 50, 'rgba(200, 200, 200, 0.5)');

    // Check collisions
    // if (inGarden(flowerGarden)) console.log('Bee is in flower garden!');
    // if (inGarden(veggieGarden)) console.log('Bee is in veggie garden!');
    // if (inSprite(hiveSprite)) console.log('Bee is in the hive!');

    // testing
    context.strokeStyle = 'blue';
    context.strokeRect(flowerGarden[0], flowerGarden[1], flowerGarden[2], flowerGarden[3]);
    context.strokeRect(veggieGarden[0], veggieGarden[1], veggieGarden[2], veggieGarden[3]);
    context.strokeRect(honeycomb[0], honeycomb[1], honeycomb[2], honeycomb[3]);

    // console.log(inGarden(veggieGarden))

    
    if(keys.w.pressed){
        movables.forEach(movable => { movable.position.y += speed });
        moveableBoundaries.forEach(coordinate => { coordinate[1] += speed });
    }
    else if(keys.a.pressed){
        movables.forEach(movable => { movable.position.x += speed });
        moveableBoundaries.forEach(coordinate => { coordinate[0] += speed });
    }
    else if(keys.s.pressed){
        movables.forEach(movable => { movable.position.y -= speed });
        moveableBoundaries.forEach(coordinate => { coordinate[1] -= speed });
    }
    else if(keys.d.pressed){
        movables.forEach(movable => { movable.position.x -= speed });
        moveableBoundaries.forEach(coordinate => { coordinate[0] -= speed });
    }

    //collecting items, removing image from canvas
    for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        if (inSprite(item) && inventorySpace) {
            items.splice(i, 1);
            const indexInMovables = movables.indexOf(item);
            if (indexInMovables !== -1) {
                movables.splice(indexInMovables, 1);
            }
            const itemName = ((item.image.src).split('/').pop()).split('.').slice(0, -1).join('');
            console.log(`${itemName} collected!`);
            // get the name of the item from the image path 
            // todo - make this not so stupid
            addToInventory(itemName);
            if(itemName === 'sunflower'){ suncount++; }
            if(itemName === 'pinkflower'){ pinkCount++; }
            if(itemName === 'count'){ carrot++; }
        }
    }

}
animate();

// if bee is in another sprite such as the hive
function inSprite(sprite){
    return (
        beeSprite.position.x + beeSprite.width >= sprite.position.x  &&
        beeSprite.position.x <= sprite.position.x + sprite.width     &&
        beeSprite.position.y <= sprite.position.y + sprite.height    &&
        beeSprite.position.y + beeSprite.height >= sprite.position.y 
    );
}

// if bee is in a certain location in the canvas such as a garden 
function inGarden(gardenBounds){
    return (
        beeSprite.position.x + beeSprite.width >= gardenBounds[0] &&
        beeSprite.position.x <= gardenBounds[0] + gardenBounds[2] &&
        beeSprite.position.y <= gardenBounds[1] + gardenBounds[3] &&
        beeSprite.position.y + beeSprite.height >= gardenBounds[1]
    );
}


function spawnRandom(gardenBounds, flowerImage) {
    const x = gardenBounds[0] + Math.random() * (gardenBounds[2] - 30);
    const y = gardenBounds[1] + Math.random() * (gardenBounds[3] - 30);

    const flower = new Sprite({
        position: { x, y },
        image: flowerImage,
        width: 30,
        height: 30
    });

    return flower;
}


// movement

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
            background.position.y -= speed;
            keys.w.pressed = true;
            break;
        case 'ArrowDown':
            background.position.y += speed;
            keys.s.pressed = true;
            break;
        case 'ArrowLeft':
            background.position.x -= speed;
            keys.a.pressed = true;
            break;
        case 'ArrowRight':
            background.position.x += speed;
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
            inventorySpace--;
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

let pinkGoal = 0;
let sunGoal = 0;
let carrotGoal = 0;
let questcount = 1;
// give a random quest
function createQuest(){
    pinkGoal = Math.floor(Math.random() * 10) + 1;
    sunGoal = Math.floor(Math.random() * 3) + 1;
    document.querySelector('.quest-description').innerHTML = `collect ${pinkGoal} pink flowers and ${sunGoal} sunflowers.`;
}

// check if quest is fufilled
function checkQuest(pinkCount, suncount){
    console.log(pinkCount, suncount)
    if(
        pinkCount >= pinkGoal && 
        suncount >= sunGoal   &&
        carrotCount >= carrotGoal
    ){
        completeQuest();
        return true;
    }else{
        console.log('missing items')
        return false;
    }
}

// win quest
function completeQuest(){
    emptyInventory();
    questcount++;
    level++;
    document.querySelector('.quest-description').innerHTML = 'quest completed!';
    document.querySelector('.quest-button').removeAttribute('disabled');
    // document.querySelector('.quest-title').innerHTML = `Quest #${questcount}:`;
    // createQuest();
    // spawnRandom(level, 'bee', hive);

    //todo - need better / more obvious win screen
}

// -------------- start game ------------- //


// todo - level defines how many drones you have and the wieght you can carry back
let level = 1; 
let inventorySpace = 14;
createInventorySlots(inventorySpace);
createQuest();

//put flowers in the garden
spawnItems(sunflowerImage, 10, flowerGarden);
spawnItems(pinkFlowerImage, 10, flowerGarden);
spawnItems(carrotImage, 20, veggieGarden);

// put drones in hive
function callSpawn(){
    // put drones in the hive
    spawnItems(beeImage, level, honeycomb)
}
//bees buzzing
setInterval(callSpawn, 1000);

// todo:
// drawHive()
// spawnRandom(level, drones, hive)
// spawnRandom(level, enemy, garden)

// collision enemies - takeDamage()


// ----------------- buttons -------------------

// todo - limit inventory
// drop inventory
const dropButton = document.querySelector('.drop-button');
dropButton.addEventListener('click', () => {
    if(inSprite(hiveSprite)){
        if(checkQuest(pinkCount, suncount)){
            // emptyInventory();
    
            //reset variables
            pinkCount = 0;
            suncount = 0;
            inventorySpace = 14;
        }
    }

    // spawnRandom(pinkCount, 'pinkflower', garden);
    // spawnRandom(suncount, 'sunflower', garden);
    // spawnRandom([500,250,200,200], pinkFlowerImage) // todo drop items being held
});

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

const questButton = document.querySelector('.quest-button')
questButton.addEventListener('click', () => {
    createQuest();
    questButton.disabled = true;
});


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