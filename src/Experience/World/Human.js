import * as THREE from 'three'
import Experience from '../Experience.js'
import vertex from './Shaders/vertex.glsl'
import fragment from './Shaders/fragment.glsl'
import { gsap } from "gsap";

console.log(gsap)





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
        this.mesh.position.y=-7

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
            roughness:0.28
        })
        this.m.envMap=this.envMap
        
        this.m.onBeforeCompile=(shader)=>{
            
            shader.uniforms.uTime = {value : 0};
            shader.uniforms.speedFactor= {value : 1.0};
            shader.fragmentShader =`
                uniform float uTime;
                uniform float speedFactor;
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

                shader.fragmentShader=shader.fragmentShader.replace(
                    `#include <envmap_physical_pars_fragment>`,
                    `
                        #if defined( USE_ENVMAP )

        vec3 getIBLIrradiance( const in vec3 normal ) {

            #if defined( ENVMAP_TYPE_CUBE_UV )

                vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

                vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );

                return PI * envMapColor.rgb * envMapIntensity;

            #else

                return vec3( 0.0 );

            #endif

        }

        vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {

            #if defined( ENVMAP_TYPE_CUBE_UV )

                vec3 reflectVec = reflect( - viewDir, normal );

                // Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.
                reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );

                reflectVec = inverseTransformDirection( reflectVec, viewMatrix );

                reflectVec = rotate(reflectVec,vec3(1.0,0.0,0.0),uTime * (speedFactor)  );

                vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );

                return envMapColor.rgb * envMapIntensity;

            #else

                return vec3( 0.0 );

            #endif

        }

    #endif
                `)

            
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
            // this.mesh.rotation.y=this.time.elapsed * -0.001;
            if(this.m.userData.shader){
                this.mesh.material.userData.shader.uniforms.uTime.value = this.time.elapsed * 0.001;
                // console.log( this.mesh.material.userData.shader.uniforms.uTime.value)
            }
        }
            }
            
            mouseDownEvent(){
                if(this.mesh){
                    // this.mesh.rotation.y=this.time.elapsed * -0.001;
                    if(this.m.userData.shader){
                       
                        gsap.to( this.mesh.material.userData.shader.uniforms.speedFactor, {
                            value: 3.0,
                            duration: 4,
                            ease: "power1.inOut"
                          });
                          
                          // console.log( this.mesh.material.userData.shader.uniforms.uTime.value)
                        }
                    }
                    // console.log("human mouse down");
                    
                }
                mouseUpEvent(){
                    if(this.mesh){
                        // this.mesh.rotation.y=this.time.elapsed * -0.001;
                        if(this.m.userData.shader){
                       
                        gsap.to( this.mesh.material.userData.shader.uniforms.speedFactor, {
                            value: -1.0,
                            duration: 2,
                            ease: "power1.inOut"
                          });
                            
                    }
                }
                
            }
    
} 