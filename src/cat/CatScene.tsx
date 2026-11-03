import { Suspense, useEffect, useLayoutEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bounds, OrbitControls, useAnimations, useGLTF } from '@react-three/drei'
import { Color, LoopRepeat, Mesh, MeshStandardMaterial } from 'three'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'
import type { CatNote, CatPattern } from './types'

const patternId: Record<CatPattern, number> = {
  solid: 0,
  stripes: 1,
  spots: 2,
  points: 3,
  mask: 4,
}

const CAT_URL = '/Meshy_AI2.glb'
const IDLE_CLIP = 'Short_Breathe_and_Look_Around'

type CatModelProps = {
  note: CatNote
  portrait?: boolean
}

function CatModel({ note, portrait = false }: CatModelProps) {
  const gltf = useGLTF(CAT_URL)
  const model = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene])
  const coat = useMemo(
    () => ({
      color: { value: new Color('#ffffff') },
      tint: { value: 1 },
      pattern: { value: 0 },
      height: { value: 1 },
    }),
    [],
  )
  const { actions } = useAnimations(gltf.animations, model)

  useLayoutEffect(() => {
    let height = 1
    model.traverse((obj) => {
      if (!(obj instanceof Mesh)) return
      if (!obj.geometry.boundingBox) obj.geometry.computeBoundingBox()
      const box = obj.geometry.boundingBox
      if (!box) return
      height = Math.max(height, box.max.y - box.min.y)
    })
    coat.height.value = height

    model.traverse((obj) => {
      if (!(obj instanceof Mesh)) return
      const source = Array.isArray(obj.material) ? obj.material : [obj.material]
      const cloned = source.map((material) => {
        const next = material.clone()
        if (!(next instanceof MeshStandardMaterial)) return next
        next.onBeforeCompile = (shader) => {
          shader.uniforms.uCoat = coat.color
          shader.uniforms.uTint = coat.tint
          shader.uniforms.uPattern = coat.pattern
          shader.uniforms.uHeight = coat.height
          shader.vertexShader = shader.vertexShader
            .replace('#include <common>', '#include <common>\nvarying vec3 vCoatPos;')
            .replace('void main() {', 'void main() {\n\tvCoatPos = position;')
          shader.fragmentShader = shader.fragmentShader
            .replace(
              '#include <common>',
              `#include <common>
               uniform vec3 uCoat;
               uniform float uTint;
               uniform float uPattern;
               uniform float uHeight;
               varying vec3 vCoatPos;`,
            )
            .replace(
              '#include <map_fragment>',
              `#include <map_fragment>
               float coatLuma = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
               vec3 p = vCoatPos / max(uHeight, 0.001);
               vec2 pupilL = vec2(p.x + 0.13, p.y - 0.63);
               vec2 pupilR = vec2(p.x - 0.13, p.y - 0.63);
               float pupil = (1.0 - smoothstep(0.03, 0.045, min(length(pupilL), length(pupilR)))) * smoothstep(0.05, 0.12, p.z);
               float sclera = smoothstep(0.55, 0.8, coatLuma);
               float grain = 0.035 * sin(p.x * 72.0 + p.z * 18.0) * sin(p.y * 64.0);
               vec3 coatFur = uCoat * clamp(coatLuma * 3.0 + 0.22, 0.22, 1.0);
               coatFur *= 1.0 + grain;

               float tabbyA = 0.5 + 0.5 * sin(p.y * 22.0 + p.x * 5.5 + 0.4 * sin(p.z * 8.0));
               float tabbyB = 0.5 + 0.5 * sin(p.y * 40.0 - p.z * 6.0);
               float dorsal = (1.0 - smoothstep(0.02, 0.12, abs(p.x))) * smoothstep(0.15, 0.55, p.y);
               float stripes = clamp(smoothstep(0.40, 0.68, tabbyA) * 0.88 + smoothstep(0.52, 0.80, tabbyB) * 0.4 + dorsal * 0.5, 0.0, 1.0);

               float cell = sin(p.x * 28.0 + 1.3) * sin(p.y * 24.0 + 0.6) * sin(p.z * 22.0 + 2.1);
               float cell2 = sin(p.x * 46.0 + p.y * 8.0) * sin(p.y * 42.0 - p.z * 10.0);
               float spots = smoothstep(0.22, 0.58, cell * 0.72 + cell2 * 0.28);

               float ears = smoothstep(0.64, 0.80, p.y) * smoothstep(0.03, 0.09, abs(p.x));
               float sides = smoothstep(0.05, 0.16, abs(p.x)) * smoothstep(0.50, 0.68, p.y);
               float blaze = (1.0 - smoothstep(0.02, 0.12, abs(p.x))) * smoothstep(0.48, 0.68, p.y);
               float tailBack = smoothstep(0.08, 0.26, -p.z) * (1.0 - smoothstep(0.38, 0.60, p.y));
               float tailSide = smoothstep(0.20, 0.30, abs(p.x)) * smoothstep(0.12, 0.22, p.y) * (1.0 - smoothstep(0.34, 0.46, p.y));
               float tail = max(tailBack, tailSide);
               float face = smoothstep(0.46, 0.58, p.y) * (1.0 - smoothstep(0.80, 0.92, p.y));
               float ragdollPoints = clamp(ears * 1.35 + sides * 0.28 + tail * 1.15 - blaze * 0.95, 0.0, 1.0);
               float siamesePoints = clamp(ears * 1.15 + face * 0.95 + sides * 0.55 + tail * 1.2, 0.0, 1.0);

               float isStripes = step(0.5, uPattern) * (1.0 - step(1.5, uPattern));
               float isSpots = step(1.5, uPattern) * (1.0 - step(2.5, uPattern));
               float isPoints = step(2.5, uPattern) * (1.0 - step(3.5, uPattern));
               float isMask = step(3.5, uPattern);
               float marks = stripes * isStripes + spots * isSpots + ragdollPoints * isPoints + siamesePoints * isMask;
               vec3 markColor = mix(uCoat * 0.42, clamp(uCoat + vec3(0.28), 0.0, 1.0), step(dot(uCoat, vec3(0.299, 0.587, 0.114)), 0.22));
               markColor = mix(markColor, vec3(0.36, 0.25, 0.20), isPoints);
               markColor = mix(markColor, vec3(0.16, 0.09, 0.07), isMask);
               float furOnly = 1.0 - sclera;
               coatFur = mix(coatFur, vec3(0.94, 0.89, 0.82) * clamp(coatLuma * 2.2 + 0.48, 0.65, 1.0), isPoints * furOnly);
               coatFur = mix(coatFur, vec3(0.93, 0.78, 0.58) * clamp(coatLuma * 2.0 + 0.42, 0.55, 1.0), isMask * furOnly);
               vec3 bodyColor = mix(uCoat, vec3(0.94, 0.89, 0.82), isPoints);
               bodyColor = mix(bodyColor, vec3(0.93, 0.78, 0.58), isMask);

               vec3 markedFur = mix(coatFur, markColor, marks * (1.0 - pupil));
               markedFur = mix(markedFur, bodyColor, pupil);
               vec3 coated = mix(markedFur, diffuseColor.rgb, sclera);
               diffuseColor.rgb = mix(diffuseColor.rgb, coated, uTint);`
            )
        }
        next.customProgramCacheKey = () => 'coat-markings-34'
        return next
      })
      obj.material = cloned.length === 1 ? cloned[0]! : cloned
    })
  }, [model, coat])

  useEffect(() => {
    const action = actions[IDLE_CLIP]
    if (!action) return
    action.reset()
    action.setLoop(LoopRepeat, Infinity)
    action.fadeIn(0.4).play()
    return () => {
      action.fadeOut(0.2)
    }
  }, [actions])

  useEffect(() => {
    coat.color.value.set(note.color)
    coat.tint.value = 1
    coat.pattern.value = patternId[note.pattern]

    if (portrait) return

    model.traverse((obj) => {
      if (!(obj instanceof Mesh)) return
      const materials = Array.isArray(obj.material) ? obj.material : [obj.material]
      for (const material of materials) {
        if (!(material instanceof MeshStandardMaterial)) continue
        material.roughness = note.fluff === 'fluffy' ? 1 : 0.35
      }
    })

    const head = model.getObjectByName('mixamorig:Head')
    if (head) head.scale.setScalar(note.ears === 'big' ? 1.12 : 0.9)
  }, [coat, model, note.color, note.pattern, note.ears, note.fluff, portrait])

  return <primitive object={model} />
}

useGLTF.preload(CAT_URL)

type CatSceneProps = {
  note: CatNote
  portrait?: boolean
}

export function CatScene({ note, portrait = false }: CatSceneProps) {
  return (
    <div className="cat-scene">
      <Canvas camera={{ position: [0, 0.6, 3], fov: 35 }}>
        <color attach="background" args={[portrait ? '#e4def6' : '#ffffff']} />
        <ambientLight intensity={0.85} />
        <directionalLight position={[2.5, 4, 2]} intensity={1.8} />
        <Suspense fallback={null}>
          <Bounds fit clip margin={1.3}>
            <CatModel note={note} portrait={portrait} />
          </Bounds>
        </Suspense>
        {portrait ? null : <OrbitControls makeDefault enablePan={false} />}
      </Canvas>
      {portrait ? null : <p className="cat-name">{note.name}</p>}
    </div>
  )
}
