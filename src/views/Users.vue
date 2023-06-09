<template>
    <div class="container">
        <h1>Users</h1>
        <table class="table">
            <thead>
            <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Actions</th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="user in this.users" :key="user.id">
                <td>{{ user.email }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.surname }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.status }}</td>
                <td>
                    <button @click="activateUser(user.email)"  class="btn btn-success">Activate/Deactivate</button>
                </td>
                <td>
                    <button @click="editUser(user.email)"  class="btn btn-success">Edit</button>
                </td>
            </tr>
            </tbody>
        </table>
        <button @click="createUser" class="btn btn-primary">Create User</button>

    </div>
</template>

<script>
export default {
    data() {
        return {
            users: []
        };
    },
    methods: {
        activateUser(usermail) {
            // Perform the activation logic for the user
            this.$axios.post(`/api/users/status`, {
                email: usermail
            }).then((response) => {
                this.$axios.get(`/api/users`).then((response) => {
                    this.users = response.data
                    console.log(response)
                })
                console.log(response)

            })
        },

        editUser(email){
            this.$router.push({name:"EditUser", query: {email}})
        },
        createUser() {
            this.$router.push({name:"CreateUser"})
        }
    },
    created() {
        this.$axios.get(`/api/users`).then((response) => {
            this.users = response.data
            console.log(response)
        })
    }
}
</script>

<style scoped>
/* Custom styles specific to this component */
</style>
