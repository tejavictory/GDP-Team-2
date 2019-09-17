<template>
    <div class="ui container">

        <div class="ui pointing stackable container big menu">

        <div class="header item">

            Codeword App

        </div>

            <a class="item active" >

            Student Dashboard

            </a>

        <div class="right menu">

            <a class="item" @click="logout">

            Logout

            </a>

        </div>

        </div>

        <p> Student Dashboard Construction in progress... </p>

        <div class="ui stackable four column grid">

            <StuCourse/>

            <StuCourse/>

        </div>

    </div>
</template>