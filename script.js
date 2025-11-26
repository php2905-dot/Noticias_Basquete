document.addEventListener('DOMContentLoaded', () => {

    // ==== LÓGICA DE SAUDAÇÃO, LOGIN, CADASTRO E SAIR ====
    const userDisplay = document.getElementById('userDisplay');

    const btnCadastro = document.getElementById('btnCadastro');
    const btnCadastroMobile = document.getElementById('btnCadastroMobile');

    const btnLogin = document.getElementById('btnLogin');
    const btnLoginMobile = document.getElementById('btnLoginMobile');

    const btnLogout = document.getElementById('btnLogout');
    const btnLogoutMobile = document.getElementById('btnLogoutMobile');

    function atualizarEstadoLogin() {
        const username = localStorage.getItem('loggedUser'); // SOMENTE LOGIN define isso

        if (username) {
            // USUÁRIO LOGADO
            if (userDisplay) {
                userDisplay.innerHTML = `👋 Olá, <b>${username}</b>`;
                userDisplay.style.display = "inline-block";
            }

            if (btnCadastro) btnCadastro.style.display = 'inline-block';
            if (btnCadastroMobile) btnCadastroMobile.style.display = 'inline-block';

            if (btnLogin) btnLogin.style.display = 'none';
            if (btnLoginMobile) btnLoginMobile.style.display = 'none';

            if (btnLogout) btnLogout.style.display = 'inline-block';
            if (btnLogoutMobile) btnLogoutMobile.style.display = 'inline-block';

        } else {
            // USUÁRIO NÃO LOGADO
            if (userDisplay) userDisplay.style.display = "none";

            if (btnCadastro) btnCadastro.style.display = 'inline-block';
            if (btnCadastroMobile) btnCadastroMobile.style.display = 'inline-block';

            if (btnLogin) btnLogin.style.display = 'inline-block';
            if (btnLoginMobile) btnLoginMobile.style.display = 'inline-block';

            if (btnLogout) btnLogout.style.display = 'none';
            if (btnLogoutMobile) btnLogoutMobile.style.display = 'none';
        }
    }

    atualizarEstadoLogin();

    // ==== FUNÇÃO SAIR ====
    function realizarLogout() {
        localStorage.removeItem('loggedUser'); // remove somente o login
        atualizarEstadoLogin();

        if (window.location.pathname.includes('Cadastro.html') ||
            window.location.pathname.includes('Login.html')) {
            window.location.href = 'index.html';
        } else {
            window.location.reload();
        }
    }

    if (btnLogout) btnLogout.addEventListener('click', realizarLogout);
    if (btnLogoutMobile) btnLogoutMobile.addEventListener('click', realizarLogout);


    // ========== MENU MOBILE ==========

    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');

    if (menuToggle && navMobile) {
        menuToggle.addEventListener('click', () => {
            navMobile.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-mobile .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (link.getAttribute('href').startsWith('#')) {
                navMobile.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });


    // ========== SCROLL SUAVE ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
                if (navMobile) navMobile.classList.remove('active');
            }
        });
    });


    // ========== TABS ==========
    window.switchTab = function (tabName, event) {
        document.querySelectorAll('.tab-content').forEach(content =>
            content.classList.remove('active')
        );

        document.querySelectorAll('.tab-btn').forEach(button =>
            button.classList.remove('active')
        );

        document.getElementById(tabName).classList.add('active');
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
    };

    if (document.getElementById('players')) {
        document.getElementById('players').classList.add('active');
    }


    // ========== CARROSSEL ==========
    const carousel = document.getElementById('carousel');

    window.scrollCarousel = function (amount) {
        if (carousel) {
            carousel.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    function updateCarouselButtons() {
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');

        if (!carousel || !prevBtn || !nextBtn) return;

        prevBtn.style.display = carousel.scrollLeft > 0 ? 'flex' : 'none';

        nextBtn.style.display =
            carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth - 10
                ? 'flex'
                : 'none';
    }

    if (carousel) {
        carousel.addEventListener('scroll', updateCarouselButtons);
        window.addEventListener('resize', updateCarouselButtons);
        updateCarouselButtons();
    }


    // ========== WHATSAPP FLUTUANTE ==========
    const whatsappBtn = document.getElementById('whatsappBtn');
    const whatsappChat = document.getElementById('whatsappChat');

    window.toggleWhatsApp = () => {
        if (whatsappChat) whatsappChat.classList.toggle('active');
    };

    window.openWhatsApp = () => {
        const url = `https://wa.me/5511930743324?text=${encodeURIComponent(
            'Olá! Gostaria de falar sobre o portal Mundo do Basquete.'
        )}`;
        window.open(url, '_blank');
        toggleWhatsApp();
    };

    if (whatsappBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                whatsappBtn.classList.add('show');
            } else {
                whatsappBtn.classList.remove('show');
                if (whatsappChat) whatsappChat.classList.remove('active');
            }
        });

        whatsappBtn.addEventListener('click', toggleWhatsApp);
    }


    // ========== DOWNLOAD PDF ==========
    window.downloadPDF = () => {
        const link = document.createElement('a');
        link.href = 'Regras-Oficiais-Basketball-2022.pdf';
        link.download = 'Regras-Oficiais-Basketball-2022.pdf';
        link.click();
    };


    // ========== ANIMAÇÕES AO ROLAR ==========
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    document.querySelectorAll('.card, .team-item, .product-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });


    // ==== MENU DO USUÁRIO (HAMBÚRGUER) NECESSÁRIO =====
    const userMenu = document.getElementById("userMenu");
    const userMenuBtn = document.querySelector(".user-menu-btn");
    const userMenuDropdown = document.querySelector(".user-menu-dropdown");
    const logoutFromMenu = document.getElementById("logoutFromMenu");

    if (userMenuBtn) {
         userMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (userMenuDropdown) {
            userMenuDropdown.classList.toggle("active");
            }
        });
    }

    // FECHAR O MENU AO CLICAR FORA
    document.addEventListener("click", (e) => {
    if (userMenu && !userMenu.contains(e.target)) {
        if (userMenuDropdown) userMenuDropdown.classList.remove("active");
    }
    });

    // Se estiver logado → mostrar menu
    if (localStorage.getItem("currentUser")) {
        if (userMenu) userMenu.style.display = "block";

        if (logoutFromMenu) {
            logoutFromMenu.addEventListener("click", () => {
                localStorage.removeItem("currentUser");
                window.location.reload();
            });
        }
    }

});
