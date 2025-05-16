document.querySelectorAll('.toggle-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const fullText = this.previousElementSibling;
    const isVisible = fullText.style.display === 'block';
    fullText.style.display = isVisible ? 'none' : 'block';
    this.textContent = isVisible ? this.textContent.replace('–', '+ Read more –') : this.textContent.replace('+ Read more –', '– Show less –');
  });
});
