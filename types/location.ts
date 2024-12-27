type NamedEntity = {
  id: number
  name: string
}

export type Location = {
  continent: NamedEntity
  country: NamedEntity
  state: NamedEntity
}

export type Region = {
  id: number
  name: string
}

export type Country = {
  id: number
  name: string
  region_id: number
  translations: {
    'pt-BR': string
  }
}

export type State = {
  id: number
  name: string
  country_id: number
}
