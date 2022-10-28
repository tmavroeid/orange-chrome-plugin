window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    //enter here the action you want to do once loaded
    //if (confirm('Open dialog for democratization?')){}
    chrome.runtime.sendMessage({type:'democratization_dialog'});
},false);