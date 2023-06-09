<template>
    <div class="container mt-5">
        <h1 class="mb-4">Latest News</h1>
        <div v-for="newsItem in newsList" :key="newsItem.id">
            <div class="card mb-3">
                <div class="card-body">
                    <h5 @click = "showSingleNews(newsItem.title)" class="card-title">{{ newsItem.title }}</h5>
                    <p class="card-text">{{ newsItem.text.substring(0, 100) + '...' }}</p>
                    <span class="badge badge-primary">{{ newsItem.category }}</span>
                    <p class="card-text mt-2">Created on: {{formatDate(newsItem.dateTime) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            newsList: []
        };
    },
    created() {
        this.$axios.get('/api/news/allNews').then((response) => {
            //uzima sve subjecte
            this.newsList = response.data;
        });
    },
    methods: {
        formatDate(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleDateString(); // Format the date as per the user's locale
        },
        showSingleNews(title)
        {
            this.$router.push({name:'NewsSingle', query: {
                title} })
        }
    },

};
</script>
