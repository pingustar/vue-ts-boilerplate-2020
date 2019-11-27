<template>
  <div>
    <b-btn
      class="mr-2"
      :to="{ name: 'documents' }"
    >
      Documents
    </b-btn>
    <b-btn :to="{ name: 'add' }">
      Add
    </b-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import api from '@/util/api';

@Component
export default class Navbar extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
