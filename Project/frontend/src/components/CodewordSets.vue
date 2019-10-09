<template>
    <div class="ui container">
        <br/>
        <div class="ui segment container">
            <h2>Codeword Sets.... Under Construction</h2>
            <button class="ui button blue">Add New Codeword Set</button>
        </div>

        <div class="ui styled fluid accordion" v-for="item in sets"
                :key="item.id"
                :set="item">
            <div class="title" v-on:click="openAccordion(item)">
                <i class="dropdown icon"></i>
                {{ item.name }}
            </div>
            <div class="content">
                <div class="ui grid" >
                    <div class="four wide column" v-for="word in words"
                    :key="word.id">
                     {{ word.codeword }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CodewordSets',
    data() {
        return {
            sets: [],
            words: []
        }
    },
    mounted() {
        this.fetchSets()
    },
    methods: {
        fetchSets() {
            axios.get('/getsets', {
            // headers: {
            //             Authorization: `Bearer ${localStorage.getItem('auth-token')}`
            //         },
           }).then(response => {
                this.sets = response.data.data
            })
        },
        fetchwords(item) {
                        axios.get('/getWordsSet/'+item.name, {
            // headers: {
            //             Authorization: `Bearer ${localStorage.getItem('auth-token')}`
            //         },
           }).then(response => {
                this.words = response.data.data
            })
        },
        openAccordion(item) {
            this.fetchwords(item)
                    $('.ui.styled.fluid.accordion')
                .accordion({
                    animateChildren: true
                })
            ;
        }
    }
}
</script>
