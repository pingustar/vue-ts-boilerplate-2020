<template>
  <b-table
    responsive
    striped
    hover
    head-variant="dark"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :fields="fields"
    :items="documents"
  >
    <!-- A custom formatted column -->
    <template v-slot:cell(categories)="data">
      <b-badge
        v-for="category in data.value"
        :key="category.id"
        class="small mx-1"
      >
        {{ category.name.toUpperCase() }}
      </b-badge>
    </template>
  </b-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import api from '@/util/api';

@Component
export default class HelloWorld extends Vue {
  private documents: any[] = [];

  private sortBy = 'id';

  private sortDesc = true;

  private fields = [
    {
      key: 'id',
      sortable: true,
    },
    {
      key: 'sender',
      sortable: true,
    },
    {
      key: 'subject',
      sortable: false,
    },
    {
      key: 'createdAt',
      sortable: true,
    },
    {
      key: 'categories',
      sortable: false,
    },
  ]

  async getDocuments() {
    const params = {
      type: 1,
      categories: [],
    };
    const documents = await api.get('documents/filter', { params });
    this.documents = documents.data.documents;
  }

  async mounted() {
    await this.getDocuments();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
