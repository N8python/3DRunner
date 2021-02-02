let fontText;
loader.load("https://unpkg.com/three@0.125.2/examples/fonts/helvetiker_regular.typeface.json", font => {
    const geometry = new THREE.TextGeometry('Hello three.js', {
        font: font,
        size: 0.1,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
    });
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    fontText = mesh;
    scene.add(mesh);
})
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push(new THREE.Vector3(-1, 0, 0));
points.push(new THREE.Vector3(0, 1, 0));
points.push(new THREE.Vector3(1, 0, 0));
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeometry, lineMaterial);
const cube = new THREE.Mesh(geometry, material);
const sphereGeometry = new THREE.SphereGeometry(0.2, 16, 16);
const sphereMaterial = new THREE.MeshPhongMaterial({ emissive: "purple" });
sphereMaterial.color.setRGB(255, 255, 0);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = -1;
scene.add(sphere);
scene.add(cube);
scene.add(line);
const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(-1, 2, 4);
scene.add(light);
camera.position.z = 2;
let tick = 0;

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.position.x += 0.01 * Math.sin(tick / 10);
    cube.position.y += 0.01 * Math.sin((2 * tick) / 10);
    cube.position.z += 0.01 * Math.cos((3 * tick) / 10);
    line.rotation.x += 0.01;
    sphere.position.z += 0.03 * Math.sin(tick / 10);
    sphere.rotation.x += 0.1 * Math.sin(tick / 10);
    sphere.rotation.y += 0.2 * Math.sin((2 * tick) / 10);
    sphere.rotation.z += 0.1 * Math.cos((3 * tick) / 10);
    light.position.x += 0.01;
    if (fontText) {
        fontText.rotation.x += 0.03;
        fontText.rotation.y += 0.02;
        fontText.rotation.z += 0.01;
        fontText.position.x += 0.01 * Math.sin(tick / 10);
    }
    tick++;
    //camera.position.z -= 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();