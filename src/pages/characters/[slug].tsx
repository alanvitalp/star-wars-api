import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { IStarship, IVehicle } from 'swapi-ts'
import { StarsParticles } from '../../components/Particles'
import { api } from '../../services/api'
import { ICharacter, IFilm, IPlanet, ISpecie } from '../../types'

interface CharacterProps {
  character: ICharacter
  films: IFilm[]
  planets: IPlanet
  species: ISpecie[]
  starships: IStarship[]
  vehicles: IVehicle[]
}

const Character = ({
  character,
  films,
  planets,
  species,
  starships,
  vehicles
}: CharacterProps) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>{<title>{character.name} | Ascan wars</title>}</Head>
      <StarsParticles />
      <div className="w-full h-screen flex items-center justify-center absolute">
        <div className="w-[90%] max-w-[1400px]">
          <header className="mb-4 text-center md:mt-0 md:mb-8">
            <h1 className="text-2xl">{character.name}</h1>
          </header>

          <div>
            <a
              href="/characters"
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
                    <strong>Height:</strong> <span>{character.height}cm</span>
                  </li>
                  <li>
                    <strong>Mass:</strong> <span>{character.mass}kgs</span>
                  </li>
                  <li>
                    <strong>Hair color:</strong>{' '}
                    <span>{character.hair_color}</span>
                  </li>
                  <li>
                    <strong>Eye color:</strong>{' '}
                    <span>{character.eye_color}</span>
                  </li>
                  <li>
                    <strong>Skin color:</strong>{' '}
                    <span>{character.skin_color}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h1 className="text-2xl">Vehicles</h1>
                <ul className="list-disc list-inside p-4 flex flex-col gap-4">
                  {vehicles.map((vehicle) => (
                    <li key={vehicle.name} className="px-4 flex flex-col">
                      <ul>
                        <li>
                          <strong>Name:</strong> <span>{vehicle.name}</span>
                        </li>
                        <li>
                          <strong>Model:</strong> <span>{vehicle.model}</span>
                        </li>
                        <li>
                          <strong>Manufacturer:</strong>{' '}
                          <span>{vehicle.manufacturer}</span>
                        </li>
                        <li>
                          <strong>Capacity:</strong>{' '}
                          <span>{vehicle.passengers}</span>
                        </li>
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h1 className="text-2xl">Starships</h1>
                <ul className="list-disc list-inside p-4 flex flex-col gap-4">
                  {starships.map((starship) => (
                    <li key={starship.name} className="px-4 flex flex-col">
                      <ul>
                        <li>
                          <strong>Name:</strong> <span>{starship.name}</span>
                        </li>
                        <li>
                          <strong>Model:</strong> <span>{starship.model}</span>
                        </li>
                        <li>
                          <strong>Manufacturer:</strong>{' '}
                          <span>{starship.manufacturer}</span>
                        </li>
                        <li>
                          <strong>Capacity:</strong>{' '}
                          <span>{starship.passengers}</span>
                        </li>
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            <main className="h-full lg:w-[50%] grid lg:grid-cols-2 p-10">
              <div>
                <h1 className="text-2xl">Films</h1>
                <ul className="list-disc list-inside p-4 flex flex-col gap-4">
                  {films.map((film) => (
                    <li key={film.title}>
                      <a href={`/films/${film.url.split('/')[5]}`}>
                        <strong>{film.title}</strong>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 md:mt-0">
                <h1 className="text-2xl">Planet</h1>
                <ul className="list-disc list-inside p-4 flex flex-col gap-4 ">
                  <li key={planets.name}>
                    <a href={`/planets/${planets.url.split('/')[5]}`}>
                      <strong>{planets.name}</strong>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-8 md:mt-0">
                <h1 className="text-2xl">Specie</h1>
                <ul className="list-disc list-inside p-4 flex flex-col gap-4">
                  {species.map((specie) => (
                    <li key={specie.name}>
                      <a href={`/species/${specie.url.split('/')[5]}`}>
                        <strong>{specie.name}</strong>
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
    const { data } = await api.get(`/people/${slug}`)

    const films = await Promise.all(
      data.films.map(async (film: string) => {
        const { data } = await axios.get(film)
        return data
      })
    )

    const species = await Promise.all(
      data.species.map(async (specie: string) => {
        const { data } = await axios.get(specie)
        return data
      })
    )

    const planets = await api.get(`${data.homeworld}`)

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

    return {
      props: {
        character: data,
        planets: planets.data,
        films,
        species,
        starships,
        vehicles
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

export default Character
