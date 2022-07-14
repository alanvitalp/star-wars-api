import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

export const StarsParticles = () => {
  const particlesInit = async (main: any) => {
    await loadFull(main)
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: '#000000'
          }
        },
        fpsLimit: 120,
        interactivity: {
          modes: {
            push: {
              quantity: 4
            },
            repulse: {
              distance: 200,
              duration: 0.4
            }
          }
        },
        particles: {
          color: {
            value: '#ffffff'
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce'
            },
            random: false,
            speed: 0.1,
            straight: false
          },
          number: {
            density: {
              enable: true,
              area: 800
            },
            value: 100
          },
          opacity: {
            value: 0.5
          },
          shape: {
            type: 'square'
          },

          size: {
            value: { min: 1, max: 2 }
          }
        },
        detectRetina: true,
        preset: 'stars'
      }}
    />
  )
}
