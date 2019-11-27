<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-form
          v-if="show"
          @submit="onSubmit"
          @reset="onReset"
        >
          <b-row>
            <b-col
              md="5"
              lg="4"
            >
              <b-form-group
                id="input-group-1"
                label="Sender:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.sender"
                  type="text"
                  required
                  placeholder="Enter Sender"
                />
              </b-form-group>
            </b-col>
            <b-col
              md="7"
              lg="8"
            >
              <b-form-group
                id="input-group-2"
                label="Subject:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.subject"
                  required
                  placeholder="Enter Subject"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col
              md="7"
              lg="8"
            >
              <b-form-group
                id="input-group-x"
                label="Categories:"
                label-for="input-1"
              >
                <v-select
                  taggable
                  multiple
                  v-model="form.categories"
                  :options="[]"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <div class="d-flex justify-content-between">
            <div class="d-flex">
              <b-form-group
                id="input-group-3"
                class="m-0 mr-5"
              >
                <b-form-checkbox
                  id="checkbox-1"
                  v-model="form.keepPaper"
                  name="checkbox-1"
                >
                  Keep Paper
                </b-form-checkbox>
              </b-form-group>

              <b-form-group
                id="input-group-4"
                class="m-0"
              >
                <b-form-checkbox
                  id="checkbox-2"
                  v-model="form.actionRequired"
                  name="checkbox-2"
                >
                  Action Required
                </b-form-checkbox>
              </b-form-group>
            </div>
            <div>
              <b-button
                type="submit"
                variant="primary"
                class="mr-2"
                :disabled="loading"
              >
                Submit
              </b-button>
              <b-button
                type="reset"
                variant="danger"
                :disabled="loading"
              >
                Reset
              </b-button>
            </div>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import api from '@/util/api';

@Component
export default class AddDocument extends Vue {
  private loading = false;

  private form = {
    sender: '',
    subject: '',
    keepPaper: false,
    actionRequired: false,
    type: 0,
    categories: [],
  }

  private show = true

  async onSubmit(evt: any) {
    this.loading = true;
    console.log(this.form.categories);
    evt.preventDefault();
    try {
      const resp = await api.post('documents/add', { document: this.form });
      // @ts-ignore
      this.$router.push({ name: 'documents' });
      await this.resetForm();
      // @ts-ignore
      this.$bvToast.toast(resp.data, {
        title: 'Success',
        variant: 'success',
        autoHideDelay: 3000,
        appendToast: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
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
      type: 0,
      categories: [],
    };
    // Trick to reset/clear native browser form validation state
    this.show = false;
    this.$nextTick(() => {
      this.show = true;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
