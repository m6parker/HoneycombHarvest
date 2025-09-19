class Building{
    constructor(name, position, image, width, height){
        this.name = name;
        this.position = position;
        this.width = width;
        this.height = height;
        
        this.sprite = new Sprite({
            position: this.posiition,
            images: image,
            width: this.width,
            height: this.height
        });
    }
}