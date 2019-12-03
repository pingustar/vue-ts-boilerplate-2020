<template>
  <div class="row">
    <div class="col-md-5 col-xl-3">
      <block-senders />
      <!-- Collapsible Inbox Navigation -->
      <block-labels />
      <!-- END Collapsible Inbox Navigation -->
    </div>
    <div class="col-md-7 col-xl-9">
      <!-- Document List -->
      <block-documents-list />
      <!-- END Document List -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BlockDocumentsList from '@/components/BlockDocumentsList.vue';
import BlockLabels from '@/components/BlockLabels.vue';
import BlockSenders from '@/components/BlockSenders.vue';

export default {
  name: 'Home',
  components: {
    BlockSenders,
    BlockDocumentsList,
    BlockLabels,
  },
};
</script>
