class Sprite{
    constructor({position, image, height, width, name, selected, selectedImg, space, quality}){
        this.position = position;
        this.image = image;
        this.height = height;
        this.width = width;
        this.name = name;
        this.selected = selected;
        this.selectedImg = selectedImg;
        this.unselectedImg = image;
        this.space = space;
        this.quality = quality;
    }

    draw(){
        context.drawImage(this.image,this.position.x, this.position.y);
    }

    // selecting image
    selectSprite(){
        this.selected ? this.image = this.selectedImg : this.image = this.unselectedImg;
        if(this.name === 'beehive'){ hiveInvenotryContainer.classList.toggle('hidden'); }
        if(this.name === 'greenhouse'){ greenhouseContainer.classList.toggle('hidden'); }
        if(this.name === 'box'){ boxContainer.classList.toggle('hidden'); }
        
    }

    // closing with the close button to prevent toggle getting messed up
    closeInventory(sprite){
        sprite.selected = false;
        this.image = this.unselectedImg;
    }
}