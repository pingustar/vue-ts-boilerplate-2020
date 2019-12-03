<template>
  <!-- Document List -->
  <div class="block">
    <div class="block-header block-header-default">
      <div class="block-title">
        <strong>Documents</strong> <span class="font-size-sm">({{ documents.length }})</span>
      </div>
      <div class="block-options">
        <button
          type="button"
          class="btn-block-option"
          data-toggle="block-option"
        >
          <i class="si si-arrow-left" />
        </button>
        <button
          type="button"
          class="btn-block-option"
          data-toggle="block-option"
        >
          <i class="si si-arrow-right" />
        </button>
        <button
          type="button"
          class="btn-block-option"
          data-toggle="block-option"
          data-action="state_toggle"
          data-action-mode="demo"
        >
          <i class="si si-refresh" />
        </button>
        <button
          type="button"
          class="btn-block-option"
          data-toggle="block-option"
          data-action="fullscreen_toggle"
        />
      </div>
    </div>
    <div class="block-content">
      <!-- Document -->
      <table class="js-table-checkable table table-hover table-striped table-vcenter">
        <tbody>
          <tr
            v-for="doc in documents"
            :key="doc.id"
          >
            <td
              class="text-center"
              style="width: 40px;"
            >
              {{ doc.id }}
            </td>
            <td style="width: 70px;">
              <img
                class="img-avatar img-avatar48"
                :src="getSenderLogo(doc.sender)"
                alt=""
              >
            </td>
            <td>
              <div class="font-w600">
                {{ doc.sender.name }}
              </div>
              <div class="text-muted mt-5">
                {{ doc.subject }}
              </div>
            </td>
            <td
              class="d-none d-xl-table-cell font-w600 font-size-sm text-muted"
              style="width: 120px;"
            >
              {{ moment(doc.createdAt).format("MMM Do YY") }}
            </td>
          </tr>
        </tbody>
      </table>
      <!-- END Document -->
    </div>
  </div>
  <!-- END Document List -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';
import api from '@/util/api';

interface ISender {
  id: number;
  name: string;
  logo?: string;
}

export interface IDocument {
  id: number;
  sender: ISender;
  subject: string;
  type: any;
  categories: any[];
  keepPaper: boolean;
  actionRequired: boolean;
  createdAt: any;
}

@Component
export default class BlockDocumentsList extends Vue {
  private documents: IDocument[] = [];

  private moment = moment;

  // eslint-disable-next-line class-methods-use-this
  getSenderLogo(sender: ISender): string {
    const assetPath = '/assets/media/logos/';
    const res = sender.logo !== '' ? assetPath + sender.logo : `${assetPath}default.jpg`;
    return res;
  }

  async getDocuments() {
    const params = {
      type: 1,
      senders: [5],
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
