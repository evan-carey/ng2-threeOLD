import {Injectable} from '@angular/core';
import * as THREE from 'three';

@Injectable()
export class RendererService {
	private _renderer: THREE.WebGLRenderer;

	constructor() {
		this._renderer = new THREE.WebGLRenderer({ alpha: true });
		this._renderer.setSize(window.innerWidth, window.innerHeight);
		this._renderer.setClearColor(0x000000, 1);
		this.appendRenderer();
	}

	appendRenderer() {
		document.body.appendChild(this._renderer.domElement);
	}

	getRenderer(): THREE.WebGLRenderer {
		return this._renderer;
	}

}
