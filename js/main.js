"use strict";
(function() {

  window.addEventListener("load", init);

  let NAV_TIMEOUT;

  function init() {
    let splashOverlay = document.querySelector('.splash-overlay');
    splashOverlay.classList.add('set-right');   
    let splashCont = document.querySelector('.splash-content');
    let mainContent = document.querySelector('.main-content');
    let main = document.querySelector('main');
    let abPic = document.querySelector('.picture-overlay')
    let logo = document.querySelector('.logo');

    let options = {
      root: null,
      rootMargin: "0px 0px -100% 0px",
      threshold: 0
    }

    let previousY = 0;

    let toggleNavState = () => {
      if (main.scrollTop > nav.clientHeight * 3) {
        if (previousY > main.scrollTop) {
          nav.classList.remove('slide-top');
          clearInterval(NAV_TIMEOUT);
          NAV_TIMEOUT = setTimeout(() => {
            nav.classList.add('slide-top');
          }, 1000);
        } else if (previousY < main.scrollTop) {
          nav.classList.add('slide-top');
        }
      } else if (NAV_TIMEOUT) {
        clearTimeout(NAV_TIMEOUT);
      } else { 
        nav.classList.remove('slide-top')
      }
    };    

    setInterval(() => {
      if (main.scrollTop != previousY) {
        window.requestAnimationFrame(toggleNavState);
        previousY = main.scrollTop;
      }
    }, 10);

    let nav = document.querySelector('nav');

    let observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            nav.classList.remove('nav-scrolled');
            logo.src = 'imgs/icons/logo-icon.svg';
          } else {
            nav.classList.add('nav-scrolled');
            logo.src = 'imgs/icons/logo-icon-white.svg';
            nav.addEventListener('mouseenter', () => {
              clearTimeout(NAV_TIMEOUT);
            });
            nav.addEventListener('mouseleave', () => {
              NAV_TIMEOUT = setTimeout(() => {
                nav.classList.add('slide-top');
              }, 1000);
            });
          } 
        });
      }, options);
    
    setTimeout(function() {
      splashCont.classList.toggle('no-opacity');
    }, 1000);
    
    let portfolioBtn = document.querySelector('.portfolio-btn');
    portfolioBtn.addEventListener('click', function() {
      splashCont.classList.add('no-opacity');
      setTimeout(function() {
        main.classList.add('set-right');
        setTimeout(function() {
          nav.classList.remove('no-opacity');
        }, 1000)
      }, 300);
      observer.observe(mainContent);
    });
  }
})();