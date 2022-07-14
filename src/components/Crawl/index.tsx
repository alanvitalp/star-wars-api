import gsap from 'gsap'
import { SpeakerHigh, SpeakerSimpleX } from 'phosphor-react'
import React, { useEffect, useRef, useState } from 'react'

export const Crawl = () => {
  const intro = useRef(null)
  const title = useRef(null)
  const content = useRef(null)
  const audio = useRef<HTMLAudioElement>(null)

  const [muted, setMuted] = useState(true)

  const fadeInOpacity = (content: React.MutableRefObject<null>) => {
    for (let i = 10; i > 0; i--) {
      gsap.to(content.current, {
        duration: 0.5,
        opacity: i / 10,
        display: 'none'
      })
    }
  }

  useEffect(() => {
    const tl = gsap.timeline()

    tl.to(intro.current, {
      opacity: 1,
      delay: 1,
      duration: 4.5
    })
      .to(intro.current, {
        opacity: 0,
        duration: 1.5
      })
      .set(title.current, { opacity: 1, scale: 2.75, delay: 0.5 })
      .to(title.current, { scale: 0.05, ease: 'power2', duration: 8 })
      .to(title.current, { opacity: 0, duration: 1.5 }, '-=1.5')
      .to(content.current, {
        top: '-175%',
        duration: 4,
        onComplete: () => {
          fadeInOpacity(content)
        }
      })
  }, [])

  return (
    <>
      <section className="intro" ref={intro}>
        <p className="text-4xl">
          A long time ago, in a galaxy far,
          <br /> far away....
        </p>
      </section>
      <section className="title text-center" ref={title}>
        <p className="flex flex-col text-4xl text-primary-100">
          Instituto <span>Atlântico</span>
        </p>
      </section>
      <section className="crawl">
        <div className="content text-primary-100" ref={content}>
          <h1 className="episode-number">Episode X</h1>
          <h2 className="episode-title">O retorno do estagiário</h2>
          <p>
            Alan Vital voltou ao seu planeta natal, Fortaleza, na tentativa de
            se tornar o mais novo Desenvolvedor CLT do Instituto Atlântico.
          </p>
          <p>
            Alan ainda não sabe que o INSTITUTO ATLÂNTICO iniciou secretamente a
            construção de um novo assento para sua contratação, em uma nave mais
            poderosa que a primeira e temida Estrela da Morte.
          </p>
          <p>
            Quando estiver pronto, este momento certamente significará o fim de
            um ciclo e o início de uma nova luta em busca do próximo nível....
          </p>
        </div>
      </section>
      <audio ref={audio} preload="true" autoPlay>
        <source
          type="audio/mp3"
          src="https://ia801501.us.archive.org/23/items/StarWars_20180709/Star%20Wars.mp3"
        />
      </audio>
      <button
        className="volume hover:text-white transition-colors"
        type="button"
        onClick={() => {
          if (audio && audio.current) {
            audio.current.muted = !muted
          }
          setMuted(!muted)
        }}
      >
        {muted ? (
          <SpeakerSimpleX
            size={40}
            className="focus:border-none focus:outline-hidden focus:outline-0"
          />
        ) : (
          <SpeakerHigh
            size={40}
            className="focus:border-none focus:outline-hidden focus:outline-0"
          />
        )}
      </button>
    </>
  )
}
