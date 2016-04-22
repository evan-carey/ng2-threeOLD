import {Component} from 'angular2/core';

@Component({
  selector: 'gl-cube',
  moduleId: module.id,
  template: ''
})
export class CubeComponent {

  public camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private mesh: THREE.Mesh;
  private shaderMaterial: THREE.ShaderMaterial;
  private frame: number = 0;

  constructor() {
    var width: number = window.innerWidth;
    var height: number = window.innerHeight;

    // create renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    // set dimensions
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 1);

    // bind renderer to DOM
    document.body.appendChild(this.renderer.domElement);

    // create scene
    this.scene = new THREE.Scene();

    // create camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);

    // position camera
    this.camera.position.set(0, 0, 1200);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // add object
    var triangles: number = 3000;

    var geometry: THREE.BufferGeometry = new THREE.BufferGeometry();

    var pos: Float32Array = new Float32Array(triangles * 3 * 3);
    var norm: Float32Array = new Float32Array(triangles * 3 * 3);
    var colors: Float32Array = new Float32Array(triangles * 3 * 3);
    var values: Float32Array = new Float32Array(triangles * 3 * 3);

    var color: THREE.Color = new THREE.Color();

    var n: number = 800, n2: number = n / 2;
    var d: number = 120, d2: number = d / 2;

    var pA: THREE.Vector3 = new THREE.Vector3();
    var pB: THREE.Vector3 = new THREE.Vector3();
    var pC: THREE.Vector3 = new THREE.Vector3();

    var cb: THREE.Vector3 = new THREE.Vector3();
    var ab: THREE.Vector3 = new THREE.Vector3();

    for (var i: number = 0; i < pos.length; i += 9) {
      // positions
      var x: number, y: number, z: number;
      x = Math.random() * n - n2;
      y = Math.random() * n - n2;
      z = Math.random() * n - n2;

      var ax: number, ay: number, az: number;
      ax = x + Math.random() * d - d2;
      ay = y + Math.random() * d - d2;
      az = z + Math.random() * d - d2;

      var bx: number, by: number, bz: number;
      bx = x + Math.random() * d - d2;
      by = y + Math.random() * d - d2;
      bz = z + Math.random() * d - d2;

      var cx: number, cy: number, cz: number;
      cx = x + Math.random() * d - d2;
      cy = y + Math.random() * d - d2;
      cz = z + Math.random() * d - d2;

      pos[i] = ax;
      pos[i + 1] = ay;
      pos[i + 2] = az;

      pos[i + 3] = bx;
      pos[i + 4] = by;
      pos[i + 5] = bz;

      pos[i + 6] = cx;
      pos[i + 7] = cy;
      pos[i + 8] = cz;


      values[i] = ax;
      values[i + 1] = ay;
      values[i + 2] = az;

      values[i + 3] = bx;
      values[i + 4] = by;
      values[i + 5] = bz;

      values[i + 6] = cx;
      values[i + 7] = cy;
      values[i + 8] = cz;

      // flat face normals

      pA.set(ax, ay, az);
      pB.set(bx, by, bz);
      pC.set(cx, cy, cz);

      cb.subVectors(pC, pB);
      ab.subVectors(pA, pB);
      cb.cross(ab);

      cb.normalize();

      var nx: number = cb.x;
      var ny: number = cb.y;
      var nz: number = cb.z;

      norm[i] = nx;
      norm[i + 1] = ny;
      norm[i + 2] = nz;

      norm[i + 3] = nx;
      norm[i + 4] = ny;
      norm[i + 5] = nz;

      norm[i + 6] = nx;
      norm[i + 7] = ny;
      norm[i + 8] = nz;

      // colors

      var vy: number = (y / n) + 0.5;
      var vz: number = (z / n) + 0.5;
      var vx: number = (x / n) + 0.5;

      color.setRGB(vx, vy, vz);

      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;

      colors[i + 3] = color.r;
      colors[i + 4] = color.g;
      colors[i + 5] = color.b;

      colors[i + 6] = color.r;
      colors[i + 7] = color.g;
      colors[i + 8] = color.b;


    }
    // var values:number[] = [];
    // 	for(var v = 0; v < triangles; v++) {
    // 		values.push(Math.random() * 300);
    // 	}

    geometry.addAttribute('position', new THREE.BufferAttribute(pos, 3));
    geometry.addAttribute('displacement', new THREE.BufferAttribute(values, 3));
    geometry.addAttribute('normal', new THREE.BufferAttribute(norm, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

    geometry.computeBoundingSphere();

    // var material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
    // 	color: 0xaaaaaa,
    // 	specular: 0xffffff,
    // 	shininess: 250,
    // 	side: THREE.DoubleSide,
    // 	vertexColors: THREE.VertexColors
    // });


    var uniforms: Object = {
      amplitude: {
        type: 'f',
        value: 0
      }
    };

    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      // attributes: attributes,
      defines: {
        USE_COLOR: colors
      },
      vertexShader: document.getElementById('vert').textContent,
      fragmentShader: document.getElementById('frag').textContent
    });

    this.mesh = new THREE.Mesh(geometry, this.shaderMaterial);

    this.scene.add(this.mesh);

    window.addEventListener('resize', this.onWindowResize, false);
    document.addEventListener('mousemove', this.onMouseMove, false);

    // lighting
    var ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0x444444);
    this.scene.add(ambientLight);

    var light1: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    light1.position.set(3000, 3000, 3000);
    this.scene.add(light1);

    var light2: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    light2.position.set(-3000, 3000, 1000);
    this.scene.add(light2);

    this.renderer.render(this.scene, this.camera);

    this.render();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(event: Event) {
    event.preventDefault();
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.render();
  }

  update() {
    var time: number = Date.now() * 0.001;
    this.frame += 0.01;
    this.shaderMaterial.uniforms.amplitude.value = Math.sin(this.frame);
    this.mesh.rotation.x = time * 0.15;
    this.mesh.rotation.y = time * 0.2;
    this.mesh.rotation.z = time * 0.1;
  }

  render() {
    this.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());

  }
}
