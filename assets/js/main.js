const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 600);
});

gsap.ticker.lagSmoothing(0);

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("mousemove", function (event) {
    const cursorDefaultInner = document.querySelector(".cursor-inner");
    cursorDefaultInner.style.left = event.clientX + "px";
    cursorDefaultInner.style.top = event.clientY + "px";
  });
});
$(document).ready(function () {
  function animateCount($element) {
    $element.each(function () {
      var $this = $(this),
        countTo = $this.attr("data-count");
      var $percent = $this.siblings(".per");

      $percent.hide();

      setTimeout(function () {
        $({ countNum: 0 }).animate(
          {
            countNum: countTo,
          },
          {
            duration: 3000,
            easing: "linear",
            step: function () {
              $this.text(Math.floor(this.countNum));

              if (Math.floor(this.countNum) >= 1) {
                $percent.show();
              }
            },
            complete: function () {
              $this.text(this.countNum);
              $percent.show();

              if (Math.floor(this.countNum) === 100) {
                gsap.to("#preloader", {
                  x: "100%",
                  duration: 1,
                  ease: "expo.inOut",
                });
                $(".group-txt").each(function () {
                  $(this).addClass("reveal");
                });
              }
            },
          }
        );
      }, 1000);
    });
  }

  animateCount($(".counter"));
});

gsap.registerPlugin(ScrollTrigger);
gsap.to(".sc-about .top-txt span", {
  opacity: 1,
  y: 0,
  duration: 0.7,
  ease: "linear",
  scrollTrigger: {
    trigger: ".sc-about .top-txt-area",
    start: "top 70%",
    end: "top 40%",
    //markers: true,
    scrub: true,
  },
  stagger: {
    amount: 0.7,
    from: "start",
  },
});

gsap.to(".sc-intro .group-txt .txt span", {
  y: "100%",
  opacity: 0,
  duration: 0.7,
  ease: "linear",
  scrollTrigger: {
    trigger: ".sc-about",
    start: "top 80%",
    end: "top 50%",
    scrub: true,
    //markers: true, 

  }
});
gsap.utils.toArray(".project-wrapper").forEach((wrapper) => {
  if (wrapper.closest(".personal-wrapper")) return;
  gsap.set(wrapper, { opacity: 0.1 });
  gsap.to(wrapper, {
    opacity: 1,
    duration: 0.5,
    ease: "linear",
    scrollTrigger: {
      trigger: wrapper,
      start: "top center",
      end: "bottom center",
      scrub: false,
      onEnter: () => gsap.to(wrapper, { opacity: 1 }),
      onLeave: () => gsap.to(wrapper, { opacity: 0.1 }),
      onEnterBack: () => gsap.to(wrapper, { opacity: 1 }),
      onLeaveBack: () => gsap.to(wrapper, { opacity: 0.1 }),
    }
  });

  let isScrolling = false;

  wrapper.addEventListener('mouseenter', () => {
    gsap.to(wrapper, { opacity: 1 });
  });

  wrapper.addEventListener('mouseleave', () => {
    if (!isScrolling) {
      gsap.to(wrapper, { opacity: 0.1 });
    }
  });

  ScrollTrigger.create({
    trigger: wrapper,
    start: "top 50%",
    end: "bottom 50%",
    onEnter: () => isScrolling = true,
    onLeave: () => isScrolling = false,
    onEnterBack: () => isScrolling = true,
    onLeaveBack: () => isScrolling = false
  });
});

gsap.from(".personal-wrapper", {
  opacity: 0,
  y: 30,
  duration: 0.6,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".personal-wrapper",
    start: "top 85%",
    toggleActions: "play reverse play reverse"
  }
});
gsap.registerPlugin(ScrollTrigger);


gsap.to("#footer .name", {
  scrollTrigger: {
    trigger: "#footer",
    start: "top 80%",
    end: "bottom top",
    toggleClass: { targets: "#footer .name", className: "reveal" },
    //markers: true  
  }
});
