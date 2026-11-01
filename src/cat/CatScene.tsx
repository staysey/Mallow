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
            .replace('#include <project_vertex>', 'vCoatPos = transformed;\n#include <project_vertex>')
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
               float eyeMask = smoothstep(0.45, 0.75, coatLuma);
               vec3 coatFur = uCoat * clamp(coatLuma * 3.0 + 0.22, 0.22, 1.0);
               vec3 p = vCoatPos / max(uHeight, 0.001);
               float stripes = step(0.0, sin(p.y * 24.0 + p.x * 4.0));
               float spots = step(0.2, sin(p.x * 36.0) * sin(p.y * 40.0) * sin(p.z * 32.0));
               float marks = step(0.5, uPattern) * mix(stripes, spots, step(1.5, uPattern));
               float coatLum = dot(uCoat, vec3(0.299, 0.587, 0.114));
               vec3 markColor = mix(uCoat * 0.25, clamp(uCoat + vec3(0.34), 0.0, 1.0), step(coatLum, 0.22));
               vec3 markedFur = mix(coatFur, markColor, marks);
               vec3 coated = mix(markedFur, diffuseColor.rgb, eyeMask);
               diffuseColor.rgb = mix(diffuseColor.rgb, coated, uTint);`,
            )
        }
        next.customProgramCacheKey = () => 'coat-markings-4'
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
