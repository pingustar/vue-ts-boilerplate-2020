<template>
  <div id="app">
    <!-- Page Container -->
    <div
      id="page-container"
      class="page-header-modern main-content-boxed"
    >
      <!-- Main Container -->
      <main id="main-container">
        <!-- Page Content -->
        <div class="content">
          <main-header />
          <router-view />
        </div>
      <!-- END Page Content -->
      </main>
    <!-- END Main Container -->
    </div>
  </div>
</template>

<style lang="scss">
@import './assets/_scss/main';
</style>
<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import Navbar from '@/components/Navbar.vue';
import MainHeader from '@/components/MainHeader.vue';

@Component({
  components: { MainHeader, Navbar },
})
export default class App extends Vue {
}
</script>
