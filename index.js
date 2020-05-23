
var currentDay = moment().format('dddd LL');
document.getElementById("currentDay").innerHTML = currentDay;
console.log(currentDay);
var currentTime = moment().format('ha');
console.log(currentTime);
//$("#currentTime").append(currentTime);

var hours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
var currentTimeIndex = hours.indexOf(currentTime);
var morning = moment().format('a');


for (i=0; i<hours.length; i++) {
    myLoad(hours[i]);
}

if (currentTimeIndex == -1){
    if (morning == "am"){
        for (i=0; i<hours.length; i++) {
            var search = "#entry" + hours[i];
            $(search).addClass("future");
        } 
    } else {
        for (i=0; i<hours.length; i++) {
            var search = "#entry" + hours[i];
            $(search).addClass("past");
        }
    }

} else {
    for (i=0; i<hours.length;) {
        var search = "#entry" + hours[i];
        console.log(search);
        console.log(i);
        console.log(currentTimeIndex);
        if  (i == currentTimeIndex) {
            $(search).addClass("present");
            i++;
        }
    
        else if (i > currentTimeIndex) {
            $(search).addClass("future");
            i++;
         }
        else {
            $(search).addClass("past");
            i++;
        }
      
    }

}

function clearCal() {
    localStorage.clear();
    for (i=0; i<hours.length; i++) {
    myLoad(hours[i]);
    }
}

function mySave(hourKey) {
    var boxContent = document.getElementById("entry"+hourKey).value;
    localStorage.setItem("entry"+hourKey, boxContent);
    console.log(boxContent); 
    myLoad();
}
  
function myLoad(hourKey) {
    var savedContent = localStorage.getItem("entry"+hourKey);
    console.log(savedContent);
    document.getElementById("entry"+hourKey).innerHTML = savedContent;
}

function saveAndLoad(hourKey) {
    mySave(hourKey);
    myLoad(hourKey);
}