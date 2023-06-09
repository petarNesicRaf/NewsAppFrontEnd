<template>
    <div class="container">
        <h1>Edit User</h1>
        <form @submit.prevent="updateUser" class="mt-3">
            <div>
                <label for="email">Email:</label>
                <p>{{ this.user.email }}</p>
                <label for="name">Name:</label>
                <p>{{ this.user.name }}</p>
                <label for="surname">Surname:</label>
                <p>{{ this.user.surname }}</p>
                <label for="password">Password:</label>
                <p>{{ this.user.password }}</p>
                <label for="type">Type:</label>
                <p>{{ this.user.type }}</p>
            </div>
            <div class="form-group">
                <input type="email" class="form-control" id="email" v-model="user.email" required>
            </div>
            <div class="form-group">

                <input type="text" class="form-control" id="name" v-model="user.name" required>
            </div>
            <div class="form-group">

                <input type="text" class="form-control" id="surname" v-model="user.surname" required>
            </div>
            <div class="form-group">

                <input type="text" class="form-control" id="role" v-model="user.role" required>

            </div>
            <button type="submit" class="btn btn-primary">Update User</button>
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
                role: ''
            }
        };
    },
    methods: {
        updateUser() {
            // Perform the update logic for the user
            this.$axios.post('/api/users/editUser', {
                name: this.user.name,
                surname: this.user.surname,
                email: this.user.email,
                role: this.user.role
            }).then(response=>{
                console.log(response)
            })
        }

    },
    created() {
        this.$axios.get(`/api/users/${this.$route.query.email}`).then((response) => {
            this.user.email = response.data.email
            this.user.email = response.data.name
            this.user.email = response.data.surname
            this.user.email = response.data.password
            this.user.email = response.data.role
        })
    }
};
</script>

<style scoped>
/* Custom styles specific to this component */
</style>
