<template>
  <div class="ui stackable three column centered grid container">
    <div class="column">
      <h2 class="ui dividing header">Sign Up, it's free!</h2>

      <Notification :message="notification.message" :type="notification.type" v-if="notification.message" />

      <form class="ui form" @submit.prevent="signup">
        <div class="field" :class="{ error: errors.has('firstname') }">
          <label>First Name</label>
          <input type="text" name="firstname" v-model="firstname" v-validate="'required'" placeholder="First Name">
          <span v-show="errors.has('firstname')" class="is-danger">{{ errors.first('First Name') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('lastname') }">
          <label>Last Name</label>
          <input type="text" name="lastname" v-model="lastname" v-validate="'required'" placeholder="Last Name">
          <span v-show="errors.has('lastname')" class="is-danger">{{ errors.first('Last Name') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('username') }">
          <label>Username</label>
          <input type="text" name="username" :class="{'input': true, 'is-danger': errors.has('username') }" v-model="username" v-validate="'required'"
            placeholder="Username">
          <span v-show="errors.has('username')" class="is-danger">{{ errors.first('username') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('email') }">
          <label>Email</label>
          <input type="email" name="email" :class="{'input': true, 'is-danger': errors.has('email') }" v-model="email" v-validate="'required|email'"
            placeholder="Email">
          <span v-show="errors.has('email')" class="is-danger">{{ errors.first('email') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('password') }">
          <label>Password</label>
          <input type="password" name="password" :class="{'input': true, 'is-danger': errors.has('password') }" v-model="password"
            v-validate="'required'" placeholder="Password">
          <span v-show="errors.has('password')" class="is-danger">{{ errors.first('password') }}</span>
        </div>

        <button class="fluid ui primary button" :disabled="!isFormValid">SIGN UP</button>

        <div class="ui hidden divider"></div>
      </form>

      <div class="ui divider"></div>

      <div class="ui column grid">
        <div class="center aligned column">
          <p>
            Got an account?
            <router-link to="/login">Log In</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
export default {
  name: 'SignUpForm',
  components: {
    Notification
  },
  data () {
    return {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      notification: {
        message: '',
        type: ''
      }
    }
  },
  computed: {
    isFormValid () {
      return Object.keys(this.fields).every(key => this.fields[key].valid)
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('auth-token')
    return token ? next('/') : next()
  },
  methods: {
    signup () {
      axios
        .post('/signup', {
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(response => {
          // save token in localstorage
          localStorage.setItem('auth-token', response.data.data.token)
          // redirect to user home
          this.$router.push('/')
        })
        .catch(error => {
          // display error notification
          this.notification = Object.assign({}, this.notification, {
            message: error.response.data.message,
            type: error.response.data.status
          })
        })
    }
  }
}
</script>