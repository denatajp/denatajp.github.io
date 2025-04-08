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

// const commands = {
//     help: () => `Available commands: <br>
//         - bio: Show profile <br>
//         - projects: List projects <br>
//         - social: Show social links <br>
//         - cls: Reset terminal`,

//     bio: () => window.location.hash = '#profile',
//     projects: () => window.location.hash = '#projects',
//     social: () => window.location.hash = '#social',
//     cls: () => {
//         output.innerHTML = '';
//         return null;
//     },
//     system: (arg) => {
//         const subCommands = {
//             // status: () => `
//             //         🖥️ SYSTEM STATUS: <br>
//             //         RAM Usage    ${progressBar(60, 20)} 60% <br>
//             //         CPU Load     ${progressBar(45, 20)} 45% <br>
//             //         NET Speed    ↑${randSpeed()} ↓${randSpeed()} <br>
//             //         Security     ${randSecurityStatus()} <br>
//             //         Temperature  ${randTemp()}
//             //                     `,
//             status: () => {
//                 // Animasi nilai yang berubah
//                 let refreshCount = 0;
//                 const maxRefresh = 10;
//                 const interval = setInterval(() => {
//                     refreshCount++;
//                     if (refreshCount >= maxRefresh) clearInterval(interval);

//                     output.scrollTop = output.scrollHeight;
//                 }, 500);

//                 return `🖥️ LIVE SYSTEM MONITOR (Ctrl+C to stop)
//                     RAM Usage    ${progressBar(15 + Math.random() * 70, 20)} ${(15 + Math.random() * 70).toFixed(1)}%
//                     CPU Load     ${progressBar(20 + Math.random() * 60, 20)} ${(20 + Math.random() * 60).toFixed(1)}%
//                     NET Speed    ↑${(Math.random() * 5).toFixed(1)}Gbps ↓${(Math.random() * 3).toFixed(1)}Gbps
//                     Security     ${['🔒 Secure', '⚠️ Warning', '🔓 Vulnerable'][Math.floor(Math.random() * 3)]}
//                     Temperature  ${(30 + Math.random() * 20).toFixed(1)}°C`;
//             },
//             // scan: () => `
//             //         🔍 Scanning network...<br>
//             //         [████████░░░░] 70%<br>
//             //         Found 3 active nodes:<br>
//             //         - Router (192.168.1.1)<br>
//             //         - NAS (192.168.1.2)<br>
//             //         - IoT Device (192.168.1.105)
//             // `,
//             scan: () => {
//                 let progress = 0;
//                 const scanInterval = setInterval(() => {
//                     progress += 10;
//                     const progressBar = `[${'█'.repeat(progress/10)}${'░'.repeat(10 - progress/10)}] ${progress}%`;

//                     output.innerHTML = output.innerHTML.replace(/\[.*\] \d+%/, progressBar);

//                     if (progress >= 100) {
//                         clearInterval(scanInterval);
//                         output.innerHTML += `<br>✅ Scan complete!<br>`;
//                     }
//                 }, 300);

//                 return `🔍 Scanning network...<br>[░░░░░░░░░░] 0%`;
//             },
//             // reboot: () => {
//             //     setTimeout(() => {
//             //         output.innerHTML += '💥 SYSTEM CRASHED! Just kidding.\n <br>';  
//             //      }, 1000);
//             //     return 'Initiating fake reboot sequence...';
//             // }
//             reboot: () => {
//                 const phases = [
//                     "Initiating reboot sequence...",
//                     "Unmounting filesystems ███░░ 60%",
//                     "Stopping services ██████░ 80%",
//                     "💥 KERNEL PANIC! Just kidding",
//                     "Booting cybernetic core...",
//                     "System ready in 3... 2... 1..."
//                 ];

//                 phases.forEach((phase, i) => {
//                     setTimeout(() => {
//                         output.innerHTML = output.innerHTML.replace(/.*reboot.*/, `> system reboot<br>${phase}`);
//                         output.scrollTop = output.scrollHeight;
//                     }, i * 800);
//                 });

//                 return "Starting reboot...";
//             }
//         };

//         return subCommands[arg] ? subCommands[arg]() : `Invalid sub-command. Try: status, scan, reboot`;
//     }
// };

// script.js
let activeIntervals = [];
let activeTimeouts = [];

// Fungsi untuk membersihkan animasi
function clearAllAnimations() {
    activeIntervals.forEach(clearInterval);
    activeTimeouts.forEach(clearTimeout);
    activeIntervals = [];
    activeTimeouts = [];
}

// const commands = {
//   help: () => `Available commands:<br>
//     - system status: Live system monitor<br>
//     - system scan: Network scanner<br>
//     - system reboot: Initiate reboot sequence<br>
//     - cls: Clear terminal`,

//   system: (arg) => {
//     clearAllAnimations();

//     const subCommands = {
//       status: () => {
//         let refreshCount = 0;
//         const updateStatus = () => {
//           const status = `🖥️ LIVE SYSTEM MONITOR<br>
//             RAM:  ${progressBar(40 + Math.sin(Date.now()/1000)*30, 20)} ${(40 + Math.sin(Date.now()/1000)*30).toFixed(1)}%<br>
//             CPU:  ${progressBar(50 + Math.cos(Date.now()/800)*30, 20)} ${(50 + Math.cos(Date.now()/800)*30).toFixed(1)}%<br>
//             NET:  ↑${(2 + Math.random()*3).toFixed(1)}Gbps ↓${(1 + Math.random()*2).toFixed(1)}Gbps<br>
//             TEMP: ${(30 + Math.random()*20).toFixed(1)}°C`;

//           output.innerHTML = output.innerHTML.replace(/🖥️ LIVE SYSTEM MONITOR(.|\n)*?°C/, status);
//           output.scrollTop = output.scrollHeight;

//           if (refreshCount++ > 30) clearInterval(interval);
//         };

//         const interval = setInterval(updateStatus, 300);
//         activeIntervals.push(interval);
//         return updateStatus();
//       },

//       scan: () => {
//         let progress = 0;
//         const scanInterval = setInterval(() => {
//           progress += 2;
//           const bar = `[${'█'.repeat(progress/5)}${'░'.repeat(20 - progress/5)}] ${progress}%`;
//           output.innerHTML = output.innerHTML.replace(/\[.*\] \d+%/, bar);

//           if (progress >= 100) {
//             clearInterval(scanInterval);
//             output.innerHTML += '<br>✅ Scan completed!';
//           }
//         }, 100);

//         activeIntervals.push(scanInterval);
//         return '🔍 Initializing network scan...<br>[░░░░░░░░░░░░░░░░░░░░] 0%';
//       },

//       reboot: () => {
//         const phases = [
//           "Initializing reboot sequence...",
//           "Saving system state █░░░░░░░░░ 10%",
//           "Stopping services ████░░░░░░ 40%",
//           "Unmounting partitions ██████░░ 60%",
//           "💻 Booting cybernetic core...",
//           "System ready in 3... 2... 1..."
//         ];

//         phases.forEach((phase, i) => {
//           const timeout = setTimeout(() => {
//             output.innerHTML = output.innerHTML.replace(/reboot(.|\n)*?1\.\.\./, phase);
//             output.scrollTop = output.scrollHeight;
//           }, i * 1000);
//           activeTimeouts.push(timeout);
//         });

//         return "🚀 Starting secure reboot...";
//       }
//     };

//     return subCommands[arg]?.() || 'Invalid system command';
//   },

//   cls: () => {
//     clearAllAnimations();
//     output.innerHTML = '';
//   }
// };

// // Event listener untuk input terminal
// document.getElementById('terminal-cmd').addEventListener('keypress', (e) => {
//   if (e.key === 'Enter') {
//     const [baseCmd, ...args] = e.target.value.trim().split(' ');
//     const command = baseCmd.toLowerCase();

//     output.innerHTML += `> ${e.target.value}<br>`;
//     e.target.value = '';

//     if (command === 'system' && args.length > 0) {
//       output.innerHTML += commands.system(args[0]) + '<br>';
//     } else if (commands[command]) {
//       output.innerHTML += commands[command](...args) + '<br>';
//     } else {
//       output.innerHTML += 'Command not recognized<br>';
//     }

//     output.scrollTop = output.scrollHeight;
//   }
// });

// // Generate progress bar
// function progressBar(percent, length) {
//     const filled = '█'.repeat(Math.round(percent / 100 * length));
//     const empty = '░'.repeat(length - filled.length);
//     return filled + empty;}

// function randSpeed() {
//     return (Math.random() * 10).toFixed(1) + 'Gbps';}

// function randSecurityStatus() {
//     const status = ['🔒 Secure', '⚠️ Warning', '🔓 Vulnerable'];
//     return status[Math.floor(Math.random() * status.length)];}

// function randTemp() {
//     return (30 + Math.random() * 20).toFixed(1) + '°C';}

// document.getElementById('terminal-cmd').addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') {
//         const input = e.target.value.trim();
//         const parts = input.split(' ');
//         const cmd = parts[0].toLowerCase();
//         const arg = parts[1] ? parts[1].toLowerCase() : null;

//         output.innerHTML += `> ${input}<br>`;

//         if (cmd === 'cls') {
//             commands[cmd]?.();
//         } else {
//             // Handle commands with arguments
//             let result;
//             if (arg && typeof commands[cmd] === 'function') {
//                 result = commands[cmd](arg); // Pass argument to command
//             } else {
//                 result = commands[cmd]?.(); // Execute without argument
//             }
//             output.innerHTML += (result || 'Command not recognized') + '<br>';
//         }

//         output.scrollTop = output.scrollHeight;
//         e.target.value = '';
//     }
// });
// Perbaikan commands object
const commands = {
    help: () => `Available commands:<br>
      - system status: Live system monitor<br>
      - system scan: Network scanner<br>
      - system reboot: Initiate reboot sequence<br>
      - cls: Clear terminal`,

    system: (arg) => {
        clearAllAnimations();

        const subCommands = {
            status: () => {
                let refreshCount = 0;
                const statusLine = output.innerHTML + "<br>🖥️ LIVE SYSTEM MONITOR <br>"; // Tambah baris baru
                output.innerHTML = statusLine;

                const interval = setInterval(() => {
                    const status = `
              RAM:  ${progressBar(40 + Math.sin(Date.now() / 1000) * 30, 20)} ${(40 + Math.sin(Date.now() / 1000) * 30).toFixed(1)}%<br>
              CPU:  ${progressBar(50 + Math.cos(Date.now() / 800) * 30, 20)} ${(50 + Math.cos(Date.now() / 800) * 30).toFixed(1)}%<br>
              NET:  ↑${(2 + Math.random() * 3).toFixed(1)}Gbps ↓${(1 + Math.random() * 2).toFixed(1)}Gbps<br>
              TEMP: ${(30 + Math.random() * 20).toFixed(1)}°C <br>`;

                    // Update hanya bagian status
                    output.innerHTML = statusLine + status;
                    output.scrollTop = output.scrollHeight;

                    if (refreshCount++ > 30) clearInterval(interval);
                }, 300);

                activeIntervals.push(interval);
                return ""; // Tidak return apa-apa
            },

            scan: () => {
                // ... (kode existing tetap sama)
                let progress = 0;
                const scanInterval = setInterval(() => {
                    progress += 2;
                    const bar = `[${'█'.repeat(progress / 5)}${'░'.repeat(20 - progress / 5)}] ${progress}%`;
                    output.innerHTML = output.innerHTML.replace(/\[.*\] \d+%/, bar);

                    if (progress >= 100) {
                        clearInterval(scanInterval);
                        output.innerHTML += '✅ Scan completed!<br>';
                    }
                }, 100);

                activeIntervals.push(scanInterval);
                return '🔍 Initializing network scan...<br>[░░░░░░░░░░░░░░░░░░░░] 0%';

            },

            // reboot: () => {
            //     const phases = [
            //         { text: "🚀 Starting secure reboot...", delay: 0 },
            //         { text: "Saving system state", progress: 10, delay: 1000 },
            //         { text: "Stopping services", progress: 40, delay: 2000 },
            //         { text: "Unmounting partitions", progress: 60, delay: 3000 },
            //         { text: "Booting cybernetic core", progress: 80, delay: 4000 },
            //         { text: "System ready in", delay: 5000 },
            //         { text: "3...", delay: 6000 },
            //         { text: "2...", delay: 7000 },
            //         { text: "1...", delay: 8000 },
            //         { text: "✅ SYSTEM READY", delay: 9000 }
            //     ];

            //     // Tampilkan pesan awal
            //     // output.innerHTML += "> system reboot<br>";
            //     output.innerHTML += "Initiating reboot sequence...<br>";

            //     phases.forEach(phase => {
            //         const timeout = setTimeout(() => {
            //             if (phase.progress !== undefined) {
            //                 const bar = progressBar(phase.progress, 20);
            //                 output.innerHTML += `${bar} ${phase.text} (${phase.progress}%)<br>`;
            //             } else {
            //                 output.innerHTML += `${phase.text}<br>`;
            //             }
            //             output.scrollTop = output.scrollHeight;
            //         }, phase.delay);
            //         activeTimeouts.push(timeout);
            //     });

            //     return ""; // Return kosong karena output sudah dihandle di phases
            // }

            reboot: () => {
                const phases = [
                    { text: "Saving system state", progress: 25, delay: 1000 },
                    { text: "Stopping services", progress: 50, delay: 2000 },
                    { text: "Unmounting partitions", progress: 75, delay: 3000 },
                    { text: "Booting cybernetic core", progress: 100, delay: 4000 },
                    // { text: "System ready in", delay: 5000 },
                    // { text: "3...", delay: 6000 },
                    // { text: "2...", delay: 7000 },
                    // { text: "1...", delay: 8000 },
                    // { text: "✅ SYSTEM READY", delay: 9000 }
                ];

                // Tampilkan perintah reboot di terminal
                // output.innerHTML += "> system reboot<br>";
                output.innerHTML += "Initiating reboot sequence...<br>";

                setTimeout(() => {
                    output.innerHTML += "🚀 Starting secure reboot...<br>";
                    // Buat elemen placeholder untuk line progres reboot
                    const progressLine = document.createElement('div');
                    progressLine.id = "progressLine";
                    // Tambahkan elemen placeholder ke dalam output
                    output.appendChild(progressLine);

                    // Update placeholder tersebut untuk tiap fase dengan setTimeout agar setiap perubahan menimpa tampilan sebelumnya
                    phases.forEach(phase => {
                        setTimeout(() => {
                            if (phase.progress !== undefined) {
                                // Format progress bar, text status dan persen
                                progressLine.innerHTML = `${progressBar(phase.progress, 20)} ${phase.text} (${phase.progress}%)`;
                            } else {
                                progressLine.innerHTML = phase.text;
                            }
                            // Pastikan scroll terminal selalu mengikuti pembaruan terbaru
                            output.scrollTop = output.scrollHeight;
                        }, phase.delay);
                    });
                }, 900);

                setTimeout(() => {}, 1000); // Delay untuk menunggu sebelum menampilkan pesan "System ready in..."
                setTimeout(() => {
                    output.innerHTML += "System ready in<br>";
                }, 5000);
                setTimeout(() => {
                    output.innerHTML += "3...<br>";
                }, 6000);   
                setTimeout(() => {
                    output.innerHTML += "2...<br>";
                }, 7000);
                setTimeout(() => {
                    output.innerHTML += "1...<br>";
                }, 8000);
                setTimeout(() => {
                    output.innerHTML += "✅ SYSTEM READY<br>";
                }, 9000);
                return "";
            }

        };

        if (!arg || !subCommands[arg]) {
            return 'Invalid system command. Try: status, scan, reboot';
        }
        return subCommands[arg]();
    },

    cls: () => {
        clearAllAnimations();
        output.innerHTML = '';
        return ""; // Return string kosong
    }
};

// Perbaikan event listener
document.getElementById('terminal-cmd').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const [baseCmd, ...args] = e.target.value.trim().split(' ');
        const command = baseCmd.toLowerCase();

        output.innerHTML += `> ${e.target.value}<br>`;
        e.target.value = '';

        let result;
        if (command === 'system' && args.length > 0) {
            result = commands.system(args[0]);
        } else if (commands[command]) {
            result = commands[command](...args);
        } else {
            result = 'Command not recognized';
        }

        if (result) output.innerHTML += result + '<br>';
        output.scrollTop = output.scrollHeight;
    }
});


// Fungsi progressBar yang lebih robust
function progressBar(percent, length) {
    percent = Math.max(0, Math.min(100, percent)); // Pastikan antara 0-100
    const filled = Math.round((percent / 100) * length);
    return '█'.repeat(filled) + '░'.repeat(length - filled);
}

