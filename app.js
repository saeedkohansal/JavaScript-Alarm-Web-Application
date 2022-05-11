/* -------------------------------------------- */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* USER GESTURE HANDLER - https://goo.gl/7K7WLu */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* -------------------------------------------- */
const notification_btn = document.querySelector(".notification")
const notification_sound = document.querySelector(".bi-volume-mute-fill")

// When the notification button clicked
notification_btn.onclick = function () {
    // Changing "volume-mute" icon to "volume-up" icon (only once)
    if (notification_sound.classList[1] === "bi-volume-mute-fill") {
        notification_sound.setAttribute("class", "bi-volume-up-fill")
        notification_btn.style.color = "#ff0" // Changing text color to yellow
    }
}

/* ------------------------------------------------ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* DISPLAY HOURS AND MINUTES IN HTML <SELECT> INPUT */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------ */
const alarm_title = document.querySelector("#alarm-title")
const alarm_hours = document.querySelector("#alarm-hours")
const alarm_minutes = document.querySelector("#alarm-minutes")

// Display hour (00-23) in <select> input
for (let i = 0; i < 24; i++) {
    // Display clock in HH:MM format
    if (i < 10) {
        // Display 00-09
        alarm_hours.innerHTML += '<option value="0' + i + '">0' + i + '</option>'
    } else if (i >= 10) {
        // Display 10-23
        alarm_hours.innerHTML += '<option value="' + i + '">' + i + '</option>'
    }
}

// Display minutes (00-59) in <select> input
for (let i = 0; i < 60; i++) {
    // Display clock in HH:MM format
    if (i < 10) {
        // Display 00-09
        alarm_minutes.innerHTML += '<option value="0' + i + '">0' + i + '</option>'
    } else if (i >= 10) {
        // Display 10-59
        alarm_minutes.innerHTML += '<option value="' + i + '">' + i + '</option>'
    }
}

/* ---------------------------------------------------- */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* GETTING AND SAVING HOUR AND MINUTES FROM USERS INPUT */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ---------------------------------------------------- */
const add_new_alarm = document.querySelector(".alarm-add-new")
const add_button = document.querySelector(".alarm-add")
const delete_button = document.querySelector(".alarm-delete")
const active_alarm = document.querySelector(".alarm-active")
const active_alarm_title = document.querySelector(".alarm-active-title")
const active_alarm_time = document.querySelector(".alarm-active-time")

// When the add button clicked
add_button.onclick = function () {
    // Insert an alarm title is required
    if (alarm_title.value !== "") {
        // Getting alarm title, hour, and minute from users <select> input
        const selected_title = alarm_title.value
        const selected_hour = Number(alarm_hours.value)
        const selected_minute = Number(alarm_minutes.value)

        // Adding alarm time to the browser localStorage
        localStorage.setItem("alarm-title", selected_title)
        localStorage.setItem("alarm-hours", selected_hour)
        localStorage.setItem("alarm-minute", selected_minute)

        add_new_alarm.style.display = "none" // Removing "alarm-add-new" option
        active_alarm_title.innerHTML = selected_title // Display alarm title
        active_alarm_time.innerHTML = selected_hour + ":" + selected_minute // Display alarm time
        active_alarm.style.display = "block" // Display "alarm-active" option
    } else {
        alert("Please add an alarm title!") // Display an error
    }
}

/* ------------------------------------------------------- */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* DISPLAY WEB APPLICATION OPTIONS - LOGIC BY LOCALSTORAGE */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------- */
const alarm_saved_title = localStorage.getItem("alarm-title")
const alarm_saved_hour = localStorage.getItem("alarm-hours")
const alarm_saved_minute = localStorage.getItem("alarm-minute")

// Display active alarm option, when user have an alarm in the browser localStorage
if (alarm_saved_title !== null) {
    add_new_alarm.style.display = "none" // Removing "alarm-add-new" option
    active_alarm_title.innerHTML = alarm_saved_title // Display alarm title
    active_alarm_time.innerHTML = alarm_saved_hour + ":" + alarm_saved_minute // Display alarm time
    active_alarm.style.display = "block" // Display "alarm-active" option
} else {
    // Display adding alarm option, when user has not alarm in the browser localStorage
    add_new_alarm.style.display = "block" // Display "alarm-add-new" option
}

// When the delete button clicked
delete_button.onclick = function () {
    localStorage.clear() // Clear localStorage
    active_alarm.style.display = "none" // Removing "alarm-active" option
    add_new_alarm.style.display = "block" // Display "alarm-add-new" option
}

/* ---------------------------------------------------------- */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ALARM TIME DETECTION & DISPLAY NOTIFICATION AND PLAY SOUND */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ---------------------------------------------------------- */
const fullscreen_alarm = document.querySelector(".fullscreen-alarm")
const fullscreen_alarm_title = document.querySelector(".fullscreen-alarm-title")
const fullscreen_alarm_stop_btn = document.querySelector(".alarm-stop")
const alarm_sound = new Howl({ src: ["https://cdn.pixabay.com/download/audio/2021/10/09/audio_baf81f29b2.mp3"] })

let playing_sound = false

setInterval(function () {
    const time = new Date()
    let hour = time.getHours()
    let minutes = time.getMinutes()
    if (
        localStorage.getItem("alarm-hours") == hour &&
        localStorage.getItem("alarm-minute") == minutes
    ) {
        playing_sound = true
        fullscreen_alarm_title.innerHTML = localStorage.getItem("alarm-title")
        fullscreen_alarm.style.display = "block"
    }
}, 1000)

// Playing alarm sound every 7 seconds because my sound length is 7 seconds
setInterval(function () {
    if (playing_sound == true) {
        alarm_sound.play()
    }
}, 7000)

// When the stop button clicked
fullscreen_alarm_stop_btn.onclick = function () {
    localStorage.clear() // Clear localStorage
    location.reload() // Refresh window
}