//Change img according to feelings
const rangeFeeling = document.querySelector('#rangeFeeling');
const imgFeeling = document.querySelector('#imgFeeling');
let resFeeling = "";

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
            resFeeling = "fun";
            break;
        case 8:
            resFeeling = "excited";
            break;
    }
}
//Click on sleep options
const optionsSleep = document.querySelectorAll('.option-sleep');
let numOptSleep = 0;
let resSleep = "";
optionsSleep.forEach(function (option) {
    option.addEventListener('click', function () {
        if (option.style.backgroundColor === "white") {
            option.style.backgroundColor = "#88CCC9";
            numOptSleep += 1;
            if (numOptSleep > 1) deleteDifOpt(optionsSleep, option);
            updateResSleep(option);
        }
        else option.style.backgroundColor = "white";
    })
})

function updateResSleep(option) {
    let iter = 0;
    optionsSleep.forEach(element => {
        iter++;
        if (option === element) resSleep = `lv${iter}`;
    });
}

//Click on working options
const optionsWorking = document.querySelectorAll('.option-working');
let numOptWorking = 0;
let resWork = "";

optionsWorking.forEach(function (option) {
    option.addEventListener('click', function () {
        if (option.style.backgroundColor === "white") {
            option.style.backgroundColor = "#88CCC9";
            numOptWorking += 1;
            if (numOptWorking > 1) deleteDifOpt(optionsWorking, option);
            updateResWork(option)
        }
        else option.style.backgroundColor = "white";
    })
})

function updateResWork(option) {
    let iter = 0;
    optionsWorking.forEach(element => {
        iter++;
        if (option === element) resWork = `lv${iter}`;
    });
}

function deleteDifOpt(Opts, lastOpt) {
    Opts.forEach(function (option) {
        if (option !== lastOpt) option.style.backgroundColor = "white";
    })
}

//Click on symptom options
const optionsSymp = document.querySelectorAll('.option-symptom');
let resSymp = {
    stomach: false,
    back: false,
    chest: false,
    pimple: false,
    consti: false,
    leg: false,
}

optionsSymp.forEach(function (option) {
    option.addEventListener('click', function () {
        if (option.style.backgroundColor === "white") {
            option.style.backgroundColor = "#88CCC9";
        }
        else option.style.backgroundColor = "white";
        updateResSymp(option);
    })
})

function updateResSymp(option) {
    let iter = -1;
    optionsSymp.forEach(element => {
        iter++;
        if (option === element) {
            switch (iter) {
                case 0:
                    if (option.style.backgroundColor==="white") resSymp.stomach = false
                    else resSymp.stomach = true;         
                    break;
                case 1:
                    if (option.style.backgroundColor==="white") resSymp.back = false
                    else resSymp.back = true;    
                    break;
                case 2:
                    if (option.style.backgroundColor==="white") resSymp.chest = false
                    else resSymp.chest = true;    
                    break;
                case 3:
                    if (option.style.backgroundColor==="white") resSymp.pimple = false
                    else resSymp.pimple = true;    
                    break;
                case 4:
                    if (option.style.backgroundColor==="white") resSymp.consti = false
                    else resSymp.consti = true;    
                    break;
                case 5:
                    if (option.style.backgroundColor==="white") resSymp.leg = false
                    else resSymp.leg = true;    
                    break;
                default:
                    break;
            }
        }
    })
}

//Submit
const form = document.querySelector('form');
const test = document.querySelector('#test');
const greeting = document.querySelector('#greeting');
const linkButtons = document.querySelector('#linkButtons');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    //try
    console.log(resFeeling);
    console.log(resSleep);
    console.log(resWork);
    console.log(resSymp.stomach);
    console.log(resSymp.back);
    console.log(resSymp.chest);
    console.log(resSymp.pimple);
    console.log(resSymp.consti);
    console.log(resSymp.leg);
    //try
    // axios.post('https:sample-endpoint.com/user', {
    //     feeling: resFeeling,
    //     symptom: resSymp,
    //     work: resWork,
    //     sleep: resSleep,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    clearPage();
})

function clearPage() {
    greeting.remove();
    test.remove();
}

//Get data about period 
let newData;
async function getData() {
    try {
        const res = await.get('https://apiblabla');
        newData = res.data;
    }
    catch (err) {
        allert("ERROR: Cannot get Data");
    }
}
//Show data on calendar // cx k can nua dau :((

