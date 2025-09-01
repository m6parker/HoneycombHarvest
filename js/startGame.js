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



// click each item in hive to move
const slots = document.querySelectorAll('.itemSlot');
console.log(slots)
slots.forEach(slot => {
    slot.addEventListener('click', ()=> {

        // removed from currentInv
        // added to hiveInventory(individual item)

        for (const [index, item] of currentInventory.entries()) {
            console.log(`Index: ${index}, Value: ${item.name}`);
            if(slot.firstChild && item.src === slot.firstChild.src){
                currentInventory.splice(index, 1);
                
                // ui
                if(hiveSpace){
                    addItemToHive(item);
                    slot.firstChild.remove()
                    slot.classList.add('empty');
                    inventorySpace++;
                }
                break;
            }
        }

        console.log('inv after removal', currentInventory)


    })
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
