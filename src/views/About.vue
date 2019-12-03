<template>
  <b-row>
    <b-col cols="12">
      <add-document />
    </b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src
import AddDocument from '@/components/AddDocument.vue';

export default {
  name: 'Home',
  components: {
    AddDocument,
  },
};
</script>
