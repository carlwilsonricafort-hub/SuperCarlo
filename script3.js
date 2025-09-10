// script3.js - Floating Balloons Effect

document.addEventListener('DOMContentLoaded', function() {
    // Create balloon container
    const balloonContainer = document.createElement('div');
    balloonContainer.id = 'balloon-container';
    balloonContainer.style.position = 'fixed';
    balloonContainer.style.top = '0';
    balloonContainer.style.left = '0';
    balloonContainer.style.width = '100%';
    balloonContainer.style.height = '100%';
    balloonContainer.style.pointerEvents = 'none';
    balloonContainer.style.zIndex = '1';
    balloonContainer.style.overflow = 'hidden';
    
    document.body.appendChild(balloonContainer);

    // Balloon colors and emojis
    const balloonTypes = [
        { emoji: '🎈', colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#da70d6'] },
        { emoji: '🎂', colors: ['#ffd700', '#ffb347', '#ff6347'] },
        { emoji: '💖', colors: ['#ff1493', '#ff69b4'] },
        { emoji: '💝', colors: ['#ff69b4', '#da70d6'] },
        { emoji: '🌸', colors: ['#ffb6c1', '#ffc0cb'] },
        { emoji: '🎀', colors: ['#ff69b4', '#da70d6'] }
    ];

    // Create CSS styles for balloons
    const style = document.createElement('style');
    style.textContent = `
        .balloon {
            position: absolute;
            font-size: 30px;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
        }
        
        .balloon-left {
            animation-name: float-left;
        }
        
        .balloon-right {
            animation-name: float-right;
        }
        
        @keyframes float-left {
            0% {
                transform: translateY(100vh) translateX(-20px) rotate(-5deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(20px) rotate(5deg);
                opacity: 0;
            }
        }
        
        @keyframes float-right {
            0% {
                transform: translateY(100vh) translateX(20px) rotate(5deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(-20px) rotate(-5deg);
                opacity: 0;
            }
        }
        
        .balloon:hover {
            transform: scale(1.2);
            transition: transform 0.3s ease;
        }
    `;
    
    document.head.appendChild(style);

    // Function to create a single balloon
    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        // Random balloon type
        const balloonType = balloonTypes[Math.floor(Math.random() * balloonTypes.length)];
        balloon.innerHTML = balloonType.emoji;
        
        // Random side (left or right)
        const isLeft = Math.random() < 0.5;
        balloon.classList.add(isLeft ? 'balloon-left' : 'balloon-right');
        
        // Position balloon on the side
        if (isLeft) {
            balloon.style.left = Math.random() * 100 + 'px'; // Left side
        } else {
            balloon.style.right = Math.random() * 100 + 'px'; // Right side
        }
        
        // Random animation duration (8-15 seconds)
        const duration = 8 + Math.random() * 7;
        balloon.style.animationDuration = duration + 's';
        
        // Random delay before starting
        balloon.style.animationDelay = Math.random() * 2 + 's';
        
        // Add some random size variation
        const size = 0.8 + Math.random() * 0.6; // 0.8 to 1.4
        balloon.style.fontSize = (30 * size) + 'px';
        
        balloonContainer.appendChild(balloon);
        
        // Remove balloon after animation completes
        setTimeout(() => {
            if (balloon.parentNode) {
                balloon.parentNode.removeChild(balloon);
            }
        }, (duration + 2) * 1000);
    }

    // Function to create multiple balloons
    function createBalloonBurst() {
        const burstCount = 2 + Math.floor(Math.random() * 3); // 2-4 balloons
        for (let i = 0; i < burstCount; i++) {
            setTimeout(() => {
                createBalloon();
            }, i * 500); // Stagger balloon creation
        }
    }

    // Create initial balloons
    createBalloonBurst();
    
    // Create new balloons every 3-6 seconds
    function scheduleBalloons() {
        const nextInterval = 3000 + Math.random() * 3000; // 3-6 seconds
        setTimeout(() => {
            createBalloon();
            scheduleBalloons();
        }, nextInterval);
    }
    
    scheduleBalloons();
    
    // Create balloon burst every 10-15 seconds
    function scheduleBalloonBurst() {
        const nextBurst = 10000 + Math.random() * 5000; // 10-15 seconds
        setTimeout(() => {
            createBalloonBurst();
            scheduleBalloonBurst();
        }, nextBurst);
    }
    
    scheduleBalloonBurst();

    // Add special balloons on button hover
    const buttons = document.querySelectorAll('.btn a');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Create 2-3 special balloons near the button
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const specialBalloon = document.createElement('div');
                    specialBalloon.className = 'balloon';
                    specialBalloon.innerHTML = '💕';
                    specialBalloon.style.position = 'fixed';
                    specialBalloon.style.fontSize = '25px';
                    specialBalloon.style.pointerEvents = 'none';
                    
                    const rect = button.getBoundingClientRect();
                    specialBalloon.style.left = (rect.left + Math.random() * rect.width) + 'px';
                    specialBalloon.style.top = (rect.bottom + 10) + 'px';
                    
                    specialBalloon.style.animation = 'float-up 3s ease-out forwards';
                    
                    document.body.appendChild(specialBalloon);
                    
                    setTimeout(() => {
                        if (specialBalloon.parentNode) {
                            specialBalloon.parentNode.removeChild(specialBalloon);
                        }
                    }, 3000);
                }, i * 300);
            }
        });
    });
});