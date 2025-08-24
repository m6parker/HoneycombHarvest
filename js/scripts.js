const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

canvas.width = 1024;
canvas.height = 576;

context.fillStyle = 'black';
context.fillRect(100,100,canvas.width,canvas.height);


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
        x: -200,
        y: -200
    },
    image: hiveImage,
    width: 100,
    height: 100
});


const movables = [background, hiveSprite]; // sprites
const moveableBoundaries = [flowerGarden, veggieGarden, honeycomb] // images
function animate(){

    // TESTING
    // drawGrid(context, canvas, 50, 'rgba(200, 200, 200, 0.5)');

    // Check collisions
    // if (inGarden(flowerGarden)) console.log('Bee is in flower garden!');
    // if (inGarden(veggieGarden)) console.log('Bee is in veggie garden!');
    // if (onSprite(hiveSprite)) console.log('Bee is in the hive!');

    // context.strokeStyle = 'blue';
    // context.strokeRect(flowerGarden[0], flowerGarden[1], flowerGarden[2], flowerGarden[3]);
    // context.strokeRect(veggieGarden[0], veggieGarden[1], veggieGarden[2], veggieGarden[3]);
    // context.strokeRect(honeycomb[0], honeycomb[1], honeycomb[2], honeycomb[3]);


    window.requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    // add images
    background.draw();
    hiveSprite.draw();
    beeSprite.draw();
    // add items
    items.forEach(item => item.draw());

    // move background + stagnant objects when bee moves
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


