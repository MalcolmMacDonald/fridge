import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { useGLTF } from 'drei'

function Model(props) {
  const { scene } = useGLTF('/suzanne-draco.glb')
  return <primitive object={scene} />
}

export default function App() {
  return (
    <Canvas>
      <directionalLight position={[10, 10, 5]} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  )
}
