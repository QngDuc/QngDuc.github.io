document.addEventListener('DOMContentLoaded', () => {
    // FanArt modal logic
    const fanartModal = document.getElementById('fanart-modal');
    const fanartModalImg = document.getElementById('fanart-modal-img');
    const fanartModalArtist = document.getElementById('fanart-modal-artist');
    const fanartModalClose = document.getElementById('fanart-modal-close');
    document.querySelectorAll('.fanart-img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
            fanartModalImg.src = img.src;
            // Find artist name
            let artist = '';
            const overlay = img.parentElement.querySelector('.artist-overlay');
            if (overlay) {
                artist = overlay.textContent;
            } else {
                // fallback: try next sibling .fanart-info > .artist-name
                const info = img.parentElement.nextElementSibling;
                if (info && info.querySelector('.artist-name')) {
                    artist = info.querySelector('.artist-name').textContent;
                }
            }
            fanartModalArtist.textContent = artist;
            fanartModal.classList.add('show');
        });
    });
    fanartModalClose.addEventListener('click', function() {
        fanartModal.classList.remove('show');
        fanartModalImg.src = '';
    });
    fanartModal.addEventListener('click', function(e) {
        if (e.target === fanartModal) {
            fanartModal.classList.remove('show');
            fanartModalImg.src = '';
        }
    });
    const book = document.querySelector('.book');
    let bookContainer;
    // Zoom functionality
    function handleZoom(delta) {
        currentScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, currentScale + delta * SCALE_STEP));
        book.style.transform = `rotateX(10deg) scale(${currentScale})`;
    }

    // Mouse wheel zoom
    bookContainer = document.querySelector('.book-container');
    bookContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -1 : 1;
        handleZoom(delta);
    });

    // Keyboard zoom
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey) {
            if (e.key === '+' || e.key === '=') {
                e.preventDefault();
                handleZoom(1);
            } else if (e.key === '-') {
                e.preventDefault();
                handleZoom(-1);
            }
        }
    });

    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px) rotate(-5deg); }
            75% { transform: translateX(10px) rotate(5deg); }
        }
    `;
    document.head.appendChild(style);bookContainer = document.querySelector('.book-container');
    const pages = document.querySelectorAll('.page');
    const surpriseBtn = document.querySelector('.surprise-btn');
    const confettiContainer = document.querySelector('.confetti');
    let currentPage = 0;
    let currentScale = 1;
    const SCALE_STEP = 0.15;
    const MIN_SCALE = 0.3;
    const MAX_SCALE = 2.5;

    // Book hover effect
    book.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 35;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 35;
        book.style.transform = `rotateX(10deg) rotateY(${xAxis}deg) rotateZ(${yAxis}deg) scale(${currentScale})`;
    });

    // Reset book position but maintain scale
    book.addEventListener('mouseleave', () => {
        book.style.transform = `rotateX(10deg) rotateY(0) rotateZ(0) scale(${currentScale})`;
    });


    // Page turning functionality
    pages.forEach((page, index) => {
        if (index < pages.length - 1) { // Don't add click event to back cover
            page.addEventListener('click', (e) => {
                const rect = page.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                if (clickX < rect.width / 3 && currentPage > 0) {
                    // Clicked left third: go back
                    pages[currentPage - 1].classList.remove('turn');
                    currentPage--;
                } else if (!page.classList.contains('turn')) {
                    // Clicked right side: go forward
                    page.classList.add('turn');
                    currentPage = index + 1;
                }
            });
        }
    });

    // Go back functionality
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentPage > 0) {
            pages[currentPage - 1].classList.remove('turn');
            currentPage--;
        }
    });

    // Create confetti effect
    function createConfetti() {
        for(let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.animation = `rain ${Math.random() * 2 + 3}s linear`;
            confettiContainer.appendChild(confetti);

            // Remove confetti after animation
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }

    // Add surprise button click effect
    surpriseBtn.addEventListener('click', () => {
        createConfetti();
        
        // Add shake animation to the book
        book.style.animation = 'shake 0.5s';
        setTimeout(() => {
            book.style.animation = '';
        }, 500);
    });

    // Add balloon pop game functionality
    const gameballoons = document.querySelectorAll('.game-balloon');
    gameballoons.forEach(balloon => {
        balloon.addEventListener('click', () => {
            balloon.style.transform = 'scale(0)';
            balloon.style.transition = 'transform 0.3s';
            createConfetti();
            setTimeout(() => {
                balloon.textContent = '🎉';
                balloon.style.transform = 'scale(1)';
            }, 500);
        });
    });

    // Add hover sound effect to music notes
    const musicNotes = document.querySelectorAll('.music-note');
    musicNotes.forEach(note => {
        note.addEventListener('mouseenter', () => {
            note.style.transform = 'scale(1.2)';
            note.style.color = '#ff9900';
        });
        note.addEventListener('mouseleave', () => {
            note.style.transform = 'scale(1)';
            note.style.color = '#ff6b6b';
        });
    });

    // Add floating animation to wish bubbles
    const wishBubbles = document.querySelectorAll('.wish-bubble');
    wishBubbles.forEach((bubble, index) => {
        bubble.style.animationDelay = `${index * 0.2}s`;
    });
});

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px) rotate(-5deg); }
        75% { transform: translateX(10px) rotate(5deg); }
    }
`;
document.head.appendChild(style);