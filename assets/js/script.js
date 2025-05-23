'use strict';

// Your existing JavaScript code here

// Profile Selection Logic
const profileConfig = {
  recruiter: {
    navItems: [
      { text: 'Graphics Projects', page: 'graphics' },
      { text: 'Video Projects', page: 'videos' },
      { text: 'Reels', page: 'reels' },
      { text: 'Skills', page: 'skills' },
      { text: 'Clients', page: 'clients' },
      { text: 'Hire Me', page: 'contact' }
    ]
  },
  academic: {
    navItems: [
      { text: 'Education', page: 'education' },
      { text: 'Research', page: 'research' }
    ]
  },
  explorer: {
    navItems: [
      { text: 'Hobbies', page: 'hobbies' },
      { text: 'Travel Diaries', page: 'travel' },
      { text: 'Social Media', page: 'social' }
    ]
  }
};

// Check if first visit
if (!localStorage.getItem('profileSelected')) {
  document.getElementById('profileSelector').classList.remove('hidden');
}

function selectProfile(profile) {
  localStorage.setItem('profileSelected', profile);
  document.getElementById('profileSelector').classList.add('hidden');
  updateNavigation(profile);
  updateVisibleSections(profile);
}

function updateNavigation(profile) {
  const navList = document.getElementById('dynamicNav');
  navList.innerHTML = '';
  
  profileConfig[profile].navItems.forEach(item => {
    const li = document.createElement('li');
    li.className = 'navbar-item';
    li.innerHTML = `
      <button class="navbar-link" data-nav-link>${item.text}</button>
    `;
    navList.appendChild(li);
  });

  // Reattach navigation event listeners
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  navigationLinks.forEach((link, i) => {
    link.addEventListener("click", function () {
      pages.forEach((page, j) => {
        if (this.innerHTML.toLowerCase() === page.dataset.page) {
          pages[j].classList.add("active");
          navigationLinks[j].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[j].classList.remove("active");
          navigationLinks[j].classList.remove("active");
        }
      });
    });
  });
}

function updateVisibleSections(profile) {
  const allSections = document.querySelectorAll('[data-profile]');
  allSections.forEach(section => {
    if (section.dataset.profile === profile) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });
}

function toggleProfileMenu() {
  const menu = document.getElementById('profileMenu');
  menu.classList.toggle('active');
}

// Initialize with saved profile or default to recruiter
const savedProfile = localStorage.getItem('profileSelected') || 'recruiter';
updateNavigation(savedProfile);
updateVisibleSections(savedProfile);

// Close profile menu when clicking outside
document.addEventListener('click', (e) => {
  const menu = document.getElementById('profileMenu');
  const btn = document.querySelector('.profile-switcher-btn');
  if (!menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.remove('active');
  }
});

// Your existing JavaScript code continues here