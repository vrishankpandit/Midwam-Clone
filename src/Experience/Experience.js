import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import WheelEvents from './Utils/WheelEvents.js'



import sources from './sources.js'
import MouseEvents from './Utils/MouseEvents.js'

let instance = null

export default class Experience
{
    constructor(_canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this
        
        // Global access
        window.experience = this

        // Options
        this.canvas = _canvas

        // Setup
        this.debug = new Debug()
        this.resources = new Resources(sources)
        this.scene = new THREE.Scene()
        this.world = new World()
        this.mouseEvents = new MouseEvents()
        this.wheelEvents = new WheelEvents()
        this.sizes = new Sizes()
        this.time = new Time()
        this.camera = new Camera()
        this.renderer = new Renderer()
        
        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })
        
        // Time tick event
        this.time.on('tick', () =>
            {
                this.update()
            })
            
            this.mouseEvents.on('mouseDown',()=>{
                this.mouseDownEvents();
            })
            
            this.mouseEvents.on('mouseUp',()=>{
                this.mouseUpEvents();
            })
            
            this.wheelEvents.on('wheel',(val)=>{
                
                this.wheelEvents1();
            })
            
            this.mouseEvents.on('mouseMove',()=>{
                this.mouseMoveEvents();
            })
            
            
        }
        
        resize()
        {
            this.camera.resize()
            this.renderer.resize()
        }
        
        update()
        {
            this.camera.update()
            this.world.update()
            this.renderer.update()     
        }
        
        mouseDownEvents(){
            this.world.human.mouseDownEvent();
            this.camera.mouseDownEvent();
        }
        
        mouseUpEvents(){
            this.world.human.mouseUpEvent();
            this.camera.mouseUpEvent();
        }
        
        wheelEvents1(){
            // this.camera.wheelEvents();
        }
        
        mouseMoveEvents(){
            // console.log(this.mouseEvents)
            this.camera.mouseMoveEvents();
            // console.log(this.mouseEvents.event)

        }

        destroy()
        {
            this.sizes.off('resize')
            this.time.off('tick')
            
            // Traverse the whole scene
            this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
            this.debug.ui.destroy()
    }
}