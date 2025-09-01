const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

// canvas.width = 1024;
// canvas.height = 576;
// canvas.width = 1280;
// canvas.height = 960;
const ResizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // if(window.innerWidth > STATIC_PAGE_WIDTH){ STATIC_PAGE_WIDTH = window.innerWidth; }
    // if(window.innerHeight > STATIC_PAGE_HEIGHT){ STATIC_PAGE_HEIGHT = window.innerHeight; }
};
ResizeCanvas();

window.addEventListener("resize", () => ResizeCanvas());

let offsetX = 0, offsetY = 0;

context.fillStyle = 'black';
context.fillRect(0,0,canvas.width,canvas.height);


// x, y, length, height
// let flowerGarden = [1350, -100, 650, 200];
let flowerGarden = [2650, 850, 650, 200];
let veggieGarden = [2060, 1160, 300, 250];
let pumpkinPatch = [3675, 1555, 800, 300]
let honeycomb = [-200, -200, 130, 130];
let speed = 20;
// let inventoryItems = [];
//inventory items
let pinkCount = 0;
let suncount = 0;
let carrotCount = 0;
pumpkinCount = 0;

let level = 1; 
let inventorySpace = 14;
let hiveSpace = 24;
let greenhouseSpace = 36;
let boxSpace = 18;


// Sprites

const background = new Sprite({
    position:{
        x: -500,
        y: -500
    },
    image: mapImage
});

const beeSprite = new Sprite({
    position: {
        x: canvas.width/2,
        y: canvas.height/3.5
    },
    image: beeImage,
    width: 16,
    height: 16,
    space: inventorySpace
});

const hiveSprite = new Sprite({
    position:{
        x: 1225,
        y: 820
    },
    image: hiveImage,
    width: 100,
    height: 100,
    name: 'beehive',
    selected: false,
    selectedImg: selectedHiveImage,
    space: hiveSpace
});

const greenhouseSprite = new Sprite({
    position:{
        x: 5030,
        y: 1050
    },
    image: greenhouseImage,
    width: 400,
    height: 400,
    name: 'greenhouse',
    selected: false,
    selectedImg: selectedGreenhouseImage,
    space: greenhouseSpace
});

const boxSprite = new Sprite({
    position:{
        x: 3613,
        y: 3730
    },
    image: box,
    width: 64,
    height: 64,
    name: 'box',
    selected: false,
    selectedImg: selectedbox,
    space: boxSpace
});

const buyBoxSprite = new Sprite({
    position:{
        x: 3700,
        y: 3730
    },
    image: buybox,
    width: 64,
    height: 64,
    name: 'buybox',
    selected: false,
    selectedImg: selectedbuybox,
    space: boxSpace
});

let cameraOffset = { x: 0, y: 0 };
let mouseX = 0, mouseY = 0;
let worldX = 0, worldY = 0;
const mouseLocation = { x: 0, y: 0};

const movables = [background, hiveSprite, ...items, greenhouseSprite, boxSprite, buyBoxSprite]; // sprites
const moveableBoundaries = [flowerGarden, veggieGarden, honeycomb]; // images
const selectables = [hiveSprite, greenhouseSprite, boxSprite, buyBoxSprite]; // sprites only rn
function animate(){
    window.requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    //testing
    // context.fillStyle = 'green';
    // context.fillRect(0, 0, 10, 10);
    // add images
    background.draw();
    hiveSprite.draw();
    greenhouseSprite.draw();
    boxSprite.draw();
    buyBoxSprite.draw();
    beeSprite.draw();
    // add items
    items.forEach(item => item.draw());
    
    
    // TESTING
    // drawGrid(context, canvas, 50, 'rgba(200, 200, 200, 0.5)');
    // context.fillStyle = 'red';
    // context.fillRect(mouseLocation.x - 5, mouseLocation.y - 5, 10, 10);
    // console.log(mouseX, mouseY)


    // Check collisions
    // if (inGarden(flowerGarden)) console.log('Bee is in flower garden!');
    // if (inGarden(veggieGarden)) console.log('Bee is in veggie garden!');
    // if (onSprite(hiveSprite)) console.log('Bee is in the hive!');

    // context.strokeStyle = 'blue';
    // context.strokeRect(flowerGarden[0], flowerGarden[1], flowerGarden[2], flowerGarden[3]);
    // context.strokeRect(veggieGarden[0], veggieGarden[1], veggieGarden[2], veggieGarden[3]);
    // context.strokeRect(honeycomb[0], honeycomb[1], honeycomb[2], honeycomb[3]);

    // move background + stagnant objects when bee moves
    if(keys.w.pressed){
        movables.forEach(movable => { movable.position.y += speed });
        moveableBoundaries.forEach(coordinate => { coordinate[1] += speed });
        cameraOffset.y -= speed;
        hideAll(); // close any open inventories
    }
    else if(keys.a.pressed){
        movables.forEach(movable => { movable.position.x += speed });
        moveableBoundaries.forEach(coordinate => { coordinate[0] += speed });
        cameraOffset.x -= speed;
        hideAll();
    }
    else if(keys.s.pressed){
        movables.forEach(movable => { movable.position.y -= speed });
        moveableBoundaries.forEach(coordinate => { coordinate[1] -= speed });
        cameraOffset.y += speed;
        hideAll();
    }
    else if(keys.d.pressed){
        movables.forEach(movable => { movable.position.x -= speed });
        moveableBoundaries.forEach(coordinate => { coordinate[0] -= speed });
        cameraOffset.x += speed;
        hideAll();
    }

    //collecting items, removing image from canvas
    for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        // if bee collides with item and has space to carry it
        if (onSprite(item) && beeSprite.space) {
            items.splice(i, 1);
            const indexInMovables = movables.indexOf(item);
            if (indexInMovables !== -1) {
                movables.splice(indexInMovables, 1);
            }
            // console.log(`${item.name} collected!`);
            addToInventory(item.name);
            if(item.name === 'sunflower'){ suncount++; }
            if(item.name === 'pinkflower'){ pinkCount++; }
            // if(itemName === 'carrot'){ carrotCount++; }
            if(item.name === 'pumpkin'){ pumpkinCount++; }
        }
    }
    
}
animate();


document.addEventListener('mousemove', (e) => {
    mouseLocation.x = e.clientX;
    mouseLocation.y = e.clientY;

    //hover sprites       
    selectables.forEach(movable => {
        if(
            mouseLocation.x >= movable.position.x &&
            mouseLocation.x <= movable.position.x + movable.width &&
            mouseLocation.y >= movable.position.y &&
            mouseLocation.y <= movable.position.y + movable.height
        ){
            canvas.style.cursor = 'pointer';
        }
    });
});


canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;
    //testing
    // console.log(mouseLocation.x, mouseLocation.y)
    console.log(cameraOffset.x + mouseLocation.x, cameraOffset.y + mouseLocation.y) // sprite coords
    
    // clicking sprites
    selectables.forEach(movable => {
        if (
            mouseLocation.x >= movable.position.x &&
            mouseLocation.x <= movable.position.x + movable.width &&
            mouseLocation.y >= movable.position.y &&
            mouseLocation.y <= movable.position.y + movable.height
        ) {
            console.log(`CLICKED ${JSON.stringify(movable.name)}`);

            movable.selected = movable.selected ? false : true;
            movable.selectSprite();

        }
    });
});



// ----------------- buttons -------------------
const greenhouseContainer = document.querySelector('.greenhouse-container');
const hiveInvenotryContainer = document.querySelector('.hive-inventory-container');
const boxContainer = document.querySelector('.box-container');
const sellButton = document.querySelector('.sell-button');

const playButton = document.querySelector('.play-button');
const backdrop = document.querySelector('.backdrop');
const startGamePanel = document.querySelector('.start-game-panel');
playButton.addEventListener('click', () => {
    backdrop.classList.add('hidden');
    startGamePanel.classList.add('hidden');
});

sellButton.addEventListener('click', () => {
    console.log('todo sell you thingies');
});

// todo - limit inventory
// drop inventory
const dropButton = document.querySelector('.drop-button');
dropButton.addEventListener('click', () => {
    if(onSprite(hiveSprite) && hiveSpace.space){
        if(checkQuest(quest, pinkCount, suncount)){
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

function hideAll(){
    hiveInvenotryContainer.classList.add('hidden');
    greenhouseContainer.classList.add('hidden');
    boxContainer.classList.add('hidden');

    selectables.forEach(sprite => {
        sprite.closeInventory(sprite);
    });
}

// close hive
const closeButtons = document.querySelectorAll('.close-button');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        hideAll();
    });
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
    const quest = createQuest();
    questButton.disabled = true;
});


