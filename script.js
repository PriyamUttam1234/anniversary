document.addEventListener('DOMContentLoaded', function() {
    const answerInput = document.getElementById('answer-input');
    const submitBtn = document.getElementById('submit-btn');
    const questionContainer = document.getElementById('question-container');
    const anniversaryContainer = document.getElementById('anniversary-container');
    const playMusicBtn = document.getElementById('play-music-btn');
    const ourSong = document.getElementById('our-song');
    
    // Focus on the input field when the page loads
    answerInput.focus();
    
    // Function to check the answer
    function checkAnswer() {
        const answer = answerInput.value.trim().toLowerCase();
        
        if (answer === 'penguin') {
            // Show celebration with a nice transition
            questionContainer.style.opacity = '0';
            setTimeout(() => {
                questionContainer.classList.add('hidden');
                anniversaryContainer.classList.remove('hidden');
                
                // Add a fade-in effect
                setTimeout(() => {
                    anniversaryContainer.style.opacity = '1';
                    startConfetti();
                }, 50);
            }, 500);
        } else if (answer !== '') {
            // Shake the input for wrong answer
            answerInput.classList.add('shake');
            setTimeout(() => {
                answerInput.classList.remove('shake');
            }, 500);
            
            // Clear the input
            answerInput.value = '';
            answerInput.placeholder = 'Try again...';
            answerInput.focus();
        }
    }
    
    // Event listeners
    submitBtn.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    
    // Music player functionality
    let isPlaying = false;
    
    playMusicBtn.addEventListener('click', function() {
        if (isPlaying) {
            ourSong.pause();
            playMusicBtn.querySelector('.music-text').textContent = 'Play Our Song';
            isPlaying = false;
        } else {
            ourSong.play().catch(error => {
                console.log('Audio playback error or no audio file loaded yet:', error);
                alert('Please add your song file first!');
            });
            playMusicBtn.querySelector('.music-text').textContent = 'Pause Our Song';
            isPlaying = true;
        }
    });
    
    // Add some CSS for the transition and shake effect
    const style = document.createElement('style');
    style.textContent = `
        #question-container, #anniversary-container {
            transition: opacity 0.5s ease;
        }
        #anniversary-container {
            opacity: 0;
        }
        .shake {
            animation: shake 0.5s;
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Simple confetti effect
    function startConfetti() {
        for (let i = 0; i < 100; i++) {
            createConfetti();
        }
    }
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random position, color, and size
        const colors = ['#ff66b2', '#ffb3d9', '#ffcce6', '#ff3399', '#ff99cc'];
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            left: ${Math.random() * 100}vw;
            top: -20px;
            opacity: ${Math.random() * 0.7 + 0.3};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            transform: rotate(${Math.random() * 360}deg);
            z-index: -1;
        `;
        
        document.body.appendChild(confetti);
        
        // Animation
        const duration = Math.random() * 3 + 2;
        const animation = confetti.animate(
            [
                { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate(${Math.random() * 100 - 50}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ],
            {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.1, 0.8, 0.9, 0.2)'
            }
        );
        
        animation.onfinish = () => {
            confetti.remove();
        };
    }
});
