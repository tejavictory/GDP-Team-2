<template>

    <div class="column">

            <div class="ui fluid card">

                <div class="content">

                    <label>{{ course.course_name }}</label> 

                    <button class="ui icon button">

                        <i class="trash alternate outline icon"></i>

                    </button>

                    <button class="ui icon button">

                        <i class="edit outline icon"></i>

                    </button>

                     

                </div>

                <div class="content">

                    <label> Start Date: </label> <span>{{ course.startDate }}</span><br/>

                    <label> End Date: </label> <span>{{ course.endDate }}</span><br/>

                    <label> Pre-Survey Link: </label> <span>{{ course.presurveylink }}</span><br/>

                    <label> Post-Survey Link: </label> <span>{{ course.postsurveylink }}</span><br/>

                </div>

                <div class="extra content">

                    <button class="ui button fluid">Distribute Codewords</button>

                </div>

            </div>

    </div> 

 

    

</template>

 

<script>

export default {

    name: 'InsCourse',

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