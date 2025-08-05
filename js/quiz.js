    const QUESTIONS = [
        {
            label: 'Насколько хорошо вы знакомы с современными технологиями строительства?',
            answers: [
                'Пока только начинаю изучать',
                'Имею базовое представление',
                'Регулярно слежу за новыми материалами и подходами',
                'Участвую в проектах, связанных с инновациями в строительстве',
            ],
        },
        {
            label: 'Что для вас наиболее важно при изучении инноваций в строительстве?',
            answers: [
                'Энергоэффективность и энергосбережение',
                'Применение новых строительных материалов',
                'Устойчивое строительство и экология',
                'Повышение качества и скорости возведения объектов',
            ],
        },
        {
            label: 'Какой подход к технологиям строительства вам ближе?',
            answers: [
                'Изучение краткосрочных технологий и трендов',
                'Фокус на долговременных решениях в устойчивом строительстве',
                'Сравнение различных инновационных материалов и методов',
                'Постоянное обновление знаний о технологиях строительства',
            ],
        },
        {
            label: 'Какие цели вы ставите перед собой в изучении строительных инноваций?',
            answers: [
                'Создание базы знаний по энергосберегающим решениям',
                'Применение новых технологий в будущих проектах',
                'Углубление понимания устойчивого строительства',
                'Разработка собственных проектов с инновационными технологиями',
            ],
        },
    ];


const $container = document.getElementById('container');

const startStep = {
    render: () => {
        $container.innerHTML = `
      <div class="container quiz-wrapper">
    <div class="row quiz-content">
        <div class="col-lg-6 col-md-6 col-lg-6">
            <img class="quiz-img" src="img/quiz.jpg">
        </div>
        <div class="col-lg-6 col-md-6 col-lg-6">
            <h2 class="title">Погрузитесь в мир современных технологий строительства</h2>
            <h3 class="sub-title">Откройте для себя инновации в строительстве и устойчивое развитие</h3>
            <p class="text">Узнайте больше о новых материалах, технологиях строительства и энергосбережении. Этот опрос поможет вам лучше понять современные тренды в устойчивом строительстве.</p>
            <button class="btn btn-primary w-100 py-3 first-button" data-action="startQuiz">Начать</button>
        </div>
    </div>
</div>

      `;
    },
    onClick: (el) => {
        if (el.getAttribute('data-action') === 'startQuiz') {
            quiz.nextStep(questionsStep);
        }
    },
};

const questionsStep = {
    questionIndex: 0,
    answers: {},
    render: () => {
        const question = QUESTIONS[questionsStep.questionIndex];

        $container.innerHTML = `
        <div class="container quiz-wrapper">

            <div class="row quiz-content text-center">

                <div class="row justify-content-center mt-4" style="margin: 0 auto;">
                    <div class="progress col-md-6" style="padding-left: 0 !important; padding-right: 0 !important;">
                        <div class="progress-bar" style="width: ${questionsStep.getProgress()}%">${questionsStep.getProgress()}%</div>
                    </div>
                </div>

                <h3>${question.label}</h3>

                <div class="row answers">
                    ${question.answers
                        .map(
                            (answer, index) =>
                                `
                                <button class="answer col-md-12 col-lg-5 border rounded" data-action="selectAnswer" data-answer-index="${index}">
                                    ${answer}
                                </button>
                            `,
                        )
                        .join('')}
                </div>

            </div>
        </div>
      `;
    },
    getProgress: () =>
        Math.floor((questionsStep.questionIndex / QUESTIONS.length) * 100),
    onClick: (el) => {
        switch (el.getAttribute('data-action')) {
            case 'goToNextQuestion':
                return questionsStep.goToNextQuestion();
            case 'goToPreviousQuestion':
                return questionsStep.goToPreviousQuestion();
            case 'selectAnswer':
                return questionsStep.selectAnswer(
                    parseInt(el.getAttribute('data-answer-index'), 10),
                );
        }
    },
    goToPreviousQuestion: () => {
        questionsStep.questionIndex -= 1;
        questionsStep.render();
    },
    selectAnswer: (answerIndex) => {
        const question = QUESTIONS[questionsStep.questionIndex];
        const selectedAnswer = question.answers[answerIndex];

        questionsStep.answers = {
            ...questionsStep.answers,
            [question.label]: selectedAnswer,
        };

        if (questionsStep.isFinalQuestion()) {
            questionsStep.completeStep();
        } else {
            questionsStep.goToNextQuestion();
        }
    },
    isFinalQuestion: () => questionsStep.questionIndex === QUESTIONS.length - 1,
    goToNextQuestion: () => {
        questionsStep.questionIndex += 1;
        questionsStep.render();
    },
    completeStep: () => {
        quiz.setAnswers(questionsStep.answers);
        quiz.nextStep(finalStep);
    },
};

const finalStep = {
    render: () => {
        $container.innerHTML = `
    <div class="container quiz-wrapper">
    <div class="row quiz-content form-content">
        <div class="col-lg-6 col-md-6 col-sm-12 form-block">
            <form id="quiz-form">
                <h2 class="title" ">Последний шаг!</h2>
                <p class="text"  margin-bottom: 20px;">
                    Пожалуйста, заполните ваши данные, чтобы получить подробный профиль знаний по современным технологиям строительства.
                </p>

                <input class="form-control" name="name" type="text" placeholder="Максимилиан Вебер" required>
                <input class="form-control" name="email" type="email" placeholder="Ваш адрес электронной почты" required>

                <div class="checkbox" ">
                    <input type="checkbox" required id="privacyPolicy">
                    <label for="privacyPolicy">
                        Я принимаю
                        <a class="form-link" href="cookie-policy.html" target="_blank"  text-decoration: underline;">политику использования файлов cookie</a>,
                        <a class="form-link" href="privacy-policy.html" target="_blank"  text-decoration: underline;">политику конфиденциальности</a> и
                        <a class="form-link" href="terms-of-use.html" target="_blank"  text-decoration: underline;">условия использования</a>.
                    </label>
                </div>

                <div class="checkbox" ">
                    <input type="checkbox" id="newsletter" checked>
                    <label for="newsletter">Я хочу получать новости о технологиях строительства по электронной почте.</label>
                </div>

                ${Object.keys(quiz.answers)
                    .map(
                        (question) =>
                            `<input name="${question}" value="${quiz.answers[question]}" hidden>`
                    )
                    .join("")}

                <button type="submit" class="btn btn-primary w-100 py-3 first-button">Показать мой результат</button>
            </form>
        </div>
    </div>
</div>
      `;  document
            .getElementById("quiz-form")
            .addEventListener("submit", function (e) {
                e.preventDefault(); // evita el envío tradicional del formulario
                localStorage.setItem("quizDone", true);
                window.location.href = "thanks.html";
            });
    },
    onClick: (el) => {
        const newPath = 'thanks.html';
        if (el.getAttribute('data-action') === 'submitAnswers') {
            localStorage.setItem('quizDone', true);
            document.getElementById('main-page').classList.remove('hide');
            document.getElementById('quiz-page').classList.add('hide');
            document.getElementById('footer').classList.add('hide');
            window.location.href = newPath;
        }
    },
};

const quiz = {
    activeStep: startStep,
    answers: {},
    clear: () => ($container.innerHTML = ''),
    init: () => {
        $container.addEventListener('click', (event) =>
            quiz.activeStep.onClick(event.target),
        );
        $container.addEventListener('submit', (event) =>
            event.preventDefault(),
        );
    },
    render: () => {
        quiz.clear();
        quiz.activeStep.render();
    },
    nextStep: (step) => {
        quiz.activeStep = step;
        quiz.render();
    },
    setAnswers: (answers) => (quiz.answers = answers),
};

if (!localStorage.getItem('quizDone')) {
    document.getElementById('main-page').classList.add('hide');
    quiz.init();
    quiz.render();
}
