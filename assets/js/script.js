// document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------
    // Navbar Toggle Functionality
    // ------------------------------------
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close the mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                navLinks.classList.remove('open');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });


    // ------------------------------------
    // 1. Animated Text Effect (Hero Section)
    // ------------------------------------
    // const animatedTextElement = document.getElementById('animated-text');
    // const fullText = "NURSING COURSE";
    // const delay = 100; 
    // let charIndex = 0;

    // function typeText() {
    //     if (charIndex < fullText.length) {
    //         animatedTextElement.textContent += fullText.charAt(charIndex);
    //         charIndex++;
    //         setTimeout(typeText, delay);
    //     }
    // }

    // animatedTextElement.textContent = "";
    // typeText();


    // ------------------------------------
    // 2. Program Tabs Switching (Section 3)
    // ------------------------------------
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const programName = button.getAttribute('data-program');

            // Deactivate all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate the clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(programName).classList.add('active');

            // Close all accordions when switching tabs
            document.getElementById(programName).querySelectorAll('.accordion-body').forEach(body => {
                body.classList.remove('open');
                body.style.maxHeight = 0;
                body.style.padding = '0 15px';
            });
        });
    });

    // ------------------------------------
    // 3. Accordion Functionality (Section 3)
    // ------------------------------------
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;

            // Close all other open accordion bodies in the *current* tab
            const currentTab = header.closest('.tab-content');
            currentTab.querySelectorAll('.accordion-body.open').forEach(openBody => {
                if (openBody !== body) {
                    openBody.classList.remove('open');
                    openBody.style.maxHeight = 0;
                    openBody.style.padding = '0 15px';
                    // also remove active class from corresponding header
                    const openHeader = openBody.previousElementSibling;
                    if (openHeader && openHeader.classList) openHeader.classList.remove('active');
                }
            });

            // Toggle the clicked accordion body
            if (body.classList.contains('open')) {
                body.classList.remove('open');
                body.style.maxHeight = 0;
                body.style.padding = '0 15px';
                // update header caret state
                header.classList.remove('active');
            } else {
                body.classList.add('open');
                body.style.maxHeight = body.scrollHeight + 30 + "px";
                body.style.padding = '15px';
                // update header caret state
                header.classList.add('active');
            }
        });
    });

    // ------------------------------------
    // 4. Form Submission Handler (Optional)
    // ------------------------------------
    // const form = document.getElementById('enquiry-form');
    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();

    //     alert("Thank you for your enquiry! We received your details and will contact you shortly.");

    //     form.reset(); 
    // });

// });
 // ------------------------------------
    // 5. Exit Modal Functionality
    // ------------------------------------
let popupShown = false;

    function showExitPopup() {
      document.getElementById('exitPopup').style.display = 'block';
      document.getElementById('exitOverlay').style.display = 'block';
    }

    function closeExitPopup() {
      document.getElementById('exitPopup').style.display = 'none';
      document.getElementById('exitOverlay').style.display = 'none';
    }

    document.addEventListener('mouseout', function (e) {
      // detect when cursor leaves at the top
      if (e.clientY < 10 && !popupShown) {
        showExitPopup();
        popupShown = false; // show only once
      }
    });



  
// ... (all your existing code from script.js)

// ------------------------------------
// 7. Creative Testimonial Fader
// ------------------------------------
(function initTestimonialFader() {
    const container = document.querySelector('.testimonial-fader-container');
    if (!container) return; // Don't run if this section doesn't exist

    const cards = container.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const counterEl = document.getElementById('testimonial-counter');

    if (!cards.length || !prevBtn || !nextBtn || !counterEl) return; // Missing elements

    let currentIndex = 0;
    const totalCards = cards.length;

    function showTestimonial(index) {
        // Hide all cards
        cards.forEach(card => card.classList.remove('active'));

        // Show the correct card
        cards[index].classList.add('active');

        // Update counter
        counterEl.textContent = `${index + 1} / ${totalCards}`;
        
        // Update button states (optional but good UI)
        prevBtn.disabled = (index === 0);
        nextBtn.disabled = (index === totalCards - 1);
    }

    // Next button click
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            showTestimonial(currentIndex);
        }
    });

    // Previous button click
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            showTestimonial(currentIndex);
        }
    });

    // Initial setup
    showTestimonial(0);

})();







// ... (all your existing code from script.js)
// ------------------------------------
// 11. Elegant Infinite Carousel & Video Grid (Simplified)
// ------------------------------------
(function initElegantMediaGallery() {
    const section = document.querySelector('.media-gallery-elegant');
    if (!section) return;

    const track = section.querySelector('.elegant-carousel-track');
    const slides = Array.from(track.querySelectorAll('.carousel-slide-elegant')); 
    
    // --- 1. Infinite Scroll Physics ---

    function setupCarouselAnimation() {
        // Slide dimensions: 300px width + 30px margin (15px on each side)
        const slideWidth = 330; 
        const totalSlides = slides.length;
        
        // Since the HTML has a duplicated set, the width to scroll is the width of ONE original set.
        const originalSetSize = totalSlides / 2;
        const singleSetWidth = originalSetSize * slideWidth; 

        // Set the track width based on the total items
        track.style.width = `${totalSlides * slideWidth}px`;
        
        // Update the CSS keyframe variable for the track
        const styleSheet = document.styleSheets[0];
        let animationRule;
        
        // Find the 'elegantScroll' keyframe rule
        for (let i = 0; i < styleSheet.cssRules.length; i++) {
            // Find the correct rule by name
            if (styleSheet.cssRules[i].name === 'elegantScroll') {
                animationRule = styleSheet.cssRules[i];
                break;
            }
        }
        
        // Update the 100% keyframe value dynamically
        if (animationRule) {
            // Remove old keyframe and set new one
            animationRule.deleteRule('100%');
            animationRule.appendRule(`100% { transform: translateX(-${singleSetWidth}px); }`);
        }

        // Restart the animation
        track.style.animation = ''; // Revert to CSS defined animation
    }

    // --- Initial Setup ---
    setupCarouselAnimation(); 

})();