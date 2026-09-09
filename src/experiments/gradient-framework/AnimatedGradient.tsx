"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AnimatedGradient() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 2, -2, 0.1, 10);
    camera.position.z = 3;

    const geo = new THREE.PlaneGeometry(3.4, 5, 65, 95);

    const vertexShader = `
      varying vec2 vUv;
      uniform float uTime;

      void main() {
        vUv = uv;
        vec3 p = position;
        float t = uTime * .35;

        float a = sin(p.x * 1.5 + t) * cos(p.y * 1.15 - t * .7);
        float b = sin(p.y * 2.1 - t * .55) * cos(p.x * .8 + t);
        float c = sin((p.x + p.y) * 1.3 + t * .8);

        p.z += a * .32 + b * .18 + c * .12;
        p.x += sin(p.y * 1.2 + t) * .09;
        p.y += cos(p.x * 1.15 - t * .7) * .08;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `;

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        c1: { value: new THREE.Color("#ffb3a7") },
        c2: { value: new THREE.Color("#f4d6c8") },
        c3: { value: new THREE.Color("#c9c2ff") },
        c4: { value: new THREE.Color("#9fd7e8") },
        c5: { value: new THREE.Color("#d9e4cf") },
      },
      vertexShader,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 c1,c2,c3,c4,c5;

        float blob(vec2 uv, vec2 p, float s) {
          return smoothstep(s, 0.0, distance(uv,p));
        }

        float rand(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
        }

        void main() {
          vec2 uv = vUv;
          float t = uTime * .12;

          vec2 p1 = vec2(.35 + sin(t)*.18, .82);
          vec2 p2 = vec2(.76, .55 + cos(t*1.2)*.15);
          vec2 p3 = vec2(.35, .28 + sin(t*.8)*.12);
          vec2 p4 = vec2(.68 + cos(t)*.15, .18);

          vec3 col = mix(c4,c2,uv.y);
          col = mix(col,c1,blob(uv,p1,.55)*.75);
          col = mix(col,c3,blob(uv,p2,.50)*.65);
          col = mix(col,c5,blob(uv,p3,.56)*.65);
          col = mix(col,c4,blob(uv,p4,.48)*.55);

          col += (rand(gl_FragCoord.xy + uTime * 10.0) - .5) * .06;
          gl_FragColor = vec4(col,1.0);
        }
      `,
    });

    const wireMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader,
      wireframe: true,
      transparent: true,
      fragmentShader: `
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, .30);
        }
      `,
    });

    scene.add(new THREE.Mesh(geo, mat));

    const wire = new THREE.Mesh(geo, wireMat);
    wire.position.z = 0.012;
    scene.add(wire);

    const resize = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;

      renderer.setSize(w, h, false);

      const aspect = w / h;
      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 2;
      camera.bottom = -2;
      camera.updateProjectionMatrix();
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const clock = new THREE.Clock();
    let frame: number;

    const animate = () => {
      const time = clock.getElapsedTime();

      mat.uniforms.uTime.value = time;
      wireMat.uniforms.uTime.value = time;

      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      geo.dispose();
      mat.dispose();
      wireMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}