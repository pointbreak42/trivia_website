// Question Database for Brain Blast!
// Each question object contains: question, options array, correct answer, and difficulty

const questionDatabase = {
    movies: [
        {
            question: "What year was the first Star Wars movie released?",
            options: ["1975", "1977", "1979", "1981"],
            correctAnswer: "1977",
            difficulty: "easy"
        },
        {
            question: "Who played Iron Man in the Marvel Cinematic Universe?",
            options: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"],
            correctAnswer: "Robert Downey Jr.",
            difficulty: "easy"
        },
        {
            question: "What is the name of the fictional town where Stranger Things is primarily set?",
            options: ["Hawkins", "Springfield", "Riverdale", "Smallville"],
            correctAnswer: "Hawkins",
            difficulty: "medium"
        },
        {
            question: "Which director is known for films like Pulp Fiction and Kill Bill?",
            options: ["Martin Scorsese", "Quentin Tarantino", "Christopher Nolan", "Steven Spielberg"],
            correctAnswer: "Quentin Tarantino",
            difficulty: "medium"
        },
        {
            question: "What was the first animated feature film to win an Academy Award for Best Picture?",
            options: ["Beauty and the Beast", "The Lion King", "Toy Story", "None of the above"],
            correctAnswer: "None of the above",
            difficulty: "hard"
        }
    ],
    
    "pop-culture": [
        {
            question: "What year did TikTok first launch?",
            options: ["2016", "2018", "2020", "2022"],
            correctAnswer: "2016",
            difficulty: "medium"
        },
        {
            question: "Which singer famously wore a meat dress to the 2010 MTV Video Music Awards?",
            options: ["Katy Perry", "Nicki Minaj", "Rihanna", "Lady Gaga "],
            correctAnswer: "Lady Gaga ",
            difficulty: "easy"
        },
        {
            question: "What social media platform was originally called 'TheFacebook'?",
            options: ["Instagram", "Twitter", "Facebook", "LinkedIn"],
            correctAnswer: "Facebook",
            difficulty: "medium"
        },
        {
            question: "Which TV show features the character Sheldon Cooper?",
            options: ["Friends", "The Big Bang Theory", "How I Met Your Mother", "Modern Family"],
            correctAnswer: "The Big Bang Theory",
            difficulty: "easy"
        },
        {
            question: "What year did the first iPhone launch?",
            options: ["2005", "2007", "2009", "2011"],
            correctAnswer: "2007",
            difficulty: "medium"
        },
        {
            question: "What is the real name of the guitarist known as Slash, famous for his work with Guns N' Roses?",
            options: ["Saul Hudson", "Angus Young", "David Howell Evans", "Steve Hackett"],
            correctAnswer: "Saul Hudson",
            difficulty: "medium"
        },
        {
            question: "What is the title of the debut studio album by the American rock band Nirvana, released in 1989?",
            options: ["Bleach", "Nevermind", "In Utero", "Rarities"],
            correctAnswer: "Bleach",
            difficulty: "medium"
        },
        {
            question: "Which plush toy gained fame as an interactive electronic pet that required feeding and care?",
            options: ["Furby", "Tamagotchi", "Cabbage Patch Kids", "Beanie Babies"],
            correctAnswer: "Tamagotchi",
            difficulty: "easy"
        },
        {
            question: "Which company developed and released the classic arcade game 'Space Invaders' in 1978?",
            options: ["Atari", "Namco", "Taito", "Sega"],
            correctAnswer: "Taito",
            difficulty: "medium"
        },
        {
            question: "In 'Stranger Things,' what is Eleven's real name?",
            options: ["Jane Hopper", "Jane Byers", "Jane Wheeler", "Jane Ives"],
            correctAnswer: "Jane Ives",
            difficulty: "medium"
        },
        {
            question: "What is the name of the character played by Bryan Cranston in 'Malcolm in the Middle'?",
            options: ["Walter White", "Hal", "Tim", "Dave"],
            correctAnswer: "Hal",
            difficulty: "easy"
        },
        {
            question: "In the game 'Metal Gear Solid,' what is the real name of the protagonist known as Solid Snake?",
            options: ["Jack", "David", "Frank", "Roy"],
            correctAnswer: "David",
            difficulty: "medium"
        },
        {
            question: "What British comedian and actor did singer Katy Perry marry in 2010?",
            options: ["Sacha Baron Cohen", "Russell Brand", "Ricky Gervais", "Stephen Fry"],
            correctAnswer: "Russell Brand",
            difficulty: "medium"
        },
        {
            question: "Which Sith Lord was Darth Sidious' master?",
            options: ["Darth Bane", "Darth Nihilus", "Darth Plagueis", "Darth Revan"],
            correctAnswer: "Darth Plagueis",
            difficulty: "medium"
        },
        {
            question: "What is the name of Barbie's youngest sister, who was sold as part of a set with Barbie and Ken from 1998 to 2001?",
            options: ["Kasey", "Kelly", "Stacie", "Krissy"],
            correctAnswer: "Krissy",
            difficulty: "medium"
        }
    ],
    
    // You can add more categories here
    science: [
        {
            question: "What is the chemical symbol for gold?",
            options: ["Ag", "Au", "Fe", "Cu"],
            correctAnswer: "Au",
            difficulty: "easy"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars",
            difficulty: "easy"
        },
        {
            question: "What is the largest organ in the human body?",
            options: ["Heart", "Brain", "Liver", "Skin"],
            correctAnswer: "Skin",
            difficulty: "medium"
        }
    ],
    
    history: [
        {
            question: "In what year did World War II end?",
            options: ["1943", "1944", "1945", "1946"],
            correctAnswer: "1945",
            difficulty: "easy"
        },
        {
            question: "Who was the first President of the United States?",
            options: ["John Adams", "Thomas Jefferson", "George Washington", "Benjamin Franklin"],
            correctAnswer: "George Washington",
            difficulty: "easy"
        },
        {
            question: "What year did the Berlin Wall fall?",
            options: ["1987", "1989", "1991", "1993"],
            correctAnswer: "1989",
            difficulty: "medium"
        }
    ]
};

// Game state management
let currentQuestionIndex = 0;
let currentCategory = null;
let score = 0;
let questions = [];

// Function to get questions for a specific category
function getQuestionsForCategory(category) {
    return questionDatabase[category] || [];
}

// Function to shuffle questions (so they appear in random order)
function shuffleQuestions(questions) {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Function to start a new game
function startNewGame(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;
    questions = shuffleQuestions(getQuestionsForCategory(category));
    
    if (questions.length === 0) {
        alert("No questions available for this category!");
        return;
    }
    
    displayQuestion();
}

// Function to display the current question
function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }
    
    const question = questions[currentQuestionIndex];
    // This function will be implemented in the game.html file
    // It will update the UI with the current question and options
}

// Function to check answer
function checkAnswer(selectedAnswer) {
    const question = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    if (isCorrect) {
        score++;
    }
    
    // Show feedback to user
    showAnswerFeedback(isCorrect, question.correctAnswer);
    
    // Move to next question after a delay
    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
    }, 2000);
}

// Function to show answer feedback
function showAnswerFeedback(isCorrect, correctAnswer) {
    // This will be implemented in the game.html file
    // It will show whether the answer was correct or not
}

// Function to end the game
function endGame() {
    const percentage = Math.round((score / questions.length) * 100);
    alert(`Game Over! You scored ${score} out of ${questions.length} (${percentage}%)`);
    // Optionally redirect back to home page or show results page
}

// Function to skip question (for debugging/testing)
function skipQuestion() {
    currentQuestionIndex++;
    displayQuestion();
} 