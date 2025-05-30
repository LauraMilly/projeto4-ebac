const questions = document.querySelectorAll('[data-faq-question]');

questions.forEach((question) => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector('span');

    questions.forEach((item) => {
      if (item !== question) {
        item.nextElementSibling.classList.remove('active');
        item.querySelector('span').textContent = '+';
      }
    });
    answer.classList.toggle('active');
    icon.textContent = answer.classList.contains('active') ? '-' : '+';
  });
});
