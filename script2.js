// script2.js - Heartbeat effect for the YES button

document.addEventListener('DOMContentLoaded', function() {
    // Find the YES button (SIGE NABA)
    const yesButton = document.querySelector('a[href="yes.html"]');
    
    if (yesButton) {
        // Add heartbeat class to the button
        yesButton.classList.add('heartbeat');
        
        // Create CSS styles for heartbeat effect
        const style = document.createElement('style');
        style.textContent = `
            .heartbeat {
                animation: heartbeat 1.5s ease-in-out infinite;
                transform-origin: center;
            }
            
            @keyframes heartbeat {
                0% {
                    transform: scale(1);
                }
                14% {
                    transform: scale(1.1);
                }
                28% {
                    transform: scale(1);
                }
                42% {
                    transform: scale(1.1);
                }
                70% {
                    transform: scale(1);
                }
                100% {
                    transform: scale(1);
                }
            }
            
            /* Enhanced heartbeat on hover */
            .heartbeat:hover {
                animation: heartbeat-fast 0.8s ease-in-out infinite;
            }
            
            @keyframes heartbeat-fast {
                0% {
                    transform: scale(1);
                }
                25% {
                    transform: scale(1.15);
                }
                50% {
                    transform: scale(1);
                }
                75% {
                    transform: scale(1.15);
                }
                100% {
                    transform: scale(1);
                }
            }
            
            /* Add a subtle glow effect */
            .heartbeat {
                box-shadow: 0 0 10px rgba(255, 105, 180, 0.3);
                transition: box-shadow 0.3s ease;
            }
            
            .heartbeat:hover {
                box-shadow: 0 0 20px rgba(255, 105, 180, 0.6);
            }
        `;
        
        // Add the styles to the document head
        document.head.appendChild(style);
        
        // Optional: Add click effect
        yesButton.addEventListener('click', function(e) {
            // Create a burst effect on click
            yesButton.style.transform = 'scale(1.2)';
            setTimeout(() => {
                yesButton.style.transform = '';
            }, 150);
        });
        
        // Optional: Add heart emojis that float up on hover
        yesButton.addEventListener('mouseenter', function() {
            createFloatingHearts(yesButton);
        });
    }
});

// Function to create floating hearts
function createFloatingHearts(button) {
    const hearts = ['💕', '💖', '💗', '💝', '💘'];
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = (rect.left + Math.random() * rect.width) + 'px';
            heart.style.top = rect.top + 'px';
            heart.style.fontSize = '20px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.animation = 'float-up 2s ease-out forwards';
            
            // Add floating animation
            const floatStyle = document.createElement('style');
            floatStyle.textContent = `
                @keyframes float-up {
                    0% {
                        opacity: 1;
                        transform: translateY(0px) scale(0.5);
                    }
                    50% {
                        opacity: 0.8;
                        transform: translateY(-30px) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-60px) scale(0.5);
                    }
                }
            `;
            
            if (!document.querySelector('#float-style')) {
                floatStyle.id = 'float-style';
                document.head.appendChild(floatStyle);
            }
            
            document.body.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 200);
    }
}