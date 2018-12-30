<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-field md-clearable>
            <label>Username</label>
            <md-input v-model="username"></md-input>
        </md-field>

        <md-field>
            <label>Password</label>
            <md-input v-model="password" type="password"></md-input>
        </md-field>
            <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
        </form>
    </div>
</template>

<script>
  import Vue from 'vue'
  import UserService from '@/service/UserService.js'
  import {router} from '@/router.js'

  export default Vue.extend({
    data: () => ({
      username: '',
      password: '',
      returnUrl: '',
      user: null,
      sending: false
    }),
    methods: {
      validateUser() {
        UserService.login(this.username, this.password).then(user => {
          this.user = user
          router.push(this.returnUrl)
        })
      }
    },
    created () {
      UserService.logout();

      this.returnUrl = this.$route.query.returnUrl || '/';
    }
  })
</script>

<style lang="scss" scoped>
    .md-field:last-child {
        margin-bottom: 40px;
    }
</style>