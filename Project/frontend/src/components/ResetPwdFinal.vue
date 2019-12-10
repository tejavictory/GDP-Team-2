<template>
  <div class="ui stackable three column centered grid container">
    <div class="column">
        <!-- <h3>Reset Password</h3> -->
        <form class="ui form" @submit.prevent="reset">
            <div class="field">
                <label>Enter New Password: </label><input type="password" v-model="pwd"/>
            </div>
            <div class="field">
                <label>Confirm New Password: </label><input type="password" v-model="confirmpwd"/>
            </div>
            <button class="ui button" v-on:click="resetfinal()">Reset Password</button>
        </form>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ResetPwdFinal',
    data() {
        return {
            pwd: '',
            confirmpwd: '',
            token: ''
        }
    },
    mounted() {
        this.token = this.$route.params.token
    },
    methods: {
        resetfinal() {
            if(this.pwd != this.confirmpwd){
                            $('body')
                            .toast({
                                  displayTime: 5000,
                                  class: 'error',
                              message: 'Passwords doesn\'t match'
                            })
                          ;
                return
            }
            axios.post('/resetfinal', {
                usertoken: this.token,
                password: this.pwd
                        }).then(response => {
                          console.log('Reset password successful')
                          $('body')
                            .toast({
                                  displayTime: 5000,
                                  class: 'success',
                              message: 'Your password has been reset.'
                            })
                          ;
                          this.$router.push('/login')
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