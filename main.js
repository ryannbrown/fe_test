
$(document).ready(function () {


  console.log("App started!");
  var g = {
    searchUsers: function (email) {
        console.log("here we are")

        $(".home-header").hide();
        $(".hero").hide();
        $(".lookup-info").hide();
        $(".og-footer").hide();
        $('.lookup-header').show()
        $('.loading-screen').show()
      console.log("searching", email);
      $.ajax({
        url: `https://ltv-data-api.herokuapp.com/api/v1/records.json?email=${email}`,
      })
        .done(function (data) {
            console.log("data", data)

            if (data.length === 0) {
                console.log("FAILED DATA")
          
                $('.loading-screen').hide()
                $(".result-page").hide();
                $(".error-page").show();
                $('.error-page').html(`
            <div class="error-page-content">
            <h1 class="blue-text">0 Results</h1>
            <p>Try starting a new search below</p>
        </div>
        <div class="hero">
        <h1>Can't Find The Right Person?</h1>
        <h2><span class="gold-text">Try Again</span> - Make a new search</h2>
        <form id="redo-formhandler">
            <input type="email" id="" placeholder="email"/>
            <button type="submit">GO!</button>
        </form>
        <p class="gold-text"><span><img class="lock-img" src="lock.png"/></span> Enter Any Email Address. They won't be notified.</p>
    </div>
  </div>
  <div class="new-footer-wrapper">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.
  </p>
  <div class="footer-links">
    <a href="">Terms</a> | <a href="0">Privacy</a>
  </div>
</div>
            `)
            $("#redo-formhandler").submit(function (e) {
                console.log("submitted");
                e.preventDefault();
                console.log("CLICKED");
            
                console.log(e.target[0].value);
                let email = e.target[0].value;
                g.searchUsers(email);
            });
              }
              
            
         else if (data) {
            console.log("there is data!!!", data)
            $('.loading-screen').hide()
            console.log("api", data);
            $(".result-page").html(`
                <div class="result-page-content">
                <div class="result-heading ">
                    <h1 class="blue-text">1 Result</h1>
                    <p>Look at the result below to see the details of the person you're searched for.</p>
                </div>
                <div class="result-card">
                <div class="av-box">
                <img class="av-img" src='person.png'/>
                </div>
                <div class="card-header-detail card-header">
                <h1 class="blue-text">${data.first_name} ${data.last_name}</h1>
                <p>${data.description}</p>
                </div>
                <div class="card-bottom">
                <div class="card-left">
                <div class="card-detail card-address">
                <h2 class="blue-text">Address</h2>
                <p>${data.address}</p>
                </div>
                <div class="card-detail card-data">
                <h2 class="blue-text">Email</h2>
                <p>${data.email}</p>
                </div>
                </div>
                <div class="card-right">
                <div class="card-detail card-numbers">
                <h2 class="blue-text">Phone Numbers</h2>
                <a href="tel:${data.phone_numbers[0]}">${data.phone_numbers[0]}</a>
                <a href="tel:${data.phone_numbers[1]}">${data.phone_numbers[1]}</a>
                <a href="tel:${data.phone_numbers[2]}">${data.phone_numbers[2]}</a>
                </div>
                <div class="card-detail card-relatives">
                <h2 class="blue-text">Relatives</h2>
                <p>${data.relatives[0]}</p>
                <p>${data.relatives[1]}</p>
                </div>
                </div>
                </div>
                </div>
                <div class="hero">
                <h1>Can't Find The Right Person?</h1>
                <h2><span class="gold-text">Try Again</span> - Make a new search</h2>
                <form id="redo-formhandler">
                    <input type="email" id="" placeholder="email"/>
                    <button type="submit">GO!</button>
                </form>
                <p class="gold-text"><span><image class="lock-img" src="lock.png"/></span> Enter Any Email Address. They won't be notified.</p>
            </div>
            <div class="new-footer-wrapper">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.
  </p>
  <div class="footer-links">
    <a href="">Terms</a> | <a href="0">Privacy</a>
  </div>
</div>
                `);


                $("#redo-formhandler").submit(function (e) {
                    console.log("submitted");
                    e.preventDefault();
                    console.log("CLICKED");
                
                    console.log(e.target[0].value);
                    let email = e.target[0].value.toLowerCase();
                    g.searchUsers(email);
                });



            $(".result-page").show();
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
    let email = e.target[0].value.toLowerCase();
    g.searchUsers(email);
  });
 
});
