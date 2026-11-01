import { Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useAnimations, useGLTF } from '@react-three/drei'
import { LoopOnce, LoopRepeat, MathUtils, Vector3 } from 'three'
import type { AnimationAction, Group, Object3D } from 'three'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'

const CAT_URL = '/Meshy_AI2.glb'
const LOOK_CLIP = 'Look_Around_Dumbfounded'
const RUN_CLIP = 'Running'

type Visit = 'enter' | 'look' | 'leave' | 'wait'

function Aim() {
  const camera = useThree((state) => state.camera)

  useLayoutEffect(() => {
    camera.lookAt(0, 0.85, 0)
  }, [camera])

  return null
}

function Visitor() {
  const gltf = useGLTF(CAT_URL)
  const model = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene])
  const { actions, mixer } = useAnimations(gltf.animations, model)
  const group = useRef<Group>(null)
  const hips = useRef<Object3D | null>(null)
  const hipsRest = useRef(new Vector3())
  const hipsYaw = useRef(0)
  const visit = useRef<Visit>('enter')
  const elapsed = useRef(0)

  useLayoutEffect(() => {
    const hipBone = model.getObjectByName('mixamorig:Hips') ?? null
    hips.current = hipBone
    model.rotation.y = 0.55

    if (hipBone) {
      hipsRest.current.copy(hipBone.position)
      hipsYaw.current = hipBone.rotation.y
    }
  }, [model])

  useLayoutEffect(() => {
    const onDone = (event: { action: AnimationAction }) => {
      if (event.action.getClip().name !== LOOK_CLIP || visit.current !== 'look') return
      visit.current = 'leave'
      elapsed.current = 0
      event.action.fadeOut(0.15)
      const run = actions[RUN_CLIP]
      if (!run) return
      run.reset()
      run.setLoop(LoopRepeat, Infinity)
      run.fadeIn(0.15).play()
    }
    mixer.addEventListener('finished', onDone)
    return () => mixer.removeEventListener('finished', onDone)
  }, [actions, mixer])

  useFrame((_, delta) => {
    const host = group.current
    if (!host) return
    const step = Math.min(delta, 0.05)
    elapsed.current += step
    const hipBone = hips.current

    if (hipBone) {
      hipBone.position.copy(hipsRest.current)
      hipBone.rotation.y = hipsYaw.current
    }

    if (visit.current === 'enter') {
      const t = Math.min(elapsed.current / 0.8, 1)
      const eased = 1 - (1 - t) ** 3
      host.position.x = 0
      host.position.y = MathUtils.lerp(-1.3, 0, eased)
      host.rotation.y = 0
      if (t < 1) return
      visit.current = 'look'
      elapsed.current = 0
      const look = actions[LOOK_CLIP]
      if (!look) {
        visit.current = 'leave'
        return
      }
      look.reset()
      look.setLoop(LoopOnce, 1)
      look.clampWhenFinished = true
      look.fadeIn(0.2).play()
      return
    }

    if (visit.current === 'look' && elapsed.current > 4.5) {
      visit.current = 'leave'
      elapsed.current = 0
      actions[LOOK_CLIP]?.fadeOut(0.15)
      const run = actions[RUN_CLIP]
      if (!run) return
      run.reset()
      run.setLoop(LoopRepeat, Infinity)
      run.fadeIn(0.15).play()
      return
    }

    if (visit.current === 'leave') {
      host.rotation.y = MathUtils.damp(host.rotation.y, Math.PI / 2 - 0.55, 8, step)
      if (elapsed.current > 0.35) host.position.x += step * 1.35
      if (host.position.x < 1.85) return
      visit.current = 'wait'
      elapsed.current = 0
      host.visible = false
      actions[RUN_CLIP]?.stop()
      return
    }

    if (visit.current === 'wait' && elapsed.current > 8) {
      visit.current = 'enter'
      elapsed.current = 0
      host.visible = true
      host.position.set(0, -1.3, 0)
      host.rotation.y = 0
    }
  })

  return (
    <group ref={group} position={[0, -1.3, 0]}>
      <primitive object={model} />
    </group>
  )
}

useGLTF.preload(CAT_URL)

export function PeekCat() {
  return (
    <Canvas
      camera={{ position: [0.1, 0.95, 4.8], fov: 24 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Aim />
      <ambientLight intensity={0.95} />
      <directionalLight position={[2, 3, 2]} intensity={1.7} />
      <Suspense fallback={null}>
        <Visitor />
      </Suspense>
    </Canvas>
  )
}
