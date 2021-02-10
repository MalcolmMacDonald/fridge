
import {OrbitControls} from "./OrbitControls.js";

import { GLTFLoader } from './GLTFLoader.js';

const scene = new THREE.Scene();

let  hlight,directionalLight,light,light2,light3,light4;

const  renderer = new THREE.WebGLRenderer({antialias:true});
document.body.appendChild(renderer.domElement);

const camera =  new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);

const controls = new OrbitControls(camera,renderer.domElement);
controls.addEventListener('change', render);


async function getFridgeImages(){
    var token = window.location.href.split("?l=")[1];
    var header = "Bot " + token;
    var authorization = {'Authorization':header};
    var urlString = 'https://discord.com/api' + '/channels/' + '689278471801012286' + '/messages';
    let response = await fetch (urlString,Headers=authorization);
    let data = await response.json();
    return data;
}

getFridgeImages();

function init() {

    scene.background = new THREE.Color(0x36393f);


    camera.position.set(0,0,3);
    camera.lookAt(new THREE.Vector3(0,0,0));

    hlight = new THREE.AmbientLight (0x021670,0.75);
    scene.add(hlight);

    directionalLight = new THREE.DirectionalLight(0xffffff,0.75);
    directionalLight.position.set(10,10,10);
    directionalLight.lookAt(new THREE.Vector3(0,0,0));

    directionalLight.castShadow = true;
    scene.add(directionalLight);
    light = new THREE.PointLight(0xc4c4c4,0.75);
    light.castShadow = true;
    light.position.set(-1,0,4);
    scene.add(light);
    /*light2 = new THREE.PointLight(0xc4c4c4,5);
    light2.position.set(500,100,0);
    scene.add(light2);
    light3 = new THREE.PointLight(0xc4c4c4,5);
    light3.position.set(0,100,-500);
    scene.add(light3);
    light4 = new THREE.PointLight(0xc4c4c4,5);
    light4.position.set(-500,300,500);
    scene.add(light4);*/

    renderer.setSize(window.innerWidth,window.innerHeight);

    let loader = new GLTFLoader();
    loader.load('./models/kitchenFridgeLarge' +
        '.glb', function(gltf){
        gltf.scene.position.set(-0.25,-0.5,0);
        //let car = gltf.scene.children[0];
       // car.scale.set(2,2,2);
        scene.add(gltf.scene);
        render();
    });
    // animate();
}
function render() {
    renderer.render(scene,camera);
    //requestAnimationFrame(render);
}
init();