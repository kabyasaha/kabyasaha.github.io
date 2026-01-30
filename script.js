// Day/Night Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeButton = document.getElementById('themeButton');
    const themeIcon = themeButton.querySelector('i');
    const themeText = document.getElementById('themeText');
    const body = document.body;
    
    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply saved theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Day Mode';
            themeButton.innerHTML = '<i class="fas fa-sun"></i> <span id="themeText">Day Mode</span>';
        } else {
            body.classList.remove('dark-theme');
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Night Mode';
            themeButton.innerHTML = '<i class="fas fa-moon"></i> <span id="themeText">Night Mode</span>';
        }
    }
    
    applyTheme(savedTheme);
    
    // Toggle theme on button click
    themeButton.addEventListener('click', function() {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            applyTheme('light');
        } else {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            applyTheme('dark');
        }
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    const books = [
        { title: "অপেক্ষা", banglish: "Opekkha", link: "https://heyzine.com/flip-book/197fe6e70b.html", genre: "উপন্যাস" },
        { title: "মিসির আলি সমগ্র", banglish: "Misir Ali Somogro", link: "https://heyzine.com/flip-book/36500c0f66.html", genre: "থ্রিলার" },
        { title: "বৃষ্টি বিলাস", banglish: "Brishti Bilash", link: "https://heyzine.com/flip-book/1a2e8c1868.html", genre: "গল্পসংগ্রহ" },
        { title: "মেঘ বলেছে যাব যাব", banglish: "Megh Boleche Jabo Jabo", link: "https://heyzine.com/flip-book/3804efc7e4.html", genre: "উপন্যাস" },
        { title: "নন্দিত নরকে", banglish: "Nondito Noroke", link: "https://heyzine.com/flip-book/b4a3d63030.html", genre: "উপন্যাস" },
        { title: "তন্দ্রাবিলাস", banglish: "Tondrabilas", link: "https://heyzine.com/flip-book/ebd245c88d.html", genre: "উপন্যাস" },
        { title: "শঙ্খনীল কারাগার", banglish: "Shankhanil Karagar", link: "https://heyzine.com/flip-book/6c60034146.html", genre: "উপন্যাস" },
        { title: "দ্বিতীয় মানব", banglish: "Ditiyo Manob", link: "https://heyzine.com/flip-book/01867b93a0.html", genre: "বিজ্ঞান কল্পকাহিনী" },
        { title: "ওমেগা পয়েন্ট", banglish: "Omega Point", link: "https://heyzine.com/flip-book/8debbab869.html", genre: "বিজ্ঞান কল্পকাহিনী" },
        { title: "মিসির আলি ! আপনি কোথায়?", banglish: "Misir Ali ! Apni Kothai?", link: "https://heyzine.com/flip-book/5620253d1a.html", genre: "থ্রিলার" }
    ];
    
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = '';
        
        if (query === '') {
            searchResults.innerHTML = '<p style="text-align: center; color: var(--text-color); opacity: 0.7;">বইয়ের নাম লিখে সার্চ করুন</p>';
            return;
        }
        
        // Find matching books
        const foundBooks = books.filter(book => 
            book.title.toLowerCase().includes(query) || 
            book.banglish.toLowerCase().includes(query) ||
            book.genre.toLowerCase().includes(query)
        );
        
        if (foundBooks.length > 0) {
            foundBooks.forEach(book => {
                const resultItem = document.createElement('a');
                resultItem.href = book.link;
                resultItem.target = '_blank';
                resultItem.innerHTML = `
                    <strong>${book.title}</strong> (${book.banglish})<br>
                    <small>ধরণ: ${book.genre}</small>
                `;
                searchResults.appendChild(resultItem);
            });
        } else {
            const noResult = document.createElement('p');
            noResult.textContent = 'কোনো বই পাওয়া যায়নি!';
            noResult.style.textAlign = 'center';
            noResult.style.color = 'var(--secondary-color)';
            searchResults.appendChild(noResult);
        }
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
