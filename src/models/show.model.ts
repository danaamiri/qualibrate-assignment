export interface ShowModel {
  name: string
  image: {
    medium: string
    original: string
  }
  rating: {
    average: number
  }
  language: string
  network: {
    name: string
    country: {
      name: string
    }
  }
  premiered: string
  ended: string
}
