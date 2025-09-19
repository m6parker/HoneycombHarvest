// if bee is in another sprite such as the hive
function onSprite(sprite){
    return (
        player.sprite.position.x + player.sprite.width >= sprite.position.x  &&
        player.sprite.position.x <= sprite.position.x + sprite.width     &&
        player.sprite.position.y <= sprite.position.y + sprite.height    &&
        player.sprite.position.y + player.sprite.height >= sprite.position.y 
    );
}

// if bee is in a certain location in the canvas such as a garden 
function inGarden(gardenBounds){
    return (
        player.sprite.position.x + player.sprite.width >= gardenBounds[0] &&
        player.sprite.position.x <= gardenBounds[0] + gardenBounds[2] &&
        player.sprite.position.y <= gardenBounds[1] + gardenBounds[3] &&
        player.sprite.position.y + player.sprite.height >= gardenBounds[1]
    );
}

let preventUp = false;
let preventDown = false;
let preventLeft = false;
let preventRight = false;
function checkBoundaries(boundaries){
    if(player.sprite.position.x + player.sprite.width < boundaries[0]){
        //prevent movement left
        preventLeft = true;
    }
    if(player.sprite.position.x > boundaries[0] + boundaries[2]){
        //prevent movement right
        preventRight = true;
    }
    if(player.sprite.position.y > boundaries[1] + boundaries[3]){
        //prevent movement down
        preventDown = true;
    }
    if(player.sprite.position.y + player.sprite.height < boundaries[1]){
        //prevent movement up
        preventUp = true;
    }
}


function spawnRandom(gardenBounds, itemImage, itemName, randomQuality) {
    const x = gardenBounds[0] + Math.random() * (gardenBounds[2] - 30);
    const y = gardenBounds[1] + Math.random() * (gardenBounds[3] - 30);

    const item = new Sprite({
        position: { x, y },
        images: itemImage,
        width: 30,
        height: 30,
        name: itemName,
        quality: randomQuality
    });

    return item;
}

function getRandomQuality(){
    return parseFloat(Math.random().toFixed(2));
}

const items = [];
let waves = [];
function spawnItems(itemImage, quantity, location){
    // if(itemImage === beeImage){  }
    for (let i = 0; i < quantity; i++) {
        const itemName = ((itemImage.src).split('/').pop()).split('.').slice(0, -1).join('');
        const item = spawnRandom(location, itemImage, itemName, getRandomQuality());
        items.push(item);
        movables.push(item);
    }
}

// aniimate water
function spawnWaves(image, quantity, location){
    for (let i = 0; i < quantity; i++) {
        const wave = spawnRandom(location, image, 'wave', 0);
        waves.push(wave);
        movables.push(wave);
    }
}

//---------------- player menu -------------------------------

// switch between tabs for each category type
function openTab(event, tabName) {
    let tabContents = document.getElementsByClassName("tab-content");
    let tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabContents.length; i++) {
        if(event.currentTarget.classList.contains('selected')){
            tabContents[i].style.display = "none";
            event.currentTarget.classList.remove('selected');
            document.querySelector('.content').classList.add('hidden');
            document.querySelector('.inv-img').src = 'img/inv_closed.png';
            document.querySelector('.stats-img').src = 'img/stats_closed.png';
            document.querySelector('.quests-img').src = 'img/quests_closed.png';
            return;
        }
        
        // hide all elements with tab-content
        tabContents[i].style.display = "none";
    }
    
    // remove all selected buttons
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(" selected", "");
    }
    
    // show current tab, add selected to button that opened the tab
    document.getElementById(tabName).style.display = "block";
    document.querySelector('.content').classList.remove('hidden');
    event.currentTarget.className += " selected";

    if(tabName === 'bee-inventory'){
        document.querySelector('.inv-img').src = 'img/inv_open.png';
    }else if(tabName === 'stats'){
        document.querySelector('.stats-img').src = 'img/stats_closed.png';
        document.querySelector('.inv-img').src = 'img/inv_closed.png';
    }else if(tabName === 'quests'){
        document.querySelector('.quests-img').src = 'img/quests_closed.png';
        document.querySelector('.inv-img').src = 'img/inv_closed.png';
    }
}

function setLevelUI(level){
    document.querySelector('.level-input').value = level;
}