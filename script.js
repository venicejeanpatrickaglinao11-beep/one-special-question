
// ======================================
// JUNJUN'S LITTLE FAIRYTALE
// COMPLETE JAVASCRIPT
// ======================================


// PAGE NAVIGATION

function goToPage(number) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById("page" + number);

    selectedPage.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ======================================
// BACKGROUND SLIDESHOW
// ======================================

const backgrounds = document.querySelectorAll(".bg");

let backgroundIndex = 0;

setInterval(() => {

    backgrounds[backgroundIndex].classList.remove("active");

    backgroundIndex = (backgroundIndex + 1) % backgrounds.length;

    backgrounds[backgroundIndex].classList.add("active");

}, 5000);


// ======================================
// MUSIC PLAYER
// ======================================

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

let musicPlaying = false;

async function toggleMusic() {

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicButton.innerHTML = "♫ Music Off";

    } else {

        try {

            await music.play();

            musicPlaying = true;

            musicButton.innerHTML = "♫ Music On";

        } catch (error) {

            musicButton.innerHTML = "Tap to Play ♫";

            console.log("Music could not play:", error);

        }

    }

}


async function startMusic() {

    if (!musicPlaying) {

        try {

            await music.play();

            musicPlaying = true;

            musicButton.innerHTML = "♫ Music On";

        } catch (error) {

            musicButton.innerHTML = "♫ Music Off";

        }

    }

}


// ======================================
// ENTRANCE
// ======================================

function enterFairytale() {

    startMusic();

    goToPage(2);

    const butterfly = document.getElementById("deliveryButterfly");

    butterfly.classList.remove("fly-in");

    void butterfly.offsetWidth;

    butterfly.classList.add("fly-in");

    createParticles(12);

}


// ======================================
// ENVELOPE ANIMATION
// ======================================

let envelopeOpened = false;

function openEnvelope() {

    if (envelopeOpened) return;

    envelopeOpened = true;

    const envelope = document.getElementById("envelope");

    const button = document.getElementById("openButton");

    envelope.classList.add("open");

    button.disabled = true;

    button.innerHTML = "Opening your letter... ♡";

    setTimeout(() => {

        butterflyEscape();

    }, 650);

    setTimeout(() => {

        goToPage(3);

        createParticles(18);

    }, 2000);

}


// ======================================
// BUTTERFLIES ESCAPING
// ======================================

function butterflyEscape() {

    const container = document.getElementById("particleContainer");

    for (let i = 0; i < 12; i++) {

        const butterfly = document.createElement("div");

        butterfly.innerHTML = "🦋";

        butterfly.className = "particle";

        butterfly.style.left = "45%";

        butterfly.style.bottom = "35%";

        butterfly.style.fontSize = (18 + Math.random() * 22) + "px";

        container.appendChild(butterfly);

        const x = (Math.random() - 0.5) * window.innerWidth;

        const y = -(150 + Math.random() * 450);

        const animation = butterfly.animate([

            {
                transform: "translate(0, 0) rotate(0deg)",
                opacity: 1
            },

            {
                transform: `translate(${x}px, ${y}px) rotate(360deg)`,
                opacity: 0
            }

        ], {

            duration: 2000 + Math.random() * 1800,

            easing: "ease-out"

        });

        animation.onfinish = () => butterfly.remove();

    }

}


// ======================================
// NOT YET
// ======================================

function sayNotYet() {

    document.getElementById("answerMessage").innerText =
        "No pressure, Pretty. Take all the time you need. Your happiness matters to me. ♡";

    createParticles(8);

}


// ======================================
// YES CELEBRATION
// ======================================

function sayYes() {

    goToPage(4);

    createParticles(55);

    setTimeout(() => {

        createParticles(25);

    }, 1200);

}


// ======================================
// FLOATING PARTICLES
// ======================================

function createParticles(amount) {

    const container = document.getElementById("particleContainer");

    const symbols = ["💗", "♡", "🦋", "🌸", "✨"];

    for (let i = 0; i < amount; i++) {

        const particle = document.createElement("div");

        particle.className = "particle";

        particle.innerHTML =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left = Math.random() * 100 + "vw";

        particle.style.fontSize =
            (15 + Math.random() * 25) + "px";

        const duration = 3500 + Math.random() * 4000;

        particle.style.animationDuration = duration + "ms";

        container.appendChild(particle);

        setTimeout(() => {

            particle.remove();

        }, duration);

    }

}


// ======================================
// MEMORY SLIDESHOW
// ======================================


const memories = [

    {
        image: "images/1.jpg",
        caption: "The beginning of something beautiful. ♡"
    },

    {
        image: "images/2.jpg",
        caption: "The first time I made you feel like a princess.♡"
    },

    {
        image: "images/3.jpg",
        caption: "Our first coffee date."
    },

    {
        image: "images/4.jpg",
        caption: "A memory I wish I could relive(kissed)."
    },

    {
        image: "images/5.jpg",
        caption: "Random paper flower."
    },

    {
        image: "images/6.jpg",
        caption: "The gift is on my back :)."
    },

    {
        image: "images/7.jpg",
        caption: "First cine date."
    },

    {
        image: "images/8.jpg",
        caption: "Flowers for my hardworking Queen."
    },

    {
        image: "images/9.jpg",
        caption: "Picnic, sunshine, and a pretty beautiful date."
    },

    {
        image: "images/10.jpg",
        caption: "Date I'll never forget."
    },

    {
        image: "images/11.jpg",
        caption: "Graduating together. ♡"
    }

];


];

let memoryIndex = 0;


// PRELOAD PHOTOS

memories.forEach(memory => {

    const image = new Image();

    image.src = memory.image;

});


// START MEMORIES

function startMemories() {

    memoryIndex = 0;

    goToPage(5);

    updateMemory();

    createParticles(20);

}


// UPDATE PHOTO

function updateMemory() {

    const image = document.getElementById("memoryImage");

    const caption = document.getElementById("memoryCaption");

    const counter = document.getElementById("memoryCounter");

    const previousButton = document.getElementById("prevMemoryButton");

    const nextButton = document.getElementById("nextMemoryButton");

    image.style.animation = "none";

    void image.offsetWidth;

    image.style.animation = "photoEnter .8s ease";

    image.src = memories[memoryIndex].image;

    caption.innerText = memories[memoryIndex].caption;

    counter.innerText =
        String(memoryIndex + 1).padStart(2, "0") +
        " / " +
        String(memories.length).padStart(2, "0");

    previousButton.disabled = memoryIndex === 0;

    previousButton.style.opacity =
        memoryIndex === 0 ? ".4" : "1";

    nextButton.innerHTML =
        memoryIndex === memories.length - 1
            ? "Finish Our Story ♡"
            : "Next Memory →";

}


// NEXT PHOTO

function nextMemory() {

    if (memoryIndex < memories.length - 1) {

        memoryIndex++;

        updateMemory();

        createParticles(5);

    } else {

        showFinalMessage();

    }

}


// PREVIOUS PHOTO

function previousMemory() {

    if (memoryIndex > 0) {

        memoryIndex--;

        updateMemory();
 createParticles(5);
    }

}


// ======================================
// FINAL CHAPTER
// ======================================

function showFinalMessage() {

    goToPage(6);

    createParticles(40);

}
