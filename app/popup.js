
let button_password = document.getElementById('button_password');
let button_set_password = document.getElementById('button_set_password');

button_password.onclick = function(element) {
    getPagePassword();
    setExtensionPassword();
};

button_set_password.onclick = function(element) {
    setPagePassword();
};

var setExtensionPassword = function() {
    console.log("SetPassword");

    chrome.storage.sync.get('password', function(data) {
        console.log("Storage: " + data.password); 
        document.getElementById("password_id").value = data.password;
    });
}

var getPagePassword = function() {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, { 
            code: `
                var password = "";
                var inputs = document.getElementsByTagName("input");

                var isSet = false;
                for(var i = 0; i < inputs.length; i++) {
                    if(inputs[i].type.toLowerCase() === "password" && !isSet) { 
                        password = inputs[i].value;
                        isSet = true;
                    }
                }
                
                chrome.storage.sync.set({"password": password}, function() {
                  console.log('Password is ' + password + '!!');
                })
            `
        });
    });    
}; 

var setPagePassword = function() {

    var password = document.getElementById("password_id").value;
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, { 
            code: `
                var inputs = document.getElementsByTagName("input");

                var isSet = false;
                for(var i = 0; i < inputs.length; i++) {
                    if(inputs[i].type.toLowerCase() === "password" && !isSet) { 
                        isSet = true;
                        console.log("Found password input!!");
                        inputs[i].value = "` + password + `";
                    }
                }
            `
        });
    });  

   
}


