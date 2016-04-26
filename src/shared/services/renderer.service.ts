import {Injectable} from 'angular2/core';

@Injectable()
export class RendererService {
	private _renderer: THREE.WebGLRenderer;

	constructor() {
		this._renderer = new THREE.WebGLRenderer({ alpha: true });
		this._renderer.setSize(window.innerWidth, window.innerHeight);
		this._renderer.setClearColor(0x000000, 1);
	}

	getRenderer(): THREE.WebGLRenderer {
		return this._renderer;
	}

}
