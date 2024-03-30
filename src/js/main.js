const start = new Date();
const end = dateFns.addMinutes(start, 10);
const countdownDiv = document.querySelector('.form__countdown');

function updateTimer() {
    const now = new Date();
    const remainingTime = dateFns.differenceInMilliseconds(end, now);

    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        countdownDiv.textContent = 'Час минув!';
        return;
    }

    const seconds = Math.floor(remainingTime / 1000);
    const formattedTime = dateFns.format(seconds * 1000, "mm:ss");
    countdownDiv.textContent = `У Вас залишилось ${formattedTime} хв`;
}

const timerInterval = setInterval(updateTimer, 1000);