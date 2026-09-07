"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function RedWarpGradient() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 2;

    const geo = new THREE.PlaneGeometry(2.15, 2.15);

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        red: { value: new THREE.Color("#f00000") },
        red2: { value: new THREE.Color("#ff2b2b") },
        black: { value: new THREE.Color("#111111") },
        white: { value: new THREE.Color("#fffaf6") },
      },

      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,

      fragmentShader: `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 red;
  uniform vec3 black;
  uniform vec3 white;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = .5;

    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.0 + vec2(3.1, 1.7);
      a *= .5;
    }

    return v;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 1.3;

    // broad satin-like flow
    vec2 q = uv;

    float flowA = fbm(q * 2.2 + vec2(t * .16, -t * .10));
    float flowB = fbm(q * 3.0 + vec2(-t * .11, t * .14));

    q.x += (flowA - .5) * .34;
    q.y += (flowB - .5) * .28;

    // slower curtain wave
    q.x += sin(q.y * 4.0 + t * .5) * .06;
    q.y += cos(q.x * 3.0 - t * .35) * .035;

    // continuous fluid field
    float f =
      fbm(q * 2.0 + vec2(t * .11, 0.0)) * .65 +
      fbm(q * 3.4 - vec2(0.0, t * .09)) * .35;

    // second field breaks symmetry
    float g =
      fbm(q * 2.6 + vec2(-t * .08, t * .07));

    vec3 col = red;

    // black regions
    float blackMask = smoothstep(.56, .72, f + g * .22);
    col = mix(col, black, blackMask * .82);

    // white regions, independent from black
    float whiteField =
      fbm(q * 2.15 + vec2(t * .07, -t * .12));

    float whiteMask = smoothstep(.63, .78, whiteField - f * .12);
    col = mix(col, white, whiteMask);

    // soften the boundaries
    float softBlack = smoothstep(.48, .61, f + g * .2);
    col = mix(col, black, softBlack * .35);

    float softWhite = smoothstep(.52, .66, whiteField - f * .08);
    col = mix(col, white, softWhite * .28);

    // keep some red dominance
    float redReturn = smoothstep(.30, .58, fbm(q * 1.5 - t * .03));
    col = mix(col, red, redReturn * .18);

    // very subtle texture
    float grain = hash(gl_FragCoord.xy + uTime * 4.0);
    col += (grain - .5) * .008;

    gl_FragColor = vec4(col, 1.0);
  }
`,
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const resize = () => {
      renderer.setSize(parent.clientWidth, parent.clientHeight, false);
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const clock = new THREE.Clock();
    let frame: number;

    const animate = () => {
      mat.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}