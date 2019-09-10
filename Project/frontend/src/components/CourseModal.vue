<template>
<div class="ui modal">

        <i class="close icon"></i>

        <div class="header">

            Add a New Course

        </div>
        <div class="ui form">

            <div class="fields">

                <div class="field">

                <label>Course Name</label>

                <input type="text" placeholder="Course Name">

                </div>

                <div class="field">

                <label>Start Date</label>

                    <div class="ui calendar" id="startdate_calendar">

                        <div class="ui input left icon">

                            <i class="calendar icon"></i>

                            <input type="text" placeholder="Start Date" v-on:click="startdatepick">

                        </div>

                    </div>

                </div>

                <div class="field">

                <label>End Date</label>

                    <div class="ui calendar" id="enddate_calendar">

                        <div class="ui input left icon">

                            <i class="calendar icon"></i>

                            <input type="text" placeholder="Start Date" v-on:click="enddatepick">

                        </div>

                    </div>

                </div>

            </div>

            <div class="fields">

                <div class="field">

                <label>Pre-Survey Link</label>

                <input type="text" placeholder="Pre-Survey Link">

                </div>

                <div class="field">

                <label>Post-Survey Link</label>

                <input type="text" placeholder="Post-Survey Link">

                </div>      

            </div>

            <div class="fields">

                <div class="field">

                    <label> Add Students to the Course </label>

                    <div class="ui left icon input">

                        <input type="text" placeholder="Add Students...">

                        <i class="users icon"></i>

                    </div>                    

                </div>      

 

                <div class="field">

                    <label> Upload a CSV file instead </label>

                    <input type="file" placeholder="File Upload">

                </div>

            </div>

        </div>
        <div class="actions">

            <div class="ui black deny button">

            Cancel

            </div>

            <div class="ui positive right labeled icon button">

            Done

            <i class="checkmark icon"></i>

            </div>

        </div>

    </div>
</template>