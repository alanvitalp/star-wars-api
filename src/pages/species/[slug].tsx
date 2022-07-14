import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { StarsParticles } from '../../components/Particles'
import { api } from '../../services/api'
import { ICharacter, IFilm, IPlanet, ISpecie } from '../../types'

interface SpecieProps {
  specie: ISpecie
  characters: ICharacter[]
  planet: IPlanet
  films: IFilm[]
}

const Specie = ({ specie, characters, planet, films }: SpecieProps) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>{<title>{specie.name} | Ascan wars</title>}</Head>
      <StarsParticles />
      <div className="w-full h-screen flex items-center justify-center absolute">
        <div className="w-[90%] max-w-[1400px]">
          <header className="mb-4 text-center md:mt-0 md:mb-8">
            <h1 className="text-2xl">{specie.name}</h1>
          </header>

          <div>
            <a
              href="/species"
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
                    <strong>Homeworld: </strong> <span>{planet.name}</span>
                  </li>
                  <li>
                    <strong>Language:</strong> <span>{specie.language}</span>
                  </li>
                  <li>
                    <strong>Classification:</strong>{' '}
                    <span>{specie.classification}</span>
                  </li>
                  <li>
                    <strong>Designation:</strong>{' '}
                    <span>{specie.designation}</span>
                  </li>
                  <li>
                    <strong>Average height:</strong>{' '}
                    <span>{specie.average_height}cms</span>
                  </li>
                  <li>
                    <strong>Skin color:</strong>{' '}
                    <span>{specie.skin_colors}</span>
                  </li>
                  <li>
                    <strong>Hair color:</strong>{' '}
                    <span>{specie.hair_colors}</span>
                  </li>
                  <li>
                    <strong>Eye color:</strong> <span>{specie.eye_colors}</span>
                  </li>
                  <li>
                    <strong>Average lifespan:</strong>{' '}
                    <span>{specie.average_lifespan} years</span>
                  </li>
                </ul>
              </div>
            </aside>
            <main className="h-full lg:w-[50%] grid lg:grid-cols-2 p-10">
              <div>
                <h1 className="text-2xl">Residents</h1>
                <ul className="list-disc list-inside p-4 flex flex-col gap-4">
                  {characters.map((character) => (
                    <li key={character.name}>
                      <a href={`/characters/${character.url.split('/')[5]}`}>
                        <strong>{character.name}</strong>
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
    const { data } = await api.get(`/species/${slug}`)

    const characters = await Promise.all(
      data.people.map(async (people: string) => {
        const { data } = await axios.get(people)
        return data
      })
    )

    const films = await Promise.all(
      data.films.map(async (film: string) => {
        const { data } = await axios.get(film)
        return data
      })
    )

    const response = await axios.get(data.homeworld)

    return {
      props: {
        specie: data,
        characters,
        films,
        planet: response.data
      }
    }
  } catch (err) {
    return {
      props: {
        specie: {}
      }
    }
  }
}

export default Specie
