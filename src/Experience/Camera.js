import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Time from './Utils/Time.js'
// import { lerp } from 'three/src/math/MathUtils.js';
// import MouseEvents from './Utils/MouseEvents.js'







gsap.registerPlugin(ScrollTrigger);

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.time=new Time()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.mouseEvents = this.experience.mouseEvents

        this.cursor = {}
        this.cursor.x = 0
        this.cursor.y = 0

        
        this.setInstance()
        this.setControls()
        
        
    }
    updateCamera() {
        this.instance.lookAt(new THREE.Vector3(0, 0, 0));
        this.instance.updateProjectionMatrix();
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(0.5, 1, 0)
        this.instance.lookAt(new THREE.Vector3(0,0,0));
        this.scene.add(this.instance)
    }

    setControls()
    {
        // this.controls = new OrbitControls(this.instance, this.canvas)
        // this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }


    oscillateCameraPosition() {
        const oscillationIntensity = 0.1; // Adjust the intensity as needed
        const frequency = 0.01; // Adjust the frequency as needed

        // Calculate the displacement using a sine wave
        const displacement = Math.sin(((Math.random()-0.5)*2) * (3.14/2)*frequency * (this.time.delta/16)) * oscillationIntensity;
        // Apply the displacement to the camera position
        
        let lerp1=0;
        
        lerp1=new THREE.Vector3(this.instance.position.x+displacement,this.instance.position.y+displacement,this.instance.position.z+displacement);

        this.instance.position.lerp(lerp1, (this.time.elapsed/1000)%1);
        // this.instance.updateProjectionMatrix()


    }


    update()
    {
        // this.controls.update()
        this.oscillateCameraPosition()
    }

    mouseDownEvent(){
          gsap.to(this.instance,{
              fov:25,
              duration:2,
              ease:'power1.inOut',
            
            })
            
            
        }
        
        mouseUpEvent(){
            gsap.to(this.instance,{
            fov:35,
            duration:2,
            ease:'power1.inOut',
     })

     
    }

    wheelEvents(){
        console.log("wheel down"); 

        gsap.to(this.instance.position,{
            y:this.instance.position.y-1.5,
            duration:1,
            ease:'power1.inOut'
        })
    }

    mouseMoveEvents(){

        
        // console.log(this.mouseEvents.event)
        this.cursor.x= (this.mouseEvents.event.clientX / this.sizes.width - 0.5);
        this.cursor.y = (-(this.mouseEvents.event.clientY / this.sizes.height - 0.5));
        // console.log(this.cursor.x,this.cursor.y);


     
        let lerp2=0;
        
        lerp2=new THREE.Vector3(this.instance.position.x,this.instance.position.y+(this.cursor.y*0.05),this.instance.position.z+(this.cursor.x*0.1));
        this.instance.position.lerp(lerp2, (this.time.delta/16)*0.1);
        
    }

    holoeffectEnable(value){
        // console.log(this.experience.renderer.holoeffect.uniforms.progress.value)
        console.log((value)/4);
        this.experience.renderer.holoeffect.uniforms.progress.value = ((value)/4);
    }

    scrollTrigger(){
        console.log(this.experience.renderer);
        
        gsap.defaults({
            onUpdate:()=>{
                this.instance.updateProjectionMatrix();
            }
        });
        
        const tl = gsap.timeline();
        
        
        tl.to(this.instance.position, {
            // y:  - 2.0,
            x:-4,
            y:0,
            duration: 1,
            // scrollTrigger: {
                //     trigger: '.body2',
                //     start: 'top center',
                //     end: 'bottom center',
                //     scrub: true,
                //     markers: true
                // },
                onUpdate:()=>{  
                    this.instance.lookAt(new THREE.Vector3(0,0,0));
                }
            })
            .to(this.instance.position, {
                x:-1.5,    
                z:-1,
                // z: Math.PI,
                
                duration: 1,
                // scrollTrigger: {
                    //     trigger: '.body3',
                    //     start: 'top center',
                    //     end: 'bottom center',
                    //     scrub: true,
                    //     markers: true
                    // },
                    onUpdate:() => {
                        const interpolatedPosition = new THREE.Vector3().lerpVectors(
                            new THREE.Vector3(0,0,0),
                            new THREE.Vector3(0,-1,0),
                            (tl.progress()-1/tl.getChildren(true,true,false).length)*tl.getChildren(true,true,false).length);
                            this.instance.lookAt(interpolatedPosition);
                            
                            // console.log((tl.progress()-1/tl.getChildren(true,true,false).length)*tl.getChildren(true,true,false).length);
                            
                        },
                    })
                    .to(this.instance.position, {
                        x:1,
                        y:-1,
                        z:-3,
                        duration:1,
                        onStart:()=>{
                            this.instance.lookAt( new THREE.Vector3(0,-1,0));  
                            this.instance.updateProjectionMatrix();
                        },
                        onUpdate:()=>{
                            const interpolatedPosition = new THREE.Vector3().lerpVectors(
                                new THREE.Vector3(0,-1,0),
                                new THREE.Vector3(0,-2,0),
                                (tl.progress()-2.0/tl.getChildren(true,true,false).length)*tl.getChildren(true,true,false).length);
                                this.instance.lookAt(interpolatedPosition);
                                // console.log((tl.progress()-2.0/tl.getChildren(true,true,false).length)*tl.getChildren(true,true,false).length);
                                // console.log(interpolatedPosition.x,interpolatedPosition.y,interpolatedPosition.z);               
                                this.holoeffectEnable((tl.progress()-1/tl.getChildren(true,true,false).length)*tl.getChildren(true,true,false).length);
                            }
                        })
                        .to(this.instance.position, {
                            x:3,
                            y:-2,
                            z:0,
                            duration:1,
                            onStart:()=>{
                                this.instance.lookAt( new THREE.Vector3(0,-2,0));  
                                this.instance.updateProjectionMatrix();
                            },
                            onUpdate:()=>{
                                const interpolatedPosition = new THREE.Vector3().lerpVectors(
                                    new THREE.Vector3(0,-2,0),
                                    new THREE.Vector3(0,-2,0),
                                    (tl.progress()-3.0/tl.getChildren(true,true,false).length)*tl.getChildren(true,true,false).length);
                                    this.instance.lookAt(interpolatedPosition);
                                    // console.log((tl.progress()-2.0/tl.getChildren(true,true,false).length)*tl.getChildren(true,true,false).length);
                                    // console.log(interpolatedPosition.x,interpolatedPosition.y);               
                                    this.holoeffectEnable((tl.progress()-1/tl.getChildren(true,true,false).length)*tl.getChildren(true,true,false).length);
                                }
                            })
                            .to(this.instance.position, {
                                x:-1,
                                y:-3,
                                z: 4,
                                duration:1,
                                onStart:()=>{
                                    this.instance.lookAt( new THREE.Vector3(0,-2,0));  
                                    this.instance.updateProjectionMatrix();
                                },
                                onUpdate:()=>{
                                    const interpolatedPosition = new THREE.Vector3().lerpVectors(
                                        new THREE.Vector3(0,-2,0),
                                        new THREE.Vector3(0,-3,0),
                                        (tl.progress()-4.0/tl.getChildren(true,true,false).length)*tl.getChildren(true,true,false).length);
                                        this.instance.lookAt(interpolatedPosition);
                                        this.holoeffectEnable((tl.progress()-1/tl.getChildren(true,true,false).length)*tl.getChildren(true,true,false).length);
                                        // console.log((tl.progress()-2.0/tl.getChildren(true,true,false).length)*tl.getChildren(true,true,false).length);
                                        // console.log(interpolatedPosition.y);
                                        // console.log("instance position z "+this.instance.position.z);               
                                    }
                                }
                            )
                            .to(this.instance.position, {
                                x:-4,
                                y:-4,
                                z: -2,
                                duration:1,
                                onStart:()=>{
                                    this.instance.lookAt( new THREE.Vector3(0,-3,0));  
                                    this.instance.updateProjectionMatrix();
                                },
                                onUpdate:()=>{
                                    const interpolatedPosition = new THREE.Vector3().lerpVectors(
                                        new THREE.Vector3(0,-3,0),
                                        new THREE.Vector3(0,-4,0),
                                        (tl.progress()-5.0/tl.getChildren(true,true,false).length)*tl.getChildren(true,true,false).length);
                                        this.instance.lookAt(interpolatedPosition);
                                        // console.log((tl.progress()-2.0/tl.getChildren(true,true,false).length)*tl.getChildren(true,true,false).length);
                                        this.holoeffectEnable((tl.progress()-1/tl.getChildren(true,true,false).length)*tl.getChildren(true,true,false).length);
                                        // console.log(interpolatedPosition.y);
                                        // console.log("instance position z "+this.instance.position.z);               
                                    }
                                }
                            )
                            
                            ScrollTrigger.create({
                                animation:tl,
                                trigger:'.body1',
                                start:"top top",
                                end:'bottom 500px',
                                scrub:true,
                                pin:true,
                                // anticipatePin:1,
                                // snap:1/2,
                                markers:true
                                
                            })
                            
                            
                        }
                        
                        
                    }