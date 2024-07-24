import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Human{
    constructor(){
        this.experiance=new Experience();
        this.scene=this.experiance.scene;
        
    }
} 