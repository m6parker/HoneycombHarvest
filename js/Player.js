class Player extends Character{
    constructor(name, height, width, speed, health, strength, level){
        super(name, speed, health);

        this.strength = strength;
        this.level = level;
        this.inventory = new Inventory('bee', 15, true, []);
        this.sprite = new Sprite({
            position: {
                x: canvas.width/2,
                y: canvas.height/3.5
            },
            images: [beeImage, beeImage1, beeImage2, beeImage3],
            width,
            height
        });
    }


}