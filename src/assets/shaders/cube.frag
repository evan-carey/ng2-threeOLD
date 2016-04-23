#ifdef GL_ES
precision highp float;
#endif

// same name and type as VS
varying vec3 vNormal;
varying vec3 vColor;
void main() {
    // calc the dot product and clamp
    // 0 -> 1 rather than -1 -> 1
    vec3 light = vec3(0.0,0.0,1.0);

    // ensure it's normalized
    light = normalize(light);

    float dProd = max(0.8, dot(vNormal, light));
    //float dProd = dot(vNormal, light);

    // feed into our frag colour
    gl_FragColor = vec4(vColor.x * dProd, vColor.y * dProd, vColor.z * dProd, 1.0);
    //gl_FragColor = vec4(dProd, dProd, dProd, 1.0);

}