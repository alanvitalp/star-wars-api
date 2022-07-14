/* eslint-disable @typescript-eslint/no-var-requires */
import Head from 'next/head'
import { StarsParticles } from '../../components/Particles'
import { api } from '../../services/api'

import { ISpecie } from '../../types'

interface SpecieProps {
  species: ISpecie[]
}

const Species = ({ species }: SpecieProps) => {
  return (
    <>
      <div className="w-full h-screen z-[999] absolute">
        <Head>
          <title>Species | Ascan Wars</title>
        </Head>
        <header className="flex items-center justify-center pt-8 md:p-8 ">
          <h1 className="text-center text-3xl text-gray-500">Espécies</h1>
        </header>

        <div>
          <a
            href="/"
            className="link hidden text-gray-500 md:inline-block ml-10 border-0"
          >
            Voltar para a página anterior
          </a>
        </div>

        <ul className="p-12 grid place-items-center justify-items-center grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {species.map((specie) => (
            <a
              href={`/species/${specie.url.split('/')[5]}`}
              key={specie.name}
              className="py-6 transparent w-80 h-full max-w-[320px] max-h-[420px] rounded-lg  border border-[#333] overflow-y-auto overflow-x-hidden hover:scale-110 transition-all duration-200"
            >
              <div className="flex flex-col text-center">
                <strong className="">{specie.name}</strong>
              </div>

              <ul className="px-4 py-6 flex flex-col gap-2">
                <li>
                  <strong>Language:</strong> <span>{specie.language}</span>
                </li>

                <li>
                  <strong>classification:</strong>{' '}
                  <span>{specie.classification}</span>
                </li>

                <li>
                  <strong>Designation:</strong>{' '}
                  <span>{specie.designation}</span>
                </li>

                <li>
                  <strong>Average Height:</strong>{' '}
                  <span>{specie.average_height}cm</span>
                </li>

                <li>
                  <strong>Average lifespan:</strong>{' '}
                  <span>{specie.average_lifespan} years</span>
                </li>

                <li>
                  <strong>Skin color:</strong> <span>{specie.skin_colors}</span>
                </li>

                <li>
                  <strong>Hair color:</strong> <span>{specie.hair_colors}</span>
                </li>

                <li>
                  <strong>Eye color:</strong> <span>{specie.eye_colors}</span>
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

export default Species

export async function getServerSideProps() {
  const species = await api.get('/species')

  return {
    props: {
      species: species.data.results
    }
  }
}
