import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Human{
    constructor(){
        this.experiance=new Experience();
        this.scene=this.experiance.scene;
        this.resources=this.experiance.resources

        this.instance=this.resources.items.humanModel
        console.log(this.instance)
        this.addModel()
    }

    addModel(){
        this.model = this.instance.scene;
        this.model.scale.set(0.2,0.2,0.2)
        this.mesh=this.model.children[0]
        this.mesh.geometry.center()
        this.model.traverse((o)=>{
            if(o.isMesh){
                o.material.wireframe=true;
            }
        })
        console.log(this.mesh)
        this.scene.add(this.model)
    }
} 