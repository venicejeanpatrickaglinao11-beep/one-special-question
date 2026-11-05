
/* =====================================================
   A FILM CALLED US
   JUNJUN × PRETTY
   COMPLETE INTERACTIVE SCRIPT
===================================================== */


/* 01. PAGE NAVIGATION */

function goToPage(number) {

    const pages = document.querySelectorAll(".page");

    const selectedPage =
        document.getElementById("page" + number);

    if (!selectedPage) return;

    pages.forEach(page => {
        page.classList.remove("active");
    });

    selectedPage.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* 02. BACKGROUND PHOTO SLIDESHOW */

const backgrounds = document.querySelectorAll(".bg");

let backgroundIndex = 0;

if (backgrounds.length > 1) {

    setInterval(() => {

        backgrounds[backgroundIndex].classList.remove("active");

        backgroundIndex =
            (backgroundIndex + 1) % backgrounds.length;

        backgrounds[backgroundIndex].classList.add("active");

    }, 6500);

}


/* 03. MUSIC PLAYER */

const music = document.getElementById("backgroundMusic");

const musicButton = document.getElementById("musicButton");

function updateMusicButton() {

    if (!music || !musicButton) return;

    musicButton.textContent =
        music.paused ? "♫ Music Off" : "♫ Music On";

}

async function toggleMusic() {

    if (!music) return;

    if (!music.paused) {

        music.pause();

    } else {

        try {

            await music.play();

        } catch (error) {

            musicButton.textContent = "Tap to Play ♫";

            console.error("Music playback failed:", error);

        }

    }

    updateMusicButton();

}

async function startMusic() {

    if (!music || !music.paused) return;

    try {

        await music.play();

    } catch (error) {

        console.log("Waiting for music permission.");

    }

    updateMusicButton();

}

music.addEventListener("play", updateMusicButton);

music.addEventListener("pause", updateMusicButton);


/* 04. ENTRANCE */

function enterFairytale() {

    startMusic();

    goToPage(2);

    const butterfly =
        document.getElementById("deliveryButterfly");

    butterfly.classList.remove("fly-in");

    void butterfly.offsetWidth;

    butterfly.classList.add("fly-in");

    createParticles(12);

}


/* 05. ENVELOPE OPENING */

let envelopeOpened = false;

function openEnvelope() {

    if (envelopeOpened) return;

    envelopeOpened = true;

    const envelope =
        document.getElementById("envelope");

    const button =
        document.getElementById("openButton");

    envelope.classList.add("open");

    button.disabled = true;

    button.textContent = "Opening your letter...";

    setTimeout(() => {

        butterflyEscape();

    }, 650);

    setTimeout(() => {

        goToPage(3);

        createParticles(20);

    }, 2200);

}


/* 06. BUTTERFLY ESCAPE */

function butterflyEscape() {

    const container =
        document.getElementById("particleContainer");

    for (let i = 0; i < 14; i++) {

        const butterfly =
            document.createElement("div");

        butterfly.textContent = "🦋";

        butterfly.className = "particle";

        butterfly.style.position = "fixed";

        butterfly.style.left = "50%";
        butterfly.style.top = "48%";
        butterfly.style.bottom = "auto";

        butterfly.style.fontSize =
            (17 + Math.random() * 20) + "px";

        container.appendChild(butterfly);

        const x =
            (Math.random() - 0.5) *
            window.innerWidth * 1.3;

        const y =
            -(150 + Math.random() * window.innerHeight * .8);

        const animation = butterfly.animate([

            {
                transform:
                    "translate(-50%, 0) rotate(0deg) scale(.5)",
                opacity: 0
            },

            {
                transform:
                    "translate(-50%, -30px) rotate(20deg) scale(1)",
                opacity: 1,
                offset: .2
            },

            {
                transform:
                    `translate(${x}px, ${y}px) rotate(360deg) scale(.8)`,
                opacity: 0
            }

        ], {

            duration: 2400 + Math.random() * 1200,

            easing: "cubic-bezier(.2,.7,.3,1)"

        });

        animation.onfinish = () => butterfly.remove();

    }

}


/* 07. NOT YET */

function sayNotYet() {

    const message =
        document.getElementById("answerMessage");

    message.textContent =
        "That's okay, Pretty. Take all the time you need. I want you to be comfortable and happy. ♡";

    createParticles(6);

}


/* 08. YES CELEBRATION */

function sayYes() {

    goToPage(4);

    createParticles(60);

    setTimeout(() => {
        createParticles(35);
    }, 1300);

    setTimeout(() => {
        createParticles(20);
    }, 2500);

}


/* 09. PARTICLE SYSTEM */

function createParticles(amount) {

    const container =
        document.getElementById("particleContainer");

    const symbols = [
        "♡",
        "♥",
        "🦋",
        "✧",
        "🌸"
    ];

    for (let i = 0; i < amount; i++) {

        const particle =
            document.createElement("div");

        particle.className = "particle";

        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left =
            Math.random() * 100 + "vw";

        particle.style.fontSize =
            (13 + Math.random() * 22) + "px";

        const duration =
            3500 + Math.random() * 4000;

        particle.style.animationDuration =
            duration + "ms";

        container.appendChild(particle);

        setTimeout(() => {

            particle.remove();

        }, duration);

    }

}


/* 10. MEMORY GALLERY */

const memories = [

    {
        image: "images/us1.jpg",
        caption: "The beginning of something beautiful. ♡",
        date: "A DAY TO REMEMBER"
    },

    {
        image: "images/us2.jpg",
        caption: "One of my favorite moments with you.",
        date: "A LITTLE MEMORY"
    },

    {
        image: "images/us3.jpg",
        caption: "You make ordinary days extraordinary.",
        date: "A BEAUTIFUL MOMENT"
    },

    {
        image: "images/us4.jpg",
        caption: "A memory I wish I could relive.",
        date: "SOMETHING SPECIAL"
    },

    {
        image: "images/us5.jpg",
        caption: "And somehow, there's always more to love.",
        date: "MY FAVORITE PERSON"
    },

    {
        image: "images/us6.jpg",
        caption: "My favorite person, in my favorite memories. ♡",
        date: "TO BE CONTINUED..."
    }

];

let memoryIndex = 0;


/* PRELOAD PHOTOGRAPHS */

memories.forEach(memory => {

    const image = new Image();

    image.src = memory.image;

});


/* START MEMORIES */

function startMemories() {

    goToPage(5);

    memoryIndex = 0;

    document.querySelector(".film-frame").style.display = "";

    document.getElementById("memoryCounter").style.display = "";

    document.getElementById("nextMemoryButton").style.display = "";

    document.getElementById("finalMessage").classList.add("hidden");

    updateMemory();

    createParticles(18);

}


/* UPDATE PHOTO */

function updateMemory() {

    const image =
        document.getElementById("memoryImage");

    const caption =
        document.getElementById("memoryCaption");

    const counter =
        document.getElementById("memoryCounter");

    const date =
        document.getElementById("photoDate");

    const nextButton =
        document.getElementById("nextMemoryButton");

    image.style.opacity = "0";

    setTimeout(() => {

        image.src = memories[memoryIndex].image;

        caption.textContent =
            memories[memoryIndex].caption;

        date.textContent =
            memories[memoryIndex].date;

        counter.textContent =
            String(memoryIndex + 1).padStart(2, "0") +
            " / " +
            String(memories.length).padStart(2, "0");

        image.style.animation = "none";

        void image.offsetWidth;

        image.style.animation =
            "photoEnter .9s ease forwards";

        image.style.opacity = "1";

    }, 250);

    nextButton.textContent =
        memoryIndex === memories.length - 1
            ? "Our Final Chapter ♡"
            : "Next Memory →";

}


/* NEXT PHOTO */

function nextMemory() {

    if (memoryIndex < memories.length - 1) {

        memoryIndex++;

        updateMemory();

        createParticles(5);

    } else {

        showFinalMessage();

    }

}


/* 11. FINAL CREDITS */

function showFinalMessage() {

    const finalMessage =
        document.getElementById("finalMessage");

    const filmFrame =
        document.querySelector(".film-frame");

    const counter =
        document.getElementById("memoryCounter");

    const nextButton =
        document.getElementById("nextMemoryButton");

    finalMessage.classList.remove("hidden");

    filmFrame.style.display = "none";

    counter.style.display = "none";

    nextButton.style.display = "none";

    createParticles(45);

}


/* 12. IMAGE ERROR CHECK */

document.querySelectorAll(".bg").forEach(img => {

    img.addEventListener("error", () => {

        console.warn(
            "Background image not found:",
            img.src
        );

    });

});
