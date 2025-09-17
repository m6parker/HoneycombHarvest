// -------------------------------------------------- //
//                  begins the game                   //
// -------------------------------------------------- //

//create all invenotries
// const playerInventory     = new Inventory('bee', 15);
const hiveInventory       = new Inventory('hive', 24, 'hexagon');
const honeycombInventory  = new Inventory('honeycomb', 6, false, 'hexagon');
const eggInventory        = new Inventory('egg', 6, false, 'hexagon');
const greenhouseInventory = new Inventory('greenhouse', 36);
// const sellboxInventory    = new Inventory('sellbox', 12);
// const buyboxInventory     = new Inventory('buybox', 6);

createQuest();
let questProgress = {};

//put flowers in the garden
spawnItems(sunflowerImage, 10, flowerGarden);
spawnItems(pinkFlowerImage, 10, flowerGarden);
spawnItems(carrotImage, 20, veggieGarden);
spawnItems(pumpkinImage, 40, pumpkinPatch);
// spawnItems(honeycombClusterImage, 3, veggieGarden)
// addItemToLocationInventory(honeycombClusterImage, hiveSprite)

//animate water
function callSpawn(){
    const randomAmount = Math.floor(Math.random() * waves.length)
    for(let i =0; i < randomAmount; i++){    
        const randomIndex = Math.floor(Math.random() * waves.length);
        const removedElements = waves.splice(randomIndex, 1);
    }
    spawnWaves(wavesImage, randomAmount, waterBoundariesleft)
}
spawnWaves(wavesImage, 300, waterBoundariesleft)
setInterval(callSpawn, 900);

setLevelUI(level);
// todo:
// drawHive()
// spawnRandom(level, drones, hive)
// spawnRandom(level, enemy, garden)

// collision enemies - takeDamage()



// click each item in bee inventory to other inventories
const slots = document.querySelectorAll('.itemSlot');
slots.forEach(slot => {
    slot.addEventListener('click', ()=> {
        selectables.forEach(location => {
            if(location.selected){
                moveItem(slot, location);

                // everytime an item is placed in the hive, check the quest status
                if(location === hiveSprite){
                    checkQuest();
                }
            }
        });
    })
});

// move back into bee from greenhouse
const greenhouseSlots = document.querySelectorAll('.greenhouseSlot');
greenhouseSlots.forEach(slot => {
    slot.addEventListener('click', ()=> {
        takeItem(slot, greenhouseSprite, greenhouseInvenotry);
    });
});

// move back into bee from hive
const hiveSlots = document.querySelectorAll('.hiveSlot');
hiveSlots.forEach(slot => {
    slot.addEventListener('click', ()=> {
        takeItem(slot, hiveSprite, hiveInventory);
    });
});



// --------- start screen ------------------------------------

function animateBee(imageId, imageUrls) {
    const imgElement = document.getElementById(imageId);
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % imageUrls.length;
        imgElement.src = imageUrls[currentIndex];
    }, 1000);
}

const imageUrls = ['img/bee1.png', 'img/bee2.png'];
animateBee('animatedBee', imageUrls);
animateBee('animatedBee2', imageUrls);
