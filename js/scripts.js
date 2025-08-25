

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

// canvas.width = 1024;
// canvas.height = 576;
canvas.width = 1280;
canvas.height = 960;

let offsetX = 0, offsetY = 0;

context.fillStyle = 'black';
context.fillRect(0,0,canvas.width,canvas.height);


// x, y, length, height
let flowerGarden = [1350, -100, 650, 200];
let veggieGarden = [800, 200, 300, 250];
let honeycomb = [-200, -200, 130, 130];
let speed = 10;
// let inventoryItems = [];
//inventory items
let pinkCount = 0;
let suncount = 0;
let carrotCount = 0;


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
        y: canvas.height/2.5
    },
    image: beeImage,
    width: 16,
    height: 16
});

const hiveSprite = new Sprite({
    position:{
        x: -100,
        y: -100
    },
    image: hiveImage,
    width: 100,
    height: 100
});

let cameraOffset = { x: 0, y: 0 };
let mouseX = 0, mouseY = 0;
let worldX = 0, worldY = 0;

const movables = [background, hiveSprite, ...items]; // sprites
const moveableBoundaries = [flowerGarden, veggieGarden, honeycomb] // images
function animate(){
    window.requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    //testing
    context.fillStyle = 'green';
    context.fillRect(0, 0, 10, 10);
    // add images
    background.draw();
    hiveSprite.draw();
    beeSprite.draw();
    // add items
    items.forEach(item => item.draw());
    
    
    // TESTING
    // drawGrid(context, canvas, 50, 'rgba(200, 200, 200, 0.5)');
    context.fillStyle = 'red';
    context.fillRect(worldX - 2, worldY - 2, 4, 4);
    console.log(mouseX, mouseY)


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
    }
    else if(keys.a.pressed){
        movables.forEach(movable => { movable.position.x += speed });
        moveableBoundaries.forEach(coordinate => { coordinate[0] += speed });
        cameraOffset.x -= speed;
    }
    else if(keys.s.pressed){
        movables.forEach(movable => { movable.position.y -= speed });
        moveableBoundaries.forEach(coordinate => { coordinate[1] -= speed });
        cameraOffset.y += speed;
    }
    else if(keys.d.pressed){
        movables.forEach(movable => { movable.position.x -= speed });
        moveableBoundaries.forEach(coordinate => { coordinate[0] -= speed });
        cameraOffset.x += speed;
    }

    //collecting items, removing image from canvas
    for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        // if bee collides with item and has space to carry it
        if (onSprite(item) && inventorySpace) {
            items.splice(i, 1);
            const indexInMovables = movables.indexOf(item);
            if (indexInMovables !== -1) {
                movables.splice(indexInMovables, 1);
            }
            // get the name of the item from the image path 
            // todo - make this not so stupid
            const itemName = ((item.image.src).split('/').pop()).split('.').slice(0, -1).join('');
            console.log(`${itemName} collected!`);
            addToInventory(itemName);
            if(itemName === 'sunflower'){ suncount++; }
            if(itemName === 'pinkflower'){ pinkCount++; }
            if(itemName === 'count'){ carrot++; }
        }
    }

}
animate();


canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;
    worldX = screenX + cameraOffset.x;
    worldY = screenY + cameraOffset.y;
});

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;
    worldX = screenX + cameraOffset.x;
    worldY = screenY + cameraOffset.y;

    console.log("Screen Mouse:", screenX, screenY);
    console.log("Camera Offset:", cameraOffset.x, cameraOffset.y);
    console.log("World Mouse:", worldX, worldY);

    // clicking items
    items.forEach(item => {
        if (
            worldX >= item.position.x &&
            worldX <= item.position.x + item.width &&
            worldY >= item.position.y &&
            worldY <= item.position.y + item.height
        ) {
            console.log(`${item} CLICKED`);
            // Handle item click logic here
        }
    });

    // clicking sprites
    movables.forEach(movable => {
        if (
            worldX >= movable.position.x &&
            worldX <= movable.position.x + movable.width &&
            worldY >= movable.position.y &&
            worldY <= movable.position.y + movable.height
        ) {
            console.log(`${movable} CLICKED`);
            // Handle movable click logic here
        }
    });
});





// function clickedSprite(mousex, mousey, sprite){

//     console.log(mousex, mousey)
//     console.log(sprite.position, sprite.width)
//     if(
//         mousex > sprite.position.x &&
//         mousex < sprite.position.x + sprite.width &&
//         mousey > sprite.position.y &&
//         mousey < sprite.position.y + sprite.height
//     ){
//         console.log('clciked sprite');
//     }
// }

// canvas.addEventListener('mouseover', (e) => { // update on mouse move
//     console.log('hover canvas');
// });

// ----------------- buttons -------------------

// todo - limit inventory
// drop inventory
const dropButton = document.querySelector('.drop-button');
dropButton.addEventListener('click', () => {
    if(onSprite(hiveSprite)){
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


