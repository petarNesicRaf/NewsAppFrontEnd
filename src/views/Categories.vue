<template>
    <div class="subjects">
        <h1 class="mt-4">Categories</h1>

        <div class="row">
            <div class="col-4">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th> <!-- New column for edit and delete buttons -->
                        <th scope="col">Actions</th> <!-- New column for edit and delete buttons -->
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="cat in categories" :key="cat.id" @click="selectedCategory = cat">
                        <th @click = "getNewsByCat(cat.name)" scope="row">{{ cat.name | capitalize }}</th>
                        <td>{{ cat.description |  shortText}}</td>
                        <td>
                            <!-- Edit button -->
                            <button @click="editCategory(cat.name)" class="btn btn-primary">Edit</button>
                        </td>

                        <td>
                            <button @click="deleteCategory(cat.name)" class="btn btn-danger">Delete</button>
                        </td>

                    </tr>
                    </tbody>
                </table>
                <button @click="addCat" class="btn btn-primary">Add Category</button>

            </div>
        </div>
    </div>
</template>
<script>
//importovan odavde
import Category from "../components/Category.vue";

export default {
    // eslint-disable-next-line vue/no-unused-components
    components: {Category},
    filters: {
        shortText(value) {
            if (value.length < 30) {
                return value;
            }
            return value.slice(0, 30) + '...'
        }
    },
    data() {
        return {
            //selected subject se popuni tako sto dohvati
            selectedCategory: null,
            categories: []
        }
    },
    created() {
        this.$axios.get('/api/categories/allCategories').then((response) => {
            //uzima sve subjecte
            console.log('uslo')
            console.log(response.data)
            this.categories = response.data;
        });
    },
    methods: {
        editCategory(catname) {
            // Handle the edit action for the category
            console.log('catname ' + catname)
            this.$axios.get(`/api/categories/${catname}`).then((response) => {
                console.log(response)
                const {name, description} = response.data
                this.$router.push({
                    name: 'EditCategory',
                    query: {
                    name, description
                    }
                })
            });
        },
        deleteCategory(catname) {
            this.$axios.post('/api/categories/deleteCategory', {
                name : catname
            }).then(response=>{
                console.log(response)
            })
        },
        addCat() {
            // Logic for adding a new category
            // For example, you can navigate to the '/add-category' path when the button is clicked
            console.log("sdaka")
            this.$router.push({name: 'AddCategory'});
        },
        getNewsByCat(catname){
            //TODO
            this.$router.push({name:'NewsByCategory', query: {catname} })
        }
    }
}
</script>
