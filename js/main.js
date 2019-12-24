"use strict";
(function() {

  window.addEventListener("load", init);

  let NAV_TIMEOUT;

  function init() { 
    setTimeout(function() {
      qs('.splash-content').classList.toggle('no-opacity');
    }, 1000);
    
    showMainPage();

    let technologyItem = document.querySelectorAll('.technology-item');
    technologyItem.forEach(thing => {
      thing.addEventListener('click', () => {
        document.getElementById('javascript').classList.remove('slide-top');
      })
    });
  }

  function showMainPage() {
    qs('.splash-content').classList.add('no-opacity');
    qs('.portfolio-btn').addEventListener('click', transitionToMain);
    setupObservers();
    setupNav();
  }

  function transitionToMain() {
    setTimeout(function() {
      qs('.splash-content').classList.add('no-opacity');
      qs('main').classList.add('set-right');
      setTimeout(function() {
        qs('nav').classList.remove('no-opacity');
        qs('.am-content-container').classList.remove('no-opacity','right-20');
        qs('.am-picture-container').classList.remove('no-opacity','left-20');
      }, 1000)
    }, 300);
  }

  function setupObservers() {
    let navObs = navObserver();
    navObs.observe(qs('.main-content'));

    let childObs = showChildrenObs();
    let techContainers = qsa('.technology-container');
    techContainers.forEach(element => {
      childObs.observe(element);
    });

    let scrollObs = scrlCntObs();
    let titles = qsa('.title');
    titles.forEach(element => {
      scrollObs.observe(element);
    });

    scrollObs.observe(qs('.content-container'))

    let projects = qsa('.project-item');
    projects.forEach(element => {
      scrollObs.observe(element);
    });

    let experienceCards = qsa('.experience-card');
    experienceCards.forEach(element => {
      scrollObs.observe(element);
    })
  }

  function showChildrenObs() {
    let options = {
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.4
    }

    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let children = entry.target.children;
            for (var i = 0; i < children.length; i++) {
              technologyItemTimeout(children[i], i);
            }
          } 
        });
      }, options 
    );

    return observer;
  }

  function navObserver() {
    let options = {
      root: null,
      rootMargin: "0px 0px -100% 0px",
      threshold: 0
    }

    let observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(entry => {
          let nav = qs('nav');
          if (!entry.isIntersecting) {
            nav.classList.remove('nav-scrolled');
            qs('.logo').src = 'imgs/icons/logo-icon.svg';
          } else {
            nav.classList.add('nav-scrolled');
            qs('.logo').src = 'imgs/icons/logo-icon-white.svg';
            nav.addEventListener('mouseenter', () => {
              clearTimeout(NAV_TIMEOUT);
            });
            nav.addEventListener('mouseleave', () => {
              NAV_TIMEOUT = setTimeout(() => {
                nav.classList.add('slide-top');
              }, 1500);
            });
          } 
        });
      }, options
    );

    return observer
  }

  function technologyItemTimeout(item, time) {
    setTimeout(function() {
      item.classList.remove('top-20', 'no-opacity', 'right-20');
      setTimeout(() => {
        item.classList.add('opacity-hover');
      }, 500);
    }, 120 * time);
  }

  function scrlCntObs() {
    let options = {
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.4
    }

    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            entry.target.classList.remove('top-20', 'no-opacity', 'right-20');
          }
        });
      }, options
    )

    return observer;
  }

  function setupNav() {
    let previousY = 0;

    let main = qs('main');
    setInterval(() => {
      if (main.scrollTop != previousY) {
        window.requestAnimationFrame(() => {
          toggleNavState(previousY);
        });
        previousY = main.scrollTop;
      }
    }, 10);
  }

  function toggleNavState(previousY) {
    let main = qs('main');
    let nav = qs('nav');
    if (main.scrollTop > nav.clientHeight * 3) {
      if (previousY > main.scrollTop) {
        nav.classList.remove('slide-top');
        clearInterval(NAV_TIMEOUT);
        NAV_TIMEOUT = setTimeout(() => {
          nav.classList.add('slide-top');
        }, 1500);
      } else if (previousY < main.scrollTop) {
        nav.classList.add('slide-top');
      }
    } else if (NAV_TIMEOUT) {
      clearTimeout(NAV_TIMEOUT);
    } else { 
      nav.classList.remove('slide-top')
    }
  }

  function qsa(elementName) {
    return document.querySelectorAll(elementName);
  }

  function qs(elementName) {
    return document.querySelector(elementName);
  }

  function id(idName) {
    return document.getElementById(idName);
  }
})();