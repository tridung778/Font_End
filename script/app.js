// Header
window.addEventListener("scroll", function () {
  var headerTop = document.querySelector(".header-top");
  var headerBot = document.querySelector(".header-bottom");
  var header = document.querySelector(".header");
  if (this.window.scrollY > 450) {
    header.classList.remove("fixed-top");
    headerTop.classList.remove("fixed-top");
    headerBot.classList.add("fixed-top");
  } else if (this.window.scrollY < 450) {
    headerBot.classList.remove("fixed-top");
    header.classList.add("fixed-top");
  }
});

// Thong bao
const audio = document.querySelector("audio");
$(document).ready(function () {
  $("#modal-thong-bao").modal("show");

  $("#modal-thong-bao").on("click", ".btn-dong-y", function () {
    $("#modal-thong-bao").modal("hide");
    audio.play();
  });
});

// Card carousel

var multipleCardCarousel = document.querySelector("#carouselExampleControls");

if (window.matchMedia("(min-width: 576px)").matches) {
  var carousel = new bootstrap.Carousel(multipleCardCarousel, {
    interval: false,
  });
  var carouselWidth = $(".Carousel-Inner")[0].scrollWidth;
  var cardWidth = $(".Carousel-Item").width();
  var scrollPosition = 0;
  $("#carouselExampleControls .carousel-control-next").on("click", function () {
    if (scrollPosition < carouselWidth - cardWidth * 3) {
      scrollPosition += cardWidth;
      $("#carouselExampleControls .Carousel-Inner").animate(
        { scrollLeft: scrollPosition },
        600
      );
    }
  });
  $("#carouselExampleControls .carousel-control-prev").on("click", function () {
    if (scrollPosition > 0) {
      scrollPosition -= cardWidth;
      $("#carouselExampleControls .Carousel-Inner").animate(
        { scrollLeft: scrollPosition },
        600
      );
    }
  });
} else {
  $(multipleCardCarousel).addClass("slide");
}
