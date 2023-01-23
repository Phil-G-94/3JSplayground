
// webGL entry point || the Scene() constructor of the THREE object
// creates a new scene, which represents the whole 3d world we are trying to display
const scene = new THREE.Scene();

// creating a camera to represent the viewers position || the most common projection mode for rendering a 3D scene
  // its params represent Camera frustum field of view; aspect ratio; near plane, and far plane (in that order)
const camera = new THREE.PerspectiveCamera(
  
  // how wide the area in front of the camera is that should be visible onscreen; expects number for degrees;
  75,
  
  // the ratio of the scene's width / height; changing this will distort the scene
  window.innerHeight / window.innerWidth,
  
  // how close to the camera objects can appear before we can stop rendering them to the screen
  0.1,
  
  // how far away things are from the camera before they are no longer rendered
  1000
);

// we set the camera's position to be 5 distance units out of the Z plane (out of the screen towards you)
camera.position.z = 5;

// here we include the **renderer** - an object that renders a given scene, as viewed through a given camera. 
// we create one using the WebGLRenderer() constructor

// creates a new renderer
const renderer = new THREE.WebGLRenderer();

// leveraging .setSize() method || resizes the output canvas to (width, height) with device pixel ratio taken into account, 
  // also sets viewport to that size. 
renderer.setSize(window.innerHeight, window.innerWidth);

// appends the <canvas> element to the <body> element so that anything the renderer draws will get displayed in our window
document.body.appendChild(renderer.domElement);


// Creating the Cube

// create a cube global variable so the cube can be accessed anywhere within the code 
let cube;

// we create a new TextureLoader object and grasp it with a variable || in three.js TextureLoader is actually a class, extended from its own constructor - Loader

const loader = new THREE.TextureLoader();

// we call the load() method on our TextureLoader object, passing in the url for the texture we want to load as the first parameter and, 
//  passing a function we want to execute once the texture has loaded as the second param. 

loader.load("metal003.png", (texture) => {
  // assuming that once we load the image we return a **texture** object because...
  // we specify that we want a 2x2 repeat of the image wrapped around all sides of the cube using the .wrapS, .wrapT and .repeat. 
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);

  // we create a new BoxGeometry object/class to define the object's shape
  const geometry = new THREE.BoxGeometry(2.4, 2.4, 2.4, 2.4);

  // and a new MeshLambertMaterial object/class to define the object's material/texture
  const material = new THREE.MeshLambertMaterial({ map: texture});

  // then we bring these together inside the .Mesh()
  cube = new THREE.Mesh(geometry, material);

  // adds the **cube** as a child of object *scene*
  scene.add(cube);

  // hoisting of a draw() function, yet to be declared  
  draw();
});


// Lighting

// ambient light illuminates the entire scene
// instantiate a new AmbientLight object passing in rgb value for soft white, grasp it in a variable
const light = new THREE.AmbientLight("rgb(255, 255, 255)"); // soft white light

// add **light** as a child of the *scene* object
scene.add(light);

// a SpotLight is a directional beam of light illuminating the object specifically
// instantiate a new SpotLight object passing in rgb value for soft white, grasp it in a variable 
const spotLight = new THREE.SpotLight("rgb(255, 255, 255)");

// sets spotlight position vis-a-vis object?
spotLight.position.set(100, 1000, 1000);

// if set to true light will cast dynamic shadows. **This is expensive and requires tweaking to make it right**
spotLight.castShadow = true;

// adds **spotLight** as a child of the *scene* object
scene.add(spotLight);


// Executive function 

function draw() {
  // On each frame, we rotate the cube slightly on its x and y axis
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // render the scene object as viewed by our camera object
  renderer.render(scene, camera);

  requestAnimationFrame(draw);
};