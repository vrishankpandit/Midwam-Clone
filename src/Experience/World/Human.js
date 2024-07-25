import * as THREE from 'three'
import Experience from '../Experience.js'
import vertex from './Shaders/vertex.glsl'
import fragment from './Shaders/fragment.glsl'
import Time from '../Utils/Time.js'

// console.log(vertex)

export default class Human{
    constructor(){
        this.experiance=new Experience();
        this.scene=this.experiance.scene;
        this.resources=this.experiance.resources
        this.time=this.experiance.time;
        

        this.instance=this.resources.items.humanModel
        console.log(this.instance)
        this.addModel()
        this.setMaterial()
        
    }

    addModel(){
        this.model = this.instance.scene;
        this.model.scale.set(0.2,0.2,0.2)
        this.mesh=this.model.children[0]
        this.mesh.geometry.center()

       
        console.log(this.mesh)  
        this.scene.add(this.model)
    }

    setMaterial(){
        this.mesh.material=new THREE.ShaderMaterial({
            vertexShader:vertex,
            fragmentShader:fragment,
            
            uniforms:{
                uTime:{value:this.time.elapsed}
            }
        })
    }
    
    update(){
        console.log(this.time.elapsed)
        this.mesh.material.uniforms.uTime.value=this.time.elapsed;
    }

    
} 