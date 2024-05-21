// Toggle class active for hambuger menu
const navbarNav = document.querySelector('.navbar-nav');

// when hambuger menu clicked
document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

// Toggele clase active for search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

// when search icon clicked
document.querySelector('#search-button').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active for support cart
const supportCart = document.querySelector('.support-cart');
document.querySelector('#support-cart-button').onclick = (e) => {
  supportCart.classList.toggle('active');
  e.preventDefault();
};


// click out object, hidden object
const hmIcon = document.querySelector('#hamburger-menu');
const searchButton = document.querySelector('#search-button');
const supportButton = document.querySelector('#support-cart-button')

document.addEventListener('click', function (e) {
  // for hamburger icon 
  if(!hmIcon.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
  
  // for search icon 
  if(!searchButton.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }
  
  // for support icon 
  if(!supportButton.contains(e.target) && !supportCart.contains(e.target)) {
    supportCart.classList.remove('active');
  }
})

// Smooth scroling page (Gagal)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal')
const itemDetailButtons = document.querySelectorAll('.item-detail-button')

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = 'flex'
    e.preventDefault()
  }
})

// Close Modal Box with icon close
document.querySelector('.modal .close-icon').onclick = (e) => {
  itemDetailModal.style.display = 'none';
  e.preventDefault();
}

// Close Modal Box without icon close
window.onclick = (e) => {
  if (e.target === itemDetailModal){
    itemDetailModal.style.display = 'none';
  }
}
