import EventEmitter from './EventEmitter.js'

export default class WheelEvents extends EventEmitter{

        constructor(){
            super()
            this.width = window.innerWidth
            this.height = window.innerHeight

            //onWheel
            window.addEventListener('wheel',(val)=>{   
                this.trigger('wheel');
            })
            
            
        }
}