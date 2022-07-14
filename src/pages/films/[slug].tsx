import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { StarsParticles } from '../../components/Particles'
import { api } from '../../services/api'
import {
  ICharacter,
  IFilm,
  IPlanet,
  ISpecie,
  IStarship,
  IVehicles
} from '../../types'

interface FilmProps {
  film: IFilm
  characters: ICharacter[]
  planets: IPlanet[]
  starships: IStarship[]
  vehicles: IVehicles[]
  species: ISpecie[]
}

const Film = ({
  film,
  characters,
  planets,
  species,
  starships,
  vehicles
}: FilmProps) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>{<title>{film.title} | Ascan wars</title>}</Head>
      <StarsParticles />
      <div className="w-full h-screen flex items-center justify-center absolute">
        <div className="w-[90%] max-w-[1400px]">
          <header className="mb-4 text-center md:mt-0 md:mb-8">
            <h1 className="text-2xl">
              {film.title} | <span>Episode {film.episode_id} </span>
            </h1>
          </header>

          <div>
            <a
              href="/films"
              className="link hidden text-gray-500 md:inline-block ml-10 mb-12"
            >
              Voltar para a página anterior
            </a>
          </div>

          <div className="w-full h-[600px] transparent shadow-md rounded-lg  border border-[#333] flex flex-col md:flex-row overflow-scroll">
            <aside className="h-full md:max-w-[50%] grid p-10">
              <div>
                <h1 className="text-2xl">Overview</h1>
                <ul className="list-disc list-inside p-4 flex flex-col gap-4">
                  <li>
                    <strong>Director:</strong> <span>{film.director}</span>
                  </li>
                  <li>
                    <strong>Producers: </strong> <span>{film.producer}</span>
                  </li>
                  <li>
                    <strong>Release date:</strong>{' '}
                    <span>{film.release_date.toString()}</span>
                  </li>
                  <li>
                    <strong>Sinopsys:</strong> <span>{film.opening_crawl}</span>
                  </li>
                </ul>
                <div>
                  <h1 className="text-2xl">Species</h1>
                  <ul className="list-disc list-inside p-4 flex flex-col gap-4">
                    {species.map((specie) => (
                      <li key={specie.name}>
                        <strong>
                          <a href={`/species/${specie.url.split('/')[5]}`}>
                            <strong>{specie.name}</strong>
                          </a>
                        </strong>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h1 className="text-2xl">Vehicles</h1>
                  <ul className="list-disc list-inside p-4 flex flex-col gap-4">
                    {vehicles.map((vehicle) => (
                      <li key={vehicle.name}>
                        <strong>{vehicle.name}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h1 className="text-2xl">Starships</h1>
                  <ul className="list-disc list-inside p-4 flex flex-col gap-4">
                    {starships.map((starship) => (
                      <li key={starship.name}>
                        <strong>{starship.name}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
            <main className="h-full md:max-w-[50%] grid md:grid-cols-2 p-10">
              <div>
                <h1 className="text-2xl">Characters</h1>
                <ul className="list-disc list-inside p-4 flex flex-col gap-4">
                  {characters.map((character) => (
                    <li key={character.name}>
                      <strong>
                        <a href={`/characters/${character.url.split('/')[5]}`}>
                          {character.name}
                        </a>
                      </strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h1 className="text-2xl">Planets</h1>
                <ul className="list-disc list-inside p-4 flex flex-col gap-4">
                  {planets.map((planet) => (
                    <li key={planet.name}>
                      <strong>
                        <a href={`/planets/${planet.url.split('/')[5]}`}>
                          <strong>{planet.name}</strong>
                        </a>
                      </strong>
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
    const { data } = await api.get(`/films/${slug}`)

    const characters = await Promise.all(
      data.characters.map(async (character: string) => {
        const { data } = await axios.get(character)
        return data
      })
    )

    const planets = await Promise.all(
      data.planets.map(async (planet: string) => {
        const { data } = await axios.get(planet)
        return data
      })
    )

    const starships = await Promise.all(
      data.starships.map(async (starship: string) => {
        const { data } = await axios.get(starship)
        return data
      })
    )

    const vehicles = await Promise.all(
      data.vehicles.map(async (vehicle: string) => {
        const { data } = await axios.get(vehicle)
        return data
      })
    )

    const species = await Promise.all(
      data.species.map(async (specie: string) => {
        const { data } = await axios.get(specie)
        return data
      })
    )

    return {
      props: {
        film: data,
        characters,
        species,
        vehicles,
        planets,
        starships
      }
    }
  } catch (err) {
    return {
      props: {
        film: {}
      }
    }
  }
}

export default Film
