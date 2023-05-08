const startTime = Date.now();
const target = new Date("5/8/2023, 12:00:00 AM").getTime();

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
