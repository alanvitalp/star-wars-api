export interface IPlanet {
  terrain: string
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  population: string
  climate: string
  url: string
  gravity: string

  films: IFilm[]
  residents: ICharacter[]
}

export interface ISpecie {
  designation: string
  name: string
  classification: string
  language: string
  homeworld: string
  url: string
  average_height: string
  average_lifespan: string
  eye_colors: string
  hair_colors: string
  skin_colors: string

  films: IFilm[]
  people: ICharacter[]
}

export interface IStarship {
  name: string
  model: string
  starship_class: string
  max_atmosphering_speed: string
  mglt: string
  cost_in_credits: string
  url: string

  films: IFilm[]
  pilots: ICharacter[]
}

export interface IVehicles {
  name: string
  model: string
  vehicle_class: string
  max_atmosphering_speed: string
  cost_in_credits: string
  url: string

  films: IFilm[]
  pilots: ICharacter[]
}

export interface ICharacter {
  name: string
  gender: string
  hair_color: string
  skin_color: string
  eye_color: string
  height: string
  homeworld: string
  url: string
  mass: string

  films: IFilm[]
  starships: IStarship[]
  vehicles: IVehicles[]
  species: ISpecie[]
}

export interface IFilm {
  title: string
  episode_id: string
  opening_crawl: string
  director: string
  release_date: Date
  url: string
  producer: string

  characters: ICharacter[]
  planets: IPlanet[]
  starships: IStarship[]
  vehicles: IVehicles[]
  species: ISpecie[]
}
