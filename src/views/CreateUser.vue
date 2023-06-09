<template>
    <div class="container">
        <h1>Create New User</h1>
        <form @submit.prevent="submitForm" class="mt-3">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" id="email" v-model="user.email" required>
            </div>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" id="name" v-model="user.name" required>
            </div>
            <div class="form-group">
                <label for="surname">Surname:</label>
                <input type="text" class="form-control" id="surname" v-model="user.surname" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" id="password" v-model="user.password" required>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" class="form-control" id="confirmPassword" v-model="user.confirmPassword" required>
            </div>
            <div class="form-group">
                <label for="role">Role:</label>
                <input type="text" class="form-control" id="role" v-model="user.role" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                email: '',
                name: '',
                surname: '',
                password: '',
                confirmPassword: '',
                role: ''
            }
        };
    },
    methods: {
        submitForm() {
            this.$axios.post('/api/users/create', {
                email: this.user.email,
                name: this.user.name,
                surname: this.user.surname,
                password: this.user.password,
                role: this.user.role
            }).then(response=>{
                console.log(response)
            })
        }
    }
};
</script>

<style scoped>
/* Custom styles specific to this component */
</style>
