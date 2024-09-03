import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Time from './Utils/Time.js'






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
        const displacement = Math.sin(((Math.random()-0.5)*2) * (3.14/2)*frequency) * oscillationIntensity;
        // Apply the displacement to the camera position
        
        let lerp=0;
        
        lerp=new THREE.Vector3(this.instance.position.x+displacement,this.instance.position.y+displacement,this.instance.position.z+displacement);
        // for(let i=0;i<100;i++){
            //     console.log(i/100);
            // }
            this.instance.position.lerp(lerp, (this.time.elapsed/1000)%1);
            // console.log(this.instance.position);
            // console.log((this.time.elapsed/1000)%1);
            // console.log("finish")
        

        
        // this.instance.position.y += displacement;
        // this.instance.position.z += displacement;

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

    scrollTrigger(){
        // console.log(this.experience.renderer);
        
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
                            console.log(interpolatedPosition.y);
                            
                            
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
                                console.log(interpolatedPosition.x,interpolatedPosition.y,interpolatedPosition.z);               
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
                                    console.log(interpolatedPosition.x,interpolatedPosition.y);               
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
                                    // console.log((tl.progress()-2.0/tl.getChildren(true,true,false).length)*tl.getChildren(true,true,false).length);
                                    console.log(interpolatedPosition.y);
                                    console.log("instance position z "+this.instance.position.z);               
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
                                    console.log(interpolatedPosition.y);
                                    console.log("instance position z "+this.instance.position.z);               
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