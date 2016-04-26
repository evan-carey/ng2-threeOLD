import {Injectable} from 'angular2/core';

@Injectable()
export class SceneService {

  private _scene: THREE.Scene;

  constructor() {
    this._scene = new THREE.Scene;
  }

  getScene() : THREE.Scene {
    return this._scene;
  }

}
