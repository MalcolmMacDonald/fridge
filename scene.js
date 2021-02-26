import {OrbitControls} from "./OrbitControls.js";

import {GLTFLoader} from './GLTFLoader.js';

import {TextureLoader} from "./three.module.js";

import {GetFridgeImageFileNames} from "./discordInterface.js";

const scene = new THREE.Scene();

let hlight, directionalLight, light, light2, light3, light4;

const renderer = new THREE.WebGLRenderer({antialias: true});
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.001, 5000);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', UpdateSize);
controls.addEventListener('change', render);

const imagePositions = [
    [-0.165, -0.145,0.75],
    [-0.1, -0.195,0.75],
    [-0.16, -0.21,0.75],
    [-0.145, -0.27,0.75],
    [-0.145, -0.33,0.75],
    [-0.08, -0.26,0.75],
    [-0.06, -0.32,0.75],
    [0.05, -0.29,0.75],
    [0.15, -0.36],
    [0.175, -0.26],
    [0.02, -0.22],
    [0.14, -0.175],
    [0.1, -0.09],
    [0.085, -0.005],
    [0.175, 0.005,1],
    [0.085, 0.075],
    [-0.123, 0.15,0.8],
    [0.175, 0.1,1.35],
    [0.075, 0.155,0.8],
    [0.16, 0.2],
    [0.175, 0.26,0.2],
    [0.15, 0.28,0.2],
    [0.04, 0.29,0.5],
    [0.07, 0.23],
    [0.1, 0.35],
    [-0.09, 0.23],
    [-0.14, 0.35]
]


function init() {

    scene.background = new THREE.Color(0x36393f);


    camera.position.set(0, -0.2, 0.5);
    camera.lookAt(new THREE.Vector3(0, -0.2, 0));

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
UpdateSize();

    let loader = new GLTFLoader();
    loader.load('./models/kitchenFridgeLarge' +
        '.glb', function (gltf) {
        gltf.scene.position.set(-0.25, -0.5, 0);
        //let car = gltf.scene.children[0];
        // car.scale.set(2,2,2);
        scene.add(gltf.scene);
        render();
    });

    AddPictures();

    // animate();
}
function UpdateSize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);

}

async function AddPictures() {

    var allPictures = await GetFridgeImageFileNames(new URLSearchParams(window.location.search).get('key'));

    for (var i = allPictures.length-1; i >= 0; i--) {

        await AddImage(allPictures[i], i);
    }
}

async function AddImage(imageURL, index) {
    if (index >= imagePositions.length) {
        return;
    }

    var geometry = new THREE.PlaneGeometry(1, 1, 1, 1,);
    var material = await GetMaterial('https://fridgeserver.herokuapp.com/' + imageURL);

    var size = [material.map.image.width, material.map.image.height];
    var aspectRatio = size[0]/size[1];//: size[1]/size[0];

    var plane = new THREE.Mesh(geometry, material);
    var currentPosition = imagePositions[imagePositions.length - (index + 1)];
    var scale = currentPosition[2] || 1;
    scale *= 0.075;
    plane.scale.set(aspectRatio * scale,  scale, 1);
    
    plane.position.set(currentPosition[0], currentPosition[1], 0.041);
    scene.add(plane);
    render();
}

async function GetMaterial(url) {

    return new Promise(success => {
        var loader = new THREE.TextureLoader();
        loader.load(url, texture => {
            var mat = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
            success(mat);

        });

    });
}

function LoadDiscordImage(url) {
    return new Promise(success => {

        /* var thisOrigin = '127.0.0.1:8887';
         var headers = new Headers();
         //headers.append('Access-Control-Allow-Origin', '*');
         
         headers.append('Access-Control-Request-Headers','access-control-request-headers: access-control-allow-headers,access-control-allow-origin');
         headers.append("Access-Control-Request-Method", "GET");
         headers.append('Origin',thisOrigin);
         //headers.append('Access-Control-Allow-Origin', '*');
 
         var request = new Request(url, {
             headers:headers,
             method:'OPTIONS'
             /* referrerPolicy: 'no-referrer',
              credentials: 'same-origin',
              cache: 'no-cache'
         });*/

        fetch('').then(result => {
            console.log(result);

            success(result);
        });
    });
}

function render() {
    renderer.render(scene, camera);
    //requestAnimationFrame(render);
}


init();