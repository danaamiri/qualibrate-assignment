import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { ShowService } from '@/services/show-service/show.service'
import router from '@/router'
import Loading from '@/utils/components/Loading.vue'
import { ShowModel } from '@/models/show.model'

export class SortModel {
  title = ''
  property = ''
  type = ''
  asc = true
}

@Component({
  components: {
    Loading
  }
})
export default class ShowsList extends Vue {
  isLoading = false
  fetchPages = 1

  selectedSort: SortModel

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
    for (let i = 0; i < this.fetchPages; i++) {
      this.isLoading = true
      ShowService.fetchShows(i)
        .subscribe(response => {
          this.showsList = this.showsList.concat(response)
          if (i === this.fetchPages - 1) {
            this.sortShows(this.sortObjects[0])
            this.isLoading = false
          }
        })
    }
  }

  goToDetails (id: number): void {
    router.push('/' + id)
  }

  splitPremieredDate (premiered: string): string {
    if (!premiered) return ''
    return premiered.substr(0, 4)
  }

  sortShows (sort: SortModel): void {
    this.selectedSort = sort
    this.showsListToShow = this.showsList.sort((a, b) => {
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
  }

  searchShows (query: string): void {
    if (query.length === 0) {
      this.showsListToShow = this.showsList
    } else {
      this.showsListToShow = this.showsList.filter(show => show.name.toLowerCase().includes(query.toLowerCase()))
    }
    this.sortShows(this.selectedSort)
  }

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
}
