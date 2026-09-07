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

    const geo = new THREE.PlaneGeometry(2, 2);

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        c1: { value: new THREE.Color("#ff2a2a") },
        c2: { value: new THREE.Color("#d40000") },
        c3: { value: new THREE.Color("#ffffff") },
        c4: { value: new THREE.Color("#111111") },
        c5: { value: new THREE.Color("#000000") },
      },

      vertexShader: `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vUv = uv;
    vec3 p = position;

    float t = uTime * .55;

    // vertical curtain folds
    float fold1 = sin(p.x * 3.2 + t) * .22;
    float fold2 = sin(p.x * 6.0 - t * .65) * .08;

    // gentle hanging / draping motion
    float sway = sin(p.y * 1.15 + t * .7) * .045;
    float sag = (1.0 - uv.y) * sin(p.x * 1.8 + t * .35) * .12;

    p.z += fold1 + fold2 + sag;
    p.x += sway * (1.0 - uv.y);
    p.y += sin(p.x * 1.4 + t * .5) * .025;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 c1,c2,c3,c4,c5;

        float blob(vec2 uv, vec2 p, float s) {
          return smoothstep(s, 0.0, distance(uv, p));
        }

        float rand(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
          vec2 uv = vUv;

          // fast movement
          float t = uTime * 1.3;

          // liquid / gooey coordinate warp
          vec2 q = uv;

          q.x += sin(q.y * 4.5 + t * 1.2) * .15;
          q.y += cos(q.x * 4.0 - t * 1.15) * .15;

          q.x += sin(q.y * 8.0 - t * .7) * .06;
          q.y += cos(q.x * 7.0 + t * .8) * .06;

          // moving color masses
          vec2 p1 = vec2(
            .25 + sin(t * .75) * .28,
            .78 + cos(t * .55) * .18
          );

          vec2 p2 = vec2(
            .72 + cos(t * .65) * .27,
            .52 + sin(t * .8) * .24
          );

          vec2 p3 = vec2(
            .30 + sin(t * .6) * .24,
            .25 + cos(t * .72) * .20
          );

          vec2 p4 = vec2(
            .76 + cos(t * .7) * .22,
            .20 + sin(t * .6) * .18
          );

          vec3 col = mix(c1, c2, q.y);

          col = mix(col, c3, blob(q, p1, .42) * .95);
          col = mix(col, c1, blob(q, p2, .55) * .90);
          col = mix(col, c5, blob(q, p3, .48) * .98);
          col = mix(col, c3, blob(q, p4, .34) * .95);

          // subtle grain
          float grain = rand(gl_FragCoord.xy + uTime * 12.0);
          col += (grain - .5) * .035;

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