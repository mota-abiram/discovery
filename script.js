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
