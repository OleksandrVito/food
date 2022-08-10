function slider({
  container,
  slide,
  nextArrow,
  prewArrow,
  totalCount,
  currentCount,
  wrapper,
  field,
}) {
  const slides = document.querySelectorAll(slide);
  const slider = document.querySelector(container);
  const prevBtn = document.querySelector(prewArrow);
  const nextBtn = document.querySelector(nextArrow);
  const total = document.querySelector(totalCount);
  const current = document.querySelector(currentCount);
  const slidesWrapper = document.querySelector(wrapper);
  const slideField = document.querySelector(field);
  const width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slideField.style.width = 100 * slides.length + "%";
  slideField.style.display = "flex";
  slideField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";
  slidesWrapper.style.width = width;

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ul");
  const dots = [];

  // indicators.style.cssText = `list-style: none;`;
  indicators.classList.add("carousel-indicators");

  slider.append(indicators);
  console.log(indicators);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
      `;
    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  nextBtn.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slideField.style.transform = `translateX(-${offset}px) `;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = "0.5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  prevBtn.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    slideField.style.transform = `translateX(-${offset}px) `;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
    dots.forEach((dot) => (dot.style.opacity = "0.5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      slideField.style.transform = `translateX(-${offset}px) `;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach((dot) => (dot.style.opacity = "0.5"));
      dots[slideIndex - 1].style.opacity = 1;
    });
  });
}

export default slider;
