import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { StarsParticles } from '../../components/Particles'
import { api } from '../../services/api'
import { ICharacter, IFilm, IPlanet } from '../../types'

interface PlanetProps {
  planet: IPlanet
  residents: ICharacter[]
  films: IFilm[]
}

const Planet = ({ planet, residents, films }: PlanetProps) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>{<title>{planet.name} | Ascan wars</title>}</Head>
      <StarsParticles />
      <div className="w-full h-screen flex items-center justify-center absolute">
        <div className="w-[90%] max-w-[1400px]">
          <header className="mb-4 text-center md:mt-0 md:mb-8">
            <h1 className="text-2xl">{planet.name}</h1>
          </header>

          <div>
            <a
              href="/planets"
              className="link hidden text-gray-500 md:inline-block ml-10 mb-12"
            >
              Voltar para a página anterior
            </a>
          </div>

          <div className="w-full h-[600px] transparent shadow-md rounded-lg  border border-[#333] flex flex-col md:flex-row overflow-scroll">
            <aside className="h-full lg:w-[50%] grid lg:grid-cols-2 p-10 border-[#333]">
              <div>
                <h1 className="text-2xl">Characteristics</h1>
                <ul className="list-disc list-inside p-4 flex flex-col gap-4">
                  <li>
                    <strong>Rotation period:</strong>{' '}
                    <span>{planet.rotation_period}</span>
                  </li>
                  <li>
                    <strong>Orbital period:</strong>{' '}
                    <span>{planet.orbital_period}</span>
                  </li>
                  <li>
                    <strong>Diameter:</strong> <span>{planet.diameter}</span>
                  </li>
                  <li>
                    <strong>Climate:</strong> <span>{planet.climate}</span>
                  </li>
                  <li>
                    <strong>Population:</strong>{' '}
                    <span>{planet.population}</span>
                  </li>
                  <li>
                    <strong>Terrain:</strong> <span>{planet.terrain}</span>
                  </li>
                  <li>
                    <strong>Gravity:</strong> <span>{planet.gravity}</span>
                  </li>
                </ul>
              </div>
            </aside>
            <main className="h-full lg:w-[50%] grid lg:grid-cols-2 p-10">
              <div>
                <h1 className="text-2xl">Residents</h1>
                <ul className="list-disc list-inside p-4 flex flex-col gap-4">
                  {residents.map((resident) => (
                    <li key={resident.name}>
                      <a href={`/characters/${resident.url.split('/')[5]}`}>
                        <strong>{resident.name}</strong>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h1 className="text-2xl">Films</h1>
                <ul className="list-disc list-inside p-4 flex flex-col gap-4">
                  {films.map((film) => (
                    <li key={film.episode_id}>
                      <a href={`/films/${film.url.split('/')[5]}`}>
                        <strong>{film.title}</strong>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const slug = ctx.params?.slug
    const { data } = await api.get(`/planets/${slug}`)

    const residents = await Promise.all(
      data.residents.map(async (resident: string) => {
        const { data } = await api.get(resident)
        return data
      })
    )

    const films = await Promise.all(
      data.films.map(async (film: string) => {
        const { data } = await api.get(film)
        return data
      })
    )

    return {
      props: {
        planet: data,
        residents,
        films
      }
    }
  } catch (err) {
    return {
      props: {
        character: {}
      }
    }
  }
}

export default Planet
