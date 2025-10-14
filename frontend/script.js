// Modal functionality
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const heroLoginBtn = document.getElementById('heroLoginBtn');
const registerModal = document.getElementById('registerModal');
const registerBtn = document.getElementById('registerBtn');
const showRegisterFromLogin = document.getElementById('showRegisterFromLogin');
const showLoginFromRegister = document.getElementById('showLoginFromRegister');

function openModal() {
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openRegisterModal() {
    registerModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeRegisterModal() {
    registerModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners for login
loginBtn.addEventListener('click', openModal);
heroLoginBtn.addEventListener('click', openModal);

// Event listeners for registration
registerBtn.addEventListener('click', openRegisterModal);

showRegisterFromLogin.addEventListener('click', function(e) {
    e.preventDefault();
    closeModal();
    openRegisterModal();
});

showLoginFromRegister.addEventListener('click', function(e) {
    e.preventDefault();
    closeRegisterModal();
    openModal();
});

// Close modals when clicking outside
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeModal();
    }
});

registerModal.addEventListener('click', (e) => {
    if (e.target === registerModal) {
        closeRegisterModal();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginModal.style.display === 'flex') {
        closeModal();
    }
    if (e.key === 'Escape' && registerModal.style.display === 'flex') {
        closeRegisterModal();
    }
});

// Login form handler
document.getElementById('emailLoginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            alert(data.message);
            closeModal();
            this.reset();
            
            // ✅ TAMBAHAN BARU: SIMPAN DATA & REDIRECT KE DASHBOARD
            localStorage.setItem('user', JSON.stringify({
                name: 'Ali Fahmi',
                email: email,
                points: 2450
            }));
            localStorage.setItem('token', 'demo-token');
            
            // Redirect ke dashboard setelah 1 detik
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
            // ✅ END TAMBAHAN BARU
            
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Koneksi gagal. Pastikan backend sedang berjalan.');
    }
});

// Registration form handler
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = this.querySelector('#registerName').value;
    const email = this.querySelector('#registerEmail').value;
    const password = this.querySelector('#registerPassword').value;
    const confirmPassword = this.querySelector('#registerConfirmPassword').value;
    
    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, confirmPassword })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert(data.message);
            closeRegisterModal();
            this.reset();
            // Auto switch to login modal after 1 second
            setTimeout(() => openModal(), 1000);
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Koneksi gagal. Pastikan backend sedang berjalan.');
    }
});

// Contact form handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
    this.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.15)';
        header.style.background = 'rgba(255, 255, 255, 0.99)';
    } else {
        header.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    }
});

// Auto-scroll chat messages
const chatMessages = document.getElementById('chatMessages');
if (chatMessages) {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
