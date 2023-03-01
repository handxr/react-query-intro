export type PeopleResponse = {
  count: number;
  next: string;
  previous: string | null;
  results: Person[];
};

export type Person = {
  name: string;
  created: string;
  edited: string;
  eye_color: string;
  filsms: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  birth_year: string;
  mass: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
};
