import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="h-[80px] w-[100%] px-10 z-[999] fixed">
      <div className="mx-auto my-0 max-w-[1200px] flex items-center justify-between">
        <Link passHref href="/">
          <Image src="/svg/star-wars-2.svg" width={80} height={80} />
        </Link>

        <nav className="">
          <ul className="flex gap-12 uppercase ">
            <li className="text-gray-500 hover:text-white transition-colors ">
              <a href="/characters" className="border-0">
                Personagens
              </a>
            </li>
            <li className="text-gray-500 hover:text-white transition-colors">
              <a href="/planets" className="border-0">
                Planetas
              </a>
            </li>
            <li className="text-gray-500 hover:text-white transition-colors">
              <a href="/films" className="border-0">
                Filmes
              </a>
            </li>
            <li className="text-gray-500 hover:text-white transition-colors">
              <a href="/species" className="border-0">
                Espécies
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
