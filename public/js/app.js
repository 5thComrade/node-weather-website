const home = document.querySelector('#home-link');
const about = document.querySelector('#about-link');
const help = document.querySelector('#help-link');

if(window.location.href === "http://localhost:3000/") {
    home.style.color = "rgb(255,190,0)";
} else if(window.location.href === "http://localhost:3000/about") {
    about.style.color = "rgb(255,190,0)";
} else {
    help.style.color = "rgb(255,190,0)";
}

document.getElementById('submit').addEventListener('click', (e) => {
    const location = document.getElementById('location').value;
    weather(location);
    e.preventDefault();
})

const weather = (location) => {
    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            ui(data);
        });
    })
}

const ui = (data) => {
    if("error" in data) {
        document.querySelector('#ui-location').textContent = data.error;
    } else {
        document.querySelector('#ui-location').textContent = data.location;
        document.querySelector('#ui-forecast').textContent = data.forecast;
        document.querySelector('#ui-temperature').textContent = `${data.temperature} C`;
    }
}


