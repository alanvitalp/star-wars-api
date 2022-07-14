import Head from 'next/head'
import { StarsParticles } from '../../components/Particles'
import { api } from '../../services/api'
import { ICharacter, IPlanet, ISpecie } from '../../types'

interface CharactersProps {
  characters: ICharacter[]
  species: ISpecie[]
  planets: IPlanet[]
}

const Characters = ({ characters }: CharactersProps) => {
  return (
    <>
      <div className="w-full h-screen z-[999] absolute">
        <Head>
          <title>Characters | Ascan Wars</title>
        </Head>
        <header className="flex items-center justify-center pt-8 md:p-8 ">
          <h1 className="text-center text-3xl text-gray-500 flex-1">
            Characters
          </h1>
        </header>

        <div>
          <a
            href="/"
            className="link hidden text-gray-500 md:inline-block ml-10 mb-12 border-0"
          >
            Voltar para a página anterior
          </a>
        </div>
        <ul className="p-8 grid place-items-center grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {characters.map((character) => (
            <a
              href={`/characters/${character.url.split('/')[5]}`}
              key={character.name}
              className="transparent w-64 h-full rounded-lg border border-[#333] py-8 hover:scale-110 transition-all duration-200"
            >
              <header className="text-center">
                <h2 className="text-xl text-gray-500">{character.name}</h2>
              </header>
              <ul className="px-4 py-6 flex flex-col gap-2">
                <li>
                  {' '}
                  <strong>Gender:</strong> <span>{character.gender}</span>
                </li>
                <li>
                  {' '}
                  <strong>Height:</strong> <span>{character.height}cm</span>
                </li>
                <li>
                  {' '}
                  <strong>Mass:</strong> <span>{character.mass}kgs</span>
                </li>
                <li>
                  {' '}
                  <strong>Mass:</strong> <span>{character.mass}kgs</span>
                </li>
                <li>
                  {' '}
                  <strong>Hair color:</strong>{' '}
                  <span>{character.hair_color}</span>
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

export default Characters

export async function getServerSideProps() {
  const people = await api.get('/people')

  return {
    props: {
      characters: people.data.results,

      revalidate: 1
    }
  }
}
