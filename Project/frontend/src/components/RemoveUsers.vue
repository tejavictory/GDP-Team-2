<template>

    <div>

        <br/>

        <div class="ui container">

            <h2>Remove Users.... Under Construction</h2>

            <table class="ui single line table">

            <thead>

                <tr>

                <th>Name</th>

                <th>Role</th>

                <th>Email</th>

                <th></th>

                </tr>

            </thead>
            <tbody>

                <tr v-for="item in users"

                    :key="item.id"

                    :user="item">

                <td>{{ item.firstname + ' ' + item.lastname }}</td>

                <td>{{ item.role_name }}</td>

                <td>{{ item.email }}</td>

                <td><button class="ui button" v-on:click="delUser"><i class="trash alternate outline icon"></i></button></td>

                </tr>

            </tbody>

            </table>

        </div>

    </div>

</template>