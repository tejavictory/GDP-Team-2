<template>
    <div>
        <br/>
        <div class="ui container">
            <table class="ui single line table">
            <thead>
                <tr>
                <th style="background-color:rgb(179,179,179);color:black">Name</th>
                <th style="background-color:rgb(179,179,179);color:black">Role</th>
                <th style="background-color:rgb(179,179,179);color:black">Email</th>
                <th style="background-color:rgb(179,179,179);color:black"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in users"
                    :key="item.id"
                    :user="item">
                <td>{{ item.firstname + ' ' + item.lastname }}</td>
                <td>{{ item.role_name }}</td>
                <td>{{ item.email }}</td>
                <td><button class="ui button inverted red" v-on:click="delUser(item.id)"><i class="trash alternate outline icon"></i>Delete</button></td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RemoveUsers',
    data() {
        return {
            users: []
        }
    },
    mounted:function() {
        this.fetchUsers()
    },
    methods: {
        delUser: function(id) {
/*             axios.get('/delUser/'+id, {
                headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`
                    }
           }).then(response => {
                        $('body')
                            .toast({
                              displayTime: 5000,
                              class: 'success',
                              message: 'User removed.'
                            })
                          ;            }) */
        },
        fetchUsers: function() {
            axios.get('/users', {
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
        }
    }
}
</script>

<style scoped>
tr{
        background-color: rgb(228, 228, 228);
}
</style>