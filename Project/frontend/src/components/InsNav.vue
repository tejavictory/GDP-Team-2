<template>
<div id="temp" class="ui pointing stackable container big menu">
  <div class="header item">
    Codeword App
  </div>
  <router-link to="/InsDash">
    <a class="item" v-on:click="setActive('insdash')" :class="{ active: isActive('insdash') }">
           Instructor Dashboard 
    </a></router-link>
    <router-link to="/InsStu">
    <a class="item" v-on:click="setActive('studash')" :class="{ active: isActive('studash') }">
           Student Dashboard 
    </a></router-link>
     <router-link to="/Codewords">
    <a class="item" v-on:click="setActive('cdwd')" :class="{ active: isActive('cdwd') }">
          Codewords Dashboard
    </a></router-link>
  <div class="right menu">
    <a class="item" v-on:click="logout">
      <i class="fas fa-sign-out-alt"></i>Logout
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: 'InsNav',
  data() {
    return {
      activeItem: 'insdash'
    }
  },
  components: {

  },
  methods: {
        logout() {
            sessionStorage.removeItem('auth-token')
            this.$router.push('/login')
        },
        isActive: function (menuItem) {
            return this.activeItem === menuItem
        },
        setActive: function (menuItem) {
            this.activeItem = menuItem
        }
  }
}
</script>

<style scoped>
*{
  color: black;
}
#temp{
  background-color:rgb(228, 228, 228);
}
a:hover{
  color: rgb(16, 56, 104);
}
.header.item{
  background-color: rgb(16, 56, 104);
  color: white;
}
</style>