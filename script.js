const currentTime = document.getElementById('clock');


// set audio for alarm
const audio = new Audio("alarm.mp3");
audio.loop = true;


let alarmTime = null;
let alarmStop = null;


const alarmsList = document.querySelector('#alarmslist');
const addAlarm = document.querySelector('.setAlarm')


const alarmList = [];  


// Plays the alarm audio at correct time
function Sound(TIMENOW){
    audio.play();
    alert(`Wakey Wakey  it is ${TIMENOW}`)
}


// updates time every second 
function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const TIMENOW = `${hour}:${minutes}:${seconds}`;

    currentTime.innerText=`${hour}:${minutes}:${seconds}`;
    
//     check if the alarmList includes the current time , "now"
//     if yes, ringing() is called
    if(alarmList.includes(TIMENOW) ){
        Sound(TIMENOW);
    } 
}


// set the correct format of time

function formatTime(time) {
    if ( time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}


// function to clear/stop the currently playing alarm
function clearAlarm() {
    audio.pause();
    if (alarmStop ) {
        clearTimeout(alarmStop );
        alert('Alarm cleared');
    }
}      


// removes an alarm from the  list and the webpage when Delete is clicked
alarmslist.addEventListener('click', e=> {
    console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})


// removes an alarm from the array when "Delete Alarm" is clicked
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;
    alarmList.push.apply(alarmList, newList);
    
    // console.log("newList", newList);
    // console.log("alarmList", alarmList);
}


// Adds newAlarm to the  list as a new list item on webpage
function showAddedAlarm(newAlarm){
    const display =`
    <li class = "alarms-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    alarmslist.innerHTML += display
};


// event to set a new alarm whenever the submit button is clicked
addAlarm.addEventListener('submit', e=> {
    e.preventDefault();
    let new_h=formatTime(addAlarm.hour.value);
    if(new_h === '0'){
        new_h = '00'
    }
    let new_m=formatTime(addAlarm.min.value);
    if(new_m === '0'){
        new_m = '00'
    }
    let new_s=formatTime(addAlarm.sec.value);
    if(new_s === '0'){
        new_s = '00'
    }
    
    const newAlarm = `${new_h}:${new_m}:${new_s}`

//     add newAlarm to alarmList
    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            showAddedAlarm(newAlarm);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else{
        alert("Invalid Time Entered")
    }        
})


// calls updateTime() every second
setInterval(updateTime, 1000);