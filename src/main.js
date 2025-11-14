
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';

const CANVAS = document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(CANVAS, true);

const createScene = function () {
  // création de la scene
  const scene = new BABYLON.Scene(engine);
  // ajout de la lumiere et camera par défaut
  scene.createDefaultCameraOrLight(true, false, true);
  scene.lightsEnabled = false;
  // zoom arrière sur le cube
  // verifie si la camera est un ArcRotateCamera ou une FreeCamera
  const camera = scene.activeCamera;
  if (camera instanceof BABYLON.ArcRotateCamera) {
    camera.radius = 2;
    // camera.setTarget(new BABYLON.Vector3(0, 0, 0));
  }
  const boxMat = new BABYLON.StandardMaterial();
  boxMat.emissiveTexture = new BABYLON.Texture('/OhMyCat-Images.jpg', scene);
  //faceColors: [new BABYLON.Color4(1, 1, 0, 1)]
  const box = new BABYLON.MeshBuilder.CreateBox('monCube', {
    size: 0.7,
    faceUV: [
      new BABYLON.Vector4(0, 0, 1 / 6, 1),
      new BABYLON.Vector4(1 / 6, 0, 2 / 6, 1),
      new BABYLON.Vector4(2 / 6, 0, 3 / 6, 1),
      new BABYLON.Vector4(3 / 6, 0, 4 / 6, 1),
      new BABYLON.Vector4(4 / 6, 0, 5 / 6, 1),
      new BABYLON.Vector4(5 / 6, 0, 1, 1)
    ],
    wrap: true
  }, scene);
  //ajout image a chaque face du cube
  // cube = 6 faces donc l'image contient 6 partie égale, 1 pour chaque surface
  box.receiveShadows = true;
  box.material = boxMat;
box.receiveShadows = true;

// rotation automatique du cube
scene.registerBeforeRender(() => {
  box.rotation.y += 0.01;
  box.rotation.x += 0.02;
  box.rotation.z += 0.01;
});
  return scene;
};

// creation de la scene
const scene = createScene();
// lancement de la boucle de rendu
engine.runRenderLoop(() => {
  scene.render();

});
// ajustement lors du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
  engine.resize();
});