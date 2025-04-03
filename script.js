/* Matrix Rain Effect */
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array.from({length: columns}, () => 1);
function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0F0';
  ctx.font = fontSize + 'px monospace';
  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);

/* Modal Functionality */
function openModal(type) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  let content = '';
  if (type === 'project1') {
    content = '<h2>Project 1</h2><p>Detail mengenai Project 1, termasuk fitur, teknologi yang digunakan, dan hasil implementasinya.</p>';
  } else if (type === 'project2') {
    content = '<h2>Project 2</h2><p>Detail mengenai Project 2, termasuk fitur, teknologi yang digunakan, dan hasil implementasinya.</p>';
  } else if (type === 'project3') {
    content = '<h2>Project 3</h2><p>Detail mengenai Project 3, termasuk fitur, teknologi yang digunakan, dan hasil implementasinya.</p>';
  }
  modalBody.innerHTML = content;
  modal.style.display = 'block';
}
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

/* Back-to-Top Button */
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTopBtn.classList.remove('hidden');
  } else {
    backToTopBtn.classList.add('hidden');
  }
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Dummy AJAX Contact Form Submission */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const formResponse = document.getElementById('formResponse');
  formResponse.textContent = 'Pesan Anda telah terkirim. Terima kasih!';
  this.reset();
});
