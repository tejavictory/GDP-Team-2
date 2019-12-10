<template>
    <div>
        <br/>
        <div class="ui container">
            <table class="ui single line table">
            <thead>
                <tr>
                <th style="background-color:rgb(179,179,179);color:black">Username</th>
                <th style="background-color:rgb(179,179,179);color:black">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in users"
                    :key="item.id"
                    :user="item">
                <td>{{ item.username }}</td>
                <td v-if="item.status === 'Pending'">
                    <button class="ui button blue" v-on:click="approve(item)"><i class="check circle icon"></i>Approve</button>
                    <button class="ui button red" v-on:click="reject(item)"><i class="close icon"></i>Reject</button>
                </td>
                <td v-else>{{ item.status }}</td>
                </tr>
            </tbody>
            </table>           
        </div>
    </div>
</template>

<script>
export default {
    name: 'InsReq',
    data() {
        return {
            users: []
        }
    },
    mounted:function() {
        this.fetchUsers()
    },
    methods: {
        delUser: function() {

        },
        fetchUsers: function() {
            axios.get('/reqUsers', {
                headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`
                    }
                // params: {
                //         email: this.$store.getters.useremail || sessionStorage.getItem('useremail')
                //     }
           }).then(response => {
                // this.$store.commit('changeCourses',response.data.data)
                this.users = response.data.data
            })
        },
        approve: function(item) {
            axios.post('/updatereq/'+item.username, {
                headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`
                    },
                status: 'Approved' 
            }).then(response => {
                this.updateRole(item)
            })
        },
        reject: function(item) {
            axios.post('/updatereq/'+item.username, {
                headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`
                    },
                status: 'Rejected' 
            }).then(response => {
                this.$router.go()
            })
        },
        updateRole: function(item) {
            axios.post('/updaterole/'+item.username, {
                headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`
                },
                role_name: 'Instructor'
            }).then(response => {
                this.$router.go()
            })
        }
    }
}
</script>
<style scoped>
tr{
        background-color: rgb(228, 228, 228);
}
</style>