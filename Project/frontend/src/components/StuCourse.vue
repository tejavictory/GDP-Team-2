<template>

    <div class="column">

            <div class="ui fluid card">

                <div class="content">

                    <div class="header">{{ course.course_name }}</div>

                </div>

                <div class="content">

                    <label> Start Date: </label> <span>{{ course.startDate }}</span><br/>

                    <label> End Date: </label> <span>{{ course.endDate }}</span><br/>

                    <label> Pre-Survey Link: </label> <span>{{ course.presurveylink }}</span><br/>

                    <label> Post-Survey Link: </label> <span>{{ course.postsurveylink }}</span><br/>

                    <label> Codeword: </label> <span>{{  }}</span><br/>

                </div>

            </div>

    </div> 

 

    

</template>

 

<script>

export default {

    name: 'StuCourse',

    props: {

        course: {

            type: Object,

            required: true

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

.ui.icon.button{

    float: right;

}

</style>