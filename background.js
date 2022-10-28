// Handle requests for passwords
// chrome.runtime.onMessage.addListener(function(request) {
//     if (request.type === 'democratization_dialog') {
//         chrome.tabs.create({
//             url: chrome.extension.getURL('dialog.html'),
//             active: false
//         }, function(tab) {
//             // After the tab has been created, open a window to inject the tab
//             chrome.windows.create({
//                 tabId: tab.id,
//                 type: 'popup',
//                 focused: true,
//                 height: 600,
//                 width: 600
//                 // incognito, top, left, ...
//             });
//         });
//     }
// });

window.addEventListener("load", function load(event){
  chrome.webNavigation.onCompleted.addListener(function() {
    chrome.tabs.create({
        url: chrome.extension.getURL('dialog.html'),
        active: false
    }, function(tab) {
        // After the tab has been created, open a window to inject the tab
        chrome.windows.create({
            tabId: tab.id,
            type: 'popup',
            focused: true,
            height: 400,
            width: 800
            // incognito, top, left, ...
        });
    });
  }, {url: [{urlMatches : 'https://www.kotsovolos.gr/BasketDisplay'},{urlMatches: 'https://secure.booking.com/book.html'}]});
})
function setPassword(password) {
    // Do something, eg..:
    alert(password);
};