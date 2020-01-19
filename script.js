let camera, scene, renderer, controls
let cube

function init() {
	// SCENE
	scene = new THREE.Scene()
	scene.background = new THREE.Color('darkslategrey')

	// GRID
	const size = 10
	const divisions = 10

	const gridHelper = new THREE.GridHelper(size, divisions)

	scene.add(gridHelper)

	// CAMERA
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
	camera.position.z = 3
	camera.position.y = 3
	camera.lookAt(0, 0, 0)

	// RENDERER
	renderer = new THREE.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	// CONTROLS
	controls = new THREE.OrbitControls(camera, renderer.domElement)
	controls.update()

	// LIGHTS
	// add pointlight
	const pointLight = getPointLight(0.66)
	pointLight.position.set(2, 2, 0)
	scene.add(pointLight)

	const sphereSize = 1
	const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize)
	scene.add(pointLightHelper)

	// add hemisphere light
	const hemiLight = new THREE.HemisphereLight('#00C2FF', '#FF9500', 0.4)
	hemiLight.position.set(0, 10, 0)
	scene.add(hemiLight)
	const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemiLight, 5)
	scene.add(hemisphereLightHelper)

	// cube
	cube = getCube()
	scene.add(cube)

	// EVENTS
	window.addEventListener('resize', onWindowResize, false)
}

// create pointlight
function getPointLight(intensity) {
	const light = new THREE.PointLight('#06FFC4', intensity)
	light.position.x = 0
	light.position.y = 0
	light.position.z = 0

	return light
}

function getCube() {
	const geometry = new THREE.BoxGeometry(1, 1, 1)
	const material = new THREE.MeshPhongMaterial({ color: 0xff0000 })
	const cube = new THREE.Mesh(geometry, material)

	return cube
}

// on resize
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
}

const animate = function() {
	requestAnimationFrame(animate)

	cube.rotation.x += 0.01
	cube.rotation.y += 0.01

	renderer.render(scene, camera)
}

init()
animate()
