<template>
<div>
  <AdminNav/>
  <component :is="dynamicComponent"></component>
</div>
</template>

<script>
import AdminNav from '@/components/AdminNav.vue'
import InsReq from '@/components/InsReq.vue'
import CodewordSets from '@/components/CodewordSets.vue'
import RemoveCourses from '@/components/RemoveCourses.vue'
import RemoveUsers from '@/components/RemoveUsers.vue'

export default {

    name: 'Admin',
</script>

