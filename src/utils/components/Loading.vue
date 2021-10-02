<template>
  <div class="loading-component">
    <div class="loading-container">
      <img src="@/assets/img/loading.svg">
      <p class="text-light fw-bold fs-3">Loading</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import Vue from 'vue'

@Component({
  name: 'Loading'
})
export default class Loading extends Vue {
}
</script>

<style scoped>
.loading-component {
  position: fixed;
  z-index: 1301;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
