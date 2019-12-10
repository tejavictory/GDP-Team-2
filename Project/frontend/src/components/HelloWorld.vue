<template>
  <div id="root">
    <div class="ui large top fixed hidden menu">
      <div class="ui container">
        <a class="active item">Home</a> <a class="item">About</a>
        <div class="right menu">
          <div class="item"><router-link to="/login"><a class="ui button">Log in</a></router-link></div>
          <div class="item"><router-link to="/signup"><a class="ui primary button">Sign Up</a></router-link></div>
        </div>
      </div>
    </div>
    <!--Sidebar Menu-->
    <div class="ui vertical inverted sidebar menu">
      <a class="active item">Home</a> <a class="item">About</a>
    </div>
    <!--Page Contents-->
    <div class="pusher">
      <div class="ui inverted vertical masthead center aligned segment">
        <div class="ui container">
          <div class="ui large secondary pointing menu">
            <a class="toc item"><i class="sidebar icon"></i></a>
            <a class="active item">Home</a> <a class="item">About</a>
            <div class="right item">
              <router-link to="/login"><a class="ui inverted button gray">Log in</a></router-link>
              <router-link to="/signup"><a class="ui inverted button">Sign Up</a></router-link>
            </div>
          </div>
        </div>
        <div class="ui text container">
          <h1 class="ui inverted header" style="color:black;">Codewords Application</h1>
          <!-- <h2>Do whatever you want when you want to.</h2> -->
          <router-link to="/signup">
          <div class="ui huge primary button">
            Get Started <i class="right arrow icon"></i>
          </div>
          </router-link>
        </div>
      </div>
      <div class="ui vertical stripe segment">
        <div class="ui middle aligned stackable grid container">
          <div class="row">
            <div class="eight wide column">
              <h3 class="ui header">Helps in conducting surveys</h3>
              <p>
                This website helps in anonymous surveys by providing a codeword set for each course which assigns a unique codeword
                to every student in that course randomly.
              </p>
              <h3 class="ui header">You can create codewords.</h3>
              <p>
                Codewords are easy to create. You just name your codeword set and give codewords to that set. Our algorithms make
                sure that the codewords are unique to that set. (Instructor and Admin only)
              </p>
            </div>
            <div class="six wide right floated column" id="testtemp">
                <h1>Three dedicated roles and one common login.</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="ui vertical stripe quote segment">
        <div class="ui equal width stackable internally celled grid">
          <div class="center aligned row">
            <div class="column">
              <h3>Instructor</h3>
            </div>
            <div class="column">
              <h3>Student</h3>
            </div>
            <div class="column">
              <h3>Admin</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="ui vertical stripe segment">
        <div class="ui text container">
          <h3 class="ui header">Instructor</h3>
          <p>
            Creates courses, adds students to the courses, sets the start and end survey links, edit the course and also create codeword sets.
            Assign Codeword sets to the courses and distribute codewords. Instructors also act as students
            to some courses.
          </p>
          <h4 class="ui horizontal header divider">
            <a href="#root">***</a>
          </h4>
          <h3 class="ui header">Student</h3>
          <p>
            Can see the courses they are registered, can reveal the codeword for their course.
            Can request for Instructor previliges.
          </p>
          <h4 class="ui horizontal header divider">
            <a href="#root">***</a>
          </h4>
          <h3 class="ui header">Admin</h3>
          <p>
            Creates codeword sets, can remove users, courses and Approve or Reject Instructor privileges.
          </p>
        </div>
      </div>
      <div class="ui inverted vertical footer segment">
        <div class="ui container">
          <div class="ui stackable inverted divided equal height stackable grid">
            <div class="three wide column">
              <h4 class="ui inverted header">About</h4>
              <div class="ui inverted link list">
                <a class="item" href="#root">Sitemap</a>
                <a class="item" href="#root">Contact Us</a>
              </div>
            </div>
            <div class="seven wide column">
              <h4 class="ui inverted header">GDP Team 2</h4>
              <p>
                This website is a prototype developed by GDP Team 2.
              </p>
            </div>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
        // fix menu when passed
        $(".masthead").visibility({
          once: false,
          onBottomPassed: function() {
            $(".fixed.menu").transition("fade in");
          },
          onBottomPassedReverse: function() {
            $(".fixed.menu").transition("fade out");
          }
        });
        // create sidebar and attach to menu open
        $(".ui.sidebar").sidebar("attach events", ".toc.item");
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
      body {
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: grayscale;
      }
      .hidden.menu {
        display: none;
      }
      .masthead.segment {
        min-height: 600px;
        padding: 1em 0em;
      }
      #testtemp {
        text-align: center;
      }
      .masthead .logo.item img {
        margin-right: 1em;
      }
      .masthead .ui.menu .ui.button {
        margin-left: 0.5em;
      }
      .masthead h1.ui.header {
        margin-top: 2em;
        margin-bottom: 0em;
        font-size: 4em;
        font-weight: normal;
      }
      .masthead h2 {
        font-size: 1.7em;
        font-weight: normal;
      }
      .ui.vertical.stripe {
        padding: 8em 0em;
      }
      .ui.vertical.stripe h3 {
        font-size: 2em;
      }
      .ui.vertical.stripe .button + h3,
      .ui.vertical.stripe p + h3 {
        margin-top: 3em;
      }
      .ui.vertical.stripe .floated.image {
        clear: both;
      }
      .ui.vertical.stripe p {
        font-size: 1.33em;
      }
      .ui.vertical.stripe .horizontal.divider {
        margin: 3em 0em;
      }
      .quote.stripe.segment {
        padding: 0em;
      }
      .quote.stripe.segment .grid .column {
        padding-top: 5em;
        padding-bottom: 5em;
      }
      .footer.segment {
        padding: 5em 0em;
      }
      .secondary.pointing.menu .toc.item {
        display: none;
      }
      @media only screen and (max-width: 700px) {
        .ui.fixed.menu {
          display: none !important;
        }
        .secondary.pointing.menu .item,
        .secondary.pointing.menu .menu {
          display: none;
        }
        .secondary.pointing.menu .toc.item {
          display: block;
        }
        .masthead.segment {
          min-height: 350px;
        }
        .masthead h1.ui.header {
          font-size: 2em;
          margin-top: 1.5em;
        }
        .masthead h2 {
          margin-top: 0.5em;
          font-size: 1.5em;
        }
      }

h3 {
  margin: 40px 0 0;
}
a {
  color: black;
}
.ui.inverted.vertical{
  background-color: rgb(179, 179 , 179);
}
</style>
