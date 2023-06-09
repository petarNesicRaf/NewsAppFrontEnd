<template>
  <div>
    <h2>
      Title: {{ news.title }}
    </h2>

    <h5>Text:</h5>
    <p>
      {{ news.text }} <br><br>
    </p>
  </div>
</template>

<script>

export default {
  name: "News",
  props: {
    news: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style scoped>

</style>
