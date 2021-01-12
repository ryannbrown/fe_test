$(document).ready(function() {
    console.log('App started!')
    var g = {
    
    
        searchUsers: function (email) {
     
            console.log("searching")
            $.ajax({
              url: `https://ltv-data-api.herokuapp.com/api/v1/records.json?email=${email}`,
            }).done(function(email) {
              $('.hero').hide();
              $('.lookup-info').hide();
              if (email.length > 0) {
                  console.log("api", email)
                $('.object').html(`
                    <h1>Here it is</h1>
                `)
    
                $('.object').show();
      
              } else {
                 $('.error-page').show();
              }
            }).fail(function() {
              $('#profile-result').hide();
              $('.error-page').show();
              $('#welcome-text').text("Not a valid place. Please enter new email.");
            });
        }
    
    }
    
    $('#formhandler').submit(function (e) {
        console.log("submitted")
        e.preventDefault();
        console.log("CLICKED")
        console.log(e.target[0])
        let email = e.target[1].value;
        g.searchUsers(email);
    
      });
    
    })