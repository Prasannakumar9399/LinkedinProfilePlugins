$(function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "fetch_data"});
    });


    document.getElementById("sub_btn").addEventListener("click",()=>{
     let full_name = document.getElementById('firstname').textContent;
     let last_name = document.getElementById('lastname').textContent;
     let company_name = document.getElementById('company').textContent;
       
    company_name = company_name.replace("\n","").trim();
      var data_obj = {
        full_name:full_name,
        last_name:last_name,
        company_name:company_name
      }

      $.ajax({
        method: "POST",
        url: "https://d0578fc95577.ngrok.io/users",
        data: JSON.stringify(data_obj),
        headers: { "Content-Type": "application/json"}
      })
        .done(function( msg ) {
          $('.success_alert').css('display','block');
          $('.success_alert').text("Data Saved in database !!");
          setTimeout(() => {
            $('.success_alert').hide();
          }, 5000);
          
        });

    })
   });


   chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "fetched_data" ) {
          var  name = request.data.fullName.split(" ");
          document.getElementById('firstname').innerHTML = name[0];
          document.getElementById('lastname').innerHTML = name[1];
          document.getElementById('company').innerHTML = request.data.company;
      }
     }
   );
