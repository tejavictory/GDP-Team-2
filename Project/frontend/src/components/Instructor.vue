<template>
    <div>
        <InsNav/>
        <router-view/>
    </div>
</template>

<script>
import InsNav from './InsNav.vue'
import InsDash from './InsDash.vue'
import InsStu from './InsStu.vue'

export default {
    name: 'Instructor',
    components: {
        InsNav,
        InsDash,
        InsStu
    }
}
</script>

<style scoped>

</style>