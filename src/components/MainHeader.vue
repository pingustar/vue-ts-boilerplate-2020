<template>
  <div class="d-flex justify-content-between push">
    <router-link :to="{ name: 'documents' }">
      <h1 class="m-0 p-0">
        PaperTrail <span class="font-size-h4 text-muted">BETA</span>
      </h1>
    </router-link>
    <div class="d-flex align-items-end">
      <b-btn
        :to="{ name: 'add' }"
        variant="primary"
        class="btn-noborder btn-rounded"
      >
        Add Document
      </b-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import api from '@/util/api';

@Component
export default class MainHeader extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
