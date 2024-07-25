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

        

        this.m=new THREE.MeshStandardMaterial({
            metalness:1,
            roughness:0.28,
            envMap:this.envMap,
        })
        
        this.m.onBeforeCompile=(shader)=>{
            
            shader.uniforms.uTime = {value : 0};
            shader.fragmentShader =`
                uniform float uTime;
                mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
	mat4 m = rotationMatrix(axis, angle);
	return (m * vec4(v, 1.0)).xyz;
}
            `
            + shader.fragmentShader;

            
            this.m.userData.shader=shader;
            
        }
        
        
        this.mesh.material=this.m
               
        // this.mesh.material=new THREE.ShaderMaterial({
        //     vertexShader:vertex,
        //     fragmentShader:fragment,
            
        //     uniforms:{
        //         uTime:{value:this.time.elapsed}
        //     }
        // })
    }
    
    update(){
        if(this.mesh){
            this.mesh.rotation.y=this.time.elapsed * 0.001;
            if(this.m.userData.shader){
                this.m.userData.shader.uniforms.uTime.value=this.time.elapsed;
                // console.log(this.m.userData.shader.uniforms.uTime.value)
            }
        }
        // if(this.mesh){
        //     if(this.m.userData){
        //         console.log(this.m.userData)
        //     }
        // }
        // console.log(this.time.elapsed)
        // this.mesh.material.uniforms.uTime.value=this.time.elapsed;
    }

    
} 