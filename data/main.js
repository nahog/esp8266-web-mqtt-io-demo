(function() {
    'use strict';

    function refreshId() {
        var x = new XMLHttpRequest();
        x.onreadystatechange = function() {
            if (x.readyState == XMLHttpRequest.DONE) {
                var id = x.responseText.trim();
                document.getElementById("esp-id").innerHTML = id;
                document.getElementById("esp-id-input").value = id;
                document.title = id + " (ESP8266)";
            }
        };
        x.open("GET", "id.json", true);
        x.send();
    }
    refreshId();

    document.getElementById("esp-id").onclick = function() {
        document.getElementById("esp-id").style.display = "none";
        document.getElementById("esp-id-input").style.display = "block";
    };
    document.getElementById("esp-id-input").onkeypress = function(e) {
        if (e.keyCode == 13) {
            var newId = document.getElementById("esp-id-input").value.trim();
            get('/setId?id=' + newId);
            document.getElementById("esp-id").innerHTML = newId;
            document.title = newId + " (ESP8266)";
            document.getElementById("esp-id").style.display = "block";
            document.getElementById("esp-id-input").style.display = "none";
            return false;
        }
    };

    function refreshRelay1() {
        var x = new XMLHttpRequest();
        x.onreadystatechange = function() {
            if (x.readyState == XMLHttpRequest.DONE) {
                relay("relay-1", x.responseText.trim());
            }
        };
        x.open("GET", "getRelay1", true);
        x.send();
    }
    document.getElementById("refresh-relay-1").onclick = refreshRelay1;
    refreshRelay1();
    setInterval(refreshRelay1, 5400);

    function refreshRelay2() {
        var x = new XMLHttpRequest();
        x.onreadystatechange = function() {
            if (x.readyState == XMLHttpRequest.DONE) {
                relay("relay-2", x.responseText.trim());
            }
        };
        x.open("GET", "getRelay2", true);
        x.send();
    }
    document.getElementById("refresh-relay-2").onclick = refreshRelay2;
    refreshRelay2();
    setInterval(refreshRelay2, 5300);

    function refreshTemp() {
        var x = new XMLHttpRequest();
        x.onreadystatechange = function() {
            if (x.readyState == XMLHttpRequest.DONE) {
                document.getElementById("temp").innerHTML = x.responseText.trim();
            }
        };
        x.open("GET", "getTemp", true);
        x.send();
    }
    document.getElementById("refresh-temp").onclick = refreshTemp;
    refreshTemp();
    setInterval(refreshTemp, 5000);

    function refreshToggleButton() {
        var x = new XMLHttpRequest();
        x.onreadystatechange = function() {
            if (x.readyState == XMLHttpRequest.DONE) {
                document.getElementById("toggle-button").innerHTML = x.responseText.trim();
            }
        };
        x.open("GET", "getToggleButton", true);
        x.send();
    }
    document.getElementById("refresh-toggle-button").onclick = refreshToggleButton;
    refreshToggleButton();
    setInterval(refreshToggleButton, 5100);

    function refreshRgb() {
        var x = new XMLHttpRequest();
        x.onreadystatechange = function() {
            if (x.readyState == XMLHttpRequest.DONE) {
                var response = JSON.parse(x.responseText);
                document.getElementById("rgb").innerHTML = response.r + ", " + response.g + ", " + response.b;
            }
        };
        x.open("GET", "getRgb", true);
        x.send();
    }
    document.getElementById("refresh-rgb").onclick = refreshRgb;
    setInterval(refreshRgb, 5200);
    refreshRgb();

    function setRgb() {
        var r = document.getElementById("r").value;
        var g = document.getElementById("g").value;
        var b = document.getElementById("b").value;
        document.getElementById("rgb").innerHTML = r + ', ' + g + ', ' + b;
        get('/setRgb?r=' + r + '&g=' + g + '&b=' + b);
        refreshRgb();
    }
    document.getElementById("set-rgb").onclick = setRgb;

    function get(url, action) {
        var x = new XMLHttpRequest();
        if (action !== undefined) {
            x.onreadystatechange = action(x);
        }
        x.open("GET", url, true);
        x.send();
    }

    function relay(id, value) {
        document.getElementById(id).innerHTML = value;
    }

    document.getElementById("cycle-colors").onclick = function() { get("cycleColors"); };

    document.getElementById("set-relay-1-high").onclick = function() { get("setRelay1High"); relay("relay-1", "1"); };
    document.getElementById("set-relay-1-low").onclick = function() { get("setRelay1Low"); relay("relay-1", "0"); };
    document.getElementById("set-relay-2-high").onclick = function() { get("setRelay2High"); relay("relay-2", "1"); };
    document.getElementById("set-relay-2-low").onclick = function() { get("setRelay2Low"); relay("relay-2", "0"); };

})();