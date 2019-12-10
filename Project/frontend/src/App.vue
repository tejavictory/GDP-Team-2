<template>
    <div id="app">
        <Header/>
        <router-view/>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
    export default {
        name: 'app',
        components: {
            Header
        }
    }
</script>

<style>
    *{
        font-family: 'QuickSand', sans-serif;
    }
    body {
        padding-top: 0px;
        padding-bottom: 50px;
        /* background-color: #eee9ff; */
    }

    .is-danger {
        color: #9f3a38;
    }
</style>