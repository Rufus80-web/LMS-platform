import {} from 'react'
import { useCallback } from 'react'
import Particles from 'react-tsparticles'
// import {loadFull} from 'tsparticles'
import {loadSlim} from 'tsparticles-slim'
import particleOptions from './ParticleOptions'
import { Engine } from 'tsparticles-engine'



function ParticleContaner() {
    const particleInit = useCallback(async (engine: Engine) => {
        console.log(engine)
        await loadSlim(engine)
        // await loadFull(engine)
    }, [])

    const particlesLoaded = useCallback(async (container: any) => {
        await console.log(container)
    }, [])
  return (
    <div>
       <Particles 
          id="tsparticles"
          init={particleInit}
          loaded={particlesLoaded}
          options={particleOptions}
       />
    </div>
  )
}

export default ParticleContaner


