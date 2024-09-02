import * as THREE from 'three';
import Experience from '../Experience.js'

export default class Axeshelper{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.addModel()
    }

    addModel(){
        this.axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( this.axesHelper );

        // const size = 10;
        // const divisions = 10;

        // this.gridHelper = new THREE.GridHelper( size, divisions );
        // this.scene.add( this.gridHelper );
    }
}