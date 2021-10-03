import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { ShowService } from '@/services/show-service/show.service'
import Loading from '@/utils/components/Loading.vue'
import NotFound from '@/utils/components/NotFound.vue'
import { ShowModel } from '@/models/show.model'
import { CastModel } from '@/models/cast.model'

@Component({
  components: {
    Loading,
    NotFound
  }
})
export default class ShowDetails extends Vue {
  isLoading = true
  notFound = false
  showDetails: ShowModel
  castList: CastModel[] = []

  mounted (): void {
    const showId = Number(this.$route.params.id)
    if (isNaN(showId)) {
      this.isLoading = false
      this.notFound = true
    } else {
      this.getShowById(showId)
    }
  }

  getShowById (id: number): void {
    this.isLoading = true
    ShowService.getShowById(id).subscribe(showResult => {
      this.showDetails = showResult
      ShowService.getShowCasts(id).subscribe(castRes => {
        this.isLoading = false
        this.castList = castRes.slice(0, 8)
      })
    }, error => {
      console.log(error)
      if (error.status === 404) {
        this.isLoading = false
        this.notFound = true
      }
    })
  }

  // Extract The Premiered Year from the string date
  splitPremieredDate (premiered: string): string {
    if (!premiered) return ''
    return premiered.substr(0, 4)
  }
}
