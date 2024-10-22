
interface Origin {
  name: string;
  url: string;
}

interface Location {
  name: string;
  url: string;
}

interface info {

count: number,
pages: 42,
next: number,
prev: any

}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}


export interface CharacterResponse {

  info: Info,
  results: Character[]

}
