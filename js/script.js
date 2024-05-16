// Toggle class active
const navbarNav = document.querySelector('.navbar-nav');

// when hambuger menu clicked
document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

// click out sidebar for hidden sidebar
const hamburger = document.querySelector('#hamburger-menu');
document.addEventListener('click', function (e) {
  if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
})

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});