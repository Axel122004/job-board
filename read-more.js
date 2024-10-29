function ReadMore() {
  const buttons = document.querySelectorAll(".read-more-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const card = button.closest(".card");
      const description = card.querySelector(".description");

      const fullText = description.getAttribute("data-full-description");
      const lowText = description.getAttribute("data-low-description");

      if (description.textContent === lowText) {
        description.textContent = fullText;
        button.textContent = "Read Less";
      } else {
        description.textContent = lowText;
        button.textContent = "Read More";
      }
    });
  });
}
