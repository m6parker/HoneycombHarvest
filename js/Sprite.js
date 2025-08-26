class Sprite{
    constructor({position, image, height, width, name, selected, selectedImg}){
        this.position = position;
        this.image = image;
        this.height = height;
        this.width = width;
        this.name = name;
        this.selected = selected;
        this.selectedImg = selectedImg;
        this.unselectedImg = image;
    }

    draw(){
        context.drawImage(this.image,this.position.x, this.position.y);
    }

    // selecting image
    selectSprite(){
        this.selected ? this.image = this.selectedImg : this.image = this.unselectedImg;
        if(this.name === 'beehive'){ hiveInvenotry.classList.toggle('hidden'); }
        if(this.name === 'greenhouse'){ greenhouseContainer.classList.toggle('hidden'); }
        if(this.name === 'box'){ boxContainer.classList.toggle('hidden'); }
        
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