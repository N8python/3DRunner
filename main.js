import * as THREE from 'https://unpkg.com/three/build/three.module.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const loader = new THREE.FontLoader();
const renderer = new THREE.WebGLRenderer();
const enemies = [];
const healthBar = document.getElementById("healthBar").getContext("2d");
let playerHealth = 100;
let playerScore = 0;
renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9);
document.body.appendChild(renderer.domElement);
const groundGeometry = new THREE.BoxGeometry(100, 1000, 10);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
const playerGeometry = new THREE.BoxGeometry(10, 10, 10);
const playerMaterial = new THREE.MeshPhongMaterial({ color: 0xff00ff });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
const createSphere = (x, y, z) => {
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 60 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    return sphere;
}
ground.rotation.x = Math.PI / 2;
//ground.rotation.z = Math.PI / 4;
//ground.position.x -= 20;
scene.add(ground);
scene.add(player);
const testSphere = createSphere(0, 10, -500);
enemies.push(testSphere);
scene.add(testSphere);
const light = new THREE.DirectionalLight(0xFFFFFF, 1);
const playerLight = new THREE.DirectionalLight(0xFFFFFF, 1);
const playerLight2 = new THREE.DirectionalLight(0xFFFFFF, 1);
scene.add(light);
scene.add(playerLight);
scene.add(playerLight2);
light.position.set(50, 50, 100);
playerLight.position.set(-500, 10, 495);
playerLight2.position.set(150, 10, 495);
camera.position.z = 550;
camera.position.y = 25;
player.position.z = 495;
player.position.y = 10;
player.position.x = 0;
let targetPlayerX = 0;
//camera.position.y = 500;
//camera.position.x = 500;
let toDie = false;

function animate() {
    if (toDie) {
        document.getElementById("gameOver").style.display = "block";
        return;
    }
    playerScore++;
    document.getElementById("score").innerHTML = `Score: ${playerScore}`;
    healthBar.clearRect(0, 0, 150, 20);
    healthBar.fillStyle = `rgb(${255 * (1 - (playerHealth / 100))}, ${255 * (playerHealth / 100)}, 0)`;
    healthBar.fillRect(0, 0, 150 * (playerHealth / 100), 20);
    enemies.forEach((enemy, i) => {
        const squaredDist = (enemy.position.x - player.position.x) ** 2 + (enemy.position.y - player.position.y) ** 2 + (enemy.position.z - player.position.z) ** 2;
        if (Math.sqrt(squaredDist) < 15) {
            playerHealth -= 5;
        }
        enemy.position.z += 10;
        if (enemy.position.z >= 600) {
            scene.remove(enemy);
            enemies.splice(enemy, i);
        }
    })
    if (Math.random() < 0.05) {
        let xCoord = 0;
        let seed = Math.random();
        if (seed < 0.33) {
            xCoord = 45;
        }
        if (seed > 0.66) {
            xCoord = -45;
        }
        const s = createSphere(xCoord, 10, -500);
        enemies.push(s);
        scene.add(s);
    }
    /*if (camera.position.z > 75) {
        camera.position.z -= 0.5;
        moved = true;
    }
    if (camera.position.y < 20) {
        camera.position.y += 0.5;
        moved = true;
    }
    if (camera.position.x < 50) {
        camera.position.x += 0.5;
        moved = true;
    }*/
    //camera.lookAt(-12, 0, 10);
    player.position.x += (targetPlayerX - player.position.x) / 10;
    if (playerHealth <= 0) {
        toDie = true;
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
document.onkeypress = (e) => {
        if (e.key === "d" && targetPlayerX < 45) {
            targetPlayerX += 45;
        } else if (e.key === "a" && targetPlayerX > -45) {
            targetPlayerX -= 45;
        }
    }
    /**/