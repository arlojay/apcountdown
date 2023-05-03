const startTime = Date.now();
const target = new Date("5/4/2023, 8:00:00 AM").getTime();
const boom = new Audio('vine-boom.mp3');

let nextBoomTime = 0;

function playBoom() {
    boom.currentTime = 0;
    boom.play();
}

function getTimeRemaining(t) {
    const ct = (startTime + t);
    const dt = target - (startTime + t);
    if(ct > nextBoomTime) {
        nextBoomTime = ct + 1000;
        playBoom();
    }

    time.style.setProperty("--pulseval", (dt % 1000) / 500);

    let [num, dec] = (Math.floor(dt) / 1000).toString().split(".");
    if(dec == null) dec = "0";

    dec = dec.padStart(3, "0");
    if(dec.length > 3) dec = dec.slice(0, 3);

    return num + "." + dec + "s";
}

function update(t) {
    try {
        time.textContent = getTimeRemaining(t) + " Remaining";
    } catch(e) {}

    requestAnimationFrame(update);
}

boom.oncanplaythrough = () => {
    requestAnimationFrame(update);
};