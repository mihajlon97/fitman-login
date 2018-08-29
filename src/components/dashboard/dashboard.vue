<template>
  <div id="dashboard">
      <h1>Hi user, <br><b>token:</b> {{$store.getters.getToken}}, <br><b>role:</b> {{$store.getters.getRole}}</h1>
      <p>You're logged in with Vue + Vuex & JWT!!</p>
      <p @click="logout">
          <router-link to="/?logout=1">Logout</router-link>
      </p>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    methods: {
        ...mapActions([
            'logout'
        ])
    }}
</script>

<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }
</style>