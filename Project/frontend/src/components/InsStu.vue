<template>
    <div class="ui container">
        <p> Student Dashboard Construction in progress... </p>
        <div class="ui stackable four column grid">
            <StuCourse
                v-for="item in courses"
                :key="item.id"
                :course="item"
                />
        </div>
    </div>
</template>
<script>
</script>
<style scoped>
</style>
