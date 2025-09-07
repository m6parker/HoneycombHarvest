// ------------- begins the game -------------------- //

// todo - level defines how many drones you have and the wieght you can carry back

let currentInventory = [];
let hiveInventory = [];
let greenhouseInvenotry = [];
let boxInventory = [];

let questProgress = {};

createInventorySlots(inventorySpace, 'inventory');
createInventorySlots(hiveSpace, 'hive');
createInventorySlots(greenhouseSpace, 'greenhouse');
createInventorySlots(boxSpace, 'box');
createInventorySlots(8, 'honeycomb');
createInventorySlots(8, 'egg');
createQuest();

//put flowers in the garden
spawnItems(sunflowerImage, 10, flowerGarden);
spawnItems(pinkFlowerImage, 10, flowerGarden);
spawnItems(carrotImage, 20, veggieGarden);
spawnItems(pumpkinImage, 40, pumpkinPatch);
// spawnItems(honeycombClusterImage, 3, veggieGarden)
// addItemToLocationInventory(honeycombClusterImage, hiveSprite)

// put drones in hive
function callSpawn(){
    // put drones in the hive
    spawnItems(beeImage, level, honeycomb)
}
//bees buzzing
// setInterval(callSpawn, 1000);

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
