<template>
  <!-- Collapsible Inbox Navigation -->
  <div class="js-inbox-nav d-none d-md-block">
    <div class="block">
      <div class="block-header block-header-default">
        <h3 class="block-title">
          Labels
        </h3>
        <div class="block-options">
          <div class="dropdown">
            <button
              type="button"
              class="btn-block-option"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-fw fa-ellipsis-v" />
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <a
                class="dropdown-item"
                href="javascript:void(0)"
              >
                <i class="fa fa-fw fa-flask mr-5" />Filter
              </a>
              <div class="dropdown-divider" />
              <a
                class="dropdown-item"
                href="javascript:void(0)"
              >
                <i class="fa fa-fw fa-cogs mr-5" />Manage
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="block-content">
        <ul class="nav nav-pills flex-column push">
          <li
            v-for="label in sortedLabels"
            :key="label.id"
            class="nav-item"
          >
            <router-link
              class="nav-link d-flex align-items-center justify-content-between"
              :to="{ name: 'documents', query: getFilter(label.name) }"
            >
              <span><i class="fa fa-fw fa-inbox mr-5" /> {{ label.name }}</span>
              <span class="badge badge-pill badge-secondary">{{ label.docCount }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- END Collapsible Inbox Navigation -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import api from '@/util/api';

interface ILabel {
  id: number;
  name: string;
  docCount: number;
}

@Component
export default class BlockLabels extends Vue {
  private labels: ILabel[] = [];

  get sortedLabels() {
    function compare(a: ILabel, b: ILabel) {
      if (a.docCount > b.docCount) {
        return -1;
      }
      if (a.docCount < b.docCount) {
        return 1;
      }
      return 0;
    }

    return this.labels.sort(compare);
  }

  getFilter(c: string) {
    const q: any = {
      sender: '',
      categories: [],
    };
    if (this.$route.query.sender) q.sender = this.$route.query.sender;
    q.categories = [c];
    return q;
  }

  async getLabels() {
    const documents = await api.get('documents/categories');
    this.labels = documents.data.categories;
  }

  async mounted() {
    await this.getLabels();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
