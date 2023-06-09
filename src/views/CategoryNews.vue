<template>
    <div class="container mt-5">
        <h1 class="mb-4">Latest News</h1>
        <div class="mb-3">
            <label for="categorySelect" class="form-label">Select a category:</label>
            <select class="form-select" id="categorySelect" v-model="selectedCategory">
                <option value="">All</option>
                <option v-for="category in categories" :key="category"  :value="category">{{ category }}</option>
            </select>
        </div>
        <div v-for="newsItem in filteredNewsList" :key="newsItem.id">
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">{{ newsItem.title }}</h5>
                    <p class="card-text">{{ newsItem.text.substring(0, 100) + '...' }}</p>
                    <span class="badge badge-primary">{{ newsItem.category }}</span>
                    <p class="card-text mt-2">Created on: {{ formatDate(newsItem.dateTime) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newsList: [],
            selectedCategory: '',
        };
    },
    created() {
        this.$axios.get('/api/news/allNews').then((response) => {
            this.newsList = response.data;
            this.updateCategories();
        });
    },
    methods: {
        formatDate(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleDateString();
        },
        updateCategories() {
            const categories = new Set();
            this.newsList.forEach((newsItem) => {
                categories.add(newsItem.category);
            });
            this.categories = Array.from(categories);
        },
    },
    computed: {
        filteredNewsList() {
            if (this.selectedCategory === '') {
                return this.newsList;
            }
            return this.newsList.filter((newsItem) => newsItem.category === this.selectedCategory);
        },
    },
};
</script>