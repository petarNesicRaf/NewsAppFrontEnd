<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ news.title }}</h5>
                <p class="card-text">{{ news.text }}</p>
                <p class="card-text">Author: {{ news.author }}</p>
                <p class="card-text">Date: {{ formatDate(news.dateTime) }}</p>
                <p class="card-text">Category: {{ news.category }}</p>
                <h6 class="card-subtitle mb-3">Tags:</h6>
                <ul class="list-inline">
                    <li @click = "clickTag(tag.keyword)" class="list-inline-item" v-for="tag in news.tags" :key="tag">{{ tag.keyword }}</li>
                </ul>
                <h6 class="card-subtitle mb-3">Comments:</h6>
                <div v-for="comment in news.comments" :key="comment.id" class="card mb-3">
                    <div class="card-body">
                        <p class="card-text">Author: {{ comment.content }}</p>
                        <p class="card-text">{{ comment.author }}</p>
                    </div>
                </div>
                <h6 class="card-subtitle mb-3">Add a Comment:</h6>
                <form @submit.prevent="addComment" class="mb-3">
                    <div class="form-group">
                        <label for="commentAuthor">Author:</label>
                        <input type="text" class="form-control" id="commentAuthor" v-model="newComment.author" required>
                    </div>
                    <div class="form-group">
                        <label for="commentContent">Comment:</label>
                        <textarea class="form-control" id="commentContent" rows="3" v-model="newComment.content" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Add Comment</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            news: {
                title: "",
                text: "",
                author: "",
                dateTime:"",
                category:"",
                tags: [],
                comments: []
            },
            newComment: {
                author: "",
                content: ""
            }

        }
    },
    created() {
        this.$axios.get(`/api/news/findNews/${this.$route.query.title}`).then((response) => {
            this.news.title = response.data.title
            this.news.text = response.data.text
            this.news.author = response.data.author
            this.news.dateTime = response.data.dateTime
            this.news.category = response.data.category
        })
        this.$axios.get(`/api/comments/${this.$route.query.title}`).then((response) => {
            this.news.comments = response.data.map(commentData => {
                return {
                    author: commentData.author,
                    content: commentData.content
                };
            });
        })
        this.$axios.get(`/api/tags/getTagsByNews/${this.$route.query.title}`).then((response) => {
            this.news.tags = response.data.map(tagData => {
                return {
                    keyword: tagData.keyword,
                };
            });
        })
    },
    methods:{
        formatDate(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleDateString();
        },
        addComment(){
            this.$axios.post("/api/comments/createComment",{
                comment:this.newComment.content,
                author:"AUTHOR",
                news_title:this.$route.query.title
            }).then((response) => {
                const newComment = {
                    author: this.newComment.author,
                    content: this.newComment.content
                };
                this.news.comments.push(newComment);
                console.log(response)
                // Clear the form fields
                this.newComment.author = "";
                this.newComment.content = "";
            })
        },

        clickTag(keyword)
        {
            this.$router.push({name:"TagNews", query: {keyword}})
        }
    }
}
</script>

<style scoped>
/* Custom styles specific to this component */
</style>
