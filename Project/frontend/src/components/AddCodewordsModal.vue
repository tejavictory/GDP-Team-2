<template>
    <div class="ui modal" id="createSet">
        <i class="close icon"></i>
        <div class="header">
            Add a New Codeword Set
        </div>
        <div class="ui form" @submit.prevent="createSet">
            <div class="fields">
                <div class="field">
               
                <input type="text" data-tooltip="testing" placeholder="Codeword Set Name" v-model="csname" @change="validateName()">
                </div>
                <div class="field" id="nameerr">
                    <label></label>
                        <i class="close icon red"></i>Name is not available
                </div>
                <div class="field" id="validname">
                    <label></label>
                        <i class="check icon green"></i>Name is available
                </div>
            </div>
            <div class="field" id="violations">
                <div class="ui message">
                    <label>Violations</label>
                    <ul>
                        <li>Hard rule violations: {{ this.hardcount }}</li>
                        <li>Soft rule violations: {{ this.softcount }}</li>
                    </ul>
                </div>
            </div>
             <div class="ui stackable grid" id="grid">
            </div>
            
            <div class="field" >
                <button class="ui button fluid green" v-on:click="validateWords"></i>Validate</button> 
            </div>
        </div>
        <div class="actions">
            <div class="ui black deny button">
            Cancel
            </div>
            <div class="ui positive right labeled icon button" id="done" v-on:click="createSet">
            Done
            <i class="checkmark icon"></i>
            </div>
        </div>
    </div>
</template>