<template>

<div class="ui stackable container big menu">

  <div class="header item">

    Codeword App

  </div>

    <a class="item active" >

          Instructor Dashboard

    </a>

    <a class="item" >

      Student Dashboard

    </a>

  <div class="right menu">

    <a class="item">

      Logout

    </a>

  </div>

</div>

</template>

 

<script>

export default {

  name: 'InsNav',

  data() {

    return {

      activeItem: 'InsDash'

    }

  },

  components: {

 

  },

  methods: {

    // setActive: function (menuItem) {

    //   this.activeItem = menuItem

    // },

    // isActive: function (menuItem) {

    //   return this.activeItem === menuItem

    // }

  }

}

</script>

 

<style scoped>

 

</style>