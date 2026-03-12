document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        // Smooth outline follow
        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Reconcile Button & Modal
    const btn = document.getElementById('reconcile-btn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');

    btn.addEventListener('click', () => {
        modal.style.display = 'flex';
        // Add some confetti effect or similar logic here if needed
        createHearts();
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Heart Animation Function
    function createHearts() {
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '💙';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            heart.style.zIndex = '3000';
            heart.style.pointerEvents = 'none';
            heart.style.transition = `transform ${Math.random() * 2 + 1}s linear, opacity 1s ease-out`;
            
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.style.transform = `translateY(-120vh) rotate(${Math.random() * 360}deg)`;
                heart.style.opacity = '0';
            }, 100);

            setTimeout(() => {
                heart.remove();
            }, 3000);
        }
    }
});
