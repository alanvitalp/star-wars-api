/* eslint-disable @typescript-eslint/no-var-requires */
import Head from 'next/head'
import { StarsParticles } from '../../components/Particles'
import { api } from '../../services/api'

import { IFilm } from '../../types'

interface FilmsProps {
  films: IFilm[]
}

const Films = ({ films }: FilmsProps) => {
  return (
    <>
      <div className="w-full h-screen z-[999] absolute">
        <Head>
          <title>Films | Ascan Wars</title>
        </Head>
        <header className="flex items-center justify-center pt-8 md:p-8 ">
          <h1 className="text-center text-3xl text-gray-500">Films</h1>
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
          {films.map((film) => (
            <a
              href={`/films/${film.url.split('/')[5]}`}
              key={film.title}
              className="py-6 transparent w-80 h-full max-w-[320px] max-h-[420px] rounded-lg  border border-[#333] overflow-y-auto overflow-x-hidden hover:scale-110 transition-all duration-200"
            >
              <div className="flex flex-col text-center">
                <strong className="">{film.title}</strong>
                <strong>{film.episode_id}</strong>
              </div>

              <ul className="px-4 py-6">
                <li>
                  <strong>Director:</strong> <span>{film.director}</span>
                </li>

                <li>
                  <strong>Producer:</strong> <span>{film.producer}</span>
                </li>

                <li>
                  <strong>Release Date:</strong>{' '}
                  <span>{film.release_date.toString()}</span>
                </li>

                <li className="mt-4">
                  <strong>Synopsis: </strong>
                  <span>{film.opening_crawl}</span>
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

export default Films

export async function getServerSideProps() {
  const films = await api.get('/films')

  return {
    props: {
      films: films.data.results,
      revalidate: 1
    }
  }
}
