import {OrbitControls} from "./OrbitControls.js";

import {GLTFLoader} from './GLTFLoader.js';

import {TextureLoader} from "./three.module.js";

const scene = new THREE.Scene();

let hlight, directionalLight, light, light2, light3, light4;

const renderer = new THREE.WebGLRenderer({antialias: true});
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.001, 5000);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);


function init() {

    scene.background = new THREE.Color(0x36393f);


    camera.position.set(-1, -0.5, 2);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // hlight = new THREE.AmbientLight (0x021670,0.75);
    // scene.add(hlight);

    directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    directionalLight.lookAt(new THREE.Vector3(0, 0, 0));

    directionalLight.castShadow = true;
    scene.add(directionalLight);
    light = new THREE.PointLight(0xc4c4c4, 0.75);
    light.castShadow = true;
    light.position.set(-1, 0, 4);
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

    renderer.setSize(window.innerWidth, window.innerHeight);

    let loader = new GLTFLoader();
    loader.load('./models/kitchenFridgeLarge' +
        '.glb', function (gltf) {
        gltf.scene.position.set(-0.25, -0.5, 0);
        //let car = gltf.scene.children[0];
        // car.scale.set(2,2,2);
        scene.add(gltf.scene);
        render();
    });
    AddImage('https://cdn.discordapp.com/attachments/814021494069395466/814032080811458590/86757885_10157913009857510_1262544196875583488_o.jpg');
    // animate();
}

async function AddImage(url) {
    var geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    var material = await GetMaterial(url);

    var plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
}

async function GetMaterial(url) {

    return new Promise(success => {
        LoadDiscordImage(url).then(image => {
            var loader = new THREE.TextureLoader();
            loader.load(image, texture => {
                var mat = new THREE.MeshBasicMaterial({map:texture,side: THREE.DoubleSide});
                success(mat);

            });
        });

    });
}
function LoadDiscordImage(url){
    return new Promise(success =>{
        fetch(url,{Headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*'},mode:'cors'}).then(result =>{
           success(result); 
        });
        
    });
}

function render() {
    renderer.render(scene, camera);
    //requestAnimationFrame(render);
}


init();