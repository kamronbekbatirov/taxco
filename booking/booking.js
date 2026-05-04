// Booking system JavaScript
(function() {
    const API_URL = '/booking/api.php';
    let selectedTimeSlot = null;
    let currentLanguage = localStorage.getItem('preferred-language') || 'ru';

    // Устанавливаем минимальную дату (сегодня)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        // Устанавливаем максимальную дату (3 месяца вперёд)
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        dateInput.max = maxDate.toISOString().split('T')[0];
        
        // При выборе даты загружаем доступные слоты
        dateInput.addEventListener('change', loadAvailableSlots);
    }

    // Обработка отправки формы
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    // Загрузка доступных временных слотов
    async function loadAvailableSlots() {
        const date = dateInput.value;
        if (!date) return;

        const timeSlotsContainer = document.getElementById('time-slots');
        timeSlotsContainer.innerHTML = '<div class="loading" data-translate="booking-loading">Загрузка...</div>';

        try {
            const response = await fetch(`${API_URL}?action=get_available_slots&date=${date}`);
            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to load slots');
            }

            displayTimeSlots(data.slots);
        } catch (error) {
            console.error('Error loading slots:', error);
            timeSlotsContainer.innerHTML = '<div class="error" data-translate="booking-error-slots">Ошибка загрузки доступного времени</div>';
        }
    }

    // Отображение временных слотов
    function displayTimeSlots(slots) {
        const timeSlotsContainer = document.getElementById('time-slots');
        const timeInput = document.getElementById('time');

        if (!slots || slots.length === 0) {
            const translations = {
                'ru': 'На эту дату нет доступных слотов',
                'uz': 'Bu sanada bo\'sh vaqt yo\'q',
                'en': 'No available slots for this date'
            };
            timeSlotsContainer.innerHTML = `<div class="error">${translations[currentLanguage]}</div>`;
            return;
        }

        timeSlotsContainer.innerHTML = '';
        selectedTimeSlot = null;
        timeInput.value = '';

        slots.forEach(slot => {
            const slotElement = document.createElement('div');
            slotElement.className = 'time-slot';
            slotElement.textContent = slot.display;
            slotElement.dataset.time = slot.time;

            if (!slot.available) {
                slotElement.classList.add('unavailable');
            } else {
                slotElement.addEventListener('click', () => selectTimeSlot(slotElement, slot.time));
            }

            timeSlotsContainer.appendChild(slotElement);
        });
    }

    // Выбор временного слота
    function selectTimeSlot(element, time) {
        // Убираем выделение с других слотов
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
        });

        // Выделяем выбранный слот
        element.classList.add('selected');
        selectedTimeSlot = time;
        document.getElementById('time').value = time;
    }

    // Обработка отправки формы бронирования
    async function handleBookingSubmit(e) {
        e.preventDefault();

        const submitBtn = bookingForm.querySelector('.submit-btn');
        const successMessage = document.getElementById('success-message');
        const errorMessage = document.getElementById('error-message');

        // Скрываем предыдущие сообщения
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';

        // Проверяем, выбрано ли время
        if (!selectedTimeSlot) {
            showError('Пожалуйста, выберите время консультации');
            return;
        }

        // Собираем данные формы
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            date: document.getElementById('date').value,
            time: selectedTimeSlot,
            notes: document.getElementById('notes').value,
            language: currentLanguage
        };

        // Отключаем кнопку и показываем загрузку
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        const loadingTexts = {
            'ru': 'Отправка...',
            'uz': 'Yuborilmoqda...',
            'en': 'Submitting...'
        };
        submitBtn.textContent = loadingTexts[currentLanguage];

        try {
            const response = await fetch(`${API_URL}?action=create_booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Booking failed');
            }

            // Показываем сообщение об успехе
            const successTexts = {
                'ru': `Запись успешно создана! Номер вашей записи: <strong>${data.booking_id}</strong>. Вы получите подтверждение на email. Вы можете управлять своей записью по ссылке из письма.`,
                'uz': `Yozuv muvaffaqiyatli yaratildi! Yozuv raqamingiz: <strong>${data.booking_id}</strong>. Emailga tasdiqlash keladi. Xat havolasidan yozuvni boshqarishingiz mumkin.`,
                'en': `Booking created successfully! Your booking ID: <strong>${data.booking_id}</strong>. You will receive a confirmation email. You can manage your booking using the link from the email.`
            };
            showSuccess(successTexts[currentLanguage]);

            // Очищаем форму
            bookingForm.reset();
            selectedTimeSlot = null;
            document.getElementById('time-slots').innerHTML = '<div class="loading" data-translate="booking-loading">Выберите дату...</div>';

            // Прокручиваем к сообщению
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } catch (error) {
            console.error('Booking error:', error);
            const errorTexts = {
                'ru': error.message || 'Произошла ошибка при создании записи. Пожалуйста, попробуйте позже.',
                'uz': error.message || 'Yozuv yaratishda xatolik yuz berdi. Keyinroq urinib ko\'ring.',
                'en': error.message || 'An error occurred while creating the booking. Please try again later.'
            };
            showError(errorTexts[currentLanguage]);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    // Показать сообщение об успехе
    function showSuccess(message) {
        const successMessage = document.getElementById('success-message');
        successMessage.innerHTML = message;
        successMessage.style.display = 'block';
    }

    // Показать сообщение об ошибке
    function showError(message) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    // Обновляем язык при изменении
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', () => {
            currentLanguage = languageSelect.value;
            // Если была выбрана дата, перезагружаем слоты с новым языком
            if (dateInput && dateInput.value) {
                loadAvailableSlots();
            }
        });
    }
})();


