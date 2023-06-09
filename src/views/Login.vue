<template>
  <div class="pt-5">
    <h1 v-if="email">Hello, {{email}}</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="email" type="text" class="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter username">
        <small id="usernameHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
      //salje post login
    login() {
      this.$axios.post('/api/users/login', {
        //postavlja bodi za post
        email: this.email,
        password: this.password,
      }).then(response => {
        //postavlja jwt u localstorage
        localStorage.setItem('jwt', response.data.jwt)
        localStorage.setItem('email', this.email)
        console.log(response.data.jwt)
        //preusmerava na Subjects
        this.$router.push({name: 'News'});
      })
    }
  },
}
</script>

<style scoped>

</style>
