<template>
  <div>
    <b-pagination
      v-model="currentPage"
      :total-rows="documents.length"
      :per-page="perPage"
      aria-controls="my-table"
    />

    <b-table
      id="my-table"
      responsive
      striped
      hover
      head-variant="dark"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :fields="fields"
      :items="documents"
      :per-page="perPage"
      :current-page="currentPage"
      small
    >
      <template v-slot:cell(show_details)="row">
        <b-button
          size="sm"
          class="mr-2"
          @click="row.toggleDetails"
        >
          {{ row.detailsShowing ? 'Hide' : 'Show' }}
        </b-button>
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Age:</b>
            </b-col>
            <b-col>{{ row.item.age }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Is Active:</b>
            </b-col>
            <b-col>{{ row.item.isActive }}</b-col>
          </b-row>

          <b-button
            size="sm"
            @click="row.toggleDetails"
          >
            Hide Details
          </b-button>
        </b-card>
      </template>
      <template v-slot:cell(createdAt)="data">
        {{ moment(data.value).format("MMM Do YY") }}
      </template>
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';
import api from '@/util/api';

@Component
export default class HelloWorld extends Vue {
  private documents: any[] = [];

  private moment = moment;

  private sortBy = 'id';

  private sortDesc = true;

  private perPage = 10;

  private currentPage = 1;

  private fields = [
    {
      key: 'id',
      sortable: true,
    },
    {
      key: 'sender.name',
      label: 'Sender',
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
    {
      key: 'show_details',
      label: 'Details',
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
