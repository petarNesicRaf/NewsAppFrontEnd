<template>
    <div>
        <h1 class="mt-4">Edit {{name}}Category</h1>
        <form @submit="editCategory" class="mt-4">
            <div class="form-group">
                <h2>Name: {{ name }}</h2>
                <h2>Description: {{ description }}</h2>

                <label for="name">Name:</label>
                <input type="text" id="name" v-model="category.name" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" v-model="category.description" class="form-control" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Edit Category</button>
        </form>
    </div>
</template>


<script>
export default {
    data() {
        return {
            category: {
                name: '',
                description: ''
            }
        };
    },
    created() {
        this.name = this.$route.query.name || '';
        this.description = this.$route.query.description || '';
    },
    methods: {
        editCategory() {

            this.$axios.post('/api/categories/editCategory', {
                //postavlja bodi za post
                name: this.category.name,
                description: this.category.description,
            }).then(response => {
                //postavlja jwt u localstorage
                //TODO
                console.log("response todo "  + response)
                //preusmerava na Subjects
                this.$router.push({name: 'Categories'});
            })            // Reset form fields after submission
            this.category.name = '';
            this.category.description = '';
        }
    }
}</script>