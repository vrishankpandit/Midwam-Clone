import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {gsap} from 'gsap'

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
        // this.instance.lookAt(new THREE.Vector3(0,8,0));
        this.instance.position.set(-4, 0, 0)
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
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
}