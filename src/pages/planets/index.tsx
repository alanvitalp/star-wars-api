import Head from 'next/head'
import { StarsParticles } from '../../components/Particles'
import { api } from '../../services/api'
import { IPlanet } from '../../types'

interface PlanetsProps {
  planets: IPlanet[]
}

const Planets = ({ planets }: PlanetsProps) => {
  return (
    <>
      <div className="w-full h-screen z-[999] absolute">
        <Head>
          <title>Planets | Ascan Wars</title>
        </Head>
        <header className="flex items-center justify-center pt-8 md:p-8 ">
          <h1 className="text-center text-3xl text-gray-500">Planets</h1>
        </header>

        <div>
          <a
            href="/"
            className="link hidden text-gray-500 md:inline-block ml-10 border-0"
          >
            Voltar para a página anterior
          </a>
        </div>

        <ul className="p-16 grid place-items-center grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {planets.map((planet) => (
            <a
              key={planet.name}
              href={`/planets/${planet.url.split('/')[5]}`}
              className="transparent w-64 h-full rounded-lg py-8 border border-[#333] hover:scale-110 transition-all duration-200"
            >
              <header className="text-center">
                <h2 className="text-xl text-gray-500">{planet.name}</h2>
              </header>
              <ul className="px-4 py-6 flex flex-col gap-2">
                <li>
                  <strong>Climate:</strong> <span>{planet.climate}</span>
                </li>
                <li>
                  <strong>Diameter:</strong> <span>{planet.diameter}</span>
                </li>
                <li>
                  <strong>Population:</strong> <span>{planet.population}</span>
                </li>
                <li>
                  <strong>Orbital period:</strong>{' '}
                  <span>{planet.orbital_period}t</span>
                </li>
                <li>
                  <strong>Orbital period:</strong>{' '}
                  <span>{planet.orbital_period}t</span>
                </li>
              </ul>
            </a>
          ))}
        </ul>
      </div>
      <StarsParticles />
    </>
  )
}

export default Planets

export async function getServerSideProps() {
  const planets = await api.get('/planets')

  return {
    props: {
      planets: planets.data.results,
      revalidate: 1
    }
  }
}
