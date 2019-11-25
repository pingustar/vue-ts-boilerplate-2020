<template>
  <b-container>
    <b-row>
      <HelloWorld />
    </b-row>
  </b-container>
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
