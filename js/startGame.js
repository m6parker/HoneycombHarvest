// ------------- begins the game -------------------- //

// todo - level defines how many drones you have and the wieght you can carry back

let currentInventory = [];
let hiveInventory = [];
let greenhouseInvenotry = [];
let boxInventory = [];
createInventorySlots(inventorySpace, 'inventory');
createInventorySlots(hiveSpace, 'hive');
createInventorySlots(greenhouseSpace, 'greenhouse');
createInventorySlots(boxSpace, 'box');
// createInventorySlots(inventorySpace);
// createHiveInventorySlots(hiveSpace);
// createGreenhouseInventorySlots(greenhouseSpace);
// createBoxInventorySlots(boxSpace);
const quest = createQuest();

//put flowers in the garden
spawnItems(sunflowerImage, 10, flowerGarden);
spawnItems(pinkFlowerImage, 10, flowerGarden);
spawnItems(carrotImage, 20, veggieGarden);
spawnItems(pumpkinImage, 40, pumpkinPatch);

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
            }
        });
    })
});

// move back into bee
const greenhouseSlots = document.querySelectorAll('.greenhouseSlot');
greenhouseSlots.forEach(slot => {
    slot.addEventListener('click', ()=> {
        takeItem(slot, currentInventory);
    });
});

// move back into bee
const hiveSlots = document.querySelectorAll('.hiveSlot');
hiveSlots.forEach(slot => {
    slot.addEventListener('click', ()=> {
        takeItem(slot, currentInventory);
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
