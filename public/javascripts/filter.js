var filters = {
    time: document.getElementById("time"),
    cuisine: document.getElementById("cuisine"),
    price: document.getElementById("price"),
    location: document.getElementById("location")
};

var prevSelectedDayElement = null;
var prevSelectedDayInnerHTML = null;

var prevDayElementHover = null;
var prevDayInnerHTML = null;
var prevDayNumHover = null;

var userType = "host";

var guestButton = document.getElementById("guest-button");
var hostButton = document.getElementById("host-button");

function delegateClick(target) {
    var id = target.attr("id");

    var parent = target.offsetParent();
    var parentId = parent.attr("id");
    var parentClass = parent.attr("class");

    if (id === "guest-button") {
        window.guestButton.className = "btn btn-lg btn-success";
        window.hostButton.className = "btn btn-lg btn-default";
        window.userType = "guest";
    }
    else if(id === "host-button") {
        window.guestButton.className = "btn btn-lg btn-default";
        window.hostButton.className = "btn btn-lg btn-success";
        window.userType = "host"
    }
    else if (id === "submit") {
        getFilters();
    }
    else if (id === "time-button") {
        filterClicked(window.filters["time"]);
    }
    else if (id === "cuisine-button") {
        filterClicked(window.filters["cuisine"]);
    }
    else if (id === "location-button") {
        filterClicked(window.filters["location"]);
    }
    else if (id === "price-button") {
        filterClicked(window.filters["price"]);
    }
    else if (parentClass === "dropdown-menu") {
        clickCalendar(target);
    }
    else if (parentClass && parentClass.indexOf("cuisine-list") != -1) {

    }
    else {
        closePreviousFilter();
    }
}

var prevHoverElement = null;
var prevInnerHTML = null;

function delegateHover(target) {
    return;

    var parent = target.offsetParent();
    var parentClass = parent.attr("class");

    if (parentClass === "dropdown-menu") {
        var id = target.attr("id");
        var num = parseInt(id);
        if (num > 0 && num <= 31) {
            var element = document.getElementById(id);
            if (element === prevSelectedDayElement) {
                element.innerHTML = "<span id='special' class='active border'> <a id='active-day'>" + num + "</a></span>";
            }
            else {
                element.innerHTML = "<span id='special' class='border'>" + num + "</span>";
            }

            if (window.prevHoverElement) {
                window.prevHoverElement.innerHTML = window.prevInnerHTML;
            }

            window.prevHoverElement = element;
            window.prevInnerHTML = num;
        }
    }
}


function clickCalendar(target) {
    /*
    var className = target.attr("class");
    var element = document.getElementById("special");
    var num = parseInt(element.innerHTML);
    */

    var id = target.attr("id");
    var num  = parseInt(id);

    if (num > 0 && num <= 31) {
        var element = document.getElementById(id);
        element.innerHTML = "<span class='active'> <a id='active-day'>" + num + "</a></span>";

        if (window.prevSelectedDayElement) {
            window.prevSelectedDayElement.innerHTML = window.prevSelectedDayInnerHTML;
        }
        window.prevSelectedDayElement = element;
        window.prevSelectedDayInnerHTML = num;
    }
    /*
        var id = target.attr("id");
        var num = parseInt(id);
        if (num > 0 && num <= 31) {
            var dayElement = document.getElementById(id);
            var activeElement = document.createElement("span");
            activeElement.class = "active";
            
            dayElement.appendChild(activeElement);
        }
        */
}

function getFilters() {
    var data = {};
    data["start-time"] = document.getElementById("start-time").value;
    data["end-time"] = document.getElementById("end-time").value;

    if (document.getElementById("active-day")) {
        data["day"] = document.getElementById("active-day").innerHTML;
    }
    else {
        data["day"] = null;
    }
    
    data["cuisine"] = getCuisine();
    data["user-type"] = window.userType;
    
    postItem(data);
}

function getCuisine() {
    var retVal = [];
    
    window.cuisineArr.forEach(function (cuisineType) {
        var checkbox = document.getElementById(cuisineType);
        if (checkbox.checked) {
            retVal.push(cuisineType);
        }
    });
    /*
    if (retVal.length === 0) {
        return null;
    }*/
    return retVal;
}

function postItem(data) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/search",
        processData: false,
        contentType: "application/json",
        data: JSON.stringify(data)
    });
}

/* Helper functions to track button clicking */
function closePreviousFilter() {
    closeElement(window.prevFilter);
    window.prevFilter = null;
}

function filterClicked(element) {
    if (isElementOpen(element)) {
        closePreviousFilter();
    }
    else if (isElementClosed(element)) {
        if (window.prevFilter) {
            closeElement(window.prevFilter);
        }
        openElement(element);
        window.prevFilter = element;
    }
}

function openElement(element) {
    element.className = element.className.replace(/(?:^|\s)closed(?!\S)/g, " open");
}

function closeElement(element) {
    element.className = element.className.replace(/(?:^|\s)open(?!\S)/g, " closed");
}

function isElementOpen(element) {
    return element.className.match(/(?:^|\s)open(?!\S)/);
}

function isElementClosed(element) {
    return element.className.match(/(?:^|\s)closed(?!\S)/);
}