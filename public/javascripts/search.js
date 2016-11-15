var cuisineArr = [
    "African", "Asian", "Brazilian", "BBQ", "Carribean", "Dessert",
    "European", "French", "Greek", "Hispanic", "Indian", "Italian"
];

function getCurrentTime() {
    return "14:00";
}

function setCuisine() {
    var cuisineList = document.getElementById("cuisine-list");

    var row = null;

    window.cuisineArr.forEach(function (cuisineType, index) {
        if (!row) {
            row = document.createElement("div");
            row.className = "row";
        }

        var divContainer = document.createElement("div");
        divContainer.className = "cuisine-list col-sm-4";

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = cuisineType;

        var label = document.createElement("label");
        label.innerText = cuisineType;
        label.htmlFor = cuisineType;

        divContainer.appendChild(checkbox);
        divContainer.appendChild(label);
        row.appendChild(divContainer);

    });
    cuisineList.appendChild(row);
}

function setCalendar() {
    var startTime = document.getElementById("start-time");
    startTime.value = getCurrentTime();

    var days = document.getElementById("days");
    for (var i = 1; i < 31; i++) {
        var element = document.createElement("li");
        element.innerHTML = i;
        element.id = i;
        days.appendChild(element);

        /*
                var span = document.createElement("span");
                span.class ="nothing";
        
                var element = document.createElement("li");
                element.innerHTML = i;
                element.id = i;
        
                span.appendChild(element);
                days.appendChild(span);*/
    }
}