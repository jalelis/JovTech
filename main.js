        document.addEventListener('DOMContentLoaded', () => {
            const navLinks = document.querySelectorAll('.mid-header a');
            const sections = document.querySelectorAll('.section-content');
            
            const hamburger = document.querySelector('.hamburger-menu');
            const navMenu = document.querySelector('.mid-header');
            
            // Function to update active state and show/hide sections
            const navigateTo = (sectionId, linkElement) => {
                // Update active link class
                navLinks.forEach(link => link.classList.remove('act'));
                if(linkElement) {
                    linkElement.classList.add('act');
                }
                
                // Hide all sections
                sections.forEach(section => section.classList.remove('active'));

                // Show the target section
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            };

            // 1. HAMBURGER MENU TOGGLE LOGIC
            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    navMenu.classList.toggle('active'); // Toggles the visibility
                    
                    // Toggle the icon (bars <-> X)
                    const icon = hamburger.querySelector('i');
                    if (navMenu.classList.contains('active')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-xmark'); // Use X icon when open
                    } else {
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars'); // Use bars icon when closed
                    }
                });
            }
            
            // Event listener for navigation clicks (NEW SPA LOGIC)
            navLinks.forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    
                    // 1. Kunin ang hash (e.g., '#about')
                    let href = link.getAttribute('href');
                    let baseName = href.substring(1); // 'about'

                    // 2. I-construct ang Section ID (e.g., 'about-section')
                    // Gumagamit ng 'home' bilang default kung walang hash (para sa index.htm)
                    const sectionBase = baseName || 'home'; 
                    const sectionId = sectionBase + '-section';

                    if (sectionId) {
                        navigateTo(sectionId, link);
                        // Update browser hash: #home, #about, etc.
                        history.pushState(null, '', href); 
                    }
                    
                    // 3. Close hamburger menu after clicking a link
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        hamburger.querySelector('i').classList.remove('fa-xmark');
                        hamburger.querySelector('i').classList.add('fa-bars');
                    }
                });
            });

            // Handle initial load based on URL hash or default to home
            const initialHash = window.location.hash.substring(1);
            const initialSectionBase = initialHash || 'home'; 
            const initialSectionId = initialSectionBase + '-section';

            const initialLink = Array.from(navLinks).find(link => 
                link.getAttribute('href').substring(1) === initialSectionBase
            );
            
            // Default to the first link (Home) if none is found
            const defaultLink = document.querySelector('.mid-header a[href="#home"]');
            
            if (initialLink) {
                navigateTo(initialSectionId, initialLink);
            } else if (defaultLink) {
                // Default to Home if no valid hash is found
                navigateTo('home-section', defaultLink);
            }
        });
