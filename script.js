const levels = [
    {
        title: "Level 1: Skattens Hemmelighed",
        description: "Ridderen Alex har fundet et gammelt kort, der viser vej til en skjult skat. For at finde skatten skal du hjælpe Alex med at bruge de rigtige verber til at løse gåderne på vejen.",
        verbs: [
            { infinitive: "go", past: "went", participle: "gone" },
            { infinitive: "see", past: "saw", participle: "seen" },
            { infinitive: "make", past: "made", participle: "made" },
            { infinitive: "take", past: "took", participle: "taken" },
            { infinitive: "come", past: "came", participle: "come" },
        ],
        questions: [
            { text: "Alex (go) to the ancient cave.", answer: "went", type: "past", verb: "go" },
            { text: "He (see) a strange light in the distance.", answer: "saw", type: "past", verb: "see" },
            { text: "Alex has (make) a plan to find the treasure.", answer: "made", type: "participle", verb: "make" },
            { text: "He (take) a deep breath before entering.", answer: "took", type: "past", verb: "take" },
            { text: "The treasure hunters have (come) from far away.", answer: "come", type: "participle", verb: "come" },
        ]
    },
    {
        title: "Level 2: Dragens Hule",
        description: "Alex står foran en frygtindgydende drage. Brug de rigtige verber til at hjælpe ham med at overliste dragen!",
        verbs: [
            { infinitive: "give", past: "gave", participle: "given" },
            { infinitive: "find", past: "found", participle: "found" },
            { infinitive: "speak", past: "spoke", participle: "spoken" },
            { infinitive: "run", past: "ran", participle: "run" },
            { infinitive: "hide", past: "hid", participle: "hidden" },
        ],
        questions: [
            { text: "Alex (give) the dragon a magical gem.", answer: "gave", type: "past", verb: "give" },
            { text: "He (find) a secret passage behind the dragon.", answer: "found", type: "past", verb: "find" },
            { text: "The dragon has (speak) to Alex in a deep voice.", answer: "spoken", type: "participle", verb: "speak" },
            { text: "Alex (run) quickly to avoid the dragon's fire.", answer: "ran", type: "past", verb: "run" },
            { text: "The treasure was (hide) in the deepest part of the cave.", answer: "hidden", type: "participle", verb: "hide" },
        ]
    },
    {
        title: "Level 3: Den Fortryllede Skov",
        description: "Alex er nået til en mystisk skov. Hjælp ham med at navigere gennem de magiske træer ved at bruge de rigtige verber!",
        verbs: [
            { infinitive: "grow", past: "grew", participle: "grown" },
            { infinitive: "know", past: "knew", participle: "known" },
            { infinitive: "write", past: "wrote", participle: "written" },
            { infinitive: "sing", past: "sang", participle: "sung" },
            { infinitive: "fall", past: "fell", participle: "fallen" },
        ],
        questions: [
            { text: "The magical trees (grow) taller overnight.", answer: "grew", type: "past", verb: "grow" },
            { text: "Alex (know) he had to be careful in this forest.", answer: "knew", type: "past", verb: "know" },
            { text: "Ancient runes were (write) on the tree bark.", answer: "written", type: "participle", verb: "write" },
            { text: "The forest spirits (sing) a mysterious melody.", answer: "sang", type: "past", verb: "sing" },
            { text: "A golden leaf has (fall) from the tallest tree.", answer: "fallen", type: "participle", verb: "fall" },
        ]
    },
    {
        title: "Level 4: Den Glemte By",
        description: "Alex opdager en skjult by i hjertet af skoven. Brug de rigtige verber til at udforske byens hemmeligheder!",
        verbs: [
            { infinitive: "build", past: "built", participle: "built" },
            { infinitive: "read", past: "read", participle: "read" },
            { infinitive: "forget", past: "forgot", participle: "forgotten" },
            { infinitive: "begin", past: "began", participle: "begun" },
            { infinitive: "choose", past: "chose", participle: "chosen" },
        ],
        questions: [
            { text: "The ancient city was (build) centuries ago.", answer: "built", type: "participle", verb: "build" },
            { text: "Alex (read) the inscriptions on the old buildings.", answer: "read", type: "past", verb: "read" },
            { text: "The city's location had been (forget) by the outside world.", answer: "forgotten", type: "participle", verb: "forget" },
            { text: "As night fell, the city (begin) to glow with magic.", answer: "began", type: "past", verb: "begin" },
            { text: "Alex has (choose) to explore the mysterious tower.", answer: "chosen", type: "participle", verb: "choose" },
        ]
    }
];

let currentLevel = 0;
let score = 0;
let learnedVerbs = [];
let attemptCounts = {};
let answeredQuestions = new Set();

const introContent = `
    <h2>Velkommen til Verbenes Eventyr!</h2>
    <p>Før vi begynder vores rejse, lad os forstå forskellen mellem regelmæssige og uregelmæssige verber:</p>
    <ul>
        <li><strong>Regelmæssige verber</strong> følger et fast mønster, når de bøjes i datid og perfektum participium. For eksempel tilføjes ofte '-ed' i engelsk (play → played → played).</li>
        <li><strong>Uregelmæssige verber</strong> følger ikke dette mønster. Deres bøjninger må læres udenad, da de kan ændre sig på uforudsigelige måder (go → went → gone).</li>
    </ul>
    <p>I dette spil vil du møde mange uregelmæssige verber. Held og lykke med at mestre dem alle!</p>
    <button id="start-game-button">Start Eventyret</button>
`;

const congratulationsContent = `
    <h2>Tillykke, du har gennemført Verbenes Eventyr!</h2>
    <p>Du har vist exceptionelle færdigheder i at mestre uregelmæssige verber. Din rejse gennem det magiske rige har ikke kun reddet landet, men også beriget dit sprog!</p>
    <p>Husk, at hvert verbum du har lært er et nyt værktøj i din sproglige værktøjskasse. Brug dem ofte, og de vil forblive skarpe og klar til brug.</p>
    <p>Din score: <span id="final-score"></span></p>
    <button id="restart-game-button">Start et nyt eventyr</button>
`;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').addEventListener('click', showIntro);
});

function showIntro() {
    const gameScreen = document.getElementById('game-screen');
    gameScreen.innerHTML = introContent;
    gameScreen.classList.remove('hidden');
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('start-game-button').addEventListener('click', startGame);
}

function startGame() {
    document.getElementById('game-screen').innerHTML = `
        <h2 id="level-title"></h2>
        <p id="level-description"></p>
        <div id="game-area"></div>
        <div id="progress-container">
            <div id="progress-bar">
                <div id="progress-fill"></div>
            </div>
            <p id="progress-text"></p>
        </div>
    `;
    document.getElementById('learned-verbs-container').classList.remove('hidden');
    loadLevel(currentLevel);
}

function loadLevel(levelIndex) {
    const level = levels[levelIndex];
    document.getElementById('level-title').textContent = level.title;
    document.getElementById('level-description').textContent = level.description;
    
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';
    
    level.questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = `
            <p>${question.text}</p>
            <div class="answer-container">
                <input type="text" id="answer-${index}" placeholder="Skriv svaret her">
                <button onclick="checkAnswer(${index})">Svar</button>
            </div>
        `;
        gameArea.appendChild(questionElement);
        
        document.getElementById(`answer-${index}`).addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                checkAnswer(index);
            }
        });
    });
    
    attemptCounts = {};
    answeredQuestions.clear();
    updateProgressBar();
}

function checkAnswer(questionIndex) {
    if (answeredQuestions.has(questionIndex)) return;

    const level = levels[currentLevel];
    const question = level.questions[questionIndex];
    const userAnswer = document.getElementById(`answer-${questionIndex}`).value.toLowerCase().trim();
    
    attemptCounts[questionIndex] = (attemptCounts[questionIndex] || 0) + 1;
    
    if (userAnswer === question.answer) {
        handleCorrectAnswer(question, questionIndex);
    } else {
        handleIncorrectAnswer(question, questionIndex);
    }
    
    updateProgressBar();
    checkLevelCompletion();
}

function handleCorrectAnswer(question, questionIndex) {
    playSound('correct-sound');
    showEncouragementWithVerb(question.verb);
    addLearnedVerb(question.verb);
    score += 10;
    document.getElementById(`answer-${questionIndex}`).disabled = true;
    answeredQuestions.add(questionIndex);
}

function showEncouragementWithVerb(verb) {
    const encouragements = [
        "Fantastisk arbejde!",
        "Du er en sand verbmester!",
        "Imponerende! Bliv ved sådan!",
        "Du har virkelig styr på de uregelmæssige verber!",
        "Wauw! Du lærer hurtigt!"
    ];
    const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
    const verbInfo = levels[currentLevel].verbs.find(v => v.infinitive === verb);
    
    const message = `
        ${randomEncouragement}<br><br>
        Dette er et uregelmæssigt verbum:<br>
        Infinitiv: ${verbInfo.infinitive}<br>
        Datid: ${verbInfo.past}<br>
        Perfektum participium: ${verbInfo.participle}
    `;
    
    showFeedback(message, true);
}

function showFeedback(message, isCorrect) {
    const feedbackPopup = document.getElementById('feedback-popup');
    const feedbackText = document.getElementById('feedback-text');
    feedbackText.innerHTML = message;
    feedbackPopup.classList.remove('hidden');
    feedbackPopup.style.backgroundColor = isCorrect ? 'rgba(0, 128, 0, 0.8)' : 'rgba(255, 0, 0, 0.8)';
    
    setTimeout(() => {
        feedbackPopup.classList.add('hidden');
    }, 3000);
}

function handleIncorrectAnswer(question, questionIndex) {
    playSound('incorrect-sound');
    if (attemptCounts[questionIndex] >= 3) {
        showFeedback(`Desværre, det rigtige svar er: ${question.answer}`, false);
        document.getElementById(`answer-${questionIndex}`).value = question.answer;
        document.getElementById(`answer-${questionIndex}`).disabled = true;
        answeredQuestions.add(questionIndex);
    } else {
        showFeedback('Desværre, prøv igen!', false);
    }
}

function checkLevelCompletion() {
    if (answeredQuestions.size === levels[currentLevel].questions.length) {
        setTimeout(() => {
            currentLevel++;
            if (currentLevel < levels.length) {
                showFeedback('Godt klaret! Lad os gå videre til næste niveau.', true);
                setTimeout(() => {
                    loadLevel(currentLevel);
                }, 2000);
            } else {
                showCongratulations();
            }
        }, 1000);
    }
}

function showCongratulations() {
    const gameScreen = document.getElementById('game-screen');
    gameScreen.innerHTML = congratulationsContent;
    document.getElementById('final-score').textContent = `${score} point`;
    document.getElementById('restart-game-button').addEventListener('click', restartGame);
    document.getElementById('learned-verbs-container').classList.add('hidden');
}

function restartGame() {
    currentLevel = 0;
    score = 0;
    learnedVerbs = [];
    attemptCounts = {};
    answeredQuestions.clear();
    showIntro();
}

function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const totalQuestions = levels.reduce((sum, level) => sum + level.questions.length, 0);
    const progress = (score / (totalQuestions * 10)) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${score / 10} / ${totalQuestions} spørgsmål besvaret`;
}

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0;
    sound.play().catch(error => console.error('Error playing sound:', error));
}

function addLearnedVerb(verb) {
    const verbInfo = levels[currentLevel].verbs.find(v => v.infinitive === verb);
    if (!learnedVerbs.some(v => v.infinitive === verb)) {
        learnedVerbs.push(verbInfo);
        updateLearnedVerbsList();
    }
}

function updateLearnedVerbsList() {
    const learnedVerbsList = document.getElementById('learned-verbs-list');
    learnedVerbsList.innerHTML = '';
    learnedVerbs.forEach(verb => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${verb.infinitive}</strong><br>
            Datid: ${verb.past}<br>
            Perfektum: ${verb.participle}
        `;
        learnedVerbsList.appendChild(li);
    });
}