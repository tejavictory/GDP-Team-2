<template>
<div>
    <AdminNav/>
    <component :is="dynamicComponent"></component>
</div>
</template>

<script>
import AdminNav from '@/components/AdminNav.vue'
import InsReq from '@/components/InsReq.vue'
import CodewordSetsAdmin from '@/components/CodewordSetsAdmin.vue'
import RemoveCourses from '@/components/RemoveCourses.vue'
import RemoveUsers from '@/components/RemoveUsers.vue'

export default {
    name: 'Admin',
    data() {
        return {  
            dynamicComponent: CodewordSetsAdmin
        }
    },
    mounted() {
        this.$root.$on('AdminNavContent',(menuItem)=>{
            if (menuItem=='codeword'){
                this.dynamicComponent = CodewordSetsAdmin
            }
            if (menuItem=='insreq'){
                this.dynamicComponent = InsReq
            }
            if (menuItem=='rmusers'){
                this.dynamicComponent = RemoveUsers
            }
            if (menuItem=='rmcourse'){
                this.dynamicComponent = RemoveCourses
            }
        })
    },
    components: {
        AdminNav
    }
}
</script>