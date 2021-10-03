<template>
  <div class="not-found-component">
    <div class="not-found-container">
      <img class="mb-5" src="@/assets/img/not-found.png">
      <p class="fs-2 fw-bold text-center">We Couldn't Find The Show in The Box!</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import Vue from 'vue'

@Component({
  name: 'NotFound'
})
export default class NotFound extends Vue {

}
</script>

<style scoped lang="scss">
.not-found-component {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;

  .not-found-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 30vw;
    }
  }
}

@media (max-width: 767.9px) {
  .not-found-container {
    img {
      width: 90vw !important;
    }

    p{
      line-height: 25px;
    }
  }
}
</style>
