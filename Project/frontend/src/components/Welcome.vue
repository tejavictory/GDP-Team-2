<template>
    <div class="ui container">
        <h1> You are logged in successfully </h1>
        <button class="ui button" v-on:click="getDashboard">Continue to Dashboard</button>
    </div>
</template>

<script>
export default {
    name: 'Welcome',
    methods: {
        getDashboard: function () {
            switch(sessionStorage.getItem('role')){
                case "Student": this.$router.push('/Student')
                                break
                case "Instructor": this.$router.push('/InsDash')
                                    break
                case "Admin": this.$router.push('/Admin')
                                break
                default: this.$router.push('/')

            }
        }
    }
}
</script>