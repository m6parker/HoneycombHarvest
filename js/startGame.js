// ------------- begins the game -------------------- //

// todo - level defines how many drones you have and the wieght you can carry back
let level = 1; 
let inventorySpace = 14;
createInventorySlots(inventorySpace);
createHiveInventorySlots(24);
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

