/* Matrix Rain Effect */
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }, () => 1);
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
        content = `
        <h2 class="modal-title">Blockchain on DTN</h2>
        <img class="modal-image" src="/img/dtn.png" alt="Project 1 Image">
        <p class="modal-description">
          Implementation of blockchain transaction mechanism in Delay-Tolerant Network (DTN) with simulation of miner node, proxy operator, home, collector, and internet. The system is designed to handle transactions, block mining, consensus verification, and integration into the main blockchain in an environment with intermittent connections.
        </p>
        <a href="https://github.com/2denata/localchain" class="modal-btn" target="_blank">
          <i class="fab fa-github"></i> Find on Github
        </a>
      `;
    } else if (type === 'project2') {
        content = `
        <h2 class="modal-title">Fusion</h2>
        <img class="modal-image" src="/img/fusion.png" alt="Project 2 Image">
        <p class="modal-description">
          Fusion is an information system website designed for music studio management, featuring studio reservation, schedule management, instrument booking, and customer data management.
        </p>
        <a href="https://github.com/2denata/fusion" class="modal-btn" target="_blank">
          <i class="fab fa-github"></i> Find on Github
        </a>
      `;
    } else if (type === 'project3') {
        content = `
        <h2 class="modal-title">CNN Classifier</h2>
        <img class="modal-image" src="/img/cnn.png" alt="Project 3 Image">
        <p class="modal-description">
          This project implements a Convolutional Neural Network (CNN) to classify images of cats, dogs, and tigers using TensorFlow and Keras, with image augmentation techniques to enhance performance.
        </p>
        <a href="https://github.com/2denata/Animal-CNN-Classifier" class="modal-btn" target="_blank">
          <i class="fab fa-github"></i> Find on Github
        </a>
      `;
    }

    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

/* Feed Tabs Functionality */
const feedTabs = document.querySelectorAll('.feed-tab');
feedTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.feed-tab').forEach(btn => btn.classList.remove('active'));
        tab.classList.add('active');
        const feedType = tab.getAttribute('data-feed');
        document.querySelectorAll('.feed-content').forEach(feed => {
            feed.classList.remove('active');
            if (feed.id === feedType + "Feed") {
                feed.classList.add('active');
            }
        });
    });
});

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
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formResponse = document.getElementById('formResponse');
    formResponse.textContent = 'Your message has been sent!';
    this.reset();
});
