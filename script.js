document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.getElementById('parallax-video');
    const form = document.getElementById('audit-form');

    // Subtle Vertical Parallax Effect on Scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Only apply if on desktop and in view
        if (window.innerWidth > 1024) {
            // Calculate a subtle movement (slow vertical parallax)
            // We adjust the transform to add to the existing floating animation
            const parallaxVal = scrolled * 0.1;

            // Check if hero is still in view
            if (scrolled < window.innerHeight) {
                videoContainer.style.transform = `translateY(${parallaxVal}px)`;
            }
        }
    });

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

    // Intersection Observer for fade-in effects on load
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hero-content, .hero-video-wrapper').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
        observer.observe(el);
    });

    // Update visibility via class
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelectorAll('.hero-content, .hero-video-wrapper').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }, 100);
    });

    // Sticky Button Scroll to Form
    const stickyBtn = document.querySelector('.sticky-enquire-btn');
    if (stickyBtn) {
        stickyBtn.addEventListener('click', () => {
            document.querySelector('.hero-section').scrollIntoView({ behavior: 'smooth' });
        });
    }
});
