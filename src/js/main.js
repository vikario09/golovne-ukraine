class CountdownTimer {
    constructor(durationInMinutes, targetElementSelector) {
        this.start = new Date();
        this.end = dateFns.addMinutes(this.start, durationInMinutes);
        this.countdownDiv = document.querySelector(targetElementSelector);
        this.timerInterval = setInterval(this.updateTimer.bind(this), 1000);
        this.updateTimer();
    }

    updateTimer() {
        const now = new Date();
        const remainingTime = dateFns.differenceInMilliseconds(this.end, now);

        if (remainingTime <= 0) {
            clearInterval(this.timerInterval);
            this.countdownDiv.textContent = 'Час минув!';
            return;
        }

        const seconds = Math.floor(remainingTime / 1000);
        const formattedTime = dateFns.format(seconds * 1000, "mm:ss");
        this.countdownDiv.textContent = `У Вас залишилось ${formattedTime} хв`;
    }
}

const countdownTimer = new CountdownTimer(10, '.form__countdown');



class DateDisplay {
    constructor(dateString, targetElementSelector) {
        this.dateToCompare = new Date(dateString);
        this.targetElement = document.querySelector(targetElementSelector);
        this.updateTimeDifference();
    }

    updateTimeDifference() {
        const difference = dateFns.formatDistanceToNowStrict(this.dateToCompare, { locale: dateFns.locale.uk });
        this.targetElement.innerHTML = `Опубліковано: ${difference} тому`;
    }
}

const dateDisplay = new DateDisplay('2024-03-25T12:00:00', '.main-block__data');


class Modal {
    constructor() {
        this.closeBtn = document.querySelector('.modal__close-btn');
        this.modal = document.querySelector('.modal');
        this.body = document.querySelector('body');
        this.btnScroll = document.querySelector('.modal__btn-scroll');
        this.form = document.querySelector('.form');

        setTimeout(this.openModal.bind(this), 20000);

        this.closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        this.btnScroll.addEventListener('click', () => {
            this.closeModal();
            this.scrollToForm();
        });

        document.addEventListener('mouseleave', () => {
            this.openModal();
        });
    }

    openModal() {
        this.modal.style.display = 'block';
        this.body.classList.add('overflowHidden');
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.body.classList.remove('overflowHidden');
    }

    scrollToForm() {
        this.form.scrollIntoView({ behavior: 'smooth' });
    }
}

const modal = new Modal();

