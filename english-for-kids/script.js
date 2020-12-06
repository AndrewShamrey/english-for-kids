let cardsPages;
if (localStorage.getItem('allСards') - 0 === 0) {
    createCardsArray();
    localStorage.setItem(`allСards`, JSON.stringify(cardsPages));
} else {
    cardsPages = JSON.parse(localStorage.getItem('allСards'));
}


//For burger
let burgerBtn = document.querySelector('.burger-container');
let burgerBack = document.querySelector('.menu-back');
let burgerMenu = document.querySelector('.menu');
let isBurgerOpen = false;
let isSoundOn;
let isMainPage;
let isStatsPage;
let zerosCards = false;
let burgerLeftParameter;
let menuLeftParameter;
let firstScreenCheck = 900;
let secondScreenCheck = 768;
let thirdScreenCheck = 490;

if (screen.width > firstScreenCheck) {
    burgerLeftParameter = '200px';
    menuLeftParameter = '-30%';
} else if (screen.width > secondScreenCheck) {
    burgerLeftParameter = '150px';
    menuLeftParameter = '-30%';
} else if (screen.width > thirdScreenCheck) {
    burgerLeftParameter = '190px';
    menuLeftParameter = '-50%';
} else {
    burgerLeftParameter = '90%';
    menuLeftParameter = '-100%';
}

function burgerFn() {
    isBurgerOpen = !isBurgerOpen;
    window.scrollTo(top);
    document.body.style.overflowY = isBurgerOpen ? 'hidden' : 'visible';
    burgerBtn.classList.toggle('active-burger');
    burgerBtn.style.left = isBurgerOpen ? burgerLeftParameter : '0';
    burgerBack.style.visibility = isBurgerOpen ? 'visible' : 'hidden';
    burgerMenu.style.left = isBurgerOpen ? '0' : menuLeftParameter;
}
burgerBtn.addEventListener('click', burgerFn);


//For switch train and game
let trainSpan = document.querySelector('span.train');
let playSpan = document.querySelector('span.play');
let startGameBtn = document.querySelector('.start-game-btn');
let starsContainer = document.querySelector('.stars-container');

function switchTrainPlay(e) {
    if (e.target === burgerBack || e.target === statsBtn) burgerFn();
    if (e.target.closest('div') !== document.querySelector('div.check')) return;
    if (document.querySelector('input#check').checked) {
        startGameBtn.style.visibility = 'visible';
        starsContainer.style.visibility = 'visible';
        isSoundOn = false;
        trainSpan.style.left = '100%';
        playSpan.style.right = '0';
        burgerMenu.style.background = 'linear-gradient(90deg, rgb(20, 233, 252), rgb(23, 222, 248), rgb(26, 212, 244), rgb(29, 201, 240), rgb(32, 190, 236), rgb(35, 179, 232), rgb(39, 169, 227), rgb(42, 158, 223), rgb(45, 147, 219), rgb(48, 136, 215), rgb(51, 126, 211), rgb(54, 115, 207))';
        if (isMainPage) {
            for (let i = 0; i < mainPageArray.length; i++) {
                document.querySelectorAll('.card-on-main-page')[i].classList.remove('card-on-main-page-train');
                document.querySelectorAll('.card-on-main-page')[i].classList.add('card-on-main-page-play');
            }
            for (let j = 0; j < mainPageArray.length; j++) {
                document.querySelectorAll('.card-on-main-page p')[j].style.color = 'rgb(51, 126, 211)';
            }
        } else {
            for (let i = 0; i < document.querySelectorAll('.card-on-page').length; i++) {
                document.querySelectorAll('.card-on-page')[i].classList.remove('card-on-page-train');
                document.querySelectorAll('.card-on-page')[i].classList.add('card-on-page-play');
            }          
            for (let i = 0; i < document.querySelectorAll('.card-on-page').length; i++) {
                document.querySelectorAll('.card-on-page .flip-btn')[i].style.visibility = 'hidden';
            }          
            for (let i = 0; i < document.querySelectorAll('.card-on-page').length; i++) {
                document.querySelectorAll('.front > div > img')[i].style.marginTop = '40px';
                document.querySelectorAll('.front > div > img')[i].style.transform = 'scale(1.08)';
            }
            for (let j = 0; j < document.querySelectorAll('.card-on-page').length * 2; j++) {
                document.querySelectorAll('.card-on-page p')[j].style.color = 'rgb(51, 126, 211)';
                document.querySelectorAll('.card-on-page p')[j].style.visibility = 'hidden';
            }  
        }
    } else {
        startGameBtn.style.visibility = 'hidden';
        starsContainer.style.visibility = 'hidden';
        isSoundOn = true;
        trainSpan.style.left = '0';
        playSpan.style.right = '100%';
        burgerMenu.style.background = 'linear-gradient(90deg, #f19af3, #f099b5)';
        if (countOfClicks > 0) {
            starsContainer.innerHTML = '';
            changeStartBtn();
            countOfClicks = 0;
            for (let i = 0; i < document.querySelectorAll('.card-on-page').length; i++) {
                document.querySelectorAll('.card-on-page')[i].style.opacity = '1';
                document.querySelectorAll('.card-on-page')[i].classList.remove('disabled');
            }
        }
        if (isMainPage) {
            for (let i = 0; i < mainPageArray.length; i++) {
                document.querySelectorAll('.card-on-main-page')[i].classList.add('card-on-main-page-train');
                document.querySelectorAll('.card-on-main-page')[i].classList.remove('card-on-main-page-play');
            }
            for (let j = 0; j < mainPageArray.length; j++) {
                document.querySelectorAll('.card-on-main-page p')[j].style.color = '#f19af3';
            }
        } else {
            for (let i = 0; i < document.querySelectorAll('.card-on-page').length; i++) {
                document.querySelectorAll('.card-on-page')[i].classList.add('card-on-page-train');
                document.querySelectorAll('.card-on-page')[i].classList.remove('card-on-page-play');
            }
            for (let i = 0; i < document.querySelectorAll('.card-on-page').length; i++) {
                document.querySelectorAll('.card-on-page .flip-btn')[i].style.visibility = 'visible';
            }          
            for (let i = 0; i < document.querySelectorAll('.card-on-page').length; i++) {
                document.querySelectorAll('.front > div > img')[i].style.marginTop = '0';
                document.querySelectorAll('.front > div > img')[i].style.transform = 'scale(1)';
            }
            for (let j = 0; j < document.querySelectorAll('.card-on-page').length * 2; j++) {
                document.querySelectorAll('.card-on-page p')[j].style.color = '#f19af3';
                document.querySelectorAll('.card-on-page p')[j].style.visibility = 'visible';
            }  
        }
    }
}
document.addEventListener('click', switchTrainPlay);

 

//For Main Page contain
let cardsTitle = document.querySelector('h2.title');
let cardsContainer = document.querySelector('.cards');
let audioContainer = document.querySelector('.audio-container');
let statsContainer = document.querySelector('.stats-container');
let statsTbody = document.querySelector('.stats-container tbody');
let mainPageArray = ['Food', 'Animals', 'Colors', 'Emotions', 'Actions', 'Body', 'Family', 'Home'];
let isFinish = false;
let countOfClicks = 0;

function containMainPage() {
    document.querySelector('footer').style.visibility = 'visible';
    statsContainer.style.visibility = 'hidden';
    statsContainer.style.height = '0';
    isStatsPage = false;
    zerosCards = false;
    isMainPage = true;
    isFinish = false;
    cardsTitle.textContent = 'Main page';
    cardsContainer.innerHTML = '';
    audioContainer.innerHTML = '';
    starsContainer.innerHTML = '';
    statsTbody.innerHTML = '';
    if (countOfClicks > 0) {
        changeStartBtn();
        countOfClicks = 0;
    }
    for (let i = 0; i < mainPageArray.length; i++) {
        const currentCard = document.createElement('div');
        currentCard.classList.add('card-on-main-page');
        if (document.querySelector('input#check').checked) currentCard.classList.add('card-on-main-page-play');
        else currentCard.classList.add('card-on-main-page-train');
        cardsContainer.append(currentCard);
        const currentCardImageDiv = document.createElement('div');
        currentCardImageDiv.style.background = pagesArray[i].background;
        currentCard.append(currentCardImageDiv);
        const currentCardImage = document.createElement('img');
        currentCardImage.src = `assets/img/${pagesArray[i].name}/${pagesArray[i].name}.png`;
        currentCardImage.alt = pagesArray[i].name;
        currentCardImageDiv.append(currentCardImage);
        const currentCardTitle = document.createElement('p');
        currentCardTitle.textContent = pagesArray[i].name;
        if (document.querySelector('input#check').checked) currentCardTitle.style.color = 'rgb(51, 126, 211)';
        else currentCardTitle.style.color = '#f19af3';
        currentCard.append(currentCardTitle);

        currentCard.addEventListener('click', () => {
            changeActiveLiCards(i)
            containCardsPages(i);
        });
    }
}

let pagesArray = [
    {name: "food", background: "pink"},
    {name: "animals", background: "blue"},
    {name: "colors", background: "green"},
    {name: "emotions", background: "grey"},
    {name: "actions", background: "yellow"},
    {name: "body", background: "red"},
    {name: "family", background: "orange"},
    {name: "home", background: "violet"}
];

containMainPage();
document.querySelector('.buttons h1').addEventListener('click', () => {
    for (let k = 0; k < document.querySelectorAll('.ul-burger li').length; k++) {
        document.querySelectorAll('.ul-burger li')[k].classList.remove('active');
    }
    document.querySelectorAll('.ul-burger li')[0].classList.add('active');
    containMainPage();
});


//For contain cards pages
let currentPage;
function containCardsPages(i) {
    statsContainer.style.visibility = 'hidden';
    statsContainer.style.height = '0';
    isSoundOn = document.querySelector('input#check').checked ? false : true;
    isStatsPage = false;
    zerosCards = false;
    isMainPage = false;
    isFinish = false;
    cardsContainer.innerHTML = '';
    audioContainer.innerHTML = '';
    starsContainer.innerHTML = '';
    statsTbody.innerHTML = '';
    if (countOfClicks > 0) {
        changeStartBtn();
        countOfClicks = 0;
    }

    currentPage = i;
    cardsTitle.textContent = i < cardsPages.length ? pagesArray[i].name : 'repeat';
    let currentSource = i < cardsPages.length ? cardsPages[i] : difficultWords;
    if (currentSource.length === 0) {
        zerosCards = true;
        cardsTitle.textContent = 'go to ghe main page';
    }

    for (let j = 0; j < currentSource.length; j++) {
        const currentCard = document.createElement('div');
        currentCard.classList.add('card-on-page');
        if (document.querySelector('input#check').checked) currentCard.classList.add('card-on-page-play');
        else currentCard.classList.add('card-on-page-train');
        cardsContainer.append(currentCard);

        const front = document.createElement('div');
        front.classList.add('front');
        currentCard.append(front);
        const currentCardImageDiv = document.createElement('div');
        front.append(currentCardImageDiv);
        const currentCardImage = document.createElement('img');
        currentCardImage.src = currentSource[j].image;
        currentCardImage.alt = currentSource[j].word;
        if (document.querySelector('input#check').checked) {
            currentCardImage.style.marginTop = '40px';
            currentCardImage.style.transform = 'scale(1.08)';
        } else {
            currentCardImage.style.marginTop = '0';
            currentCardImage.style.transform = 'scale(1)';
        }
        currentCardImageDiv.append(currentCardImage);
        const currentCardTitle = document.createElement('p');
        currentCardTitle.textContent = currentSource[j].word;
        if (document.querySelector('input#check').checked) currentCardTitle.style.color = 'rgb(51, 126, 211)';
        else currentCardTitle.style.color = '#f19af3';
        front.append(currentCardTitle);
        if (document.querySelector('input#check').checked) currentCardTitle.style.visibility = 'hidden';
        else currentCardTitle.style.visibility = 'visible';

        const flipCardBtn = document.createElement('img');
        flipCardBtn.classList.add('flip-btn');
        flipCardBtn.src = 'assets/img/arrow.svg';
        flipCardBtn.alt = 'rotate';
        currentCardTitle.append(flipCardBtn);
        flipCardBtn.addEventListener('click', () => {
            flipCard(j);
        });
        if (document.querySelector('input#check').checked) flipCardBtn.style.visibility = 'hidden';
        else flipCardBtn.style.visibility = 'visible';


        const back = document.createElement('div');
        back.classList.add('back');
        currentCard.append(back);
        const backCurrentCardImageDiv = document.createElement('div');
        back.append(backCurrentCardImageDiv);
        const backCurrentCardImage = document.createElement('img');
        backCurrentCardImage.src = currentSource[j].image;
        backCurrentCardImage.alt = currentSource[j].word;
        backCurrentCardImageDiv.append(backCurrentCardImage);
        const backCurrentCardTitle = document.createElement('p');
        backCurrentCardTitle.textContent = currentSource[j].translation;
        if (document.querySelector('input#check').checked) backCurrentCardTitle.style.color = 'rgb(51, 126, 211)';
        else backCurrentCardTitle.style.color = '#f19af3';
        back.append(backCurrentCardTitle);


        const audio = document.createElement('audio');
        audio.src = currentSource[j].audioSrc;
        audioContainer.append(audio)
        currentCard.addEventListener('click', (e) => {
            playSound(e, j);
        });

        currentCard.addEventListener("mouseleave", function () {
            if (currentCard.classList.contains('flip')) flipCard(j);
        });
    }
}


//For finish game 
function containPicture() {
    document.querySelector('footer').style.visibility = 'hidden';
    isFinish = true;
    cardsContainer.innerHTML = '';
    const finishBack = document.createElement('div');
    finishBack.classList.add('finish-back');
    cardsContainer.append(finishBack);

    const finishDiv = document.createElement('div');
    finishDiv.classList.add('finish-div');
    cardsContainer.append(finishDiv);

    const picture = document.createElement('img');
    picture.classList.add('finish-picture');
    picture.src = countOfClicks === (numbers.length + 1) ? 'assets/img/success.png' : 'assets/img/failure.png';
    picture.alt = 'finish-picture';
    finishDiv.append(picture);

    const finishDescription = document.createElement('p');
    if (countOfClicks === numbers.length + 1) finishDescription.textContent = 'Congratulations!';
    else if (countOfClicks === numbers.length + 2) finishDescription.textContent = '1 error';
    else finishDescription.textContent = `${countOfClicks - (numbers.length + 1)} errors`;
    finishDiv.append(finishDescription);

    let finishSound = countOfClicks === (numbers.length + 1) ? document.querySelector('audio#success') : document.querySelector('audio#failure');
    finishSound.currentTime = 0;
    finishSound.play();

    changeStartBtn();
    countOfClicks = 0;

    setTimeout(containMainPage, 4000);
}


//For stats page 
let statsBtn = document.querySelector('.stats-img');
let countOfCellsInRow = 7;

function containStatistic() {
    zerosCards = false;
    isStatsPage = true;
    isMainPage = false;
    isFinish = false;
    cardsContainer.innerHTML = '';
    statsTbody.innerHTML = '';
    if (countOfClicks > 0) {
        changeStartBtn();
        countOfClicks = 0;
    }
    cardsTitle.textContent = 'statistics';
    for (let i = 0; i < cardsPages.length; i++) {
        for (let j = 0; j < cardsPages[i].length; j++) {
            const tableRow = document.createElement('tr');
            statsTbody.append(tableRow);
            for (let k = 0; k < countOfCellsInRow - 1; k++) {
                const cellInRow = document.createElement('td');
                let currentCellName = document.querySelectorAll('.stats-container thead tr th')[k].textContent.toLowerCase()
                cellInRow.textContent = eval(`cardsPages[i][j].${currentCellName}`);
                tableRow.append(cellInRow);
            }
            const cellInRowPercent = document.createElement('td');
            cellInRowPercent.textContent = cardsPages[i][j].errorPercent;
            tableRow.append(cellInRowPercent);
        }
    }
    statsContainer.style.height = 'auto';
    statsContainer.style.visibility = 'visible';
}
statsBtn.addEventListener('click', containStatistic);


//For sort stats table 
let sortedRows;
let countOfStringCells = 3;
let clicksOnParameters = [0, 0, 0, 0, 0, 0, 0];
let previousParameter = -1;
function sortTable(i) {
    clicksOnParameters[i]++;
    sortedRows = Array.from(statsTbody.rows).sort((rowA, rowB) => {
        if (i > countOfStringCells - 1) return rowA.cells[i].innerHTML - rowB.cells[i].innerHTML;
        return rowA.cells[i].innerHTML.localeCompare(rowB.cells[i].innerHTML);
    });
    if ((clicksOnParameters[i] + 1) % 2 && previousParameter === i) sortedRows.reverse();
    previousParameter = i;
    statsTbody.append(...sortedRows);
}

for (let i = 0; i < countOfCellsInRow; i++) {
    const parameter = document.querySelectorAll('.stats-container th')[i];
    parameter.addEventListener('click', () => {
        sortTable(i);
    });
}


//For reset statistics
document.querySelector('.reset').addEventListener('click', () => {
    createCardsArray();
    localStorage.setItem('allСards', JSON.stringify(cardsPages));
    containStatistic();
});


//For repeat difficult words
let difficultWords = [];
let difficultWordsIndexes = [];
let arraySortByCorrectPercent;
let columnIndexForSort = 6;
function repeatDifficult() {
    difficultWords = [];
    difficultWordsIndexes = [];
    arraySortByCorrectPercent = Array.from(statsTbody.rows).sort((rowA, rowB) => {
        return rowA.cells[columnIndexForSort].innerHTML - rowB.cells[columnIndexForSort].innerHTML;
    }).filter((row) => {
        return row.cells[columnIndexForSort].innerHTML > 0 && row.cells[columnIndexForSort].innerHTML < 100;
    });
    if (arraySortByCorrectPercent.length > 8) arraySortByCorrectPercent = arraySortByCorrectPercent.slice(0, 8);

    for (let j = 0; j < cardsPages.length; j++) {
        for (let k = 0; k < cardsPages[j].length; k++) {
            for (let i = 0; i < arraySortByCorrectPercent.length; i++) {
                if (cardsPages[j][k].word === arraySortByCorrectPercent[i].cells[0].innerHTML) {
                    difficultWords.push(cardsPages[j][k]);
                    difficultWordsIndexes.push({first: j, second: k});
                }
            }
        }
    }
    containCardsPages(cardsPages.length);
}
document.querySelector('.repeat').addEventListener('click', repeatDifficult);




//For play audio
function playSound(e, index) {
    let soundArray = document.querySelectorAll('audio');
    let currentSound = soundArray[index];
    let countBackUnderMouse = 0;
    for (let i = 0; i < e.path.length - 7; i++) {
        if (e.path[i].classList.contains('back')) countBackUnderMouse++;
    }
    if (isSoundOn && countBackUnderMouse === 0 && !e.target.classList.contains('flip-btn')) {
       currentSound.currentTime = 0;
       currentSound.play();
       if (currentPage < cardsPages.length) cardsPages[currentPage][index].trained++;
       else cardsPages[difficultWordsIndexes[index].first][difficultWordsIndexes[index].second].trained++;
       localStorage.setItem('allСards', JSON.stringify(cardsPages));
    }

    if (countOfClicks > 0) {
        if (document.querySelectorAll('.card-on-page')[index].classList.contains('disabled')) return;
        countOfClicks++;
        let soundGame;
        if (index === numbers[shouldIndex]) {
            soundGame = document.querySelector('audio#correct');
            document.querySelectorAll('.card-on-page')[numbers[shouldIndex]].style.opacity = '0.25';
            document.querySelectorAll('.card-on-page')[numbers[shouldIndex]].classList.add('disabled');

            if (countOfClicks > numbers.length + 1) {document.querySelectorAll('.stars-container img')[0].remove();}
            const star = document.createElement('img');
            star.src = 'assets/img/correct_star.png';
            star.alt = 'star';
            starsContainer.append(star);
            if (currentPage < cardsPages.length) {
                cardsPages[currentPage][numbers[shouldIndex]].correct++;
                cardsPages[currentPage][numbers[shouldIndex]].errorPercent = Math.round(10* ((cardsPages[currentPage][index].correct * 100) / (cardsPages[currentPage][index].correct + cardsPages[currentPage][index].incorrect))) / 10;
            } else {
                cardsPages[difficultWordsIndexes[numbers[shouldIndex]].first][difficultWordsIndexes[numbers[shouldIndex]].second].correct++;
                cardsPages[difficultWordsIndexes[numbers[shouldIndex]].first][difficultWordsIndexes[numbers[shouldIndex]].second].errorPercent = Math.round(10* ((cardsPages[difficultWordsIndexes[numbers[shouldIndex]].first][difficultWordsIndexes[numbers[shouldIndex]].second].correct * 100) / (cardsPages[difficultWordsIndexes[numbers[shouldIndex]].first][difficultWordsIndexes[numbers[shouldIndex]].second].correct + cardsPages[difficultWordsIndexes[numbers[shouldIndex]].first][difficultWordsIndexes[numbers[shouldIndex]].second].incorrect))) / 10;
            }

            shouldIndex++;
            if (shouldIndex !== numbers.length) setTimeout(playSoundGame, 1000, numbers[shouldIndex]);
            else {
                setTimeout(containPicture, 1000);
            }
        } else {
            soundGame = document.querySelector('audio#error');

            if (countOfClicks > numbers.length + 1) {document.querySelectorAll('.stars-container img')[0].remove();}
            const star = document.createElement('img');
            star.src = 'assets/img/error_star.png';
            star.alt = 'star';
            starsContainer.append(star);
            if (currentPage < cardsPages.length) {
                cardsPages[currentPage][numbers[shouldIndex]].incorrect++;
                cardsPages[currentPage][numbers[shouldIndex]].errorPercent = Math.round(10* ((cardsPages[currentPage][index].correct * 100) / (cardsPages[currentPage][index].correct + cardsPages[currentPage][index].incorrect))) / 10;
            } else {
                cardsPages[difficultWordsIndexes[numbers[shouldIndex]].first][difficultWordsIndexes[numbers[shouldIndex]].second].incorrect++;
                cardsPages[difficultWordsIndexes[numbers[shouldIndex]].first][difficultWordsIndexes[numbers[shouldIndex]].second].errorPercent = Math.round(10* ((cardsPages[difficultWordsIndexes[numbers[shouldIndex]].first][difficultWordsIndexes[numbers[shouldIndex]].second].correct * 100) / (cardsPages[difficultWordsIndexes[numbers[shouldIndex]].first][difficultWordsIndexes[numbers[shouldIndex]].second].correct + cardsPages[difficultWordsIndexes[numbers[shouldIndex]].first][difficultWordsIndexes[numbers[shouldIndex]].second].incorrect))) / 10;
            }
        }
        soundGame.currentTime = 0;
        soundGame.play();
        localStorage.setItem('allСards', JSON.stringify(cardsPages));
    }
}

//For rotate card
function flipCard(index) {
    let cardsArray = document.querySelectorAll('.card-on-page');
    let currentCard = cardsArray[index];
    currentCard.classList.toggle('flip');
}


//For change active li in nav bar 
function changeActiveLiCards(i) {
    for (let k = 0; k < document.querySelectorAll('.ul-burger li').length; k++) {
        document.querySelectorAll('.ul-burger li')[k].classList.remove('active');
    }
    document.querySelectorAll('.ul-burger li')[i+1].classList.add('active');
}

function changeActiveLiNav(i) {
    for (let k = 0; k < document.querySelectorAll('.ul-burger li').length; k++) {
        document.querySelectorAll('.ul-burger li')[k].classList.remove('active');
    }
    document.querySelectorAll('.ul-burger li')[i].classList.add('active');
}


for (let k = 0; k < document.querySelectorAll('.ul-burger li').length; k++) {
    document.querySelectorAll('.ul-burger li')[k].addEventListener('click', () => {
        navigationFn(k);
    });
}

function navigationFn(k) {
    changeActiveLiNav(k);
    if (k === 0) containMainPage();
    else containCardsPages(k - 1);
    burgerFn();
}

//For start game 
let numbers;
let shouldIndex;

function startGame(e) {
    numbers = [...Array(document.querySelectorAll('.card-on-page').length).keys()].sort(() => Math.random() - 0.5);
    shouldIndex = 0;
    let startSound = document.querySelectorAll('audio')[numbers[0]];
    startSound.currentTime = 0;
    startSound.play();
    changeStartBtn();
    countOfClicks++;
}

//For play sound on game
function playSoundGame(index) {
    let currentSound = document.querySelectorAll('audio')[index];
    currentSound.currentTime = 0;
    currentSound.play();
}

startGameBtn.addEventListener('click', (e) => {
    if (isMainPage || isStatsPage || zerosCards) return;
    if (countOfClicks === 0) startGame(e);
    else if (isFinish === false) playSoundGame(numbers[shouldIndex]);
});

//For change start/repeat
function changeStartBtn() {
    startGameBtn.textContent = countOfClicks === 0 ? 'repeat' : 'start';
    startGameBtn.style.backgroundColor = countOfClicks === 0 ? '#f19af3' : 'rgb(39, 169, 227)';
}



// I know that it would be better to do it as a separate module, but, unfortunately, I didn't have time to figure it out due to the deadlines for my course project at the university. //



function createCardsArray() {
    cardsPages = [
        [
            {category: "food", word: 'apple', translation: 'яблоко', image: 'assets/img/Food/apple.svg', audioSrc: 'assets/audio/Food/apple.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "food", word: 'banana', translation: 'банан', image: 'assets/img/Food/banana.png', audioSrc: 'assets/audio/Food/banana.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "food", word: 'bread', translation: 'хлеб', image: 'assets/img/Food/bread.svg', audioSrc: 'assets/audio/Food/bread.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "food", word: 'cheese', translation: 'сыр', image: 'assets/img/Food/cheese.png', audioSrc: 'assets/audio/Food/cheese.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "food", word: 'cucumber', translation: 'огурец', image: 'assets/img/Food/cucumber.png', audioSrc: 'assets/audio/Food/cucumber.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "food", word: 'meat', translation: 'мясо', image: 'assets/img/Food/meat.png', audioSrc: 'assets/audio/Food/meat.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "food", word: 'potato', translation: 'картошка', image: 'assets/img/Food/potato.png', audioSrc: 'assets/audio/Food/potato.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "food", word: 'tomato', translation: 'помидор', image: 'assets/img/Food/tomato.png', audioSrc: 'assets/audio/Food/tomato.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0}
        ],
        [
            {category: "animals", word: 'cow', translation: 'корова', image: 'assets/img/Animals/cow.png', audioSrc: 'assets/audio/Animals/cow.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "animals", word: 'dog', translation: 'собака', image: 'assets/img/Animals/dog.png', audioSrc: 'assets/audio/Animals/dog.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "animals", word: 'elephant', translation: 'слон', image: 'assets/img/Animals/elephant.png', audioSrc: 'assets/audio/Animals/elephant.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "animals", word: 'fox', translation: 'лиса', image: 'assets/img/Animals/fox.png', audioSrc: 'assets/audio/Animals/fox.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "animals", word: 'giraffe', translation: 'жираф', image: 'assets/img/Animals/giraffe.png', audioSrc: 'assets/audio/Animals/giraffe.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "animals", word: 'lion', translation: 'лев', image: 'assets/img/Animals/lion.png', audioSrc: 'assets/audio/Animals/lion.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "animals", word: 'turtle', translation: 'черепаха', image: 'assets/img/Animals/turtle.png', audioSrc: 'assets/audio/Animals/turtle.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "animals", word: 'zebra', translation: 'зебра', image: 'assets/img/Animals/zebra.png', audioSrc: 'assets/audio/Animals/zebra.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0}
        ],
        [
            {category: "colors", word: 'black', translation: 'черный', image: 'assets/img/Colors/black.png', audioSrc: 'assets/audio/Colors/black.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "colors", word: 'blue', translation: 'синий', image: 'assets/img/Colors/blue.png', audioSrc: 'assets/audio/Colors/blue.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "colors", word: 'green', translation: 'зелёный', image: 'assets/img/Colors/green.png', audioSrc: 'assets/audio/Colors/green.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "colors", word: 'orange', translation: 'оранжевый', image: 'assets/img/Colors/orange.png', audioSrc: 'assets/audio/Colors/orange.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "colors", word: 'pink', translation: 'розовый', image: 'assets/img/Colors/pink.png', audioSrc: 'assets/audio/Colors/pink.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "colors", word: 'purple', translation: 'фиолетовый', image: 'assets/img/Colors/purple.png', audioSrc: 'assets/audio/Colors/purple.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "colors", word: 'red', translation: 'красный', image: 'assets/img/Colors/red.png', audioSrc: 'assets/audio/Colors/red.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "colors", word: 'yellow', translation: 'жёлтый', image: 'assets/img/Colors/yellow.png', audioSrc: 'assets/audio/Colors/yellow.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0}
        ],
        [
            {category: "emotions", word: 'anger', translation: 'гнев', image: 'assets/img/Emotions/anger.png', audioSrc: 'assets/audio/Emotions/anger.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "emotions", word: 'confusion', translation: 'смятение', image: 'assets/img/Emotions/confusion.png', audioSrc: 'assets/audio/Emotions/confusion.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "emotions", word: 'excitement', translation: 'волнение', image: 'assets/img/Emotions/excitement.png', audioSrc: 'assets/audio/Emotions/excitement.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "emotions", word: 'disgust', translation: 'отвращение', image: 'assets/img/Emotions/disgust.png', audioSrc: 'assets/audio/Emotions/disgust.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "emotions", word: 'happiness', translation: 'счастье', image: 'assets/img/Emotions/happiness.png', audioSrc: 'assets/audio/Emotions/happiness.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "emotions", word: 'love', translation: 'любовь', image: 'assets/img/Emotions/love.png', audioSrc: 'assets/audio/Emotions/love.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "emotions", word: 'sadness', translation: 'печаль', image: 'assets/img/Emotions/sadness.png', audioSrc: 'assets/audio/Emotions/sadness.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "emotions", word: 'surprise', translation: 'удивление', image: 'assets/img/Emotions/surprise.png', audioSrc: 'assets/audio/Emotions/surprise.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0}
        ],
        [
            {category: "actions", word: 'cry', translation: 'плакать', image: 'assets/img/Actions/cry.png', audioSrc: 'assets/audio/Actions/cry.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "actions", word: 'dance', translation: 'танцевать', image: 'assets/img/Actions/dance.png', audioSrc: 'assets/audio/Actions/dance.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "actions", word: 'learn', translation: 'учиться', image: 'assets/img/Actions/learn.png', audioSrc: 'assets/audio/Actions/learn.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "actions", word: 'read', translation: 'читать', image: 'assets/img/Actions/read.png', audioSrc: 'assets/audio/Actions/read.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "actions", word: 'run', translation: 'бегать', image: 'assets/img/Actions/run.png', audioSrc: 'assets/audio/Actions/run.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "actions", word: 'sing', translation: 'петь', image: 'assets/img/Actions/sing.png', audioSrc: 'assets/audio/Actions/sing.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "actions", word: 'sleep', translation: 'спать', image: 'assets/img/Actions/sleep.png', audioSrc: 'assets/audio/Actions/sleep.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "actions", word: 'swim', translation: 'плавать', image: 'assets/img/Actions/swim.png', audioSrc: 'assets/audio/Actions/swim.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0}
        ], 
        [
            {category: "body", word: 'ear', translation: 'ухо', image: 'assets/img/Body/ear.png', audioSrc: 'assets/audio/Body/ear.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "body", word: 'eyes', translation: 'глаза', image: 'assets/img/Body/eyes.png', audioSrc: 'assets/audio/Body/eyes.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "body", word: 'hand', translation: 'рука', image: 'assets/img/Body/hand.png', audioSrc: 'assets/audio/Body/hand.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "body", word: 'head', translation: 'голова', image: 'assets/img/Body/head.png', audioSrc: 'assets/audio/Body/head.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "body", word: 'leg', translation: 'нога', image: 'assets/img/Body/leg.png', audioSrc: 'assets/audio/Body/leg.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "body", word: 'lips', translation: 'губы', image: 'assets/img/Body/lips.png', audioSrc: 'assets/audio/Body/lips.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "body", word: 'nose', translation: 'нос', image: 'assets/img/Body/nose.png', audioSrc: 'assets/audio/Body/nose.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "body", word: 'tooth', translation: 'зуб', image: 'assets/img/Body/tooth.png', audioSrc: 'assets/audio/Body/tooth.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0}
        ],
        [
            // {category: "family", word: 'aunt', translation: 'тётя', image: 'assets/img/Family/aunt.png', audioSrc: 'assets/audio/Family/aunt.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "family", word: 'son', translation: 'сын', image: 'assets/img/Family/son.png', audioSrc: 'assets/audio/Family/son.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "family", word: 'brother', translation: 'брат', image: 'assets/img/Family/brother.svg', audioSrc: 'assets/audio/Family/brother.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "family", word: 'father', translation: 'папа', image: 'assets/img/Family/father.svg', audioSrc: 'assets/audio/Family/father.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "family", word: 'grandfather', translation: 'дедушка', image: 'assets/img/Family/grandfather.svg', audioSrc: 'assets/audio/Family/grandfather.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "family", word: 'daughter', translation: 'дочь', image: 'assets/img/Family/daughter.png', audioSrc: 'assets/audio/Family/daughter.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "family", word: 'sister', translation: 'сестра', image: 'assets/img/Family/sister.svg', audioSrc: 'assets/audio/Family/sister.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "family", word: 'mother', translation: 'мама', image: 'assets/img/Family/mother.svg', audioSrc: 'assets/audio/Family/mother.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "family", word: 'grandmother', translation: 'бабушка', image: 'assets/img/Family/grandmother.svg', audioSrc: 'assets/audio/Family/grandmother.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0}
            // {category: "family", word: 'uncle', translation: 'дядя', image: 'assets/img/Family/uncle.png', audioSrc: 'assets/audio/Family/uncle.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0}
        ],
        [
            {category: "home", word: 'bath', translation: 'ванна', image: 'assets/img/Home/bath.svg', audioSrc: 'assets/audio/Home/bath.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "home", word: 'bed', translation: 'кровать', image: 'assets/img/Home/bed.svg', audioSrc: 'assets/audio/Home/bed.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "home", word: 'door', translation: 'дверь', image: 'assets/img/Home/door.svg', audioSrc: 'assets/audio/Home/door.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "home", word: 'fridge', translation: 'холодильник', image: 'assets/img/Home/fridge.svg', audioSrc: 'assets/audio/Home/fridge.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "home", word: 'house', translation: 'дом', image: 'assets/img/Home/house.svg', audioSrc: 'assets/audio/Home/house.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "home", word: 'kitchen', translation: 'кухня', image: 'assets/img/Home/kitchen.svg', audioSrc: 'assets/audio/Home/kitchen.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "home", word: 'toilet', translation: 'туалет', image: 'assets/img/Home/toilet.svg', audioSrc: 'assets/audio/Home/toilet.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0},
            {category: "home", word: 'window', translation: 'окно', image: 'assets/img/Home/window.svg', audioSrc: 'assets/audio/Home/window.mp3', trained: 0, correct: 0, incorrect: 0, errorPercent: 0}
        ]
    ];
}