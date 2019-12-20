"use strict";
(function() {

  window.addEventListener("load", init);

  let NAV_TIMEOUT;

  function init() { 
    let splashCont = document.querySelector('.splash-content');
    let mainContent = document.querySelector('.main-content');
    let main = document.querySelector('main');
    let logo = document.querySelector('.logo'); 
    let amContent = document.querySelector('.am-content-container');
    let amPicture = document.querySelector('.am-picture-container');
    let technologyContainers = document.querySelectorAll('.technology-container');
    let technologies = document.querySelector('#technologies');
    let technologiesH2 = technologies.querySelector('h2');
    let technologyItem = document.querySelectorAll('.technology-item');


    technologyItem.forEach(thing => {
      thing.addEventListener('click', () => {
        document.getElementById('javascript').classList.remove('slide-top');
      })
    });

    let options = {
      root: null,
      rootMargin: "0px 0px -100% 0px",
      threshold: 0
    }

    let options2 = {
      rootMargin: '0px 0px -17% 0px'
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

    let technologyItemTimeout = (item, time) => {
      setTimeout(function() {
        item.classList.remove('top-20', 'no-opacity');
      }, 200 * time);
    };

    let technologyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let children = entry.target.children;
            for (var i = 0; i < children.length; i++) {
              technologyItemTimeout(children[i], i);
            }
          } 
        });
      }, options2 
    )

    let titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            entry.target.classList.remove('top-20', 'no-opacity');
          }
        });
      }, options2
    )
    
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
          amContent.classList.remove('no-opacity','right-20');
          amPicture.classList.remove('no-opacity','left-20');
        }, 1000)
      }, 300);
      observer.observe(mainContent);
      technologyContainers.forEach(container => {       
        technologyObserver.observe(container)
      });
      titleObserver.observe(technologiesH2);
    });
  }
})();