<template>
    <div>
        <br/>
        <div class="ui container">
            <h2>Instructor Requests.... Under Construction</h2>
            <table class="ui single line table">
            <thead>
                <tr>
                <th>Username</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in users"
                    :key="item.id"
                    :user="item">
                <td>{{ item.username }}</td>
                <td v-if="item.status === 'Pending'">
                    <button class="ui button blue" v-on:click="approve(item)"><i class="check circle icon"></i></button>
                    <button class="ui button red" v-on:click="reject(item)"><i class="close icon"></i></button>
                </td>
                <td v-else>{{ item.status }}</td>
                </tr>
            </tbody>
            </table>           
        </div>
    </div>
</template>
<script>

</script>