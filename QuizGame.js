 const quizData = [
            {
                question: " What is the correct syntax to write an HTML comment?",
                options: ["<!--Comment-->", "//Comment", "#Comment", "/*Comment*/"],
                answer: "<!--Comment-->",
                useranswer : ""
            },
            {
                question: "Which language is used for web development?",
                options: ["Python", "HTML", "Java", "C++"],
                answer: "HTML",
                useranswer : ""
            },
            {
                question: "What tag is used to render an image on a webpage?",
                options: ["img", "src", "image", "None of Above"],
                answer: "img",
                useranswer : ""
            },
            {
                question: "Which HTML tag is used to set up a Javascript-like client-side scripting language",
                options: ["<script>", "<select>", "<anchor>", "None of Above"],
                answer: "<script>",
                useranswer : ""
            },
            {
                question: "Which of the following tags doesn’t require a closing tag?",
                options: ["<br>", "<hr>", "Both A and B", "None of Above"],
                answer: "Both A and B",
                useranswer : ""
            }
        ];

        let currentQuestion = 0;
        let score = 0;
        let timeLeft = 30;
        let timerInterval;
        const timerEl = document.getElementById('time');
        const questionEl = document.querySelector('.question');
        const optionsEl = document.querySelector('.options');
        const resultEl = document.querySelector('.result');
        const scoreEl = document.getElementById('score');
        const restartBtn = document.querySelector('.restart-btn');
        const summaryBtn = document.querySelector('.summaryBtn');
        const summary = document.querySelector('.summary-container');
        const timer = document.querySelector('.timer');

        // Function to load the question
        function loadQuestion() {
            if (currentQuestion >= quizData.length) {
                endQuiz();
                return;
            }
            clearInterval(timerInterval);
            timeLeft = 30;
            timerEl.textContent = timeLeft;
            startTimer();
            const currentQuiz = quizData[currentQuestion];
            questionEl.textContent = currentQuiz.question;
            optionsEl.innerHTML = ''; // Clear previous options
            var userans = '';
            currentQuiz.options.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('option');
                button.textContent = option;
                button.onclick = () => checkAnswer(option);
                optionsEl.appendChild(button);
            });
            
        }

        // Check the answer
        function checkAnswer(selectedOption) {
            if (selectedOption === quizData[currentQuestion].answer) {
                score++;
            }
            quizData[currentQuestion].useranswer = selectedOption;
            currentQuestion++;
            loadQuestion();
        }

        // Start the timer
        function startTimer() {
            timerInterval = setInterval(() => {
                timeLeft--;
                timerEl.textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    endQuiz();
                }
            }, 1000);
        }

        // End the quiz and show the results
        function endQuiz() {
            clearInterval(timerInterval);
            questionEl.style.display = 'none';
            optionsEl.style.display = 'none';
            resultEl.style.display = 'block';
            scoreEl.textContent = score;
            restartBtn.style.display = 'block';
            summaryBtn.style.display = 'block';
            summary.style.display = 'none';
        }

        // Restart the quiz
        restartBtn.addEventListener('click', () => {
            // Reset variables
            currentQuestion = 0;
            score = 0;
            timeLeft = 30;
            timerEl.textContent = timeLeft;

            // Reset the display
            questionEl.style.display = 'block';
            optionsEl.style.display = 'flex'; // Ensure options are displayed correctly
            resultEl.style.display = 'none';
            restartBtn.style.display = 'none';
            summaryBtn.style.display = 'none';
            summary.style.display = 'none';
            timer.style.display = 'block';

            // Load the first question
            loadQuestion();
        });

        // Restart the quiz
        summaryBtn.addEventListener('click', () => {
            // Reset variables
            summary.style.display = 'block';
            questionEl.style.display = 'none';
            optionsEl.style.display = 'none'; 
            resultEl.style.display = 'block';
            restartBtn.style.display = 'block';
            summaryBtn.style.display = 'none';
            timer.style.display = 'none';
            scoreEl.style.display = 'inline';

            loadSummary();
           
        });

        function loadSummary() {
            var summary = document.getElementById("summary");
            var index = 1;
            quizData.forEach(ques => {
                const divQues = document.createElement('div');
                divQues.classList.add('summaryquestion');
                divQues.innerText = index +". "+ ques.question;

                const divOptions = document.createElement('div');
                divOptions.classList.add('options');

                ques.options.forEach(option => {
                const optiondiv = document.createElement('div');
                optiondiv.classList.add('summaryOption');
                optiondiv.innerText = option;

                
                if (option === ques.answer)
                {
                optiondiv.classList.add('correctAnswer');
                }
                if (option === ques.useranswer)
                {
                optiondiv.classList.add('userselans');
                }
                divOptions.appendChild(optiondiv)
                });

                const divCorrectAns = document.createElement('div');
                divCorrectAns.classList.add('userAns');
                divCorrectAns.innerText = "Your Answer : "+ques.useranswer;
                
                const hr = document.createElement('hr');
                summary.appendChild(divQues);
                summary.appendChild(divOptions);
                summary.appendChild(divCorrectAns);
                summary.appendChild(hr);
                index++;
            });
            
        }

        // Initialize the quiz with the first question
loadQuestion();