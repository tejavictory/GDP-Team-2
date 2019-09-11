<template>
<div>
<div class="ui pointing stackable container big menu">
  <div class="item">
    <!-- <img src="/images/logo.png"> -->
    <span class="navhead"> Admin </span>
  </div>
  <a class="item" v-on:click="setActive('codeword')" :class="{ active: isActive('codeword') }">Codeword Sets</a>
  <a class="item" v-on:click="setActive('rmcourse')" :class="{ active: isActive('rmcourse') }">Remove Courses</a>
  <a class="item" v-on:click="setActive('insreq')" :class="{ active: isActive('insreq') }">Instructor Requests</a>
  <a class="item" v-on:click="setActive('rmusers')" :class="{ active: isActive('rmusers') }">Remove Users</a>
  <div class="right menu">
    <a class="item">
      Logout
    </a>
  </div>
</div>
</div>
</template>