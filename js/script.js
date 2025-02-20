$(function () {
  const $window = $(window);
  const $header = $("header");
  const $visual = $(".visual, .main-visual");
  const $topBtn = $(".top-btn");
  const $menu = $(".language");
  const $submenu = $(".language-list");

  const duration = 300;

  // 헤더에 마우스 오버시 언어 메뉴 표시------------------------------------------------------------
  $menu.on("mouseenter", function () {
    $(this).addClass("on");
    $header.addClass("active");
    $submenu.stop().slideDown(duration);
  });

  $menu.on("mouseleave", function () {
    $(this).removeClass("on");
    $header.removeClass("active");
    $submenu.stop().slideUp(duration);
  });

  $window.on("wheel", function (e) {
    e.originalEvent.wheelDelta > 0
      ? $header.removeClass("hide")
      : $header.addClass("hide");
  });
  // 헤더에 마우스 오버시 언어 메뉴 표시----------------------------------------------------------------

  // 헤더, 탑버튼이 비주얼을 벗어 나갈때----------------------------------------------------------
  $window.on("scroll", function () {
    const visualBottom = $visual.offset().top + $visual.outerHeight() - 200;
    const scrollTop = $window.scrollTop();

    if (scrollTop > visualBottom) {
      $header.addClass("scrolled");
    } else {
      $header.removeClass("scrolled");
    }
  });
  // 탑 버튼 클릭 이벤트
  $topBtn.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 100, function () {
      $header.removeClass("hide"); //탑버튼 누를시 헤더가 나옴
    });
  });

  // 키보드에 홈 버튼을 눌렀을때도 헤더가 내려옴
  $(document).on("keydown", function (e) {
    if (e.key === "Home") {
      // Home 키가 눌렸을 때
      $("html, body").animate({ scrollTop: 0 }, 100, function () {
        $header.removeClass("hide"); // 헤더를 보이게 함
      });
    }
  });
  // 헤더, 탑버튼이 비주얼을 벗어 나갈때------------------------------------------------------------

  // 모바일 더보기
  const $btnmenu = $(".mobile-more-btn");
  const $mobilemenu = $(".mobile-menu");
  const $btnClose = $(".mobile-btn-close");

  $btnmenu.on("click", () => {
    $mobilemenu.addClass("active");
  });

  $btnClose.on("click", () => {
    $mobilemenu.removeClass("active");
  });
  // 모바일 더보기 end

  // safety-guide------------------------------------------------------------
  const SafetyGuide = new Swiper(".safety", {
    speed: 500,
    loop: true,
    slidesPerGroup: 1,
    slidesPerView: 1,

    navigation: {
      nextEl: ".safety-guide .button-next",
      prevEl: ".safety-guide .button-prev",
    },
  });

  // 가로 스크롤 마우스 휠 이벤트
  $(".guide-cards").on("wheel", function (e) {
    e.preventDefault();

    const delta = e.originalEvent.deltaY;
    const scrollAmount = 100; // 스크롤 속도 조절

    // deltaY 값이 양수면 오른쪽으로, 음수면 왼쪽으로 스크롤
    this.scrollLeft += delta > 0 ? scrollAmount : -scrollAmount;
  });

  // 고정 스크롤
  gsap.registerPlugin(ScrollTrigger);

  const accidentItems = gsap.utils.toArray(".accident-list  li");

  accidentItems.forEach((item) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        // markers: true,
        start: "top 50%",
        end: "top 50%",

        toggleActions: "play none reverse none",
      },

      y: 100,
      autoAlpha: 0.5,
      filter: "grayscale(1)",
      duration: 1,
      ease: "power4.out",
    });
  });

  // 가로 드래그  이벤트
  const slider = document.querySelector(".guide-cards");
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.style.cursor = "grabbing";
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.style.cursor = "grab";
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.style.cursor = "grab";
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
  });

  // 초기 커서 스타일 설정
  slider.style.cursor = "grab";
});
