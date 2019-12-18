<template>
  <!-- Collapsible Inbox Navigation -->
  <div class="js-inbox-nav d-none d-md-block">
    <div class="block">
      <div class="block-header block-header-default">
        <h3 class="block-title">
          Contacts
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
            v-for="sender in sortedSenders"
            :key="sender.id"
            class="nav-item"
          >
            <router-link
              class="nav-link d-flex align-items-center justify-content-start"
              :to="{ name: 'documents', query: { sender: sender.name } }"
            >
              <img
                class="img-avatar img-avatar20 mr-1"
                :src="getSenderLogo(sender)"
                :alt="sender.name"
              >
              <span class="ml-5">
                {{ sender.name }}
              </span>
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

interface ISender {
  id: number;
  name: string;
  logo?: string;
  senderCount: string;
}

@Component
export default class BlockSenders extends Vue {
  private senders: ISender[] = [];

  get sortedSenders() {
    function compare(a: ISender, b: ISender) {
      if (a.senderCount > b.senderCount) {
        return -1;
      }
      if (a.senderCount < b.senderCount) {
        return 1;
      }
      return 0;
    }

    return this.senders.sort(compare);
  }

  // eslint-disable-next-line class-methods-use-this
  getSenderLogo(sender: ISender): string {
    const assetPath = '/assets/media/logos/';
    const res = sender.logo !== '' ? assetPath + sender.logo : `${assetPath}default.jpg`;
    return res;
  }

  async getSenders() {
    const senders = await api.get('documents/senders');
    this.senders = senders.data.senders;
    console.log(this.senders);
  }

  async mounted() {
    await this.getSenders();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
