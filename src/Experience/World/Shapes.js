import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Shapes{
    constructor(){
        this.experience=new Experience();
        this.scene=this.experience.scene;
        this.resources=this.experience.resources
        this.time=this.experience.time;
        this.debug=this.experience.debug
        

        this.instance=this.resources.items.shapes
        console.log(this.instance)
        this.addModel()
        // this.setMaterial()
    }

    addModel(){
        this.model=this.instance.scene;
        this.model.scale.set(0.5,0.5,0.5)
        this.model.position.set(10,-9,4)
        this.scene.add(this.model)

    }



}