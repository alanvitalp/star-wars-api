import { NextPage } from 'next'
import Head from 'next/head'
import { Crawl } from '../components/Crawl'
import { Header } from '../components/Header'
import { StarsParticles } from '../components/Particles'

const Home: NextPage = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Head>
        <title>Ascan Wars</title>
      </Head>
      <Header />

      <Crawl />
      <StarsParticles />
    </div>
  )
}

export default Home
