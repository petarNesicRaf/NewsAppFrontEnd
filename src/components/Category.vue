<template>
    <div>
        <h2>
            Name: {{ category.name }}
        </h2>

        <h5>Description:</h5>
        <p>
            {{ category.description }} <br><br>
        </p>
    </div>
</template>

<script>

export default {
    name: "Category",
    props: {
        category: {
            type: Object,
            required: true,
        }
    },
}
</script>

<style scoped>

</style>
