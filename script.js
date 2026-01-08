document.addEventListener('DOMContentLoaded', () => {
    const heroVideo = document.getElementById('hero-main-video');
    const heroPlayBtn = document.getElementById('hero-play-btn');

    // Hero Video Play/Pause Logic
    if (heroVideo && heroPlayBtn) {
        const togglePlay = () => {
            if (heroVideo.paused) {
                heroVideo.play();
                heroPlayBtn.classList.add('hidden');
            } else {
                heroVideo.pause();
                heroPlayBtn.classList.remove('hidden');
            }
        };

        heroPlayBtn.addEventListener('click', togglePlay);
        heroVideo.addEventListener('click', togglePlay);

        // Show button again if video ends
        heroVideo.addEventListener('ended', () => {
            heroPlayBtn.classList.remove('hidden');
        });
    }

    const form = document.getElementById('audit-form');


    // Form Submission Animation / Placeholder
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const button = form.querySelector('.cta-button');
        const originalContent = button.innerHTML;

        button.innerHTML = 'Analyzing...';
        button.style.opacity = '0.7';
        button.disabled = true;

        // Simulate a delay for premium feel
        setTimeout(() => {
            button.innerHTML = 'Check Your Email!';
            button.style.background = '#10b981'; // Success green
            button.style.opacity = '1';

            setTimeout(() => {
                button.innerHTML = originalContent;
                button.style.background = '';
                button.disabled = false;
                form.reset();
            }, 3000);
        }, 1500);
    });

    // Intersection Observer for Reveal on Scroll
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing after it's revealed for performance
                // revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Observe all elements with 'reveal' class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));


    // Sticky Button Scroll to Form
    const stickyBtn = document.querySelector('.sticky-enquire-btn');
    if (stickyBtn) {
        stickyBtn.addEventListener('click', () => {
            document.querySelector('.hero-section').scrollIntoView({ behavior: 'smooth' });
        });
    }
});
