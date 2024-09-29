const jsonData = {
    "fondamentaux": {
        "Quelle est la première étape du processus de vente ?": ["La prospection", "La négociation", "La conclusion"],
        "Quel est l'objectif principal d'une étude de marché ?": ["Comprendre le comportement des consommateurs", "Augmenter les ventes", "Réduire les coûts"],
        "Qu'est-ce qu'un argument de vente ?": ["Une raison pour convaincre un client", "Un produit", "Un prix"],
        "Qu'est-ce que la fidélisation client ?": ["Maintenir une relation continue avec un client", "Attirer de nouveaux clients", "Augmenter les prix"],
        "Quelle est l'importance d'un bon service client ?": ["Améliorer la satisfaction et la fidélité des clients", "Réduire les coûts de production", "Augmenter le nombre de produits"],
        "Qu'est-ce qu'une proposition de valeur ?": ["Un avantage unique offert aux clients", "Le prix d'un produit", "Une publicité"],
        "Quel est le rôle d'un vendeur dans le processus de vente ?": ["Comprendre les besoins des clients et proposer des solutions", "Produire des biens", "Fixer les prix"],
        "Comment définir un marché cible ?": ["Identifier le groupe de consommateurs le plus susceptible d'acheter un produit", "Analyser les tendances économiques", "Déterminer le prix d'un produit"],
        "Quel est le but d'une campagne publicitaire ?": ["Promouvoir un produit ou service", "Réduire les coûts de production", "Analyser le comportement des concurrents"],
        "Qu'est-ce qu'une stratégie de prix ?": ["La méthode utilisée pour fixer le prix d'un produit", "La création d'un produit", "La distribution de produits"],
        "Quel est le rôle de la segmentation du marché ?": ["Diviser le marché en groupes homogènes pour mieux cibler les clients", "Augmenter les ventes", "Réduire les coûts de production"],
        "Qu'est-ce que le positionnement ?": ["La perception d'un produit par rapport à ses concurrents", "La stratégie de vente", "La distribution des produits"],
        "Quel est l'impact des réseaux sociaux sur le marketing ?": ["Augmenter l'engagement des clients", "Réduire les coûts", "Améliorer la production"],
        "Qu'est-ce qu'un plan marketing ?": ["Un document stratégique qui définit les objectifs de marketing", "Un rapport financier", "Une liste de produits à vendre"],
        "Pourquoi est-il important de connaître son client ?": ["Pour personnaliser l'offre et augmenter les ventes", "Pour réduire les coûts", "Pour améliorer la production"]
    }
};

let questions = Object.keys(jsonData.fondamentaux);
let currentQuestionIndex = 0;
let canClick = true;

document.getElementById('play-again-button').addEventListener('click', resetGame);
document.getElementById('stop-button').addEventListener('click', () => {
    alert('Game stopped. You can play again later!');
});

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        alert('No more questions.');
        return;
    }

    canClick = true; // Allow clicking for the new question
    const question = questions[currentQuestionIndex];
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');

    questionElement.textContent = question;
    optionsContainer.innerHTML = ''; // Clear previous options

    const correctAnswers = jsonData.fondamentaux[question];
    const options = getRandomAnswers(correctAnswers, 3, 'fondamentaux');

    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => handleOptionClick(optionElement, option, correctAnswers));
        optionsContainer.appendChild(optionElement);
    });
}

function handleOptionClick(element, answer, correctAnswers) {
    if (!canClick) return; // Prevent further clicks

    canClick = false; // Disable clicking

    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.add('disabled'));

    const isCorrect = correctAnswers.includes(answer);
    if (isCorrect) {
        element.classList.add('correct');
        updateScore('right');
    } else {
        element.classList.add('incorrect');
        updateScore('not-right');
    }

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1000);
}

function updateScore(type) {
    const scoreElement = document.getElementById(type);
    let score = parseInt(scoreElement.textContent);
    scoreElement.textContent = score + 1;
}

function getRandomAnswers(correctAnswers, count, questionType) {
    const allAnswers = Object.values(jsonData[questionType]).flat();
    const availableAnswers = allAnswers.filter(answer => !correctAnswers.includes(answer));

    // Ensure enough unique answers
    if (availableAnswers.length < (count - 1)) {
        throw new Error('Not enough unique answers available');
    }

    // Start with one correct answer
    const options = [correctAnswers[0]];

    // Randomly select additional incorrect answers
    while (options.length < count) {
        const randomIndex = Math.floor(Math.random() * availableAnswers.length);
        const randomAnswer = availableAnswers[randomIndex];
        availableAnswers.splice(randomIndex, 1); // Remove used answer
        options.push(randomAnswer);
    }

    // Shuffle the options
    return options.sort(() => Math.random() - 0.5);
}

function resetGame() {
    currentQuestionIndex = 0;
    document.getElementById('right').textContent = '0';
    document.getElementById('not-right').textContent = '0';
    loadQuestion();
}

// Start the game
loadQuestion();