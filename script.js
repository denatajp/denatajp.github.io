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
        <a href="https://github.com/denatajp/localchain" class="modal-btn" target="_blank">
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
        <a href="https://github.com/denatajp/fusion" class="modal-btn" target="_blank">
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
        <a href="https://github.com/denatajp/Animal-CNN-Classifier" class="modal-btn" target="_blank">
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
    // const formResponse = document.getElementById('formResponse');
    // formResponse.textContent = 'Your message has been sent!';
    this.reset();
});

// Tambahkan error handling
// GitHub Feed Implementation
async function loadGitHubRepos() {
    const feedContainer = document.getElementById('githubFeed');

    try {
        const response = await fetch('https://api.github.com/users/denatajp/repos?sort=updated&per_page=20');

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        let repos = await response.json();

        // Filter repo yang punya deskripsi
        repos = repos.filter(repo => repo.description && repo.description.trim() !== '');

        // Batasi maksimal 6 repo
        repos = repos.slice(0, 6);

        if (repos.length === 0) {
            showError('No repositories with description found');
            return;
        }

        feedContainer.innerHTML = '';

        const grid = document.createElement('div');
        grid.className = 'feed-grid';

        repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'repo-card';
            card.innerHTML = `
              <img src="https://opengraph.githubassets.com/1/${repo.full_name}" 
                   class="repo-image" 
                   alt="${repo.name}">
              <h3>${repo.name}</h3>
              <p>${repo.description}</p>
              <div class="repo-stats">
                  <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                  <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
              </div>
              <a href="${repo.html_url}" target="_blank" class="repo-link">
                  <i class="fab fa-github"></i> View on GitHub
              </a>
          `;
            grid.appendChild(card);
        });

        feedContainer.appendChild(grid);

    } catch (error) {
        console.error('Error:', error);
        feedContainer.innerHTML = `
          <div class="matrix-error">
              ⚠️ SYSTEM ERROR: ${error.message}
              <div class="error-sub">Failed to connect to GitHub API</div>
          </div>
      `;
    }
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
    loadGitHubRepos();

    // Inisialisasi efek matrix
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});


setTimeout(() => {
    if (document.querySelector('.feed-loader')) {
        showError('Connection timeout. Check internet...');
    }
}, 10000);

// Animasi hover khusus
document.querySelectorAll('.repo-post').forEach(post => {
    post.addEventListener('mouseover', () => {
        post.style.transform = 'rotateZ(0.5deg)';
        post.querySelector('.repo-image').style.transform = 'scale(1.1)';
    });

    post.addEventListener('mouseout', () => {
        post.style.transform = 'rotateZ(0deg)';
        post.querySelector('.repo-image').style.transform = 'scale(1)';
    });
});

// running text
// Tambahkan di script.js
function initTypewriter() {
    const text = `A Computer Science student at Sanata Dharma University with a strong focus on Networking, particularly
    Delay Tolerant Networks. Passionate about exploring new programming languages and diverse work
    environments to broaden technical expertise and adaptability`;

    const element = document.getElementById('typed-text');
    let i = 0;
    const speed = 30;
    const glitchChance = 0.05; // 5% chance untuk efek glitch

    function typeWriter() {
        if (i < text.length) {
            // Tambahkan efek glitch acak
            if (Math.random() < glitchChance) {
                element.innerHTML = text.substring(0, i)
                    + `<span style="color:${Math.random() < 0.5 ? '#f0f' : '#0ff'}">${text.charAt(i)}</span>`;
            } else {
                element.innerHTML = text.substring(0, i + 1);
            }

            i++;
            setTimeout(typeWriter, speed + Math.random() * 20); // Variasi kecepatan
        } else {
            element.classList.remove('typing'); // Hentikan cursor
        }
    }

    // Mulai setelah 1 detik untuk efek dramatis
    setTimeout(typeWriter, 1000);
}

// Panggil di DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
});


/* Terminal */
// Terminal Logic
// Perbaikan clear command dan toggle terminal
// Toggle class untuk mengubah tampilan terminal saat header diklik
document.querySelector('.terminal-header').addEventListener('click', function () {
    const terminal = document.querySelector('.cyber-terminal');
    terminal.classList.toggle('expanded');
    terminal.classList.toggle('collapsed');
});

const output = document.getElementById('terminal-output');

const commands = {
    help: () => `Available commands: <br>
        - bio: Show profile <br>
        - projects: List projects <br>
        - social: Show social links <br>
        - cls: Reset terminal`,

    bio: () => window.location.hash = '#profile',
    projects: () => window.location.hash = '#projects',
    social: () => window.location.hash = '#social',
    cls: () => {
        output.innerHTML = '';
        return null;
    }
};

document.getElementById('terminal-cmd').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cmd = e.target.value.toLowerCase();
        // Menampilkan perintah yang diketik
        output.innerHTML += `> ${cmd}<br>`;

        // Jika perintah cls, eksekusi tanpa menambahkan hasil apa-apa ke output
        if (cmd === 'cls') {
            commands[cmd]?.();
        } else {
            // Eksekusi fungsi perintah dan tampilkan hasilnya,
            // fallback ke "Command not recognized" jika tidak ditemukan
            const result = commands[cmd]?.();
            output.innerHTML += (result || 'Command not recognized') + '<br>';
        }

        // Mengatur scroll terminal agar otomatis ke bagian bawah
        output.scrollTop = output.scrollHeight;
        // Mengosongkan input setelah enter ditekan
        e.target.value = '';
    }
});

// menonaktifkan copy paste
const terminalInput = document.getElementById('terminal-cmd');

// Blokir aksi copy-paste
terminalInput.addEventListener('paste', e => e.preventDefault());
terminalInput.addEventListener('copy', e => e.preventDefault());
terminalInput.addEventListener('cut', e => e.preventDefault());

// Blokir klik kanan
terminalInput.addEventListener('contextmenu', e => {
    e.preventDefault();
    return false;
});

// Blokir drag-drop
terminalInput.addEventListener('dragstart', e => e.preventDefault());
terminalInput.addEventListener('drop', e => e.preventDefault());

// Validasi input real-time
terminalInput.addEventListener('input', function (e) {
    // Jika ada karakter yang tidak diinginkan dari paste
    if (this.value.match(/[^a-zA-Z0-9\s]/g)) {
        this.value = this.value.replace(/[^a-zA-Z0-9\s]/g, '');
    }
});