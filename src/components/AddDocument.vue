<template>
  <!-- Document List -->
  <div class="block">
    <div class="block-header block-header-default">
      <div class="block-title">
        <strong>Add Document</strong> <span class="font-size-sm text-muted">- Provide Document Details</span>
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
      <b-form
        @submit="onSubmit"
        @reset="onReset"
      >
        <b-row>
          <b-col
            md="3"
            lg="2"
          >
            <b-form-group
              id="input-group-type"
              label="Type:"
              label-for="input-type"
            >
              <b-form-select
                v-model="form.type"
                :options="documentTypes"
              />
            </b-form-group>
          </b-col>
          <b-col
            md="4"
            lg="4"
          >
            <b-form-group
              id="input-group-1"
              label="Contact:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.sender"
                list="input-1-list"
                type="text"
                placeholder="Enter Sender"
              />

              <datalist id="input-1-list">
                <option
                  v-for="sender in senders"
                  :key="sender"
                >
                  {{ sender }}
                </option>
              </datalist>
            </b-form-group>
          </b-col>
          <b-col
            md="5"
            lg="6"
          >
            <b-form-group
              id="input-group-2"
              label="Subject:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.subject"
                placeholder="Enter Subject"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            md="5"
            lg="4"
          >
            <b-form-group
              id="input-group-date"
              label="Date:"
              label-for="input-date"
            >
              <b-form-input
                id="input-date"
                v-model="form.date"
                placeholder="Enter Date"
              />
            </b-form-group>
          </b-col>
          <b-col style="min-height: 110px">
            <b-form-group
              id="input-group-x"
              label="Labels:"
              label-for="input-tags"
            >
              <tags-input
                v-model="category"
                element-id="input-tags"
                :existing-tags="categories"
                placeholder="Enter Label"
                :typeahead="true"
                :typeahead-always-show="true"
                :typeahead-hide-discard="true"
                wrapper-class="form-control"
                @tag-added="onTagAdded"
                @tag-removed="onTagRemoved"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="input-group-file"
              label="Upload Document:"
              label-for="input-file"
            >
              <b-form-file
                id="input-file"
                v-model="docFile"
                :state="Boolean(docFile) ? true : null"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            cols="12"
          >
            <div class="d-flex justify-content-between align-items-center">
              <b-form-group label="Additional Options:">
                <b-form-checkbox
                  v-model="form.actionRequired"
                  name="form-actionRequired"
                  inline
                >
                  Action Required
                </b-form-checkbox>
                <b-form-checkbox
                  v-model="form.keepPaper"
                  name="form-keepPaper"
                  inline
                >
                  Keep Paper
                </b-form-checkbox>
                <b-form-checkbox
                  v-model="memo"
                  name="form-addmemo"
                  inline
                >
                  Add Memo
                </b-form-checkbox>
              </b-form-group>
              <div>
                <b-button
                  type="reset"
                  variant="secondary"
                  class="btn-noborder btn-rounded mr-2"
                  :disabled="loading"
                >
                  Reset
                </b-button>
                <b-button
                  type="submit"
                  variant="primary"
                  class="btn-noborder btn-rounded"
                  :disabled="loading"
                >
                  Submit
                </b-button>
              </div>
            </div>
          </b-col>
          <b-col
            v-if="memo"
            md="8"
            lg="6"
          >
            <b-form-group
              id="input-group-memo"
              label="Memo:"
              label-for="formmemo"
            >
              <b-form-textarea
                id="formmemo"
                v-model="form.memo"
                placeholder="Enter memo here..."
                rows="2"
                max-rows="6"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </div>
    <div class="block-content">
      <b-alert
        :show="errors.length"
        variant="danger"
        dismissible
        @dismissed="errors = []"
      >
        <p
          v-for="(e, index) in errors"
          :key="index"
        >
          {{ e.msg }}
        </p>
      </b-alert>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import api from '@/util/api';

enum DocumentTypes {
  Received,
  Sent,
  Draft}

type TDocumentTypes =
        DocumentTypes.Received |
        DocumentTypes.Sent | DocumentTypes.Draft;

@Component
export default class AddDocument extends Vue {
  private loading = false;

  private errors = [];

  documentTypes = [
    { value: DocumentTypes.Received, text: 'Received' },
    { value: DocumentTypes.Sent, text: 'Sent' },
    { value: DocumentTypes.Draft, text: 'Draft' },
  ]

  private categories: any[] = [];

  private category: any[] = [];

  private senders: string[] = [];

  memo = false

  docFile: File | null = null

  private form = {
    sender: '',
    subject: '',
    keepPaper: false,
    actionRequired: false,
    type: 0,
    categories: [] as string[],
    date: '',
    memo: '',
  }

  async onSubmit(evt: any) {
    this.loading = true;
    console.log(this.form.categories);
    evt.preventDefault();
    try {
      const formData = new FormData();
      // @ts-ignore
      formData.append('docFile', this.docFile);
      formData.append('sender', this.form.sender);
      formData.append('subject', this.form.subject);
      formData.append('keepPaper', JSON.stringify(this.form.keepPaper));
      formData.append('actionRequired', JSON.stringify(this.form.actionRequired));
      formData.append('categories', JSON.stringify(this.form.categories));
      formData.append('type', this.form.type.toString());
      formData.append('date', this.form.date);
      formData.append('memo', this.form.memo);

      const resp = await api.post('documents/add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      // const resp = await api.post('documents/add', { document: this.form });
      // @ts-ignore
      await this.$router.push({ name: 'documents' });
      await this.resetForm();
      // @ts-ignore
      this.$bvToast.toast(resp.data, {
        title: 'Success',
        variant: 'success',
        autoHideDelay: 3000,
        appendToast: true,
      });
    } catch (error) {
      if (error.response) {
        this.errors = error.response.data.error;
      }
    } finally {
      this.loading = false;
    }
  }

  async getCategories() {
    this.categories = [];
    const resp = await api.get('documents/categories');
    // eslint-disable-next-line no-restricted-syntax
    for (const cat of resp.data.categories) {
      this.categories.push({ key: cat.id, value: cat.name });
    }
  }

  async getSenders() {
    this.senders = [];
    const resp = await api.get('documents/senders');
    // eslint-disable-next-line no-restricted-syntax
    for (const s of resp.data.senders) {
      this.senders.push(s.name);
    }
    console.log(this.senders);
  }

  async onTagAdded(slug: any) {
    this.form.categories.push(slug.value);
  }

  onTagRemoved(slug: any) {
    console.log(`Tag removed: ${slug}`);
  }

  async onReset(evt: any) {
    evt.preventDefault();
    await this.resetForm();
  }

  async resetForm() {
    // Reset our form values
    this.form = {
      sender: '',
      subject: '',
      keepPaper: false,
      actionRequired: false,
      type: DocumentTypes.Received,
      categories: [],
      date: '',
      memo: '',
    };
    this.memo = false;
  }

  async created() {
    await this.getCategories();
    await this.getSenders();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
