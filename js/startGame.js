// ------------- begins the game -------------------- //

// todo - level defines how many drones you have and the wieght you can carry back
let level = 1; 
let inventorySpace = 14;
let hiveSpace = 24;
let currentInventory = [];
let hiveInventory = [];
let greenhouseInvenotry = [];
createInventorySlots(inventorySpace);
createHiveInventorySlots(hiveSpace);
createGreenhouseInventorySlots(36);
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
// setInterval(callSpawn, 1000);

// todo:
// drawHive()
// spawnRandom(level, drones, hive)
// spawnRandom(level, enemy, garden)

// collision enemies - takeDamage()

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

