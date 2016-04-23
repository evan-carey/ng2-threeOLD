export function myUtil() {
  (<any>this.SYSTEM_CONFIG_DEV.paths)['three'] = `${this.APP_BASE}node_modules/three/three`;
}
