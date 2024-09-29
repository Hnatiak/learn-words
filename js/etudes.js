const jsonData = {
    "etudes": {
        "Qu'est-ce qu'un segment de marché ?": ["Un groupe de consommateurs partageant des caractéristiques similaires", "Un produit", "Un prix"],
        "Quel outil est couramment utilisé pour analyser la concurrence ?": ["La matrice SWOT", "Le diagramme de Gantt", "La pyramide de Maslow"],
        "Quelle est la principale fonction du marketing ?": ["Satisfaire les besoins des consommateurs", "Augmenter les ventes", "Réduire les coûts"],
        "Qu'est-ce qu'une étude de marché ?": ["Une recherche sur les besoins des consommateurs", "Une étude sur les coûts de production", "Un rapport financier"],
        "Quel est l'objectif principal d'un plan marketing ?": ["Atteindre des objectifs de vente", "Comprendre la concurrence", "Réduire les coûts de production"],
        "Quel est le rôle d'un persona marketing ?": ["Représenter un segment de clients", "Définir le prix d'un produit", "Créer une publicité"],
        "Qu'est-ce que le mix marketing ?": ["La combinaison de produit, prix, place et promotion", "Une analyse financière", "Un type de publicité"],
        "Comment peut-on mesurer la satisfaction client ?": ["En réalisant des enquêtes", "En augmentant les prix", "En lançant de nouveaux produits"],
        "Qu'est-ce qu'un avantage concurrentiel ?": ["Un attribut qui rend une entreprise meilleure que ses concurrents", "Une réduction des coûts", "Une augmentation de la production"],
        "Quel est l'impact des réseaux sociaux sur le marketing ?": ["Ils permettent une communication directe avec les consommateurs", "Ils augmentent les coûts publicitaires", "Ils remplacent le marketing traditionnel"],
        "Quel type de données peut être utilisé pour analyser le comportement des consommateurs ?": ["Données démographiques", "Données psychographiques", "Toutes les réponses ci-dessus"],
        "Quelle stratégie consiste à augmenter les prix pour maximiser le profit ?": ["La stratégie de prix d'écrémage", "La stratégie de pénétration", "La stratégie de différenciation"],
        "Qu'est-ce que le marketing de contenu ?": ["Créer et distribuer du contenu pertinent pour attirer une audience", "Vendre des produits en ligne", "Promouvoir des événements"],
        "Quelle est la définition du branding ?": ["Le processus de création d'une image de marque", "Le coût de production d'un produit", "La vente de produits de marque"],
        "Quel est le but de la publicité en ligne ?": ["Atteindre une audience ciblée à moindre coût", "Augmenter les coûts de marketing", "Réduire la visibilité d'une marque"]
    }
};

let questions = Object.keys(jsonData.etudes);
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

    const correctAnswers = jsonData.etudes[question];
    const options = getRandomAnswers(correctAnswers, 3, 'etudes');

    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => {
            handleOptionClick(optionElement, option, correctAnswers);
        });
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

loadQuestion();