<template>
  <div class="ui stackable three column centered grid container">
    <div class="column">
          <br/>

        <!-- <h3>Reset Password</h3> -->
            <div class="field">
                <label>Enter Your Email: </label><input type="email" v-model="email"/>
            </div>
                <br/>

            <button class="ui button" v-on:click="resetpwd">Send Reset Password Link</button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ResetPassword',
    data() {
        return {
            email: ''
        }
    },
    mounted() {
    },
    methods: {
        resetpwd () {
                      axios.post('/mailresetpwdlink/'+this.email, {
                        }).then(response => {
                          console.log('Reset password mail sent')
                          $('body')
                            .toast({
                                  displayTime: 5000,
                                  class: 'success',
                              message: 'A link to reset your password has been sent to your email.'
                            })
                          ;
                      })
        }
    }

}
</script>

<style scoped>
.ui.button{
    background-color: rgb(10, 78, 138);
    color: white;
    float: right;
}
</style>