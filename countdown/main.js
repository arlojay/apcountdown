const search = new URLSearchParams(document.location.search);

function loadTimer(source) {
    const meta = JSON.parse(atob(source));
    const timer = new CountdownTimer(meta.target ?? 0, meta.title ?? "Untitled", meta.customSound ?? "/vine-boom.mp3");
    target = new Date("5/8/2023, 8:00:00 AM").getTime();
    
    return timer;
}

class CountdownTimer {
    constructor(target, name, audioSource) {
        this.summaryTitle = document.head.querySelector("title");
        this.countdownTitle = document.body.querySelector("#header");
        this.countdownElement = document.body.querySelector("#time").parentElement;
        this.countdownValue = this.countdownElement.querySelector(".value");
        this.audioTemplate = new Audio(audioSource);
        this.name = name;
        this.summaryTitle.textContent = "Countdown: " + name;
        this.countdownTitle.textContent = name + " - Countdown";

        this.target = target?.getTime?.() ?? target ?? 0;
        this.lastWholeSecond = "0";
        this.startTime = Date.now();
    }
    update() {
        const currentTime = this.startTime + performance.now();
        const remainingTime = Math.max(0, this.target - currentTime);

        let [num, dec] = (Math.floor(remainingTime) / 1000).toString().split(".");
        if(dec == null) dec = "0";

        if(this.lastWholeSecond != num) {
            this.lastWholeSecond = num;

            this.audioTemplate.cloneNode().play();
            this.doPulse();
        }

        dec = dec.padStart(3, "0");
        if(dec.length > 3) dec = dec.slice(0, 3);

        this.countdownValue.textContent = num + "." + dec + "s";
    }
    doPulse() {
        this.countdownElement.classList.remove("pulse");
        setTimeout(() => {
            this.countdownElement.classList.add("pulse");
        }, 1);
    }
}

let timer;

function update() {
    timer.update();
    requestAnimationFrame(update);
}
function init() {
    timer = loadTimer(search.get("a"));

    update();
}

window.addEventListener("load", () => {
    try {
        init();
    } catch(e) {
        alert(e.stack ?? e);
    }
});