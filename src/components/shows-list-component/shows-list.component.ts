import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { ShowService } from '@/services/show-service/show.service'
import router from '@/router'
import Loading from '@/utils/components/Loading.vue'
import NotFound from '@/utils/components/NotFound.vue'
import { ShowModel } from '@/models/show.model'
import { Dictionary } from 'vue-router/types/router'

export class SortModel {
  title = ''
  property = ''
  type = ''
  asc = true
}

@Component({
  components: {
    Loading,
    NotFound
  }
})
export default class ShowsList extends Vue {
  isLoading = false
  fetchPages = 1

  currentSearchTerm = ''

  selectedSort: SortModel = new SortModel()

  sortObjects: SortModel[] = [
    {
      title: 'Name A-Z',
      property: 'name',
      type: 'string',
      asc: true
    },
    {
      title: 'Name Z-A',
      property: 'name',
      type: 'string',
      asc: false
    },
    {
      title: 'Highest Rating',
      property: 'rating.average',
      type: 'number',
      asc: false
    },
    {
      title: 'Lowest Rating',
      property: 'rating.average',
      type: 'number',
      asc: true
    },
    {
      title: 'Latest',
      property: 'premiered',
      type: 'string-date',
      asc: false
    },
    {
      title: 'Oldest',
      property: 'premiered',
      type: 'string-date',
      asc: true
    }
  ]

  searchInput$: Subject<string> = new Subject<string>()

  showsList: ShowModel[] = []
  showsListToShow: ShowModel[] = []

  mounted (): void {
    this.fetchShows()
    this.searchInput$.pipe(debounceTime(1000))
      .subscribe(q => this.searchShows(q))
  }

  fetchShows (): void {
    let retrievedShows
    try {
      retrievedShows = JSON.parse(localStorage.getItem('shows'))
    } catch (e) {
      retrievedShows = null
    }
    if (retrievedShows && retrievedShows.length > 0) {
      this.showsList = retrievedShows as ShowModel[]
      this.prepareListToShow()
      this.isLoading = false
    } else {
      for (let i = 0; i < this.fetchPages; i++) {
        this.isLoading = true
        ShowService.fetchShows(i)
          .subscribe(response => {
            this.showsList = this.showsList.concat(response)
            if (i === this.fetchPages - 1) {
              localStorage.setItem('shows', JSON.stringify(this.showsList))
              this.prepareListToShow()
              this.isLoading = false
            }
          })
      }
    }
  }

  goToDetails (id: number): void {
    router.push('/shows/' + id)
  }

  // Extract The Premiered Year from the string date
  splitPremieredDate (premiered: string): string {
    if (!premiered) return ''
    return premiered.substr(0, 4)
  }

  sortShows (sort: SortModel, list: ShowModel[]): void {
    this.selectedSort = sort
    this.showsListToShow = list.sort((a, b) => {
      const aObj = this.byString(a, sort.property)
      const bObj = this.byString(b, sort.property)
      if (aObj === bObj) {
        return 0
      }
      if (sort.asc) {
        if (aObj > bObj) {
          return 1
        } else {
          return -1
        }
      } else {
        if (aObj > bObj) {
          return -1
        } else {
          return 1
        }
      }
    })
    this.buildQueryParam()
  }

  searchShows (query: string): void {
    if (query.length === 0) {
      this.currentSearchTerm = ''
      this.showsListToShow = this.showsList
    } else {
      this.currentSearchTerm = query
      this.showsListToShow = this.showsList.filter(show => show.name.toLowerCase().includes(query.toLowerCase()))
    }
    this.sortShows(this.selectedSort, this.showsListToShow)
  }

  // Find the property by path in a nested object
  byString (o: any, s: string): any {
    s = s.replace(/\[(\w+)\]/g, '.$1')
    s = s.replace(/^\./, '')
    const a = s.split('.')
    for (let i = 0, n = a.length; i < n; ++i) {
      const k = a[i]
      if (k in o) {
        o = o[k]
      } else {
        return
      }
    }
    return o
  }

  prepareListToShow () {
    const queryObj = this.$route.query
    if (queryObj.sort) {
      const filterObjs: SortModel[] = this.sortObjects.filter(i => i.property === queryObj.sort)
      if (filterObjs.length > 0) {
        console.log(filterObjs.filter(i => i.asc === (queryObj.asc === '1'))[0])
        this.selectedSort = filterObjs.filter(i => i.asc === (queryObj.asc === '1'))[0]
      } else {
        console.log(this.sortObjects[0])
        this.selectedSort = this.sortObjects[0]
      }
    } else {
      this.selectedSort = this.sortObjects[0]
    }
    if (queryObj.q && queryObj.q.length > 0) {
      this.searchShows(String(queryObj.q))
    } else {
      this.sortShows(this.selectedSort, this.showsList)
    }
  }

  buildQueryParam () {
    const queryObj: Dictionary<string> = {
      sort: this.selectedSort.property,
      asc: (this.selectedSort.asc ? '1' : '0')
    }
    if (this.currentSearchTerm.length > 0) {
      queryObj.q = this.currentSearchTerm
    }

    router.push({ query: queryObj }).catch(() => null)
  }
}
