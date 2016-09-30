// scene
var scene = new THREE.Scene();
var material;
var mesh;

// camera
var camera = new THREE.OrthographicCamera(
	-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, 1, 1000 );
camera.position.z = 500;

// renderer
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// read data
var loader = new THREE.JSONLoader();
loader.load('teapotConverted.js', (geometry, materials) => {
  material = new THREE.MultiMaterial(materials);
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
});


// var loader = new THREE.TextureLoader();
// // mesh = geometry + material(texture)
// var texture = loader.load('earth2.png');
// var material = new THREE.MeshPhongMaterial({
// 	color: 0x99FFFF,
// 	specular: 0x333333,
// 	shininess: 20, 
// 	map: texture,
//   specularMap: texture,
//   normalMap: texture,
// });

// three point lighting
var keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
var fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
var rimLight = new THREE.DirectionalLight(0xffffff, 0.8);

keyLight.position.set(0, -80, 80);
fillLight.position.set(80, 0, -80);
rimLight.position.set(-80, 80, 0);

//put light into scene
scene.add(keyLight);
scene.add(fillLight);
scene.add(rimLight);


// animation and interacton
var controls = new THREE.OrbitControls(camera);

var render = function () {
	requestAnimationFrame(render);

	if (!mesh) {
		return;
	}
	//self-rotation
	mesh.rotation.y += 0.01;
  mesh.scale.set(100, 100, 100);
	controls.update();
	renderer.render(scene, camera);
};

render();
