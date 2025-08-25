class Sprite{
    constructor({position, image, height, width, name, hovered}){
        this.position = position;
        this.image = image;
        this.height = height;
        this.width = width;
        this.name = name;
        this.hovered = hovered;
    }

    draw(){
        context.drawImage(this.image,this.position.x, this.position.y);
    }

    // clickedSprite(mousex, mousey){

    //     console.log(mousex, mousey)
    //     console.log(this.position, this.width)
    //     if(
    //         mousex > this.position.x &&
    //         mousex < this.position.x + this.width &&
    //         mousey > this.position.y &&
    //         mousey < this.position.y + this.height
    //     ){
    //         console.log('beehive');
    //     }

    // }
}