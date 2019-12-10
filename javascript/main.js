"use strict";
(function() {

  window.addEventListener("load", init);

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
      if(main.scrollTop > nav.clientHeight) {
        if (previousY > main.scrollTop) {
          nav.classList.remove('slide-top');
        } else if (previousY < main.scrollTop) {
          nav.classList.add('slide-top');
        }
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

    let carousel = document.querySelector('.img-slider');
    let carosuelImgs = document.querySelectorAll('.img-slider img');

    let firstClone = document.getElementById('first-clone');
    let lastClone = document.getElementById('last-clone');

    let prevBtn = document.getElementById('prev');
    let nextBtn = document.getElementById('next');

    let counter = 1;
    let size = carousel.clientWidth;

    carousel.style.transform = 'translateX(-' + (counter * size) +'px)';

    nextBtn.addEventListener('click', ()=>{
      if (counter >= carosuelImgs.length - 1) return;
      carousel.style.transition = 'transform 0.3s ease-in-out';
      counter++;
      carousel.style.transform = 'translateX(-' + (counter * size) +'px)';
    })

    prevBtn.addEventListener('click', ()=> {
      if (counter <= 0) return;
      carousel.style.transition = 'transform 0.3s ease-in-out';
      counter--;
      carousel.style.transform = 'translateX(-' + (counter * size) +'px)';
    })

    carousel.addEventListener('transitionend', () => {
      if(carosuelImgs[counter].id === 'first-clone') {
        counter = 1;
        carousel.style.transition = 'none';
        carousel.style.transform = 'translateX(-' + (counter * size) +'px)';
      } else if (carosuelImgs[counter].id === 'last-clone') {
        counter = carosuelImgs.length - 2;
        carousel.style.transition = 'none';
        carousel.style.transform = 'translateX(-' + (counter * size) +'px)';
      }
    })
  }
})();