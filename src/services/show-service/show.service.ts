import { Observable } from 'rxjs'
import apiClient, { createObservable } from '@/utils/api/apiClient.service'
import { ShowModel } from '@/models/show.model'
import { CastModel } from '@/models/cast.model'

export class ShowService {
  public static fetchShows (page: number): Observable<ShowModel[]> {
    return createObservable(apiClient.get('/shows?page=' + page))
  }

  public static getShowById (id: number): Observable<ShowModel> {
    return createObservable(apiClient.get('/shows/' + id))
  }

  public static getShowCasts (id: number): Observable<CastModel[]> {
    return createObservable(apiClient.get('/shows/' + id + '/cast'))
  }
}
