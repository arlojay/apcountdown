const startTime = Date.now();
const relativeTime = "11:00:00 AM"; //4th period
const time = new Date("1/1/2000, " + relativeTime).toISOString().split("T")[1].slice(0, -1);
const date = new Date().toISOString().split("T")[0];
const target = new Date(date + "T" + time + "Z");

let nextBoomTime = 0;
let lastWholeSecond = 0;

function numAdvance() {
    const boom = new Audio("vine-boom.mp3");
    boom.play();
}

function getTimeRemaining(t) {
    const ct = (startTime + t);
    const dt = target - (startTime + t);

    time.style.setProperty("--pulseval", (dt % 1000) / 500);

    let [num, dec] = (Math.floor(dt) / 1000).toString().split(".");
    if(dec == null) dec = "0";

    if(lastWholeSecond != Math.floor(ct / 1000)) {
        if(lastWholeSecond != 0) {
            document.body.dataset.started = "true";
        }
        lastWholeSecond = Math.floor(ct / 1000);
        numAdvance();
    }

    dec = dec.padStart(3, "0");
    if(dec.length > 3) dec = dec.slice(0, 3);

    return num + "." + dec + "s";
}

function update() {
    try {
        timeval.textContent = getTimeRemaining(performance.now());
    } catch(e) {}

    requestAnimationFrame(update);
}

function init() {
    requestAnimationFrame(update);
}

init();
