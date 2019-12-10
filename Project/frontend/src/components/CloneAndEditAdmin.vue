<template>
  <div class="ui container segment" id="createSet">
    <!-- <i class="close icon"></i> -->
    <div class="header">
      <h2 style="font-family: 'Quicksand', sans-serif;">Cloning the set</h2>
    </div>
    <!-- <div v-else class="header">
            Cloning Codewordset
    </div>-->
    <div class="ui form" @submit.prevent="createSet">
      <div class="fields">
        <div class="field">
          <label>Codeword Set Name</label>
          <input
            type="text"
            data-tooltip="testing"
            placeholder="Codeword Set Name"
            v-model="csname"
            @change="validateName()"
          />
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
      <!-- <div class="field">
        <label>Upload a CSV file containing codewords</label>
        <input
          type="file"
          id="fileUpload"
          placeholder="CSV File Upload"
          accept=".csv"
          v-on:change="upload"
        />
      </div>-->
      <!-- <p>OR</p>
      <div class="field">
        <label>Enter codewords seperated by commas to append</label>
        <input type="text" id="cdwdcommas" v-on:focusout="commasgetwords" />
      </div>-->
      <div class="field" id="violations">
        <div class="ui message">
          <label>Violations</label>
          <ul>
            <li>Hard rule violations: {{ this.hardcount }}</li>
            <li>Soft rule violations: {{ this.softcount }}</li>
            <li>SOFT RULE VIOLATIONS ARE INDICATED IN RED TEXT. You can choose to override these and create the set.</li>
            <li>HARD RULE VIOLATIONS ARE INDICATED IN RED BACKGROUND. You cannot create a set unless you change these.</li>
          </ul>
        </div>
      </div>
      <div class="ui stackable grid" id="grid"></div>
      <div class="field">
        <button class="ui button blue" v-on:click="addNew">
          <i class="plus icon"></i>New Codeword
        </button>
      </div>
      <div class="field">
        <button class="ui button black" v-on:click="goBack()">BACK</button>

        <button class="ui button green" v-on:click="validateWords" style="float:right;">
          <i class="check icon"></i>Validate
        </button>
      </div>
    </div>Hit validate to remove hard rule violations. You may have to do it multiple times.
    <div class="actions">
      <!-- <div class="ui black deny button" v-on:click="refresh()">Cancel</div> -->
      <div class="ui positive right labeled icon fluid button" id="done" v-on:click="createSet">
        Finalize
        <i class="checkmark icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseModal",
  mounted() {
    $("#nameerr").hide();
    $("#validname").hide();
    $("#violations").hide();
    $("#done").hide();
    // $(".cdwdtextbox").keyup(function(event) {
    //   if (event.keyCode === 13) {
    //     this.addNew();
    //   }
    // });
    // if(sessionStorage.getItem('item')!=null){
    //     this.itemprop = sessionStorage.getItem('item')
    this.fetchwordsForCloning(sessionStorage.getItem("toclone"));
    // }
  },
  data() {
    return {
      csname: "",
      softcount: "",
      hardcount: "",
      validname: "no",
      validwords: "no",
      codewords: "",
      type: "",
      itemprop: null
    };
  },
  methods: {
    goBack() {
      this.$router.push("/Admin");
    },
    fetchwordsForCloning(name) {
      axios
        .get("/getWordsSet/" + name, {
          // headers: {
          //             Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`
          //         },
        })
        .then(response => {
          this.codewords = response.data.data;
          var i = 0;
          for (i = 0; i < this.codewords.length; i++) {
            var node = document.createElement("div");
            node.className = "four wide column";
            var textnode = document.createElement("input");
            textnode.value = this.codewords[i].codeword;
            node.appendChild(textnode);
            document.getElementById("grid").appendChild(node);
          }
        });
    },
    validateName() {
      axios
        .get("/isUniqueName/" + this.csname, {})
        .then(response => {
          if (response.data.data == null) {
            $("#nameerr").hide();
            $("#validname").show();
            this.validname = "yes";
          } else {
            $("#validname").hide();
            $("#nameerr").show();
            this.validname = "no";
          }
          if (this.validwords == "yes" && this.validname == "yes") {
            $("#done").show();
          } else {
            $("#done").hide();
          }
          // redirect to user home
        })
        .catch(error => {
          // clear form inputs
          $("#nameerr").hide();
          $("#validname").show();
          this.validname = "yes";
        });
    },
    addNew: function() {
      var node = document.createElement("div");
      node.className = "four wide column";
      var textnode = document.createElement("input");
      textnode.setAttribute("autofocus", "true");
      textnode.setAttribute("maxlength", "10");
      textnode.setAttribute("class", "cdwdtextbox");
      textnode.setAttribute("v-on:keyup.13", "this.addNew()");
      node.appendChild(textnode);
      document.getElementById("grid").appendChild(node);
    },
    validateWords() {
      $("#violations").hide();
      $("#done").hide();
      var c = document.getElementById("grid").childNodes;
      var word = "";
      var i, j;
      var words = new Array();
      var softcount = 0;
      var hardcount = 0;
      for (i = 0; i < c.length; i++) {
        word = c[i].childNodes[0].value;
        c[i].childNodes[0].style.color = "#000000";
        c[i].childNodes[0].style.backgroundColor = "#ffffff";
        c[i].setAttribute("data-tooltip", "");
        c[i].setAttribute("data-variation", "wide");
        words.push(word.toUpperCase());
      }
      this.codewords = words;
      for (i = 0; i < words.length - 1; i++) {
        if (words[i].trim() == "" || words[i] == null) {
          document
            .getElementById("grid")
            .removeChild(document.getElementById("grid").childNodes[i]);
        }
        for (j = i + 1; j < words.length; j++) {
          if (words[j].trim() == "" || words[j] == null) {
            document
              .getElementById("grid")
              .removeChild(document.getElementById("grid").childNodes[j]);
          }
          //hard rule
          if (this.compareTwoStrings(words[i], words[j]) > 0.9) {
            document.getElementById("grid").childNodes[
              i
            ].childNodes[0].style.color = "#ffffff";
            document.getElementById("grid").childNodes[
              j
            ].childNodes[0].style.color = "#ffffff";
            document.getElementById("grid").childNodes[
              i
            ].childNodes[0].style.backgroundColor = "#ff0000";
            document.getElementById("grid").childNodes[
              j
            ].childNodes[0].style.backgroundColor = "#ff0000";
            document
              .getElementById("grid")
              .childNodes[i].setAttribute(
                "data-tooltip",
                document
                  .getElementById("grid")
                  .childNodes[i].getAttribute("data-tooltip") +
                  "Hard rule: Word Similarity more than 90% with " +
                  words[j] +
                  " "
              );
            document
              .getElementById("grid")
              .childNodes[j].setAttribute(
                "data-tooltip",
                document
                  .getElementById("grid")
                  .childNodes[j].getAttribute("data-tooltip") +
                  "Hard rule: Word Similarity more than 70% with " +
                  words[i] +
                  " "
              );
            hardcount++;
            document
              .getElementById("grid")
              .removeChild(document.getElementById("grid").childNodes[i]);
            document
              .getElementById("grid")
              .removeChild(document.getElementById("grid").childNodes[j]);
            // console.log('Similar words: '+words[i]+', '+words[j])
          }
          //soft rule
          else if (this.compareTwoStrings(words[i], words[j]) > 0.5) {
            document.getElementById("grid").childNodes[
              i
            ].childNodes[0].style.color = "#ff0000";
            document.getElementById("grid").childNodes[
              j
            ].childNodes[0].style.color = "#ff0000";
            document.getElementById("grid").childNodes[
              i
            ].childNodes[0].style.backgroundColor = "#ffffff";
            document.getElementById("grid").childNodes[
              j
            ].childNodes[0].style.backgroundColor = "#ffffff";
            document
              .getElementById("grid")
              .childNodes[i].setAttribute(
                "data-tooltip",
                document
                  .getElementById("grid")
                  .childNodes[i].getAttribute("data-tooltip") +
                  "Soft rule: Tolerable word similarity with " +
                  words[j] +
                  " "
              );
            document
              .getElementById("grid")
              .childNodes[j].setAttribute(
                "data-tooltip",
                document
                  .getElementById("grid")
                  .childNodes[j].getAttribute("data-tooltip") +
                  "Soft rule: Tolerable word similarity with " +
                  words[i] +
                  " "
              );
            softcount++;
          }
          //hard rule
          if (this.isAnagram(words[i], words[j])) {
            // console.log('Anagrams: '+words[i]+', '+words[j])
            document.getElementById("grid").childNodes[
              i
            ].childNodes[0].style.color = "#ffffff";
            document.getElementById("grid").childNodes[
              j
            ].childNodes[0].style.color = "#ffffff";
            document.getElementById("grid").childNodes[
              i
            ].childNodes[0].style.backgroundColor = "#ff0000";
            document.getElementById("grid").childNodes[
              j
            ].childNodes[0].style.backgroundColor = "#ff0000";
            document
              .getElementById("grid")
              .childNodes[i].setAttribute(
                "data-tooltip",
                document
                  .getElementById("grid")
                  .childNodes[i].getAttribute("data-tooltip") +
                  "Hard rule: Anagram with " +
                  words[j] +
                  " "
              );
            document
              .getElementById("grid")
              .childNodes[j].setAttribute(
                "data-tooltip",
                document
                  .getElementById("grid")
                  .childNodes[j].getAttribute("data-tooltip") +
                  "Hard rule: Anagram with " +
                  words[i] +
                  " "
              );
            hardcount++;
          }
        }
      }
      if (softcount > 0 || hardcount > 0) {
        this.softcount = softcount;
        this.hardcount = hardcount;
        this.validwords = "no";
        $("#violations").show();
      }
      if (hardcount == 0) {
        this.validwords = "yes";
      }
      if (this.validwords == "yes" && this.validname == "yes") {
        $("#done").show();
      } else if (this.validwords == "yes") {
        $("body").toast({
          displayTime: 5000,
          class: "error",
          message: "Enter a name for codeword set."
        });
      } else {
        $("#done").hide();
      }
      console.log(words);
    },
    formatStudents: function() {},
    startdatepick: function() {
      $("#startdate_calendar").calendar({ type: "date" });
    },
    enddatepick: function() {
      $("#enddate_calendar").calendar({ type: "date" });
    },
    createSet: function() {
      axios
        .post("/createset", {
          name: this.csname,
          creator: sessionStorage.getItem("useremail"),
          type: this.type || "SMALL"
        })
        .then(response => {
          // redirect to user home
          var i = 0;
          axios
            .post("/addcdwds", {
              codewords: this.codewords,
              codewordset_name: this.csname
            })
            .then(response => {
              console.log("done adding words");
              $("body").toast({
                displayTime: 5000,
                class: "success",
                message: "Codeword set created."
              });
              this.$router.push("/Admin");
            })
            .catch(error => {
              // clear form inputs
              this.csname = error;
            });
          // for(i=0;i<this.codewords.length;i++){
          //     this.createWords(this.codewords[i])
          // }
          // this.createWords()
          // this.$router.go()
        })
        .catch(error => {
          // clear form inputs
          this.csname = error;
        });
    },
    createWords(word) {
      axios
        .post("/addcdwd", {
          codeword: word,
          codewordset_name: this.csname
        })
        .then(response => {
          console.log("done adding words");
          // this.$router.go()
        })
        .catch(error => {
          // clear form inputs
          this.csname = error;
        });
    },
    compareTwoStrings(first, second) {
      // first = first.replace(/\s+/g, '')
      // second = second.replace(/\s+/g, '')

      if (!first.length && !second.length) return 1; // if both are empty strings
      if (!first.length || !second.length) return 0; // if only one is empty string
      if (first === second) return 1; // identical
      if (first.length === 1 && second.length === 1) return 0; // both are 1-letter strings
      if (first.length < 2 || second.length < 2) return 0; // if either is a 1-letter string

      let firstBigrams = new Map();
      for (let i = 0; i < first.length - 1; i++) {
        const bigram = first.substring(i, i + 2);
        const count = firstBigrams.has(bigram)
          ? firstBigrams.get(bigram) + 1
          : 1;

        firstBigrams.set(bigram, count);
      }

      let intersectionSize = 0;
      for (let i = 0; i < second.length - 1; i++) {
        const bigram = second.substring(i, i + 2);
        const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

        if (count > 0) {
          firstBigrams.set(bigram, count - 1);
          intersectionSize++;
        }
      }

      return (2.0 * intersectionSize) / (first.length + second.length - 2);
    },
    isAnagram(str1, str2) {
      if (str1.length !== str2.length) {
        return false;
      }
      var sortStr1 = str1
        .split("")
        .sort()
        .join("");
      var sortStr2 = str2
        .split("")
        .sort()
        .join("");
      return sortStr1 === sortStr2;
    },
    refresh() {
      this.$router.go();
    },
    upload: function(evt) {
      var CSV = require("csv-string");

      var data = null;
      var file = evt.target.files[0];
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(event) {
        var csvData = event.target.result;
        data = CSV.parse(csvData);
        if (data && data.length > 0) {
          console.log(data[0]);
          //   document.getElementById("grid").innerHTML = "";
          // this.codewords = data[0];
          var i = 0,
            j = 0;
          var codewords = [];
          for (i = 0; i < data.length; i++) {
            //   console.log(data[i]);
            for (j = 0; j < data[i].length; j++) {
              codewords.push(data[i][j]);
              // console.log(data[i][j]);
            }
          }
          this.codewords = codewords;
          sessionStorage.setItem("codewords", codewords);

          var i = 0;
          for (i = 0; i < this.codewords.length; i++) {
            var node = document.createElement("div");
            node.className = "four wide column";
            var textnode = document.createElement("input");
            textnode.setAttribute("maxlength", "10");
            textnode.setAttribute("class", "cdwdtextbox");
            textnode.value = this.codewords[i].substring(0, 10);
            node.appendChild(textnode);
            document.getElementById("grid").appendChild(node);
          }
        } else {
          alert("No data to import!");
        }
      };
      reader.onerror = function() {
        alert("Unable to read " + file.fileName);
      };
    },
    commasgetwords() {
      document.getElementById("grid").innerHTML = "";
      this.codewords = $("#cdwdcommas")
        .val()
        .split(",");
      sessionStorage.setItem(
        "codewords",
        $("#cdwdcommas")
          .val()
          .split(",")
      );
      var i = 0;
      for (i = 0; i < this.codewords.length; i++) {
        var node = document.createElement("div");
        node.className = "four wide column";
        var textnode = document.createElement("input");
        textnode.setAttribute("maxlength", "10");
        textnode.setAttribute("class", "cdwdtextbox");
        textnode.value = this.codewords[i].substring(0, 10);
        node.appendChild(textnode);
        document.getElementById("grid").appendChild(node);
      }
    },
    onEnterPressed(event) {
      console.log("Outside");
      if (event.keyCode === 13) {
        console.log("Inside");

        this.addNew();
      }
    }
  }
};
</script>

<style scoped>
.ui.form {
  padding: 20px;
}

.field {
  padding: 10px;
}

.ui.message {
  background-color: rgb(252, 228, 228);
  color: red;
}

#wordvalidate {
  float: right;
}
</style>