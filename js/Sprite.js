class Sprite{
    constructor({position, images, height, width, selected, selectedImg}){
        const passedImages = Array.isArray(images) ? images : [images];
        this.position = position;
        this.images = passedImages;
        this.height = height;
        this.width = width;
        this.selected = selected;
        this.selectedImg = selectedImg;
        this.unselectedImg = passedImages[0];

        if(this.images.length !== 1){
            this.currentImageIndex = 0;
            this.direction = 0;
            this.animateImageInterval = setInterval(() => this.currentImageIndex = (this.currentImageIndex + 1) % 2, speed * 5);
        }
        
    }

    draw(){
        if(this.images.length === 1){ context.drawImage(this.images[0],this.position.x, this.position.y); return; }
        context.drawImage(this.images[(this.currentImageIndex ?? 0) + (this.direction * 2)],this.position.x, this.position.y);
    }

    // selecting image
    selectSprite(){
        this.selected ? this.image = this.selectedImg : this.image = this.unselectedImg;
        // if(this.name === 'beehive'){ hiveInvenotryContainer.classList.toggle('hidden'); }
        // if(this.name === 'greenhouse'){ greenhouseContainer.classList.toggle('hidden'); }
        // if(this.name === 'box'){ boxContainer.classList.toggle('hidden'); }
    }

    // // selecting items
    // selectItem(){
    //     this.selected ? this.image = this.selectedImg : this.image = this.unselectedImg;
    // }

    // closing with the close button to prevent toggle getting messed up
    closeInventory(sprite){
        sprite.selected = false;
        this.image = this.unselectedImg;
    }
}