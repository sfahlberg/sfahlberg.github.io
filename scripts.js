document.addEventListener('DOMContentLoaded', function () {
  const accButtons = document.querySelectorAll('.accordion-button');
  
  accButtons.forEach(button => {
    button.addEventListener('click', function () {
      this.classList.toggle('active');
      const panel = this.nextElementSibling;

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
});
