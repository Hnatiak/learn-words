const jsonData = {
    "translate": {
        "Bouleversements de l'environnement": "Зміни в довкіллі",
        "Notamment": "Зокрема",
        "Défini": "Визначений",
        "Démarche": "Підхід",
        "L'influence du développement": "Вплив розвитку",
        "Évoquerons les métiers offerts": "Згадаємо запропоновані професії",
        "Définition": "Визначення",
        "Ayant": "Маючи",
        "D'adapter": "Адаптувати",
        "Offre": "Пропозиція",
        "Consommateurs": "Споживачі",
        "Il suppose que": "Він припускає, що",
        "Les attentes": "Очікування",
        "Clientèle": "Клієнтура",
        "De répondre": "Відповісти",
        "Des désirs": "Бажання",
        "De nombreuses approches": "Численні підходи",
        "De la notion de": "Поняття про",
        "Enrichir": "Збагачувати",
        "État d'esprit": "Стан розуму / настрій",
        "Qui anime": "Який спонукає / надихає",
        "Dirigeants": "Керівники",
        "La satisfaction": "Задоволення",
        "Des consommateurs": "Споживачів",
        "Ensemble de techniques": "Сукупність методів",
        "De décision": "Прийняття рішень",
        "Permettre": "Дозволяти",
        "Satisfaire": "Задовольняти",
        "Garantissant": "Гарантуючи",
        "Le profit à long terme": "Довгостроковий прибуток",
        "Être amené à faire appel": "Бути змушеним звертатися",
        "Diverses": "Різні",
        "Marketing générique": "Загальний маркетинг",
        "Approche (Une troisième approche)": "Підхід (Третій підхід)",
        "Généralisable": "Узагальнюваний",
        "Des moyens dont dispose": "Засоби, якими володіє",
        "Promouvoir": "Просувати",
        "Auxquels": "До яких",
        "Des comportements favorables": "Сприятлива поведінка",
        "Propres": "Власні",
        "Peut être mis": "Може бути застосований",
        "Œuvre": "Робота / діяльність",
        "Non marchand (par)": "Некомерційний (за допомогою)",
        "Des entreprises": "Підприємства",
        "Profit": "Прибуток",
        "Conséquent": "Значний",
        "L'attitude": "Ставлення",
        "Consiste à": "Полягає в тому, щоб",
        "Agir": "Діяти",
        "Efficacement": "Ефективно",
        "De façon": "Способом / таким чином",
        "Permanente": "Постійно",
        "Se décompose en": "Поділяється на",
        "Étude de marché": "Дослідження ринку",
        "Sélection de la cible": "Вибір цільової аудиторії",
        "Détermination des moyens marketing": "Визначення маркетингових засобів",
        "Mise en œuvre et évaluation des résultats": "Реалізація та оцінка результатів",
        "Achat": "Купівля / Придбання",
        "Traiter": "Обробляти / Вирішувати",
        "Les objections": "Заперечення",
        "Gérer": "Керувати / Управляти",
        "Réclamation": "Претензія / Скарга",
        "Améliorer": "Покращувати",
        "A subi": "Зазнав",
        "Transformation radicale": "Радикальна трансформація",
        "Redéfinissant": "Переосмислюючи / перевизначаючи",
        "La manière": "Спосіб",
        "Dont": "Яким / за допомогою якого",
        "Interagissent": "Взаємодіють",
        "Effectuent": "Здійснюють",
        "D'omnicanalité": "Омніканальність",
        "Une approche": "Підхід",
        "Transcende": "Виходить за межі / перевищує",
        "Frontières": "Межі / кордони",
        "Des canaux": "Канали",
        "En intégrant": "Інтегруючи",
        "Harmonieusement": "Гармонійно",
        "Hors ligne": "Офлайн"
    }
};

let questions = Object.keys(jsonData.translate);
let currentQuestionIndex = 0;

function getRandomAnswers(correctAnswers, count) {
    // Create a list of all possible answers
    const allAnswers = Object.values(jsonData.translate);

    // Flatten the list of all answers
    const flatAnswers = allAnswers.flat();

    // Remove the correct answers from the list of all answers
    const availableAnswers = flatAnswers.filter(answer => !correctAnswers.includes(answer));

    // Ensure there are enough unique answers
    if (availableAnswers.length < (count - 1)) {
        throw new Error('Not enough unique answers available');
    }

    // Initialize options with the correct answer
    const options = [correctAnswers[0]];

    // Add random unique answers to the options
    while (options.length < count) {
        const randomIndex = Math.floor(Math.random() * availableAnswers.length);
        const randomAnswer = availableAnswers[randomIndex];
        availableAnswers.splice(randomIndex, 1); // Remove used answer
        options.push(randomAnswer);
    }

    // Shuffle the options
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    return options;
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        alert('No more questions. You can stop the game.');
        return;
    }
    
    const question = questions[currentQuestionIndex];
    const correctAnswers = jsonData.translate[question];
    
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    
    questionElement.textContent = question;
    
    optionsContainer.innerHTML = ''; // Clear previous options

    // Generate a list of options including one correct answer and some random ones
    const options = getRandomAnswers(Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers], 3);
    
    // Ensure one option is correct
    if (correctAnswers.length > 0) {
        const correctAnswer = Array.isArray(correctAnswers) ? correctAnswers[Math.floor(Math.random() * correctAnswers.length)] : correctAnswers;
        if (!options.includes(correctAnswer)) {
            options[Math.floor(Math.random() * options.length)] = correctAnswer;
        }
    }

    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => handleOptionClick(optionElement, option));
        optionsContainer.appendChild(optionElement);
    });
}

function handleOptionClick(element, answer) {
    // Заблокувати всі варіанти після першого кліку
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.add('disabled'));

    const question = questions[currentQuestionIndex];
    const correctAnswers = jsonData.translate[question];
    const isCorrect = Array.isArray(correctAnswers) ? correctAnswers.includes(answer) : correctAnswers === answer;

    if (isCorrect) {
        element.classList.add('correct');

        const rightElement = document.getElementById('right');
        let rightCount = parseInt(rightElement.textContent);
        rightElement.textContent = rightCount + 1;
    } else {
        element.classList.add('incorrect');

        const notRightElement = document.getElementById('not-right');
        let notRightCount = parseInt(notRightElement.textContent);
        notRightElement.textContent = notRightCount + 1;
    }
    
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1000);
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        alert('No more questions. You can stop the game.');
        return;
    }
    
    const question = questions[currentQuestionIndex];
    const correctAnswers = jsonData.translate[question];
    
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    
    questionElement.textContent = question;
    
    optionsContainer.innerHTML = ''; // Clear previous options

    // Generate a list of options including one correct answer and some random ones
    const options = getRandomAnswers(Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers], 3);
    
    // Ensure one option is correct
    if (correctAnswers.length > 0) {
        const correctAnswer = Array.isArray(correctAnswers) ? correctAnswers[Math.floor(Math.random() * correctAnswers.length)] : correctAnswers;
        if (!options.includes(correctAnswer)) {
            options[Math.floor(Math.random() * options.length)] = correctAnswer;
        }
    }

    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => {
            // Перевіряємо, чи варіант не заблокований
            if (!optionElement.classList.contains('disabled')) {
                handleOptionClick(optionElement, option);
            }
        });
        optionsContainer.appendChild(optionElement);
    });
}

function resetGame() {
    currentQuestionIndex = 0;
    loadQuestion();
}

document.getElementById('stop-button').addEventListener('click', () => {
    alert('Game stopped.');
    currentQuestionIndex = questions.length; // End the game
});

document.getElementById('play-again-button').addEventListener('click', () => {
    resetGame();
});

loadQuestion();