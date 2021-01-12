$(document).ready(function () {
  console.log("App started!");
  var g = {
    searchUsers: function (email) {
      console.log("searching", email);
      $.ajax({
        url: `https://ltv-data-api.herokuapp.com/api/v1/records.json?email=${email}`,
      })
        .done(function (email) {
          $(".hero").hide();
          $(".lookup-info").hide();
          $(".og-footer").hide();
          if (email) {
            console.log("api", email);
            $(".result-page").html(`
            <div class="header">
        <div class="header-wrapper">
            <div><image class="co-logo" src="./logo.png"></image></div>
            <div>
                <image class="tray-icon" src="./search.png"></image>
                <image class="tray-icon" src="./person.png"></image>
            </div>
        </div>

    </div>
                <div class="result-page-content">
                <div class="result-heading ">
                    <h1 class="blue-text">1 Result</h1>
                    <p>Look at the result below to see the details of the person you're searched for.</p>
                </div>
                <div class="result-card">
                <div class="card-header">
                <h2>${email.first_name} ${email.last_name}</h2>
                <p>${email.description}</p>
                </div>
                <div class="card-left">
                <div class="card-address">
                <h4>Address</h4>
                <p>${email.address}</p>
                </div>
                <div class="card-email">
                <h4>Email</h4>
                <p>${email.email}</p>
                </div>
                </div>
                <div class="card-right">
                <div class="card-numbers">
                <h4>Phone Numbers</h4>
                <p>${email.phone_numbers[0]}</p>
                <p>${email.phone_numbers[1]}</p>
                <p>${email.phone_numbers[2]}</p>
                </div>
                <div class="card-relatives">
                <h4>Relatives</h4>
                <p>${email.relatives[0]}</p>
                <p>${email.relatives[1]}</p>
                </div>
                </div>
                </div>
                <div class="hero">
                <h1>Can't Find The Right Person?</h1>
                <h2><span class="gold-text">Try Again</span> - Make a new search</h2>
                <form id="formhandler">
                    <input id="formhandler" placeholder="email"/>
                    <button type="submit">GO!</button>
                </form>
                <p class="gold-text"><span>logo</span> Enter Any Email Address. They won't be notified.</p>
            </div>
            <div class="footer">
            <div class="footer-wrapper">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <div class="footer-links"><a href="">Terms</a> | <a href="0">Privacy</a></div>
            </div>
        </div>
                `);

            $(".result-page").show();
          } else {
            $(".error-page").show();
          }
        })
        .fail(function () {
          $("#profile-result").hide();
          $(".error-page").show();
          $("#welcome-text").text("Not a valid place. Please enter new email.");
        });
    },
  };

  $("#formhandler").submit(function (e) {
    console.log("submitted");
    e.preventDefault();
    console.log("CLICKED");

    console.log(e.target[0].value);
    let email = e.target[0].value;
    g.searchUsers(email);
  });
});
