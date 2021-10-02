import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { ShowService } from '@/services/show-service/show.service'
import Loading from '@/utils/components/Loading.vue'
import { ShowModel } from '@/models/show.model'
import { CastModel } from '@/models/cast.model'

@Component({
  components: {
    Loading
  }
})
export default class ShowDetails extends Vue {
  isLoading = true
  showDetails: ShowModel
  castList: CastModel[] = []

  mounted (): void {
    const showId = this.$route.params.id
    this.getShowById(Number(showId))
  }

  getShowById (id: number): void {
    this.isLoading = true
    ShowService.getShowById(id).subscribe(showResult => {
      this.showDetails = showResult
      ShowService.getShowCasts(id).subscribe(castRes => {
        this.isLoading = false
        this.castList = castRes.slice(0, 8)
      })
    })
  }

  splitPremieredDate (premiered: string): string {
    if (!premiered) return ''
    return premiered.substr(0, 4)
  }
}
