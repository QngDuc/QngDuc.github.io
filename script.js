document.addEventListener('DOMContentLoaded', () => {
    // Book configuration and state
    let currentPage = 0;
    let currentScale = 1;
    const SCALE_STEP = 0.15;
    const MIN_SCALE = 0.3;
    const MAX_SCALE = 2.5;

    // Start button logic
    const startScreen = document.querySelector('.start-screen');
    const startButton = document.querySelector('.start-button');
    const bookContainer = document.querySelector('.book-container');
    const book = document.querySelector('.book');
    const pages = document.querySelectorAll('.page');

    function initializeBook() {
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

        // Hide tips when first page is turned
        const tips = document.querySelector('.tips');
        
        // Page turning functionality
        pages.forEach((page, index) => {
            if (index < pages.length - 1) {
                page.addEventListener('click', (e) => {
                    if (e.target.closest('.fanart-img-container')) {
                        return;
                    }
                    // Hide tips when page is turned
                    if (tips) {
                        tips.style.opacity = '0';
                        setTimeout(() => {
                            tips.style.visibility = 'hidden';
                        }, 500);
                    }
                    
                    const rect = page.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    
                    if (clickX < rect.width / 3 && currentPage > 0) {
                        // Go back
                        pages[currentPage - 1].classList.remove('turn');
                        pages.forEach(p => p.classList.remove('fade'));
                        if (currentPage - 2 >= 0) {
                            pages[currentPage - 2].classList.add('fade');
                        }
                        currentPage--;
                    } else if (!page.classList.contains('turn')) {
                        // Go forward
                        page.classList.add('turn');
                        pages.forEach(p => p.classList.remove('fade'));
                        if (index - 1 >= 0) {
                            pages[index - 1].classList.add('fade');
                        }
                        currentPage = index + 1;
                    }
                });
            }
        });
    }

    if (startButton) {
        startButton.addEventListener('click', () => {
            startScreen.style.opacity = '0';
            startScreen.style.pointerEvents = 'none';
            startScreen.style.transition = 'opacity 0.5s ease-in-out';
            bookContainer.classList.add('visible');
            // Reset and reinitialize page turning after transition
            setTimeout(() => {
                const pages = document.querySelectorAll('.page');
                currentPage = 0;
                pages.forEach(page => {
                    page.classList.remove('turn');
                    page.classList.remove('fade');
                });
                // Show tips after book appears
                const tips = document.querySelector('.tips');
                tips.style.opacity = '1';
                tips.style.visibility = 'visible';
            }, 500);
            // Initialize book functionality after revealing it
            setTimeout(initializeBook, 500);
        });
    }
    // Ensure loading screen stays visible for the animation duration
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 4000); // Match this with the total animation duration (3s loading + 0.5s fade out + 0.5s buffer)
    // FanArt modal logic
    const fanartModal = document.getElementById('fanart-modal');
    const fanartModalImg = document.getElementById('fanart-modal-img');
    const fanartModalArtist = document.getElementById('fanart-modal-artist');
    const fanartModalClose = document.getElementById('fanart-modal-close');
    // Handle FanArt clicks
    const fanartContainers = document.querySelectorAll('.fanart-img-container');
    fanartContainers.forEach(container => {
        container.addEventListener('click', function(e) {
            // Prevent page turning
            e.preventDefault();
            e.stopPropagation();
            
            const img = container.querySelector('.fanart-img');
            if (!img) return;
            
            fanartModalImg.src = img.src;
            
            // Find artist name
            let artist = '';
            const overlay = container.querySelector('.artist-overlay');
            if (overlay) {
                // Remove 'Artist: ' prefix if it exists
                artist = overlay.textContent.replace('Artist: ', '');
            }
            fanartModalArtist.textContent = artist;
            fanartModal.classList.add('show');
        });
    });

    // Prevent default image behavior
    document.querySelectorAll('.fanart-img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
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
    // Zoom functionality
    function handleZoom(delta) {
        currentScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, currentScale + delta * SCALE_STEP));
        book.style.transform = `rotateX(10deg) scale(${currentScale})`;
    }

    // Mouse wheel zoom
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
    document.head.appendChild(style);
    const surpriseBtn = document.querySelector('.surprise-btn');
    const confettiContainer = document.querySelector('.confetti');

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
                // Skip if clicking on fanart
                if (e.target.closest('.fanart-img-container')) {
                    return;
                }
                
                const rect = page.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                
                if (clickX < rect.width / 3 && currentPage > 0) {
                    // Clicked left third: go back
                    pages[currentPage - 1].classList.remove('turn');
                    // Clear all fade effects first
                    pages.forEach(p => p.classList.remove('fade'));
                    // Add fade only to the page in front of the current page
                    if (currentPage - 2 >= 0) {
                        pages[currentPage - 2].classList.add('fade');
                    }
                    currentPage--;
                } else if (!page.classList.contains('turn')) {
                    // Clicked right side: go forward
                    page.classList.add('turn');
                    // Clear all fade effects first
                    pages.forEach(p => p.classList.remove('fade'));
                    // Add fade only to the page in front of this page
                    if (index - 1 >= 0) {
                        pages[index - 1].classList.add('fade');
                    }
                    currentPage = index + 1;
                }
            });
        }
    });

    // Page navigation with arrow keys
    document.addEventListener('keydown', (e) => {
        const tips = document.querySelector('.tips');
        if (e.key === 'ArrowLeft' && currentPage > 0) {
            pages[currentPage - 1].classList.remove('turn');
            // Clear all fade effects first
            pages.forEach(p => p.classList.remove('fade'));
            // Hide tips when using arrow keys
            if (tips) {
                tips.style.opacity = '0';
                setTimeout(() => {
                    tips.style.visibility = 'hidden';
                }, 500);
            }
            // Add fade only to the page in front of the current page
            if (currentPage - 2 >= 0) {
                pages[currentPage - 2].classList.add('fade');
            }
            currentPage--;
        } else if (e.key === 'ArrowRight' && currentPage < pages.length - 1) {
            pages[currentPage].classList.add('turn');
            // Clear all fade effects first
            pages.forEach(p => p.classList.remove('fade'));
            // Hide tips when using arrow keys
            if (tips) {
                tips.style.opacity = '0';
                setTimeout(() => {
                    tips.style.visibility = 'hidden';
                }, 500);
            }
            // Add fade only to the page in front of the current page
            if (currentPage - 1 >= 0) {
                pages[currentPage - 1].classList.add('fade');
            }
            currentPage++;
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