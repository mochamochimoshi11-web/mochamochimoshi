const menuItems = document.querySelectorAll(".menu-item");
const gameScreen = document.querySelector(".game-screen");

const pages = {
  "ABOUT ME": {
    "ABOUT ME": "he/him, transmasc, panromantic ace, scorpio, november 6, eng/dutch",
    "LIKES": "eating, anime, drawing, writing ocs, designing posters/carrds/strawpage etc, the color green",
    "DISLIKES": "i hate things like colored sodas. sprite is fine but i cant stand fanta or the green or red one."
  },
  "RULES": {
    "BEFORE YOU FOLLOW": "I tend to be awkward at first, slow/delayed replies, but as i get to know you i get talkative. interacting with me may be difficult, i ghost/give selective replies",
    "DO NOT INTERACT": "Homophobic, transphobic, racist, pro life, try not to put effort into conversation, repeatedly insult/or say condescending things to me",
    "PLEASE NOTE": "Im physically and mentally unwell, and that might affect most of my actions. Please dont hesitate to call me out on them."
  },
  "ANIME": {
    "ANIME": "Aot, Jjba, MHA, devilman crybaby, cyberpunk edgerunners, etc.",
    "CURRENTLY WATCHING": "RE:zero, Fairy Tail, Clannad"
  },
  "MANGA / HWA": {
    "MANGA & MANHWA": "Codename Anastasia, LITC, Low tide in twilight, Cherry blossoms after winter, Nerd Project, Darkfall, suicide boy, The Greatest Estate Developer etc.",
    "CURRENTLY READING": "Im currently only reading happy twogether, but feel free to recommend me any!"
  },
  "KINLIST": {
    "KINLIST": "Giorno Giovanna, Jolyne Cujoh, Yoshiki, Subaru Natsuki, Debra Morgan, Brian Moser, Ame Chan, Alexis Ness etc.",
    "FAVORITES": "Giorno Giovanna, Brian Moser"
  },
  "SOCIALS": {
    "SOCIALS": "tiktok + discord = @mochamochimoshi, roblox = MochaMochiMoshi"
  },
  "GAMES": {
    "GAMES": "Saihate station, Genshin impact, Persona 3, ASBR, HSR, WUWA, PJSK, slow damage, You And Me And Her, NEEDY STREAMER OVERLOAD, etc.",
    "CURRENTLY PLAYING": "Persona 3, ASBR, ROBLOX, Yandere Simulator, Slow damage"
  },
  "MUSIC": {
    "MUSIC": "80´s, vkei, rock, any type except cowboy",
    "CURRENTLY PLAYING": "You give love a bad name, I want you"
  }
};

let currentPage = null;

// Floating text container
const content = document.createElement("div");
content.id = "floating-content";

content.style.cssText = `
  position: absolute;
  top: 27%;
  left: 41%;
  width: 48%;
  color: white;
  font-family: inherit;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.45s ease;
  z-index: 5;
  background: transparent;
  border: none;
  box-shadow: none;
  overflow: visible;
`;

gameScreen.appendChild(content);

// Back button
const backButton = document.createElement("button");
backButton.textContent = "← BACK";

backButton.style.cssText = `
  position: absolute;
  top: 19%;
  left: 41%;
  color: white;
  font-family: inherit;
  font-size: 14px;
  letter-spacing: 2px;
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.45s ease;
  z-index: 6;
`;

gameScreen.appendChild(backButton);

function showPage(name) {
  const sections = pages[name];
  if (!sections || currentPage) return;

  currentPage = name;

  // Fade out the menu buttons
  menuItems.forEach(button => {
    button.style.transition = "opacity 0.45s ease";
    button.style.opacity = "0";
    button.style.pointerEvents = "none";
  });

  content.replaceChildren();

  const storageKey = "p3_site_" + name;
  let saved;

  try {
    saved = JSON.parse(localStorage.getItem(storageKey) || "null");
  } catch {
    saved = null;
  }

  Object.entries(sections).forEach(([heading, defaultText], index) => {
    const section = document.createElement("div");

    section.style.cssText = `
      margin-bottom: 13px;
      padding: 0;
      background: transparent;
      border: none;
      box-shadow: none;
    `;

    const title = document.createElement("div");
    title.textContent = heading;

    title.style.cssText = `
      color: #ffffff;
      font-size: ${index === 0 ? "1.3rem" : "1rem"};
      letter-spacing: 1.5px;
      margin-bottom: 3px;
      text-shadow: 0 0 8px rgba(255,255,255,0.25);
      background: transparent;
    `;

    const text = document.createElement("div");
    text.contentEditable = "true";
    text.spellcheck = false;
    text.textContent = saved?.[index] ?? defaultText;

    text.style.cssText = `
      color: #ffffff;
      font: 13px/1.5 Arial, sans-serif;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      min-height: 0;
      padding: 0;
      background: transparent;
      border: none;
      outline: none;
      box-shadow: none;
      text-shadow: 0 1px 4px rgba(0,0,0,0.4);
    `;

    text.addEventListener("input", () => {
      const values = [
        ...content.querySelectorAll("[contenteditable='true']")
      ].map(element => element.textContent);

      localStorage.setItem(storageKey, JSON.stringify(values));
    });

    section.append(title, text);
    content.appendChild(section);
  });

  // Fade in the text and back button
  requestAnimationFrame(() => {
    content.style.opacity = "1";
    content.style.pointerEvents = "auto";

    backButton.style.opacity = "1";
    backButton.style.pointerEvents = "auto";
  });
}

function returnToMenu() {
  if (!currentPage) return;

  content.style.opacity = "0";
  content.style.pointerEvents = "none";

  backButton.style.opacity = "0";
  backButton.style.pointerEvents = "none";

  menuItems.forEach(button => {
    button.style.opacity = "0";
    button.style.pointerEvents = "none";
  });

  setTimeout(() => {
    content.replaceChildren();

    menuItems.forEach(button => {
      button.style.opacity = "1";
      button.style.pointerEvents = "auto";
    });

    currentPage = null;
  }, 450);
}

// Open sections when menu buttons are clicked
menuItems.forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

// Back button click
backButton.addEventListener("click", returnToMenu);

// Escape key also returns to the menu
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    returnToMenu();
  }
});
document.addEventListener("click", function startMusic() {
  const musicPlayer = document.getElementById("bg-music");

  if (musicPlayer && musicPlayer.paused) {
    musicPlayer.play().catch(() => {});
  }
}, { once: true });