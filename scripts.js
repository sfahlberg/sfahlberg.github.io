document.addEventListener('DOMContentLoaded', function () {
  const accButtons = document.querySelectorAll('.accordion-button');
  
  accButtons.forEach(button => {
    button.addEventListener('click', function () {
      this.classList.toggle('active');
      const panel = this.nextElementSibling;
      const icon = this.querySelector('.accordion-icon');

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        icon.textContent = '+';
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        icon.textContent = '−'; // minus sign
      }
    });
  });
});
