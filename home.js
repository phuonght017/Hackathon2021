//Change img according to feelings
const rangeFeeling = document.querySelector('#rangeFeeling');
const imgFeeling = document.querySelector('#imgFeeling');
const resFeeling = "";

rangeFeeling.addEventListener('input', function () {
    let numImg = Math.floor((rangeFeeling.value - 2) / 1) + 2;
    imgFeeling.src = `hackathon/f${numImg}.png`;
    updateResFeeling(numImg);
})

function updateResFeeling(num) {
    switch (num) {
        case 3:
            resFeeling = "scared";
            break;
        case 4:
            resFeeling = "worried";
            break;
        case 5:
            resFeeling = "sad";
            break;
        case 6:
            resFeeling = "relax";
            break;
        case 7:
            resFeeling ="fun";
            break;
        case 8:
            resFeeling ="excited";
            break;
    }
}
//Click on sleep options
const optionsSleep = document.querySelectorAll('.option-sleep');
let numOptSleep = 0;
let resSleep ="";
optionsSleep.forEach(function (option) {
    option.addEventListener('click', function () {
        if (option.style.backgroundColor === "white") {
            option.style.backgroundColor = "#88CCC9";
            numOptSleep += 1;
            if (numOptSleep > 1) deleteDifOpt(optionsSleep, option);
        }
        else option.style.backgroundColor = "white";
    })
})

//Click on working options
const optionsWorking = document.querySelectorAll('.option-working');
let numOptWorking = 0;

optionsWorking.forEach(function (option) {
    option.addEventListener('click', function () {
        if (option.style.backgroundColor === "white") {
            option.style.backgroundColor = "#88CCC9";
            numOptWorking += 1;
            if (numOptWorking > 1) deleteDifOpt(optionsWorking, option);
        }
        else option.style.backgroundColor = "white";
    })
})

function deleteDifOpt(Opts, lastOpt) {
    Opts.forEach(function (option) {
        if (option !== lastOpt) option.style.backgroundColor = "white";
    })
}

//Click on symptom options
const optionsSymp = document.querySelectorAll('.option-symptom');

optionsSymp.forEach(function (option) {
    option.addEventListener('click', function () {
        if (option.style.backgroundColor === "white") {
            option.style.backgroundColor = "#88CCC9";
        }
        else option.style.backgroundColor = "white";
    })
})

//Submit
const form = document.querySelector('form');
const test = document.querySelector('#test');
const greeting = document.querySelector('#greeting');
const linkButtons = document.querySelector('#linkButtons');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    axios.post('https:sample-endpoint.com/user', {
        feeling: resFeeling,
        symptom: '??',
        work: 'lv1',
        sleep: 'lv3',
      })
      .then(function (response) {
        console.log(response);
      })
    clearPage();
})

function clearPage() {
    greeting.remove();
    test.remove();
}

//Calendar
const period = document.querySelector('#period');
const calendar = document.querySelector('#calendar');
period.appendChild('calendar');


