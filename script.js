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

    // Testimonial Video Play/Pause Logic (Using Hero Logic Style)
    const testimonialWrappers = document.querySelectorAll('.video-thumbnail-wrapper');
    testimonialWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('.testimonial-video');
        const overlay = wrapper.querySelector('.play-overlay');

        if (video && overlay) {
            const togglePlay = () => {
                if (video.paused) {
                    video.play();
                    overlay.classList.add('hidden');
                } else {
                    video.pause();
                    overlay.classList.remove('hidden');
                }
            };

            overlay.addEventListener('click', togglePlay);
            video.addEventListener('click', togglePlay);

            video.addEventListener('ended', () => {
                overlay.classList.remove('hidden');
            });
        }
    });

    const form = document.getElementById('audit-form');


    // Form Submission: Google Sheets Connector
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const button = form.querySelector('.cta-button');
        const originalContent = button.innerHTML;

        // REPLACE THIS URL with your Google Apps Script Web App URL
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyi-kGexchnvjlpU3_7QX9ewoNPvxZ438WQ9pDqNTP9m8rTsLJhZQtf4Sr2CdMxFFEB_w/exec';

        button.innerHTML = 'Submitting Lead...';
        button.style.opacity = '0.7';
        button.disabled = true;

        // Collect Form Data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => { data[key] = value; });

        // Submit to Google Sheet
        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Critical for Google Apps Script
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(() => {
                // Success State
                button.innerHTML = 'Lead Secured!';
                button.style.background = '#10b981';
                button.style.opacity = '1';

                setTimeout(() => {
                    button.innerHTML = originalContent;
                    button.style.background = '';
                    button.disabled = false;
                    form.reset();
                    // Optional: Redirect to Thank You page
                    // window.location.href = 'thank-you.html';
                }, 3000);
            })
            .catch(error => {
                console.error('Error!', error.message);
                button.innerHTML = 'Error. Try Again';
                button.style.background = '#ef4444';
                button.disabled = false;
            });
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
