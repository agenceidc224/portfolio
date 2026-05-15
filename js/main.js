const projectData = [
  {
    title: "PACTE — plateforme collaborative",
    description: "Conception et développement d’une plateforme web pour la gestion de projets, communication et suivi académique.",
    tags: ["Angular", "Laravel", "MySQL"],
  },
  {
    title: "Application mobile Flutter",
    description: "Développement d’une application mobile fluide pour l’apprentissage et la gestion de ressources utilisateur.",
    tags: ["Flutter", "Dart", "Firebase"],
  },
  {
    title: "Projet IA médical",
    description: "Modèle de classification d’images médicales avec pipeline de détection et visualisation de résultats.",
    tags: ["Python", "Machine Learning", "OpenCV"],
  },
  {
    title: "Système de gestion scolaire",
    description: "Solution de gestion pour établissements scolaires intégrant étudiants, enseignants et tableaux de bord.",
    tags: ["Laravel", "Oracle", "UI/UX"],
  },
];

const timelineData = [
  {
    date: "2025",
    title: "Projet de fin d'études",
    detail: "Développement d’un système logiciel complet pour la gestion d’organisations avec des composantes IA intégrées.",
  },
  {
    date: "2024",
    title: "Conférence IA universitaire",
    detail: "Animation d’un atelier sur les enjeux de l’intelligence artificielle en milieu universitaire.",
  },
  {
    date: "2023",
    title: "Assistant d’enseignement",
    detail: "Encadrement d’étudiants en algorithmique, programmation C/C++ et développement logiciel.",
  },
  {
    date: "2022",
    title: "Lancement de PACTE",
    detail: "Création d’une plateforme web collaborative pour faciliter la gestion des projets et des activités pédagogiques.",
  },
];

const projectsGrid = document.getElementById("projects-grid");
const timelineList = document.getElementById("timeline-list");
const currentYear = document.getElementById("current-year");

function formatTags(tags) {
  return tags.map(tag => `<span class="project-tag">${tag}</span>`).join("");
}

function createProjectCards() {
  if (!projectsGrid) return;

  projectsGrid.innerHTML = projectData
    .map(
      project => `
        <article class="project-card reveal">
          <div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
          </div>
          <div class="tag-row">${formatTags(project.tags)}</div>
        </article>
      `
    )
    .join("");
}

function createTimelineItems() {
  if (!timelineList) return;

  timelineList.innerHTML = timelineData
    .map(
      item => `
        <article class="timeline-item reveal">
          <div>
            <small>${item.date}</small>
            <h3>${item.title}</h3>
            <p>${item.detail}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function handleScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach(element => observer.observe(element));
}

function handleContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();
    const submitButton = form.querySelector("button");
    submitButton.textContent = "Message envoyé";
    submitButton.disabled = true;

    setTimeout(() => {
      form.reset();
      submitButton.textContent = "Envoyer";
      submitButton.disabled = false;
      alert("Merci ! Votre message a bien été enregistré localement. Connectez ce formulaire à votre service d’email pour un envoi réel.");
    }, 1200);
  });
}

function handleActiveNav() {
  const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
  const sections = navLinks
    .map(link => document.querySelector(link.hash))
    .filter(Boolean);

  if (!sections.length) return;

  const observeSections = new IntersectionObserver(
    entries => {
      const visibleSections = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections.length > 0) {
        const activeId = visibleSections[0].target.id;
        navLinks.forEach(link => {
          link.classList.toggle("active", link.hash === `#${activeId}`);
        });
      }
    },
    {
      threshold: [0.4, 0.6],
    }
  );

  sections.forEach(section => observeSections.observe(section));
  const currentHash = window.location.hash;
  if (currentHash) {
    navLinks.forEach(link => {
      link.classList.toggle("active", link.hash === currentHash);
    });
  }
}

function init() {
  currentYear.textContent = new Date().getFullYear();
  createProjectCards();
  createTimelineItems();
  handleScrollReveal();
  handleContactForm();
  handleActiveNav();
}

window.addEventListener("DOMContentLoaded", init);
