uniform float uTime;
varying vec2 vUv;

void main(){

    float speed = 0.5;
    float scale = 3.0;

    // Calculate the rainbow color based on the sine function and uTime
    vec3 rainbowColor = vec3(
        sin(scale * vUv.x + uTime * speed),
        sin(scale * vUv.x + uTime * speed + 2.0 * 3.14159 / 3.0),
        sin(scale * vUv.x + uTime * speed + 4.0 * 3.14159 / 3.0)
    );

    // Normalize the color to be in the range [0, 1]
    rainbowColor = 0.5 * rainbowColor + 0.5;

    gl_FragColor = vec4(rainbowColor,1.0);
}