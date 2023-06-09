<template>
    <div>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" v-model="title" required>
            </div>
            <div class="form-group">
                <label for="text">Text</label>
                <textarea class="form-control" id="text" v-model="text" required></textarea>
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <select class="form-control" id="category" v-model="category" required>
                    <option value="" disabled>Select a category</option>
                    <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="tags">Tags</label>
<!--                TODO-->
                <select class="form-control" id="tags" v-model="selectedTag">
                    <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="newTag">New Tag</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="newTag" v-model="newTag">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="addTag">Add Tag</button>
                    </div>
                </div>
                <small class="form-text text-muted">Press Enter to add the tag.</small>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            text: '',
            category: '',
            selectedTag: '',
            newTag: '',
            categories: [], // Replace with your own categories
            tags: [] // Replace with your own tags
        };
    },
    methods: {
        submitForm() {
            this.$axios.post('/api/news/createNews', {
                title: this.title,
                text: this.text,
                dateTime: new Date(),
                author: "email",
                category: this.category,
                readers: 0
            }).then(response=>{
                console.log(response.data)
                this.$router.push({name: "News"})
                this.$axios.post('/api/tags/addTag', {
                    news_title : this.title,
                    tag_keyword : this.selectedTag
                }).then(response=>{
                    console.log(response)
                })
            })
        },
        addTag() {
            this.$axios.post('/api/tags/createTag', {
                keyword: this.newTag
            }).then(response=>{
                console.log(response)
                this.$axios.get('/api/tags').then((response) => {
                    //uzima sve subjecte
                    this.tags = response.data.map((tag)=>tag.keyword);
                });
            })

        }
    },
    created(){
        this.$axios.get('/api/categories/allCategories').then((response) => {
            //uzima sve subjecte
            this.categories = response.data.map((category)=>category.name);
        });
        this.$axios.get('/api/tags').then((response) => {
            //uzima sve subjecte
            this.tags = response.data.map((tag)=>tag.keyword);
        });
    }
};
</script>
