<template>
  <div>
    <b-row class="mt-5">
      <b-col cols="12">
        <HelloWorld />
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
