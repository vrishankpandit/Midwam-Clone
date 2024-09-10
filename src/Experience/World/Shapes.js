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
        this.model.scale.set(0.55,0.55,0.55)
        this.model.rotation.x=-Math.PI/10;
        this.model.position.set(9,-8,4)
        this.scene.add(this.model)

        if(this.debug.active){
            this.debug.ui
            .add(this.model.position,'x')
            .name('PositionX')
            .min(0)
            .max(20)
            .step(0.001)
            
            this.debug.ui
            .add(this.model.position,'y')
            .name('PositionY')
            .min(0)
            .max(20)
            .step(0.001)

            this.debug.ui
            .add(this.model.position,'z')
            .name('PositionZ')
            .min(0)
            .max(20)
            .step(0.001)

            this.debug.ui
            .add(this.model.rotation,'x')
            .name('RotationX')
            .min(0)
            .max(Math.PI)
            .step(0.001)
            
            this.debug.ui
            .add(this.model.position,'y')
            .name('RotationY')
            .min(0)
            .max(Math.PI)
            .step(0.001)

            this.debug.ui
            .add(this.model.position,'z')
            .name('RotationZ')
            .min(0)
            .max(Math.PI)
            .step(0.001)
        }
    }



}