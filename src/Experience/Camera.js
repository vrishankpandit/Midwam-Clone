import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setControls()
        
        
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(-4, 0, 0)
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

    update()
    {
        // this.controls.update()
    }

    mouseDownEvent(){
           gsap.to(this.instance.position,{
            x:-2.5,
            duration:2,
            ease:'power1.inOut'
        })
  

    }
    
    mouseUpEvent(){
        gsap.to(this.instance.position,{
         x:-4,
         duration:2,
         ease:'power1.inOut'
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
        
        // gsap.defaults({ease:'back.inOut',duration:2});

        const tl = gsap.timeline();

tl.to(this.instance.position, {
    y:  - 2.9,
    duration: 10,
    // scrollTrigger: {
    //     trigger: '.body2',
    //     start: 'top center',
    //     end: 'bottom center',
    //     scrub: true,
    //     markers: true
    // },
    onUpdate: () => {
        console.log(this.instance.position.y);
        },
    })
    .to(this.instance.position, {
        y: - 10.0,
        duration: 5,
        // scrollTrigger: {
        //     trigger: '.body3',
        //     start: 'top center',
        //     end: 'bottom center',
        //     scrub: true,
        //     markers: true
        // },
        onUpdate: () => {
            console.log(this.instance.position.y);
        },
});

        ScrollTrigger.create({
            animation:tl,
            trigger:'.body1',
            start:"top 100px",
            end:'bottom 100px',
            scrub:true,
            // pin:true,
            // anticipatePin:1,
            snap:1/3,
            markers:true

        })


    }
}