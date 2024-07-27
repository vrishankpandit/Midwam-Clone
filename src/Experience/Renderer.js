import * as THREE from 'three'
import Experience from './Experience.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { HoloEffectShader } from './World/Shaders/HoloEffect.js'




export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug=this.experience.debug
        this.time=this.experience.time;
        // this.human=this.experience.world.human;

        this.setInstance()
        this.setEffectComposer()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })

       
        // this.instance.physicallyCorrectLights = true
        // this.instance.outputEncoding = THREE.sRGBEncoding
        // this.instance.shadowMap.enabled = true
        // this.instance.shadowMap.type = THREE.PCFSoftShadowMap

        this.instance.toneMapping = THREE.ACESFilmicToneMapping
        this.instance.toneMappingExposure = 1.00
        this.instance.setClearColor('#111310')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
        
       
        

        //Debug
        if(this.debug.active){
            this.debug.ui.add(this.instance,'toneMappingExposure').min(0).max(2).step(0.001)
        }
    }

    setEffectComposer(){
        this.renderTarget=new THREE.WebGLRenderTarget(this.sizes.width,this.sizes.height,{
            samples: this.instance.getPixelRatio()===1 ? 2:0
        })

        this.effectComposer=new EffectComposer(this.instance);

         //efect composer
         this.effectComposer.setSize(this.sizes.width, this.sizes.height)
         this.effectComposer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
 
         //render Passes
         this.renderPass = new RenderPass(this.scene,this.camera.instance);
 
         this.unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth,window.innerHeight),1.5,0.4,0.85)
         this.unrealBloomPass.strength=1
         this.unrealBloomPass.radius=0.4
         this.unrealBloomPass.threshold=0.1
         this.unrealBloomPass.enabled-true;

         this.holoeffect = new ShaderPass(HoloEffectShader)
         this.holoeffect.uniforms[ 'scale' ].value = 10;
        //  console.log(this.holoeffect.uniforms)
         
         
         
         //Add passes to effect composer
         this.effectComposer.addPass(this.renderPass);
         this.effectComposer.addPass(this.unrealBloomPass)
		 this.effectComposer.addPass( this.holoeffect );
         
        if(this.debug.active){
            this.debug.ui.add(this.unrealBloomPass,'strength').min(0).max(10).step(0.001).onChange((val)=>{
                this.unrealBloomPass.strength=val;
            })
            this.debug.ui.add(this.unrealBloomPass,'threshold').min(0).max(1).step(0.001).onChange((val)=>{
                this.unrealBloomPass.threshold=val;
            })
            this.debug.ui.add(this.unrealBloomPass,'radius').min(0).max(5).step(0.001).onChange((val)=>{
                this.unrealBloomPass.radius=val;
            })
            this.debug.ui.add(this.unrealBloomPass,'enabled')
        }
        

    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        this.effectComposer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update()
    {
        // this.instance.render(this.scene, this.camera.instance)
        this.effectComposer.render(this.scene, this.camera.instance)

        if(this.experience.world.human){
            this.holoeffect.uniforms.uTime.value=this.time.elapsed*0.01;
            // console.log(this.holoeffect.uniforms.uTime.value)
        }

    }
}