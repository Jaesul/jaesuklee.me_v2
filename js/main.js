"use strict";
(function() {

  window.addEventListener("load", init);

  let NAV_TIMEOUT;
  let NAV_TIMEOUT2;

  function init() { 
    setTimeout(function() {
      qs('.splash-content').classList.toggle('no-opacity');
    }, 1000);
    showMainPage();
  }

  function setupTechnologyItems() {
    let technologyItems = qsa('.technology-item');
    technologyItems.forEach(element => {
      element.addEventListener('click', function() {
        fixMain()
        id(this.dataset.target).classList.remove('slide-top');
        setTimeout(() => {
          let children = Array.from(id(this.dataset.target).children);
          children.forEach(element => {
            element.classList.remove('no-opacity');
            if (element.tagName === 'BUTTON') {
              element.classList.add('tech-btn-hover');
            }
          });
        }, 600);
      })
    });
  }

  function setupTechCardBtns() {
    let btns = qsa('.tech-close-btn');
    btns.forEach(element => {
      element.addEventListener('click', function() {
        let children = Array.from(this.parentNode.children);
        unFixMain();
        children.forEach(element => {
          element.classList.add('no-opacity');
          if (element.tagName === 'BUTTON') {
            element.classList.remove('tech-btn-hover');
          }
        });
        setTimeout(() => {
          this.parentNode.classList.add('slide-top');
        }, 400);
      });
    });
  }

  function showMainPage() {
    qs('.splash-content').classList.add('no-opacity');
    qs('.portfolio-btn').addEventListener('click', transitionToMain);
    setupObservers();
    setupNav();
    setupLazyLoader();
    setupTechnologyItems(); 
    setupTechCardBtns();
    setupProjectButtons()
    navStayDown();
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

    let projCards = qsa('.card');
    projCards.forEach(element => {
      scrollObs.observe(element);
    })

    let expCards = qsa('.experience-card');
    expCards.forEach(element => {
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

  function hideNav() {
    let nav = qs('nav');
    NAV_TIMEOUT = setTimeout(() => {
      nav.classList.add('slide-top');
    }, 800);
  }

  function clearNav() {
    clearTimeout(NAV_TIMEOUT);
    clearInterval(NAV_TIMEOUT2);
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
            nav.removeEventListener('mouseleave', hideNav);
          } else {
            nav.classList.add('nav-scrolled');
            qs('.logo').src = 'imgs/icons/logo-icon-white.svg';
            nav.addEventListener('mouseenter', clearNav);
            nav.addEventListener('mouseleave', hideNav);
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
            entry.target.classList.remove('top-20', 'no-opacity', 'right-20', 'left-20');
            if (entry.target.classList.contains('project-item')) {
              setTimeout(() => {
                let overlay = entry.target.querySelector('.overlay');
                if(overlay) {
                  overlay.classList.add('overlay-transition');
                }
              }, 700);
            }
          }
        });
      }, options
    )
    return observer;
  }

  function setupLazyLoader() {
    let imgs = qsa("[data-src]");
    let lazyObs = lazyLoaderObs();
    imgs.forEach(element => {
      let src = element.dataset.src;
      lazyObs.observe(element);
    });
  }

  function preloadImg(img) {
    const src = img.dataset.src;

    if(!src) {
      return
    }

    img.src = src;
  }

  function lazyLoaderObs() {
    let options = {
      rootMargin: '0px 0px 0px 0px',
    }

    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            return;
          } else {
            preloadImg(entry.target);
          }
        });
      }, options
    );
    return observer;
  }

  function navStayDown() {
    let containers = qsa('technology-item');
    let nav = qs('nav');
    containers.forEach(element => {
      element.addEventListener('click', function() {
        nav.classList.remove('nav-scrolled');
      });
    });
  }

  function setupNav() {
    let nav = qs('nav');

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
  
  function setupProjectButtons() {
    let projectBtns = qsa('.project-button');
    projectBtns.forEach(button => {
      button.addEventListener('click', function() {
        console.log(this.dataset.target);
        id(this.dataset.target).classList.add('slide-left');
        fixMain();
      })
    });

    let projectExtBtns = qsa('.project-exit');
    projectExtBtns.forEach(button => {
      button.addEventListener('click', function() {
        console.log(this.dataset.target);
        id(this.dataset.target).classList.remove('slide-left');
        unFixMain();
      })
    });
  }

  function fixMain() {
    setTimeout(() => {
      qs('main').classList.add('main-shift-padding');
    }, 800);
    let nav = qs('nav');
    nav.classList.add('slide-top');
  }

  function unFixMain() {
    qs('main').classList.remove('main-shift-padding');
  }

  function toggleNavState(previousY) {
    let main = qs('main');
    let nav = qs('nav');
    if (main.scrollTop > nav.clientHeight * 2) {
      if (previousY > main.scrollTop) {
        nav.classList.remove('slide-top');
        clearInterval(NAV_TIMEOUT2);
        clearInterval(NAV_TIMEOUT);
        if(!checkHoveringNav()) {
          NAV_TIMEOUT = setTimeout(() => {
            nav.classList.add('slide-top');
          }, 1500);
        }
      } else if (previousY < main.scrollTop) {
        if(!nav.classList.contains('slide-top')) {
          if (!checkHoveringNav()) {
            NAV_TIMEOUT2 = setTimeout(() => {
              nav.classList.add('slide-top');
            }, 1000);
          }
        }
      }
    } else if (NAV_TIMEOUT) {
      clearTimeout(NAV_TIMEOUT);
      clearInterval(NAV_TIMEOUT2);
    } else { 
      nav.classList.remove('slide-top');
    }
  }

  function checkHoveringNav() {
    let nav = qs('nav');
    return nav.parentElement.querySelector(':hover') === nav;
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