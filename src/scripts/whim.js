// var subscribeStatus = false; //change this to false to disable subscription
// var resubscribeStatus = false; //change this to false to disable resubscription
// var PROXY_RESPONSE = "proxy-response";

// var request = webOS.service.request(
//   "luna://com.webos.service.connectionmanager/setProxy",
//   {
//     method: "",
//     parameters: {
//       "method": "auto",
//       url: "https://  dev.onawhim.com",
//     },
    
//     onSuccess: function (inResponse) {
//       localStorage.setItem(PROXY_RESPONSE, JSON.stringify(inResponse))
//       console.log("Success Response", inResponse)
//       // alert('done')
//     },
//     onFailure: function (inError) {
//       // alert('failed')
//       localStorage.setItem(PROXY_RESPONSE, JSON.stringify(inError))
//       console.log("Error Response", inError)
//     },
//     onComplete: function (inResponse) {
//       console.log("Complete", inResponse)
//     },
//     subscribe: subscribeStatus,
//     resubscribe: resubscribeStatus,
//   }
// );

