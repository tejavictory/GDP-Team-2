<template>
    <div class="ui container">
        <br/>
        <div class="ui container">
            <button class="ui button fluid inverted black" v-on:click="showModal()"><i class="add circle icon"></i>New Codeword Set</button>
        </div>
        <br/>
        <div class="ui styled fluid accordion" id="accord" v-for="item in sets"
                :key="item.id"
                :set="item">
            <div class="title" style="background-color:rgb(228, 228, 228);color:black" v-on:click="openAccordion(item)" >
                <i class="dropdown icon"></i>
                {{ item.name }}
            </div>
            <div class="content" style="background-color:rgb(228, 228, 228);color:black">
                <div class="ui segment">
                    <strong>Count: </strong>{{words.length}}
                    <button class="ui button inverted" v-on:click="cloneAndEdit(item)" style="font-family: 'Quicksand', sans-serif;">CLONE & EDIT</button>
                </div>
                <div class="ui grid">
                    <div class="four wide column" v-for="word in words"
                    :key="word.id">
                     {{ word.codeword }}
                    </div>
                </div>
            </div>
        </div>
        <!-- <AddCodewordsModal/> -->
    </div>
</template>

<script>
import AddCodewordsModal from '@/components/AddCodewordsModal.vue'
export default {
    name: 'CodewordSets',
    data() {
        return {
            sets: [],
            words: []
        }
    },
    components: {
        AddCodewordsModal
    },
    mounted() {
        this.fetchSets()
    },
    methods: {
        cloneCreate(item){
            sessionStorage.setItem('item',item.name)
        },
        showModal: function() {
            // $('#createSet').modal({
            //     onHide: function(){
            //     },
            //     onShow: function(){
            //     }
            //     // onApprove: function() {
            //     //     console.log('Approve');
            //     //     return validateModal()
            //     // }
            // }).modal('show')
            this.$router.push('/addcdwds')
        },
        fetchSets() {
            axios.get('/getsets', {
            // headers: {
            //             Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`
            //         },
           }).then(response => {
                this.sets = response.data.data
            })
        },
        fetchwords(item) {
                        axios.get('/getWordsSet/'+item.name, {
            // headers: {
            //             Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`
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
                this.cloneCreate(item)
                // console.log(document.getElementById('accord').childNodes[0].className)
            ;
        },
        cloneAndEdit(item) {
            sessionStorage.setItem("toclone",item.name)
            this.$router.push('/cloneedit')
        }
    }
}
</script>

<style scoped>
#accord{
    background-color: rgb(128, 128, 128);
}
.ui.button.fluid.inverted{
    color: rgb(0, 0, 0);
    background-color: rgba(255, 255, 255, 0)
}
.ui.button.fluid.inverted:hover{
    color: black;
    background-color: rgb(228, 228, 228)
}
.ui.segment{
    background-color: rgb(216, 208, 208)
}
</style>