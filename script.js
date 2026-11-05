
document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("backgroundMusic");
    const musicButton = document.getElementById("musicButton");
    const enterButton = document.getElementById("enterButton");
    const particleContainer = document.getElementById("particleContainer");

    const memories = [
        { image: "images/1.jpg", caption: "The beginning of something beautiful. ♡" },
        { image: "images/2.jpg", caption: "The first time I made you feel like a princess. ♡" },
        { image: "images/3.jpg", caption: "Our first coffee date." },
        { image: "images/4.jpg", caption: "A memory I wish I could relive (kissed)." },
        { image: "images/5.jpg", caption: "Random paper flower." },
        { image: "images/6.jpg", caption: "The gift is on my back :)." },
        { image: "images/7.jpg", caption: "First cine date." },
        { image: "images/12.jpeg", caption: "Debut of my pretty Princess." },
        { image: "images/8.jpg", caption: "Flowers for my hardworking Queen." },
        { image: "images/9.jpg", caption: "Picnic, sunshine, and a beautiful date." },
        { image: "images/10.jpg", caption: "Date I'll never forget." },
        { image: "images/11.jpg", caption: "Graduating together. ♡" }
    ];

    let memoryIndex = 0;
    let envelopeOpened = false;

    function goToPage(number) {
        const selectedPage = document.getElementById("page" + number);
        if (!selectedPage) return;

        document.querySelectorAll(".page").forEach(page => {
            page.classList.remove("active");
        });

        selectedPage.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function updateMusicButton() {
        if (!music || !musicButton) return;
        musicButton.textContent = music.paused ? "♫ Music Off" : "♫ Music On";
    }

    async function playMusic() {
        if (!music) return;

        try {
            await music.play();
            updateMusicButton();
        } catch (error) {
            updateMusicButton();
            console.error("Music playback failed:", error);
        }
    }

    function toggleMusic() {
        if (!music) return;

        if (music.paused) {
            playMusic();
        } else {
            music.pause();
            updateMusicButton();
        }
    }

    musicButton.addEventListener("click", toggleMusic);

    music.addEventListener("play", updateMusicButton);
    music.addEventListener("pause", updateMusicButton);

    updateMusicButton();

    function createParticles(amount) {
        if (!particleContainer) return;

        const symbols = ["💗", "♡", "🦋", "🌸", "✨"];

        for (let i = 0; i < amount; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            particle.style.left = Math.random() * 100 + "vw";
            particle.style.fontSize = (15 + Math.random() * 25) + "px";

            const duration = 3500 + Math.random() * 4000;
            particle.style.animationDuration = duration + "ms";

            particleContainer.appendChild(particle);

            setTimeout(() => particle.remove(), duration);
        }
    }

    function enterFairytale() {
        goToPage(2);
        playMusic();

        const butterfly = document.getElementById("deliveryButterfly");

        if (butterfly) {
            butterfly.classList.remove("fly-in");
            void butterfly.offsetWidth;
            butterfly.classList.add("fly-in");
        }

        createParticles(12);
    }

    enterButton.addEventListener("click", enterFairytale);

    const backgrounds = document.querySelectorAll(".bg");
    let backgroundIndex = 0;

    if (backgrounds.length > 1) {
        setInterval(() => {
            backgrounds[backgroundIndex].classList.remove("active");
            backgroundIndex = (backgroundIndex + 1) % backgrounds.length;
            backgrounds[backgroundIndex].classList.add("active");
        }, 5000);
    }

    const openButton = document.getElementById("openButton");

    openButton.addEventListener("click", () => {
        if (envelopeOpened) return;

        const envelope = document.getElementById("envelope");
        if (!envelope) return;

        envelopeOpened = true;
        envelope.classList.add("open");
        openButton.disabled = true;
        openButton.textContent = "Opening your letter... ♡";

        setTimeout(() => {
            const container = particleContainer;

            if (container) {
                for (let i = 0; i < 12; i++) {
                    const butterfly = document.createElement("div");
                    butterfly.className = "particle";
                    butterfly.textContent = "🦋";
                    butterfly.style.left = "45%";
                    butterfly.style.bottom = "35%";
                    butterfly.style.fontSize = (18 + Math.random() * 22) + "px";
                    container.appendChild(butterfly);

                    const x = (Math.random() - 0.5) * window.innerWidth;
                    const y = -(150 + Math.random() * 450);

                    const animation = butterfly.animate([
                        { transform: "translate(0,0)", opacity: 1 },
                        { transform: `translate(${x}px,${y}px) rotate(360deg)`, opacity: 0 }
                    ], { duration: 2500, easing: "ease-out" });

                    animation.onfinish = () => butterfly.remove();
                }
            }
        }, 650);

        setTimeout(() => {
            goToPage(3);
            createParticles(18);
        }, 2000);
    });

    document.getElementById("notYetButton").addEventListener("click", () => {
        document.getElementById("answerMessage").textContent =
            "No pressure, Pretty. Take all the time you need. Your happiness matters to me. ♡";

        createParticles(8);
    });

    document.getElementById("yesButton").addEventListener("click", () => {
        goToPage(4);
        createParticles(55);

        setTimeout(() => createParticles(25), 1200);
    });

    function updateMemory() {
        const image = document.getElementById("memoryImage");
        const caption = document.getElementById("memoryCaption");
        const counter = document.getElementById("memoryCounter");
        const previous = document.getElementById("prevMemoryButton");
        const next = document.getElementById("nextMemoryButton");

        const memory = memories[memoryIndex];

        image.style.animation = "none";
        void image.offsetWidth;

        image.src = memory.image;
        image.style.animation = "photoEnter .8s ease";

        caption.textContent = memory.caption;

        counter.textContent =
            String(memoryIndex + 1).padStart(2, "0") +
            " / " +
            String(memories.length).padStart(2, "0");

        previous.disabled = memoryIndex === 0;

        next.textContent =
            memoryIndex === memories.length - 1
                ? "Finish Our Story ♡"
                : "Next Memory →";
    }

    document.getElementById("memoriesButton").addEventListener("click", () => {
        memoryIndex = 0;
        goToPage(5);
        updateMemory();
        createParticles(20);
    });

    document.getElementById("nextMemoryButton").addEventListener("click", () => {
        if (memoryIndex < memories.length - 1) {
            memoryIndex++;
            updateMemory();
            createParticles(5);
        } else {
            goToPage(6);
            createParticles(40);
        }
    });

    document.getElementById("prevMemoryButton").addEventListener("click", () => {
        if (memoryIndex > 0) {
            memoryIndex--;
            updateMemory();
            createParticles(5);
        }
    });

    memories.forEach(memory => {
        const photo = new Image();
        photo.src = memory.image;
    });

    console.log("Junjun's Fairytale is ready ♡");
});
