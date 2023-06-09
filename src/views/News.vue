<template>
  <div class="subjects">
    <h1 class="mt-4">News</h1>

    <div class="row">
      <div class="col-4">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Text</th>
            <th scope="col">Date</th>
            <th scope="col">Author</th>
            <th scope="col">Category</th>
            <th scope="col">Readers</th>
          </tr>
          </thead>
          <tbody>
          <!--onclick postavi subject selectedsubject = subject-->
          <tr v-for="newss in news" :key="newss.id" @click="selectedNews = newss">
<!--            <th scope="row">{{ newss.id }}</th>-->
            <td>{{ newss.title | capitalize }}</td>
            <td>{{ newss.text | shortText }}</td>
            <td>{{ newss.date }}</td>
            <td>{{ newss.author }}</td>
            <td>{{ newss.category }}</td>
            <td>{{ newss.readers }}</td>

          </tr>
          </tbody>
        </table>
          <button @click="createNews" class="btn btn-primary">Create News</button>
      </div>
      <div class="col-6">
          <!--ukoliko je selectedSubject  != null namesti ovaj div-->
        <subject v-if="selectedNews" :subject="selectedNews"></subject>
      </div>
    </div>
  </div>
</template>

<script>
//importovan odavde
import News from "../components/News.vue";

export default {
    // eslint-disable-next-line vue/no-unused-components
  components: {News},
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
      selectedNews: null,
      news: []
    }
  },
  created() {
    this.$axios.get('/api/news/allNews').then((response) => {
        //uzima sve subjecte
      this.news = response.data;
    });
  },
    methods: {
      createNews()
      {
        this.$router.push({name: 'CreateNews'})
      }
    }
}
</script>
