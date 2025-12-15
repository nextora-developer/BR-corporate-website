(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $(".navbar").addClass("position-fixed bg-dark shadow-sm");
    } else {
      $(".navbar").removeClass("position-fixed bg-dark shadow-sm");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn(100);
    } else {
      $(".back-to-top").fadeOut(100);
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 300);
    return false;
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    loop: true,
    nav: false,
    dots: true,
    items: 1,
    dotsData: true,
  });
})(jQuery);

$(".portfolio-carousel").owlCarousel({
  autoplay: true,
  smartSpeed: 900,
  margin: 25,
  dots: true,
  loop: true,
  center: true,
  responsive: {
    0: { items: 1 },
    576: { items: 1 },
    768: { items: 2 },
    992: { items: 3 },
  },
});

//Navbar and Footer
async function loadPartials() {
  const navbar = await fetch("/partials/navbar.html").then((r) => r.text());
  const footer = await fetch("/partials/footer.html").then((r) => r.text());

  const navEl = document.getElementById("site-navbar");
  const footerEl = document.getElementById("site-footer");

  if (navEl) navEl.innerHTML = navbar;
  if (footerEl) footerEl.innerHTML = footer;

  setActiveNav();
}
document.addEventListener("DOMContentLoaded", loadPartials);

//Active navbar
function setActiveNav() {
  const path = location.pathname.toLowerCase();
  const currentPage = path.split("/").pop();

  // 1️⃣ 清掉所有 active（避免残留）
  document.querySelectorAll(".navbar .active").forEach((el) => {
    el.classList.remove("active");
  });

  // 2️⃣ 精确匹配当前页（普通 nav-link / dropdown-item）
  document.querySelectorAll(".navbar a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const hrefFile = href.toLowerCase().split("/").pop();

    if (hrefFile === currentPage) {
      link.classList.add("active");

      // 如果是 dropdown-item，让父级 toggle 也 active
      const parentDropdown = link.closest(".dropdown");
      if (parentDropdown) {
        const toggle = parentDropdown.querySelector(
          ".nav-link.dropdown-toggle"
        );
        if (toggle) toggle.classList.add("active");
      }
    }
  });

  // 3️⃣ Services：只要是「Services 子页」就高亮父级
  const isServicesChild =
    currentPage.startsWith("service-") || // service-xxx.html
    path.includes("/services/"); // /services/xxx/xxx.html

  if (isServicesChild) {
    const servicesToggle = document.querySelector(
      '.navbar .nav-item.dropdown[data-parent="services"] > .nav-link'
    );
    if (servicesToggle) servicesToggle.classList.add("active");
  }
}
