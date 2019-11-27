<template>
  <div id="app">
    <b-container>
      <h1 class="text-center m-2">
        Papertrail
      </h1>
      <navbar class="text-center mb-3" />
      <router-view />
    </b-container>
  </div>
</template>

<style lang="scss">
@import './assets/_scss/main';
</style>
<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import Navbar from '@/components/Navbar.vue';

@Component({
  components: { Navbar },
})
export default class App extends Vue {
}
</script>
