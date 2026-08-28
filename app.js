const inputs = document.querySelectorAll('input');
const modal = document.getElementById('policy-modal');
const acceptBtn = document.getElementById('accept-policy-btn');
const clearBtn = document.getElementById('clear-btn');
const currencyBtn = document.getElementById('currency-toggle-btn');

let currentCurrency = 'RUB'; // При старте всегда рубли

// Клик по кнопке согласия
if (acceptBtn && modal) {
    acceptBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
}

// Кнопка очистки полей
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        inputs.forEach(input => input.value = '');
        document.getElementById('unit-price-a').innerText = '0';
        document.getElementById('unit-price-b').innerText = '0';
        document.getElementById('card-a').classList.remove('winner');
        document.getElementById('card-b').classList.remove('winner');
        document.getElementById('final-verdict').classList.add('hidden');
    });
}

// НАДЁЖНАЯ ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ВАЛЮТЫ
if (currencyBtn) {
    currencyBtn.addEventListener('click', () => {
        const signs = document.querySelectorAll('.currency-sign');
        const priceAInput = document.getElementById('price-a');
        const priceBInput = document.getElementById('price-b');
        
        if (currentCurrency === 'RUB') {
            currentCurrency = 'USD';
            // Меняем текст на самой кнопке
            document.getElementById('currency-name').innerText = '🪙 Считать в рублях (₽)';
            // Меняем подсказки в полях ввода
            priceAInput.placeholder = 'Например, 5.50';
            priceBInput.placeholder = 'Например, 12.99';
            
            // Прямая замена значков валюты без сложных проверок текста
            signs.forEach(sign => {
                sign.innerText = '$';
            });
        } else {
            currentCurrency = 'RUB';
            // Меняем текст на самой кнопке
            document.getElementById('currency-name').innerText = '💵 Считать в долларах ($)';
            // Меняем подсказки в полях ввода
            priceAInput.placeholder = 'Например, 350';
            priceBInput.placeholder = 'Например, 890';
            
            // Прямая замена значков валюты назад на рубли
            signs.forEach(sign => {
                sign.innerText = '₽';
            });
        }
        // Пересчитываем значения, если в полях уже были цифры
        calculate();
    });
}

inputs.forEach(input => {
    input.addEventListener('input', calculate);
});

function calculate() {
    const priceA = parseFloat(document.getElementById('price-a').value) || 0;
    const weightA = parseFloat(document.getElementById('weight-a').value) || 0;
    const priceB = parseFloat(document.getElementById('price-b').value) || 0;
    const weightB = parseFloat(document.getElementById('weight-b').value) || 0;

    const unitA = (weightA > 0) ? (priceA / weightA) * 1000 : 0;
    const unitB = (weightB > 0) ? (priceB / weightB) * 1000 : 0;

    document.getElementById('unit-price-a').innerText = unitA.toFixed(2);
    document.getElementById('unit-price-b').innerText = unitB.toFixed(2);

    const cardA = document.getElementById('card-a');
    const cardB = document.getElementById('card-b');
    const verdict = document.getElementById('final-verdict');

    cardA.classList.remove('winner');
    cardB.classList.remove('winner');
    verdict.classList.add('hidden');

    if (unitA > 0 && unitB > 0) {
        verdict.classList.remove('hidden');
        
        if (unitA < unitB) {
            cardA.classList.add('winner');
            const diff = (((unitB - unitA) / unitB) * 100).toFixed(0);
            verdict.innerText = `🎉 Товар А выгоднее на ${diff}%!`;
        } else if (unitB < unitA) {
            cardB.classList.add('winner');
            const diff = (((unitA - unitB) / unitA) * 100).toFixed(0);
            verdict.innerText = `🎉 Товар Б выгоднее на ${diff}%!`;
        } else {
            verdict.innerText = "⚖️ Цены абсолютно одинаковы!";
        }
    }
}
