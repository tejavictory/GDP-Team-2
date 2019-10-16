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
                        <li> SOFT RULE VIOLATIONS ARE INDICATED IN RED TEXT. You can choose to override these and create the set.</li>
                        <li> HARD RULE VIOLATIONS ARE INDICATED IN RED BACKGROUND. You cannot create a set unless you change these. </li>
                    </ul>
                </div>
            
            <div class="field">
                <button class="ui button blue" v-on:click="addNew"><i class="plus icon"></i>New Codeword</button> 
            </div>
         </div>
        <div class="actions">
            <div class="ui black deny button">
            Cancel
            </div>
            
       </div>
    </div>
</template>
<script>
export default {
    name: 'CourseModal',
    mounted() {
        $('#nameerr').hide()
        $('#validname').hide()
        $('#violations').hide()
        $('#done').hide()
        if(sessionStorage.getItem('item')!=null){
            this.itemprop = sessionStorage.getItem('item')
            this.fetchwordsForCloning(sessionStorage.getItem('item'))
        }
    },
    data() {
        return {
            csname: '',
            softcount: '',
            hardcount: '',
            validname: 'no',
            validwords: 'no',
            codewords: '',
            type: '',
            itemprop: null
        }
    },
    methods: {
        fetchwordsForCloning(name) {
                        axios.get('/getWordsSet/'+name, {
            // headers: {
            //             Authorization: `Bearer ${localStorage.getItem('auth-token')}`
            //         },
           }).then(response => {
                this.codewords = response.data.data
                var i = 0
                for(i=0;i<this.codewords.length;i++){
                    var node = document.createElement("div");
                    node.className = "four wide column"
                    var textnode = document.createElement("input");
                    document.getElementById("grid").appendChild(node);
                }
            })
        },
        validateName() {
            axios.get('/isUniqueName/'+this.csname,{                
            })
            .then(response => {
                if(response.data.data==null){
                    $('#nameerr').hide()
                    $('#validname').show()
                    this.validname = 'yes'
                }
                else{
                    $('#validname').hide()
                    $('#nameerr').show()
                    this.validname = 'no'
                }
                            if(this.validwords == 'yes' && this.validname == 'yes'){
                                $('#done').show()
                            }
                            else{
                                $('#done').hide()
                            }
                // redirect to user home
            })
            .catch(error => {
                // clear form inputs
                $('#nameerr').hide()
                $('#validname').show()
                this.validname = 'yes'
            })
        },
        addNew: function(){
            var node = document.createElement("div");
            node.className = "four wide column"
            var textnode = document.createElement("input");
            node.appendChild(textnode);
            document.getElementById("grid").appendChild(node);
        },
        validateWords() {
            $('#violations').hide()
            $('#done').hide()
            var c = document.getElementById("grid").childNodes;
            var word = "";
            var i,j;
            var words = new Array()
            var softcount = 0
            var hardcount = 0
            for (i = 0; i < c.length; i++) {
                word = c[i].childNodes[0].value;
                c[i].childNodes[0].style.color = "#000000"
                c[i].childNodes[0].style.backgroundColor = "#ffffff"
                words.push(word.toUpperCase())
            }
            this.codewords = words
            for (i = 0; i < words.length - 1; i++){
                for (j = i+1; j < words.length; j++){
                    //hard rule
                    if(this.compareTwoStrings(words[i],words[j]) > 0.7){
                        document.getElementById("grid").childNodes[j].childNodes[0].style.color = "#ffffff"
                        document.getElementById("grid").childNodes[i].childNodes[0].style.backgroundColor = "#ff0000"
                        document.getElementById("grid").childNodes[j].childNodes[0].style.backgroundColor = "#ff0000"
                        document.getElementById("grid").childNodes[i].setAttribute("data-tooltip"
                        document.getElementById("grid").childNodes[j].getAttribute("data-tooltip")+"Hard rule: Word Similarity more than 70% with "+words[i]+" ")
                        hardcount++
                        // console.log('Similar words: '+words[i]+', '+words[j])
                    }
                    //soft rule
                    else if(this.compareTwoStrings(words[i],words[j]) > 0.5){
                        document.getElementById("grid").childNodes[j].childNodes[0].style.color = "#ff0000"
                        document.getElementById("grid").childNodes[i].childNodes[0].style.backgroundColor = "#ffffff"
                        document.getElementById("grid").childNodes[j].childNodes[0].style.backgroundColor = "#ffffff"  
                        document.getElementById("grid").childNodes[i].setAttribute("data-tooltip",
                            document.getElementById("grid").childNodes[i].getAttribute("data-tooltip")+"Soft rule: Tolerable word similarity with "+words[j]+" ")
                        document.getElementById("grid").childNodes[j].setAttribute("data-tooltip",
                        
                    }
                    //hard rule
                    if(this.isAnagram(words[i],words[j])){
                        // console.log('Anagrams: '+words[i]+', '+words[j])
                        document.getElementById("grid").childNodes[j].childNodes[0].style.color = "#ffffff"                        
                        document.getElementById("grid").childNodes[i].childNodes[0].style.backgroundColor = "#ff0000"
                        document.getElementById("grid").childNodes[j].childNodes[0].style.backgroundColor = "#ff0000"
                        document.getElementById("grid").childNodes[i].setAttribute("data-tooltip",
                            document.getElementById("grid").childNodes[i].getAttribute("data-tooltip")+"Hard rule: Anagram with "+words[j]+" ")
                        document.getElementById("grid").childNodes[j].setAttribute("data-tooltip",
                        
                    }
                }
            }
            
        },
        formatStudents: function () {
        },
        startdatepick: function () {
            $('#startdate_calendar').calendar({type:'date'})
        },
        enddatepick: function () {
            $('#enddate_calendar').calendar({type:'date'})
        },
        createSet: function() {
            axios.post('/createset',{
                name: this.csname,
                creator: localStorage.getItem('username'),
                type: this.type||'SMALL'
            })
            .then(response => {
                // redirect to user home
                var i=0
                for(i=0;i<this.codewords.length;i++){
                    this.createWords(this.codewords[i])
                }
                // this.createWords()
                this.$router.go()
            })
            .catch(error => {
                // clear form inputs
                this.csname = error
            })
        },
        createWords(word) {
                axios.post('/addcdwd',{
                    codeword: word,
                    codewordset_name: this.csname
                })
                .then(response => {
                    console.log('done adding words')
                    // this.$router.go()
                })
                .catch(error => {
                    // clear form inputs
                    this.csname = error
                })
        },
        
    }
}
</script>

