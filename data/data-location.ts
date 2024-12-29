'use server'
import countryData from '@/json/countries.json'
import statesData from '@/json/states.json'
import type { Country, State } from '@/types/location'

export async function fetchCountries(continendId: number) {
  const filteredCountries: Country[] = countryData.filter(
    country => country.region_id === continendId
  )
  return filteredCountries
}

export async function fetchStates(countryId: number) {
  const filteredStates: State[] = statesData.filter(
    state => state.country_id === countryId
  )
  return filteredStates
}
