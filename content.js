chrome.runtime.sendMessage({todo:"showPageAction"});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "fetch_data" ) {
        var fullName = document.querySelector('.text-heading-xlarge').textContent;
               var company = $('.mb2 .text-heading-small div').text();
        var response = {
            fullName:fullName,
            company:company
        }
        console.log(response);
   chrome.runtime.sendMessage({"message": "fetched_data","data":response});
       }
     }
   );



