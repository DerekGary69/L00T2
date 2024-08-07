let THREE = await import('three');
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightUniformsLib } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/lights/RectAreaLightUniformsLib.js';
RectAreaLightUniformsLib.init();
import { RectAreaLightHelper } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/helpers/RectAreaLightHelper.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from './assets/TransparentBackgroundFixedUnrealBloomPass.js';
// import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutlinePass } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/postprocessing/OutlinePass.js';
import { FontLoader } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/geometries/TextGeometry.js';
import { OutputPass } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/postprocessing/OutputPass.js';
import { RoundedBoxGeometry } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/geometries/RoundedBoxGeometry.js';
import Stats from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/libs/stats.module.js';

// let stats = new Stats();
// document.body.appendChild(stats.dom);

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.near = 0.1
camera.far = 100;
camera.updateProjectionMatrix();

window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
};

scene.background = null;

let renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x000000, 0);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.7;
renderer.outputEncoding = THREE.sRGBEncoding;


document.body.appendChild(renderer.domElement);

let composer = new EffectComposer(renderer);
composer.setSize(window.innerWidth, window.innerHeight);
composer.setPixelRatio(window.devicePixelRatio);


let renderPass = new RenderPass(scene, camera);

composer.addPass(renderPass);


let bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight));
bloomPass.strength = 3;
bloomPass.radius = 1;
bloomPass.threshold = 1;

composer.addPass(bloomPass);


let outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
composer.addPass(outlinePass);
outlinePass.edgeStrength = 5;
outlinePass.edgeGlow = 5;
outlinePass.edgeThickness = 5;
outlinePass.pulsePeriod = 10;

outlinePass.resolution.set(window.innerWidth/2, window.innerHeight/2);
let outputPass = new OutputPass();
composer.addPass(outputPass);

let item = JSON.parse(localStorage.getItem('item'));
// let item = {
//     "name": "Arcane Talisman of the Eternal Forest",
//     "nameHex": "#89cff0",
//     "rarity": "rare",
//     "type": "talisman",
//     "rarityHex": "#0075E2",
//     "materials": {
//         "ancient wood": "Carved from the heart of an ancient tree, the talisman holds the essence of the Eternal Forest.",
//         "emerald": "Embedded with a shimmering emerald that glows with nature's energy."
//     },
//     "enchantments": {
//         "nature's embrace": "The talisman enhances the wearer's connection to nature, granting them heightened senses and the ability to communicate with forest creatures.",
//         "rejuvenation": "Provides a passive healing effect to the wearer, gradually restoring their vitality over time."
//     },
//     "description": "The Arcane Talisman of the Eternal Forest is a rare talisman crafted from ancient wood infused with the essence of the Eternal Forest. It is adorned with a radiant emerald that pulsates with nature's energy. The talisman enhances the wearer's connection to nature, granting heightened senses and the ability to communicate with forest creatures. Additionally, it provides a passive healing effect, allowing the wearer to gradually restore their vitality over time."
// };
console.log(item);

let controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = true;
controls.enableRotate = true;
controls.enableZoom = true;

scene.add(camera); 

let camLight = new THREE.SpotLight(0xffffff, 2, 10, Math.PI / 2, 0);
camLight.position.set(2, 3, 0);
camLight.castShadow = false;

// camera.add(camLight);

// let titleArea = new THREE.RectAreaLight(0xffffff, .5, 1, 2);
// titleArea.intensity = 3;
// titleArea.position.set(0, 0, 1);
// titleArea.rotation.set(0, 0, 0);
// scene.add(titleArea);

let backLight = new THREE.PointLight(0xffffff, 15, 100);
backLight.castShadow = true;
// backLight.intensity = 4;
backLight.position.set(0, 0, -3);
backLight.lookAt(0, 0, 0);

let backLight2 = new THREE.SpotLight(0xffffff, 5, 10, 10, 0, 1);
backLight2.castShadow = true;
// backLight2.intensity = 4;
backLight2.position.set(-2, -2, -2);
backLight2.lookAt(0, 0, 0);
// scene.add(backLight2);

let backLight3 = new THREE.SpotLight(0xffffff, 5, 10, 10, 0, 1);
backLight3.castShadow = true;
// backLight3.intensity = 4;
backLight3.position.set(0, 0, -2);
backLight3.lookAt(0, 0, 0);
// scene.add(backLight3);


let sideLight = new THREE.SpotLight(0xffffff, 10, 10, 10, 0, 1);
sideLight.castShadow = true;
// sideLight.intensity = 4;
sideLight.position.set(2, -4, 1 );
sideLight.rotation.set(0, -Math.PI / 2, 0);
sideLight.lookAt(0, 0, 0);
sideLight.shadow.bias = -0.0001;
sideLight.shadow.mapSize.width = 1024;
sideLight.shadow.mapSize.height = 1024;

let sideLight2 = new THREE.SpotLight(0xffffff, 10, 10, 15, 0, 1);
sideLight2.castShadow = true;
// sideLight2.intensity = 4;
sideLight2.position.set(-2, 4, 1);
sideLight2.rotation.set(0, -Math.PI / 2, 0);
sideLight2.lookAt(0, 0, 0);
sideLight2.shadow.bias = -0.0001;
sideLight2.shadow.mapSize.width = 1024;
sideLight2.shadow.mapSize.height = 1024;

let point1 = new THREE.PointLight(0xffffff, 10, 100);
point1.position.set(2, 2, 1.5);
// scene.add(point1);

let point2 = new THREE.PointLight(0xffffff, 10, 100);
point2.position.set(-2, -2, 1.5);
// scene.add(point2);

// let areaHelper = new RectAreaLightHelper(titleArea);
let backHelper = new THREE.SpotLightHelper(backLight2);
let sideHelper = new THREE.SpotLightHelper(sideLight);
let sideHelper2 = new THREE.SpotLightHelper(sideLight2);
// scene.add(sideHelper2);
// scene.add(sideHelper);

let point1Helper = new THREE.PointLightHelper(point1);
// scene.add(point1Helper);

// scene.add(backHelper);
// scene.add(areaHelper);

camera.position.z = 6;
// camera.position.x = 6;
// camera.lookAt(0, 0, 0);

let loader = new GLTFLoader();
let l00t = null;
// let floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: .7, roughness: 0.5 }));
// floor.rotation.x = -Math.PI / 2;
// console.log(floor.position.y);
// floor.receiveShadow = true;
// scene.add(floor);

function invertColour(hex) {
    // Extract RGB components from the hex string
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Invert the RGB components
    let invertedR = 255 - r;
    let invertedG = 255 - g;
    let invertedB = 255 - b;

    // Convert the inverted RGB components back to a hex string
    let invertedColour = "#" + ((1 << 24) + (invertedR << 16) + (invertedG << 8) + invertedB).toString(16).slice(1);
    return invertedColour;
}

let borderMaterial;

async function createCard() {

    let card = new THREE.Group();

    const roughnessMapTexture = new THREE.TextureLoader().load('assets/ice.jpg');
    roughnessMapTexture.needsUpdate = true;

    const borderRoughnessMapTexture = new THREE.TextureLoader().load('assets/roughness3.jpg');
    borderRoughnessMapTexture.needsUpdate = true;

    borderMaterial = new THREE.MeshStandardMaterial({
        color: item.rarityHex,
        metalness: 1,
        roughness: 7,
        roughnessMap: borderRoughnessMapTexture
    });

   
    card.content = await loadCardContent(card, item);
    console.log(item.imageObj);
    card.add(card.content);

    // let cardHeight = card.contentSize.y;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = 256;
    canvas.height = 256;

    let originalRarity = item.rarityHex;
    let originalName = item.nameHex;
    let invertedRarity = invertColour(originalRarity);
    let invertedName = invertColour(originalName);
    
    let gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, invertedName);
    gradient.addColorStop(0.5, invertedRarity);
    gradient.addColorStop(1, invertedName);

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    let material = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 1,
        roughness: 4,
        roughnessMap: roughnessMapTexture
    });

    let cardGeom = new RoundedBoxGeometry(card.content.contentSize.x + 0.4, card.content.contentSize.y + 0.4, .1, 2, 1);
    let cardBackground = new THREE.Mesh(cardGeom, material);
    cardBackground.receiveShadow = true;
    cardBackground.castShadow = false;

    // Create a slightly larger geometry for the border
    let borderGeom = new RoundedBoxGeometry(card.content.contentSize.x + 0.6, card.content.contentSize.y + 0.6, .1, 2, 1); // Slightly larger and thicker
    let border = new THREE.Mesh(borderGeom, borderMaterial);
    border.castShadow = false;
    border.receiveShadow = false;
    border.position.z = -0.05;

    let backsideBackground = new THREE.Mesh(cardGeom, new THREE.MeshStandardMaterial({ color: 0x5f1e24, metalness: 1, roughness: 0.6 }));
    backsideBackground.position.z = -0.06;
    // textOutline.selectedObjects.push(backsideBackground);

    let backgroundGroup = new THREE.Group();
    backgroundGroup.add(cardBackground);
    backgroundGroup.add(border);
    backgroundGroup.add(backsideBackground);
    card.add(backgroundGroup);

    card.add(sideLight);
    card.add(sideLight2);
    card.add(backLight);

    sideLight.position.y = -(card.content.contentSize.y / 2) - 3;
    // sideHelper.update();
    sideLight2.position.y = (card.content.contentSize.y / 2) + 3;
    // sideHelper2.update();

    // let floorOffset = -card.content.contentSize.y / 2 - 0.5;
    // floor.position.y = floorOffset > -4 ? -4 : floorOffset;
    // console.log(floor.position.y);


    
    // cardBackground.position.set(card.content.contentCenter.x, card.content.contentCenter.y, 0);
    // border.position.set(card.content.contentCenter.x, card.content.contentCenter.y, -.05);

    card.background = backgroundGroup;

    outlinePass.selectedObjects.push(border);
    outlinePass.visibleEdgeColor = new THREE.Color(item.rarityHex);
    outlinePass.hiddenEdgeColor = new THREE.Color(item.rarityHex);

    loader.load('assets/loothdPerf3.glb', function (gltf) {
        l00t = gltf.scene;
        l00t.position.set(0, 0, -.15);
        l00t.scale.set(card.content.contentSize.x/4, card.content.contentSize.x*.7, card.content.contentSize.x*.7);
        l00t.rotation.y = Math.PI / 2;
        card.background.add(l00t);
        l00t.traverse(function (node) {
            node.castShadow = true;
            node.receiveShadow = false;
            node.renderOrder = 1000;
            console.log(node);
            if (node.isMesh) {
                if (node.material.type === 'MeshStandardMaterial' || node.material.type === 'MeshPhongMaterial') {
                    node.material.metalness = 0.8;
                    node.material.roughness = 0.4;
                    
                }
            }
        });
        
    });

    return card;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalizeWords(str) {
    return str.split(' ').map(capitalize).join(' ');
}


let fontLoader = new FontLoader();
let font = await fontLoader.load('assets/font/volk.json');


async function loadCardContent(card, item) {
    return new Promise((resolve, reject) => {
        let content = new THREE.Group();
        let yOffset = 1.3; // Initial Y offset for text placement
        let maxWidth = item.image ? 4 : 3;
        let size = 0.1;
        let colour = 0xffffff;
        let lh = 0.1;

        // we need these keys to be in a specific order
        // all other keys will be added in the order they appear in the object
        const orderedKeys = ['name', 'rarity', 'image', 'type', 'materials', 'enchantments', 'description'];

        item = Object.keys(item)
            .sort((a, b) => {
                if (a === 'description') return 1; 
                if (b === 'description') return -1;

                const indexA = orderedKeys.indexOf(a);
                const indexB = orderedKeys.indexOf(b);
                if (indexA === -1 && indexB === -1) return 0;
                if (indexA === -1) return 1;
                if (indexB === -1) return -1;
                return indexA - indexB;
            })
            .reduce((obj, key) => {
                obj[key] = item[key];
                return obj;
            }, {});

        Object.entries(item).forEach(([key, value]) => {
            if (value === '' || (typeof value === 'object' && Object.keys(value).length === 0)) {
                delete item[key];
            }
        });

        item.rarity = `${capitalize(item.rarity)} ${capitalizeWords(item.type)}`;
        delete item.type;
        console.log(item);

        fontLoader.load('assets/font/volk.json', function (font) {
            Object.entries(item).forEach(([key, value], index) => {
                console.log(key);
                if(key === 'nameHex' || key === 'rarityHex') {
                    yOffset += 0.2;
                    return;
                }
                let skip = false;
                switch(key) {
                    case 'name':
                        size = 0.2;
                        colour = item.nameHex;
                        skip = false;
                        break;
                    case 'rarity':
                        size = 0.15;
                        yOffset += 0.15;
                        colour = item.rarityHex;
                        skip = false;
                    break;
                    case 'image':
                        skip = true;
                        console.log(yOffset);
                        yOffset -= 0.2;
                        let imgHeight = createImagePlane(value, content, yOffset, index);
                        yOffset -= imgHeight - 0.2;
                        console.log('imgHeight:', imgHeight);
                        break;
                    case 'materials':
                        skip = false;
                        colour = 0xffffff;
                        yOffset += 0.2;
                        break;
                    case 'enchantments':
                        skip = false;
                        yOffset += 0.2;
                        break;
                    default:
                        size = 0.12;
                        colour = 0xffffff;
                        skip = false;
                        break;
                }   
                if(!skip) {
                    let textLines = wrapText(`${capitalize(typeof value === 'string' ? value : key)}`, font, size, maxWidth);
                    textLines.forEach((line, i) => {
                        buildText(line, colour, content, yOffset, index, i, font, size, lh);
                    });
                    yOffset -= .3 * textLines.length; // Adjust Y offset for the next item
                    
                    if (typeof value === 'object') {
                        yOffset -= 0.1; // Add a little extra space for the nested object
                        if(key === 'enchantments') {
                            yOffset -= 0.05;
                        }
                        Object.entries(value).forEach(([innerKey, innerValue]) => {

                            let textLines = wrapText(`${capitalize(innerValue)}`, font, 0.1, maxWidth);
                            textLines.forEach((line, i) => {
                                buildText(line, 0xffffff, content, yOffset, index, i, font, 0.1, 0.1, -0.8);
                            });
                            yOffset -= 0.2 * textLines.length;
                        });
                        
                    }
                }
                
            
            });

            content.updateMatrixWorld(true); // Force update of the world matrix

            const contentBoundingBox = new THREE.Box3().setFromObject(content);
            const contentSize = contentBoundingBox.getSize(new THREE.Vector3());
            const contentCenter = contentBoundingBox.getCenter(new THREE.Vector3());
            
            console.log(contentSize, contentCenter);
            content.contentSize = contentSize;
            content.contentCenter = contentCenter;

            content.position.set(-contentCenter.x, -contentCenter.y, 0);

            let originalColour = item.rarityHex.replace('#', '0x');
            let invertedColour = 0xffffff - originalColour;

            resolve(content);
        });
        
    
    });
    
}

function buildText(text, colour, content, yOffset, index, lineIndex, font, size = 0.1, lh = 0.1, xOffset = -0.9) {
    let textGeom = new TextGeometry(text, {
        font: font,
        size: size,
        depth: 0.02,
        curveSegments: 1,
        bevelEnabled: false,
    });
    let baseLineHeight = lh;
    let lineHeight = baseLineHeight + size;
    let material = new THREE.MeshStandardMaterial({ color: colour, metalness: 1, roughness: 0.8 });
    material.emissive = new THREE.Color(colour);
    material.emissiveIntensity = .8;
    let textMesh = new THREE.Mesh(textGeom, material);
    textMesh.castShadow = true;
    textMesh.position.set(xOffset, yOffset - (index * lineHeight) - (lineIndex * lineHeight), .05); // Adjust position as needed
    content.add(textMesh);
    // textOutline.selectedObjects.push(textMesh);
}

function wrapText(text, font, size, maxWidth) {
    let words = text.split(' ');
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        let word = words[i];
        let lineTest = currentLine + ' ' + word;
        let metrics = measureText(lineTest, font, size);
        if (metrics.width <= maxWidth) {
            currentLine = lineTest;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);

    return lines;
}

function measureText(text, font, size) {
    let textGeom = new TextGeometry(text, {
        font: font,
        size: size,
        depth: 0,
        curveSegments: 12
    });
    textGeom.computeBoundingBox();
    let width = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
    return { width };
}

function createImagePlane(src, content, yOffset, index) {
    let img = new Image();
    img.src = src;
    let imgWidth = 3;
    let imgHeight = 3;
    img.onload = function() {
        let imgPlane = new THREE.BoxGeometry(imgWidth, imgHeight, 0.01);
        let imgTexture = new THREE.TextureLoader().load(src);
        let imgMaterial = new THREE.MeshBasicMaterial({ map: imgTexture, transparent: true });
        let imgMesh = new THREE.Mesh(imgPlane, imgMaterial);

        let cardCenter = content.contentCenter;


        let imgBackground = new THREE.Mesh(new THREE.PlaneGeometry(imgWidth + .1, imgHeight + .1), borderMaterial);
        imgBackground.position.set(cardCenter.x, yOffset - imgHeight/2, 0.06);
        imgBackground.receiveShadow = true;
        imgBackground.castShadow = true;
        content.add(imgBackground);

        imgMesh.position.set(cardCenter.x, yOffset - imgHeight/2, 0.065);
        content.add(imgMesh);
    };
    return imgWidth;
}

let card = await createCard();

scene.add(card);

let cardFlip = false;

let flip = document.getElementById('flip');
flip.addEventListener('click', function() {
    cardFlip = !cardFlip;
});


let shareBtn = document.getElementById('share');
shareBtn.addEventListener('click', function(event) {
    event.preventDefault();
    captureCameraView();
});

async function captureCameraView() {

    //we want a slightly random card quaternion
    let random = (Math.random() * 0.5) - 0.25;

    let quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, random, 0, 'XYZ'));
    console.log(quaternion);
    card.quaternion.copy(quaternion);

    console.log(camera.position);
    camera.position.set(0, random, card.content.contentSize.y);
    console.log(camera.position);
    camera.lookAt(0, 0, 0);

    // Render the scene
    composer.render();

    // Create an offscreen canvas and draw the rendered scene onto it
    let offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = renderer.domElement.width;
    offscreenCanvas.height = renderer.domElement.height;
    let offscreenCtx = offscreenCanvas.getContext('2d');

    offscreenCtx.drawImage(renderer.domElement, 0, 0);

    // Get the image data from the offscreen canvas
    let imageData = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
    let data = imageData.data;

    // Determine the bounding box of non-transparent pixels
    let minX = offscreenCanvas.width, minY = offscreenCanvas.height, maxX = 0, maxY = 0;
    for (let y = 0; y < offscreenCanvas.height; y++) {
        for (let x = 0; x < offscreenCanvas.width; x++) {
            let alpha = data[(y * offscreenCanvas.width + x) * 4 + 3];
            if (alpha > 0) {
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
            }
        }
    }

    // Create a new canvas to fit the bounding box
    let croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = maxX - minX + 1;
    croppedCanvas.height = maxY - minY + 1;
    let croppedCtx = croppedCanvas.getContext('2d');

    // Draw the cropped area onto the new canvas
    croppedCtx.drawImage(offscreenCanvas, minX, minY, croppedCanvas.width, croppedCanvas.height, 0, 0, croppedCanvas.width, croppedCanvas.height);

    // Export the image from the new canvas
    let img = new Image();
    img.onload = function() {
        let a = document.createElement('a');
        a.href = img.src;
        a.download = `l00t_${item.name.replace(/\s/g, '_').toLowerCase()}.png`;
        document.body.appendChild(a); // Temporarily add the link to the document
        a.click();
        document.body.removeChild(a); // Remove the link after triggering the download
    };
    img.src = croppedCanvas.toDataURL('image/png');
}



let buttons = [];

async function createButton(text, position, color, scale, onClick) {
    let button;
    fontLoader.load('assets/font/volk.json', function (font) {
        let geometry = new TextGeometry(text, {
            font: font,
            size: 3,
            depth: .5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.3,
        });

        geometry.computeBoundingBox();
        geometry.center();

        let material = new THREE.MeshStandardMaterial({ color: color, metalness: 1, roughness: 0.5});
        button = new THREE.Mesh(geometry, material);
        button.originalMaterial = color;

        // let btnLight = new THREE.PointLight(0xffffff, 1, 1000);
        // btnLight.position.set(camera.position.x, camera.position.y, camera.position.z +10);
        // button.add(btnLight);

        // let btnLightHelper = new THREE.Mesh(
        //     new THREE.SphereGeometry(1),
        //     new THREE.MeshBasicMaterial({ color: 0xff0000 })
        // );
        // btnLightHelper.position.copy(btnLight.position);
        // button.add(btnLightHelper);
        
        // addClickMesh(button);

        button.position.set(position.x, position.y, position.z);
        button.scale.set(scale, scale, scale);
        
        scene.add(button);

        // outlinePass.selectedObjects.push(button);

        buttons.push(button);
        button.onClick = onClick;
        button.button = button;
        button.scaleNormal = new THREE.Vector3(scale, scale, scale);
        button.scaleHover = new THREE.Vector3(scale * 1.1, scale * 1.1, scale * 1.1);
    });

    return button;
}


let camRestPos = new THREE.Vector3(0, 0, 4);
let lerpFactor = 0.05;

// window.addEventListener('load', function() {
    let overlay = document.getElementById('fade-overlay');
    overlay.style.opacity = 0;
        
// });

let time = 0.0;
let clock = new THREE.Clock();

function animate() {
    let delta = clock.getDelta();
    time += delta;
    // stats.update();


    requestAnimationFrame(animate);

    if(card && l00t) {
        // Apply scale to card.background
        // let scale = 1 + Math.sin(time) * 1;
        // card.background.scale.y = scale;
        // card.position.set(0, 0, 0);
    }

    // pan the camera slightly by moving the mouse
    // if(camera && mouse && card) {
    //     if(targetMouse.x !== null || targetMouse.y !== null) {
    //         // interpolate the mouse position
    //         mouse.lerp(targetMouse, 0.05);

    //     }
    //     // camera.position.x.lerp(mouse.x * 2, lerpFactor);
    //     // camera.position.y.lerp(mouse.y * 2, lerpFactor);
    //     const targetPosition = new THREE.Vector3(mouse.x * 2, mouse.y*2, camera.position.z);
    //     scrollY *= 0.5;
    //     camera.position.lerp(targetPosition, lerpFactor);

    //     const targetEuler = new THREE.Euler(mouse.y /4, cardFlip ? -mouse.x /4 : Math.PI - mouse.x /4, 0, 'XYZ');
    //     const targetQuaternion = new THREE.Quaternion().setFromEuler(targetEuler);
        
    //     card.quaternion.slerp(targetQuaternion, lerpFactor);

    //     camera.lookAt(new THREE.Vector3(mouse.x*2, mouse.y*2, 0));

        

    // }

    if(card) {
        let cardEuler = new THREE.Euler(0, cardFlip ? Math.PI : 0, 0, 'XYZ');
        let cardQuaternion = new THREE.Quaternion().setFromEuler(cardEuler);
        card.quaternion.slerp(cardQuaternion, lerpFactor);
    }
    

    // camera.position.lerp(camRestPos, lerpFactor);
    composer.render();
    controls.update();
    // renderer.render(scene, camera);
}
animate();