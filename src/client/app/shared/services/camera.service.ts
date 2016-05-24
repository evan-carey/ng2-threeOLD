import {Injectable} from '@angular/core';

@Injectable()
export class CameraService {
    private _camera: THREE.PerspectiveCamera;

    constructor() { }

    getCamera(): THREE.PerspectiveCamera {
        return this._camera;
    }
}