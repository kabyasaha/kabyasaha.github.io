// Day/Night Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeButton = document.getElementById('themeButton');
    const themeText = document.getElementById('themeText');
    const body = document.body;
    
    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeText.textContent = 'Day Mode';
        themeButton.innerHTML = '<i class="fas fa-sun"></i> <span id="themeText">Day Mode</span>';
    } else {
        body.classList.remove('dark-theme');
        themeText.textContent = 'Night Mode';
        themeButton.innerHTML = '<i class="fas fa-moon"></i> <span id="themeText">Night Mode</span>';
    }
    
    // Toggle theme on button click
    themeButton.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        // Update button text and icon
        if (body.classList.contains('dark-theme')) {
            themeText.textContent = 'Day Mode';
            themeButton.innerHTML = '<i class="fas fa-sun"></i> <span id="themeText">Day Mode</span>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeText.textContent = 'Night Mode';
            themeButton.innerHTML = '<i class="fas fa-moon"></i> <span id="themeText">Night Mode</span>';
            localStorage.setItem('theme', 'light');
        }
        
        // Re-get the themeText element after updating HTML
        themeText = document.getElementById('themeText');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only smooth scroll for internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // Update active nav link
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Scroll to section
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Highlight active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});
