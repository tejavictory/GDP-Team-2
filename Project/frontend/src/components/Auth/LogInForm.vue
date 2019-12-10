<template>
  <div class="ui stackable three column centered grid container">
    <div class="column">
          <br/>

      <h2 class="ui dividing header">Log In</h2>

      <Notification
        :message="notification.message"
        :type="notification.type"
        v-if="notification.message"
      />
      <form class="ui form" @submit.prevent="login">
        <div class="field">
          <label>Email</label>
          <input type="email" name="email" v-model="email" placeholder="Email" required>
        </div>

        <div class="field">
          <label>Password</label>
          <input type="password" name="password" v-model="password" placeholder="Password" required>
        </div>

        <button class="fluid ui primary button">LOG IN</button>

        <div class="ui hidden divider"></div>
      </form>

      <div class="ui divider"></div>

      <div class="ui column grid">
        <div class="center aligned column">
          <p>
            Don't have an account? <router-link to="/signup">Sign Up</router-link>
          </p>
          <p>
            Forgot password? <router-link to="/resetpassword">Reset Here</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
    import Notification from '@/components/Notification'

    export default {
        name: 'LogInForm',
        components: {
            Notification
        },
        data () {
            return {
                email: '',
                password: '',
                notification: {
                    message: '',
                    type: ''
                },
                role: ''
            }
        },
        beforeRouteEnter (to, from, next) {
            const token = sessionStorage.getItem('auth-token')

            return token ? next('/') : next()
        },
        methods: {
            login () {
                axios
                    .post('/login', {
                        email: this.email,
                        password: this.password,
                    })
                    .then(response => {
                      if(response.data.status == 'mail not confirmed'){
                          $('body')
                            .toast({
                              displayTime: 5000,
                              class: 'error',
                              message: 'Please confirm your email'
                            })
                          ;
                          return
                      }
                        // save token in sessionStorage
                        sessionStorage.setItem('auth-token', response.data.data.token)
                        this.$store.commit('changeUserEmail',this.email)
                        this.fetchAuthenticatedUser()
                        this.getRole()
                        // this.$router.push('/welcome')
                    })
                    .catch(error => {
                        // clear form inputs
                        this.email = this.password = ''

                        // display error notification
                        this.notification = Object.assign({}, this.notification, {
                            message: "Invalid Login Credentials",
                            type: "Login Error"
                        })
                    })
            },
            fetchAuthenticatedUser () {
                const token = sessionStorage.getItem('auth-token')

                axios
                    .get('user/me', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        this.email = response.data.data.email
                        this.$store.commit('changeUserEmail',response.data.data.email)
                        this.$store.commit('changeUser',response.data.data)
                    })
            },
            getRole () {
                const token = sessionStorage.getItem('auth-token')

                axios
                    .get('user/me', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        this.role = response.data.data.role_name
                        this.$store.commit('changeUserRole',response.data.data.role_name)
                                switch(this.role){
                                    case "Student": this.$router.push('/Student')
                                                    break
                                    case "Instructor": this.$router.push('/InsDash')
                                                        break
                                    case "Admin": this.$router.push('/Admin')
                                                    break
                                    default: this.$router.push('/')

                                }
                    })
            }
        }
    }
</script>

<style scoped>
</style>