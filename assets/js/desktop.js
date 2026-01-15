const folderWin = document.getElementById("folderWin");
const folderTitle = document.getElementById("folderTitle");
const folderContent = document.getElementById("folderContent");

const articleWin = document.getElementById("articleWin");
const articleTitle = document.getElementById("articleTitle");
const articleFrame = document.getElementById("articleFrame");

const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const modalActions = document.getElementById("modalActions");
const modalOk = document.getElementById("modalOk");

// Folder model (we’ll later auto-generate this from posts)
const FOLDERS = {
  home: {
    title: "How To Become a Crab",
    items: [
      { title: "Menu / Home", subtitle: "Return to the main desktop view", href: "/desktop.html" }
    ]
  },
  discourses: {
    title: "DISCOURSES : individuation in actuality",
    items: [
      { title: "intro", subtitle: "direct page", href: "/pages/discourses-intro.html" },
      { title: "articles", subtitle: "dropdown placeholder (we’ll wire this next)", href: "/pages/discourses-intro.html" }
    ]
  },
  narcissism: {
    title: "NARCISSISM : or equality as dictatorship",
    items: [
      { title: "intro", subtitle: "direct page", href: "/pages/narcissism-intro.html" },
      { title: "articles", subtitle: "dropdown placeholder", href: "/pages/narcissism-intro.html" }
    ]
  },
  deviances: {
    title: "DEVIANCES : the perversion diaries",
    items: [
      { title: "intro", subtitle: "direct page", href: "/pages/deviances-intro.html" },
      { title: "vacuolosynthesis", subtitle: "dropdown placeholder", href: "/pages/deviances-intro.html" },
      { title: "articles", subtitle: "dropdown placeholder", href: "/pages/deviances-intro.html" }
    ]
  },
  history: {
    title: "HISTORY : anarchy, power and politics",
    items: [
      { title: "intro", subtitle: "direct page", href: "/pages/history-intro.html" },
      { title: "articles", subtitle: "dropdown placeholder", href: "/pages/history-intro.html" }
    ]
  },
  diaries: {
    title: "The Individuation Diaries",
    items: [
      { title: "videos", subtitle: "references / embeds", href: "/pages/videos.html" }
    ]
  },
  bia: {
    title: "BIA : Berylist Individuality Accelerationism",
    items: [
      { title: "bia", subtitle: "direct page", href: "/pages/bia.html" }
    ]
  },
  social: {
    title: "SOCIAL MEDIA",
    items: [
      { title: "Instagram", subtitle: "redirect", href: "https://instagram.com/" },
      { title: "YouTube", subtitle: "redirect", href: "https://youtube.com/" }
    ]
  }
};

function openFolder(folderKey) {
  const folder = FOLDERS[folderKey];
  if (!folder) return;

  folderTitle.textContent = folder.title;
  folderContent.innerHTML = "";

  folder.items.forEach((it) => {
    const btn = document.createElement("button");
    btn.className = "folder-item";
    btn.type = "button";
    btn.innerHTML = `${it.title}<small>${it.subtitle || ""}</small>`;

    btn.addEventListener("dblclick", () => {
      // open in the article window (or external)
      if (it.href.startsWith("http")) {
        window.open(it.href, "_blank", "noopener,noreferrer");
        return;
      }
      openArticle(it.title, it.href);
    });

    // Single click selects, double click opens (like an OS)
    folderContent.appendChild(btn);
  });

  folderWin.classList.remove("hidden");
}

function openArticle(title, href) {
  articleTitle.textContent = title;
  articleWin.classList.remove("hidden");
  articleFrame.src = href;
}

function closeWindow(which) {
  if (which === "folder") folderWin.classList.add("hidden");
  if (which === "article") articleWin.classList.add("hidden");
}

document.addEventListener("click", (e) => {
  const icon = e.target.closest(".icon-btn");
  if (icon) {
    openFolder(icon.dataset.folder);
  }

  const closeBtn = e.target.closest(".win-close");
  if (closeBtn) {
    closeWindow(closeBtn.dataset.close);
  }

  const menu = e.target.closest(".menu-btn");
  if (menu) {
    openModal(menu.dataset.modal);
  }

  if (e.target === modal) hideModal();
});

modalOk.addEventListener("click", hideModal);

function openModal(kind) {
  modalActions.innerHTML = "";
  modal.classList.remove("hidden");

  const ok = document.createElement("button");
  ok.className = "btn";
  ok.textContent = "ok";
  ok.addEventListener("click", hideModal);

  if (kind === "help") {
    modalText.textContent =
      "How it works:\n\n• Double-click folders to browse sections.\n• Double-click an item to open it.\n• Only one article window exists; opening a new one replaces the previous.\n• Close windows with the × button.";
    modalActions.appendChild(ok);
    return;
  }

  if (kind === "contact") {
    modalText.textContent = "info@howtobecomeacrab.com";
    modalActions.appendChild(ok);
    return;
  }

  if (kind === "about") {
    modalText.textContent =
      "All content on this website is original unless stated otherwise.\nSatire and style are used as forms of critique.\nNo licence is granted for reproduction without permission.";
    modalActions.appendChild(ok);
    return;
  }

  if (kind === "howto") {
    modalText.textContent =
      "Bouillabaisse (extremely serious):\n\n1) Sweat fennel/onion/garlic.\n2) Add tomatoes, saffron, bay, orange peel.\n3) Add fish stock; simmer.\n4) Add firm fish first, then delicate fish.\n5) Serve with rouille + toasted bread.\n\nPretend it was effortless.";
    modalActions.appendChild(ok);
    return;
  }

  if (kind === "logout") {
    modalText.textContent = "Are you sure you want to log out?";
    const yes = document.createElement("button");
    yes.className = "btn";
    yes.textContent = "yes";
    yes.addEventListener("click", () => (window.location.href = "/index.html"));

    const no = document.createElement("button");
    no.className = "btn";
    no.textContent = "no";
    no.addEventListener("click", hideModal);

    modalActions.appendChild(no);
    modalActions.appendChild(yes);
    return;
  }

  modalText.textContent = "";
  modalActions.appendChild(ok);
}

function hideModal() {
  modal.classList.add("hidden");
}
