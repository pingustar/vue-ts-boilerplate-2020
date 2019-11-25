<template>
  <div>
    <b-btn
      variant="primary"
      @click="login"
    >
      Login
    </b-btn>
    <b-btn
      variant="primary"
      @click="getUsers"
    >
      Get Users
    </b-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import api from '@/util/api';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  getUsers = async () => {
    // api.defaults.withCredentials = true;
    // eslint-disable-next-line max-len
    const Cookie = 'JwtCookieKey=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoxLCJpYXQiOjE1NzQyOTU1MzMsImV4cCI6MTU3NDU1NDczM30.xUIkdmeogvVja77bIYWjhUQmjqR0jlyzqfQIoe49xug.22V39u5StbHCuhM8QdRk%2B3pbMGU0l4eDVJxib%2BeAi5s';
    //
    // api.defaults.headers.common.Cookie = Cookie;

    const axiosConfig = {
      headers: {
        'content-Type': 'application/json',
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: `${Cookie}`,
      },
      // withCredentials: true,
    };
    // api.defaults.withCredentials = true;
    const resp = await api.get('users/all',
      axiosConfig);

    // const resp = await api.get('users/all');
    console.log(resp.data.users);
  };

  login = async () => {
    const user = {
      email: 'jan@test.com',
      password: 'Password@1',
    };
    const resp = await api.post('auth/login', user);
    console.log(resp);
  };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
