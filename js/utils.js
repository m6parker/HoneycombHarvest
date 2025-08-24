// if bee is in another sprite such as the hive
function onSprite(sprite){
    return (
        beeSprite.position.x + beeSprite.width >= sprite.position.x  &&
        beeSprite.position.x <= sprite.position.x + sprite.width     &&
        beeSprite.position.y <= sprite.position.y + sprite.height    &&
        beeSprite.position.y + beeSprite.height >= sprite.position.y 
    );
}

// if bee is in a certain location in the canvas such as a garden 
function inGarden(gardenBounds){
    return (
        beeSprite.position.x + beeSprite.width >= gardenBounds[0] &&
        beeSprite.position.x <= gardenBounds[0] + gardenBounds[2] &&
        beeSprite.position.y <= gardenBounds[1] + gardenBounds[3] &&
        beeSprite.position.y + beeSprite.height >= gardenBounds[1]
    );
}


function spawnRandom(gardenBounds, flowerImage) {
    const x = gardenBounds[0] + Math.random() * (gardenBounds[2] - 30);
    const y = gardenBounds[1] + Math.random() * (gardenBounds[3] - 30);

    const flower = new Sprite({
        position: { x, y },
        image: flowerImage,
        width: 30,
        height: 30
    });

    return flower;
}


const items = [];
function spawnItems(itemImage, quantity, location){
    // if(itemImage === beeImage){  }
    for (let i = 0; i < quantity; i++) {
        const item = spawnRandom(location, itemImage);
        items.push(item);
        movables.push(item);
    }
}
