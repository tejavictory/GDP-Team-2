<template>
    <div class="column">
            <div class="ui fluid card">
                <div class="content">
                    <div class="header" style="font-family: 'Quicksand', sans-serif;text-align:center;">{{ course.course_name }}</div>
                </div>
                <div class="content">
                    <label> Start Date: </label> <span>{{ course.startDate }}</span><br/>
                    <label> End Date: </label> <span>{{ course.endDate }}</span><br/>
                    <label> Pre-Survey Link: </label> <span>{{ course.presurveylink }}</span><br/>
                    <label> Post-Survey Link: </label> <span>{{ course.postsurveylink }}</span><br/>
                    <label> Codeword: </label> 
                    <button class="ui button mini inverted" v-if="hidden != 0" v-on:click="setHidden()">Reveal</button>
                    <span id="codeword" @click="copyToClip()" style="color:blue;" v-else> {{ codeword }} </span>
                </div>
            </div>
    </div> 

    
</template>

<script>
export default {
    name: 'StuCourse',
    data() {
        return {
            codeword: '',
            hidden: null,
            email: ''
        }
    },
    props: {
        course: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this.email = sessionStorage.getItem('useremail')
        this.getCodeword()
    },
    methods: {
        getCodeword() {
            axios.post('/getUserCourse/'+this.course.id,{
                email: this.email
            })
            .then(response => {
                if(response.data.data.hidden == 0){
                    this.hidden = 0
                }
                    axios.get('/getCodeword/'+response.data.data.codeword_id,{
                    })
                    .then(response => {
                        this.codeword = response.data.data.codeword
                    })
                    .catch(error => { 
                    })  
            })
            .catch(error => { 
            })  
        },
        setHidden(){
            axios.post('/updateHidden/'+this.course.id,{
                email: this.email
            })
            .then(response => {                                           
                console.log("Success")
            })
            .catch(error => { 
            }) 
            this.hidden = 0
            
            this.$router.go()
        },
        copyToClip() {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val($('#codeword').text()).select();
            document.execCommand("copy");
            $temp.remove();
             $('body')
                            .toast({
                              displayTime: 5000,
                              class: 'success',
                              message: 'Codeword copied to clipboard'
                            })
                          ;
        }
    }
}
</script>


<style scoped>
*{
    font-family: 'Quicksand', sans-serif;
}
label{
    font-weight: bold;
}
.ui.button{
    margin-left: 5px;
}
.ui.fluid.card{
    background-color: rgb(228, 228, 228);
    color: rgb(0, 0, 0);
}
</style>