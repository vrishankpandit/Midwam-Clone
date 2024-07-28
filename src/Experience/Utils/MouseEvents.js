import EventEmitter from './EventEmitter.js'

export default class MouseEvents extends EventEmitter{

        constructor(){
            super()
            this.width = window.innerWidth
            this.height = window.innerHeight

            //onClickEvent
            window.addEventListener('mousedown',(val)=>{
                console.log("mousedown");
                
                this.trigger('mouseDown');
            })
            
            window.addEventListener('mouseup',()=>{
                
                console.log("mouseUp");
                this.trigger('mouseUp');
            })
        }
}