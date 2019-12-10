<template>
    <div class="ui container">
        Activate your account
        <button class="ui button" v-on:click="activate()">Activate</button>
    </div>
</template>


<script>
export default {
    name: 'Confirm',
    data() {
        return{
            token: ''
        }
    },
    mounted() {
         this.token = this.$route.params.token
    },
    methods: {
        activate() {
                axios.post('/activate', {
                        usertoken: 'Bearer ' +this.token
                        }).then(response => {
                            this.$router.push('/login')
                            console.log('Activated.')
                            $('body')
                        .toast({
                            class: 'success',
                            message: `Your Account is activated. You can now login.`
                        })
                        ;
                      })
        }
    }
}
</script>