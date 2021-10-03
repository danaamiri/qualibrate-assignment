<template>
  <div id="app">
    <div class="header d-flex align-items-center justify-content-between pe-4 ps-4" v-on:click="backToHome">
      <div class="title text-light text-start">
        <h3 class="fw-bold mb-0">Qualibrate Shows</h3>
        <p class="subtitle">Choose Between All of Your Favorite Shows</p>
      </div>
      <div v-if="isBackButtonEnabled()" class="back d-flex align-items-center justify-content-center text-light">
        <p class="me-3 subtitle">Back To Main Page</p>
        <i class="fa fa-chevron-right"></i>
      </div>
    </div>
    <div class="online-container d-flex align-items-center justify-content-center" v-if="!isOnLine">
      <div class="d-flex align-items-center justify-content-center">
        <i class="fa fa-wifi "></i>
        <p class="ms-3">No Internet Connection</p>
      </div>
    </div>
    <div id="body-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { Component } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class App extends Vue {
  isOnLine = navigator.onLine

  mounted () {
    window.addEventListener('online', () => {
      this.isOnLine = true
    })
    window.addEventListener('offline', () => {
      this.isOnLine = false
    })
  }

  isBackButtonEnabled (): boolean {
    return this.$route.path !== '/shows'
  }

  backToHome (): void {
    router.push('/shows')
  }
}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

p {
  margin-bottom: 0 !important;
}

.header {
  position: fixed;
  height: 65px;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  z-index: 1300;

  .back {
    cursor: pointer;
  }
}

.online-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #701824;
  height: 65px;
  z-index: 1302;
  color: white;
}

.emblem {
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 15px;
  width: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  margin-bottom: 15px;
  margin-top: 15px;
  background-color: #707070;

  label {
    height: 100%;
    padding: 3px 5px;
    background-color: #a3a3a3;
  }

  p {
    width: 100%;
    text-align: center;
  }

  &.score {
    background-color: #1f891e;

    label {
      background-color: #53a652;
    }
  }

  &.imdb {
    background-color: #f6b828;

    label {
      background-color: #b5964f;
    }
  }
}

@media (max-width: 767.9px) {
  .header {
    .subtitle {
      display: none;
    }

    .fa-chevron-right {
      font-size: 30px !important;
    }
  }
}
</style>
