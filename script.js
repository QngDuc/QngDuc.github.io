document.addEventListener('DOMContentLoaded', () => {
    const book = document.querySelector('.book');
    const pages = document.querySelectorAll('.page');
    const surpriseBtn = document.querySelector('.surprise-btn');
    const confettiContainer = document.querySelector('.confetti');
    let currentPage = 0;

    // Book hover effect
    book.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 35;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 35;
        book.style.transform = `rotateX(10deg) rotateY(${xAxis}deg) rotateZ(${yAxis}deg)`;
    });

    // Reset book position
    book.addEventListener('mouseleave', () => {
        book.style.transform = 'rotateX(10deg) rotateY(0) rotateZ(0)';
    });

    // Page turning functionality
    pages.forEach((page, index) => {
        if (index < pages.length - 1) { // Don't add click event to back cover
            page.addEventListener('click', () => {
                if (!page.classList.contains('turn')) {
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