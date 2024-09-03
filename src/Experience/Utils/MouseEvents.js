import EventEmitter from './EventEmitter.js'

export default class MouseEvents extends EventEmitter{

        constructor(){
            super()
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.event= null;

            //onClickEvent
            window.addEventListener('mousedown',(val)=>{
                console.log("mousedown");
                
                this.trigger('mouseDown');
            })
            
            window.addEventListener('mouseup',()=>{
                
                console.log("mouseUp");
                this.trigger('mouseUp');
            })

            window.addEventListener('mousemove',(event)=>{
                this.event=event;
                // console.log(this.event)
                this.trigger('mouseMove');
            })
            
        }
}