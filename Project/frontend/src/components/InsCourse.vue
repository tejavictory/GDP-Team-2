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


 

    



 


 

