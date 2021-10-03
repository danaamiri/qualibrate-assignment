import axios, { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'

export default axios.create({
  baseURL: 'https://api.tvmaze.com/'
})

// Make an Observable Object from the axios Promise response
export function createObservable<T> (promise: Promise<AxiosResponse<T>>): Observable<T> {
  return new Observable<T>(observer => {
    promise
      .then(res => observer.next(res.data))
      .catch(err => observer.error(err.response))
  })
}
