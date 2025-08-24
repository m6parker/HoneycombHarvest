class Sprite{
    constructor({position, image, height, width}){
        this.position = position;
        this.image = image;
        this.height = height;
        this.width = width;
    }

    draw(){
        context.drawImage(this.image,this.position.x, this.position.y);
    }
}