import Experience from '../Experience.js'
import Axeshelper from './AxesHelper.js'
import Environment from './Environment.js'
import Human from './Human.js'
import Shapes from './Shapes.js'
// import Floor from './Floor.js'
// import Fox from './Fox.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.human=new Human();
            this.shapes=new Shapes();
            this.axesHelper=new Axeshelper();
            this.experience.camera.scrollTrigger()
            // this.floor = new Floor()
            // this.fox = new Fox()
            // this.environment = new Environment()
        })
    }
    
    update()
    {
        if(this.human){
            this.human.update();
        }
        

        // if(this.fox)
        //     this.fox.update()
    }
}