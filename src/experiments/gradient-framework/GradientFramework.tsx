"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function AnimatedGradient() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 2, -2, 0.1, 10);
    camera.position.z = 3;

    const geo = new THREE.PlaneGeometry(2, 4, 42, 84);
    const original = geo.attributes.position.array.slice();

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        c1: { value: new THREE.Color("#ff8a00") },
        c2: { value: new THREE.Color("#fff100") },
        c3: { value: new THREE.Color("#ffb4cb") },
        c4: { value: new THREE.Color("#9ddfff") },
        c5: { value: new THREE.Color("#fff3b0") },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float uTime;

        void main() {
          vUv = uv;
          vec3 p = position;

          float w = sin(p.y * 2.0 + uTime * .55) * cos(p.x * 2.8 - uTime * .35);
          p.z += w * .12;
          p.x += sin(p.y * 1.6 + uTime * .3) * .04;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
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

          col += (rand(gl_FragCoord.xy + uTime*10.0)-.5)*.06;
          gl_FragColor = vec4(col,1.0);
        }
      `,
    });

    scene.add(new THREE.Mesh(geo, mat));

    const wire = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
        transparent: true,
        opacity: 0.16,
      })
    );

    wire.position.z = 0.01;
    scene.add(wire);

    const resize = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;

      renderer.setSize(w, h, false);

      const a = w / h;
      camera.left = -a;
      camera.right = a;
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

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[650px] w-[315px] rounded-[48px] bg-[#f4f3f1] p-[12px] shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)]">
      <div className="relative h-full w-full overflow-hidden rounded-[40px] bg-[#faf9f7]">
        <div className="absolute left-1/2 top-[14px] z-30 h-[19px] w-[60px] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}

export default function GradientFramework() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-8">
      <div className="flex gap-10">
        <PhoneShell>
          <div className="flex h-full flex-col px-5 pb-6 pt-16">
            <div className="mb-6">
              <div className="text-[33px] leading-[.95] tracking-[-.04em] text-[#aaa]">Latest</div>
              <div className="text-[37px] leading-[.95] tracking-[-.05em] text-black">Collection</div>
            </div>

            <div className="relative flex-1 overflow-hidden rounded-[17px] bg-white">
              <div className="absolute -left-20 top-32 h-60 w-[370px] rotate-[8deg] rounded-[50%] bg-red-600 blur-[2px]" />
              <div className="absolute -left-20 top-[240px] h-56 w-56 rounded-[50%] bg-black blur-[3px]" />
              <div className="absolute right-2 top-[270px] h-24 w-36 rounded-[50%] bg-white blur-[8px]" />
              <div className="absolute left-7 -top-12 h-40 w-36 rounded-[50%] bg-red-500 blur-[16px]" />
            </div>

            <button className="mt-4 h-9 rounded-full bg-white text-[10px] text-black shadow-sm">
              Explore collection
            </button>
          </div>
        </PhoneShell>

        <PhoneShell>
          <div className="relative h-full">
            <AnimatedGradient />

            <div className="absolute inset-0 z-10 flex flex-col px-5 pb-6 pt-[80px] text-white">
              <div className="flex justify-between text-[9px] leading-[1.15]">
                <span>
                  Human made designed
                  <br />
                  Dither Gradient collection
                </span>
                <span>[40]</span>
              </div>

              <div className="mt-auto mb-5 text-[38px] leading-[.82] tracking-[-.055em]">
                Dither©
                <br />
                Animated
                <br />
                Gradient
              </div>

              <button className="h-9 rounded-full bg-white text-[10px] text-black">
                Explore collection
              </button>
            </div>
          </div>
        </PhoneShell>
      </div>
    </main>
  );
}