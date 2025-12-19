/* =============================================
   JAVASCRIPT PRINCIPAL
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. EFECTO MATRIX RAIN
    // ==========================================
    const canvas = document.getElementById('canvas-matrix');
    const ctx = canvas.getContext('2d');

    // Ajustar tamaño inicial
    function resizeMatrix() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeMatrix();

    const letters = "010101 YAMIL LARA CODE HTML CSS JS MATRIX < />";
    const splitLetters = letters.split("");
    const fontSize = 15; //Predeterminado 14
    let columns = canvas.width / fontSize;
    const drops = [];

    // Inicializar gotas
    for(let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawMatrix() {
        // Fondo con opacidad para efecto de estela
        ctx.fillStyle = "rgba(5, 5, 5, 0.1)"; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00f3ff"; // Color Cyan Neón
        ctx.font = fontSize + "px 'Share Tech Mono'";

        for(let i = 0; i < drops.length; i++) {
            const text = splitLetters[Math.floor(Math.random() * splitLetters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    // Velocidad de la lluvia (50ms)
    const matrixInterval = setInterval(drawMatrix, 50);


    // ==========================================
    // 2. THREE.JS ESFERA HOLOGRÁFICA
    // ==========================================
    const sphereContainer = document.getElementById('sphere-container');
    
    if (sphereContainer) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        sphereContainer.appendChild(renderer.domElement);

        // Geometría Externa (Púrpura)
        const geometry = new THREE.IcosahedronGeometry(2, 2);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0xbc13fe, 
            wireframe: true,
            transparent: true,
            opacity: 0.15 // Muy sutil para fondo
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Geometría Interna (Cyan)
        const coreGeo = new THREE.IcosahedronGeometry(1, 1);
        const coreMat = new THREE.MeshBasicMaterial({
            color: 0x00f3ff,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        scene.add(core);

        // Mover esfera un poco a la derecha o dejarla centrada
        // sphere.position.x = 2; 
        // core.position.x = 2; 
        
        camera.position.z = 5;

        // Animación
        let mouseX = 10;
        let mouseY = 10;
        
        // Listener para movimiento sutil con el mouse
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        const animateThree = function () {
            requestAnimationFrame(animateThree);

            // Rotación constante
            sphere.rotation.x += 0.002;
            sphere.rotation.y += 0.002;
            core.rotation.x -= 0.004;
            core.rotation.y -= 0.004;

            // Interacción suave con mouse
            sphere.rotation.x += mouseY * 0.015;
            sphere.rotation.y += mouseX * 0.015;

            renderer.render(scene, camera);
        };

        animateThree();

        // Manejar Resize de Ventana (Matrix y Three.js)
        window.addEventListener('resize', () => {
            // Three.js
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            
            // Matrix
            resizeMatrix();
            // Reiniciar columnas matrix
            columns = canvas.width / fontSize;
            drops.length = 0; // Limpiar array
            for(let x = 0; x < columns; x++) drops[x] = 1;
        });
    }

    // ==========================================
    // 3. FUNCIONALIDAD ORIGINAL (SCROLL, ETC.)
    // ==========================================
    
    // Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');
    if(scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ===== Smooth Scroll for Navigation Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Navbar Background on Scroll =====
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // ===== Intersection Observer for Animations =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.timeline-item, .project-card, .stack-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ===== Active Navigation Link on Scroll =====
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});