class Player extends Character{
    constructor(name, sprite, height, width, speed, health, strength, level){
        super(name, sprite, height, width, speed, health);

        const inventory = new Inventory('bee', 3, true);
        console.log(this, this.inventory)

    }


}