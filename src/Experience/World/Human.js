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
        this.renderer=this.experiance.renderer.instance
        this.debug=this.experiance.debug
        

        this.instance=this.resources.items.humanModel
        console.log(this.instance)
        this.addModel()
        this.setMaterial()
        
    }

    addModel(){
        this.model = this.instance.scene;
        this.model.scale.set(0.35,0.35,0.35)
        this.mesh=this.model.children[0]
        this.mesh.geometry.center()

        this.mesh.rotation.y=-Math.PI/2;
       
        console.log(this.mesh)  
        this.scene.add(this.model)
    }

    setMaterial(){
        this.pmremgenerator = new THREE.PMREMGenerator(this.renderer)
        this.pmremgenerator.compileEquirectangularShader()

        this.envMapTexture = this.resources.items.envMap
        this.envMap=this.pmremgenerator.fromEquirectangular(this.envMapTexture).texture;

        console.log(this.envMap)

        this.mesh.material=new THREE.MeshStandardMaterial({
            metalness:1,
            roughness:0.28,
            envMap:this.envMap,
        })

        


        // this.mesh.material=new THREE.ShaderMaterial({
        //     vertexShader:vertex,
        //     fragmentShader:fragment,
            
        //     uniforms:{
        //         uTime:{value:this.time.elapsed}
        //     }
        // })
    }
    
    update(){
        // this.mesh.rotation.y=this.time.elapsed * 0.001;
        // console.log(this.time.elapsed)
        // this.mesh.material.uniforms.uTime.value=this.time.elapsed;
    }

    
} 