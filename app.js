// Запускаем код только когда страница на 100% загрузилась
window.onload = function() {
    const inputs = document.querySelectorAll('input');
    const modal = document.getElementById('policy-modal');
    const acceptBtn = document.getElementById('accept-policy-btn');

    // Проверяем, принимал ли пользователь условия раньше
    const isAccepted = localStorage.getItem('policyAccepted');
    if (isAccepted === 'true' && modal) {
        modal.classList.add('hidden');
    }

    // Железобетонный клик по кнопке
    if (acceptBtn && modal) {
        acceptBtn.onclick = function() {
            localStorage.setItem('policyAccepted', 'true');
            modal.classList.add('hidden');
        };
    }

    // Слушаем ввод цифр в калькулятор
    inputs.forEach(input => {
        input.oninput = calculate;
    });
};

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
