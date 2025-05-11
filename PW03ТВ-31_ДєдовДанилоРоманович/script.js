function calculate() {
    let Pc = parseFloat(document.getElementById('power').value);
    let sigma1 = parseFloat(document.getElementById('sigma1').value);
    let sigma2 = parseFloat(document.getElementById('sigma2').value);
    let V = parseFloat(document.getElementById('cost').value);

    if (isNaN(Pc) || isNaN(sigma1) || isNaN(sigma2) || isNaN(V)) {
        alert("Будь ласка, заповніть усі поля!");
        return;
    }

    const delta = 0.05;
    const hoursPerDay = 24;
    const P1 = Pc * (1 - delta);
    const P2 = Pc * (1 + delta);

    const delta_eta1 = integrateNormal(Pc, sigma1, P1, P2); 
    const delta_eta2 = integrateNormal(Pc, sigma2, P1, P2);

    const totalEnergy = Pc * hoursPerDay;

    const W1 = totalEnergy * delta_eta1;
    const Pi1 = W1 * V * 1000;
    const W2 = totalEnergy * (1 - delta_eta1);
    const Sh1 = W2 * V * 1000;

    const W3 = totalEnergy * delta_eta2;
    const Pi2 = W3 * V * 1000;
    const W4 = totalEnergy * (1 - delta_eta2);
    const Sh2 = W4 * V * 1000;
    const Pi = Pi2 - Sh2;

    showResult(Pi1, Sh1, Pi2, Sh2, delta_eta1, delta_eta2, Pi);
}

// функція для обчислення значення нормального розподілу
function normalPDF(x, mu, sigma) {
    return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
}

// інтегрування нормального розподілу методом прямокутників
function integrateNormal(mu, sigma, lower, upper) {
    let area = 0;
    let h = 0.0001; // крок інтегрування

    for (let i = 0; i < (upper - lower) / h; i++) {
        let x = lower + i * h;
        area += normalPDF(x, mu, sigma) * h; // обчислення площі під графіком
    }
    
    return area;
}

function reset() {
    document.getElementById("result").classList.add("hidden");
    document.getElementById("inputs").classList.remove("hidden");
}

function showResult(Pi1, Sh1, Pi2, Sh2, delta_eta1, delta_eta2, Pi) {
    document.getElementById("inputs").classList.add("hidden");
    let resultContainer = document.getElementById("result");
    resultContainer.classList.remove("hidden");

    resultContainer.innerHTML = `
        <div class="title">Результати</div>
        <div class="result-text"><strong>До покращення:</strong><br></div>
        <div class="result-text">Частка без небалансів: ${(delta_eta1 * 100).toFixed(1)}%<br></div>
        <div class="result-text">Прибуток: ${Pi1.toFixed(1)} грн<br></div>
        <div class="result-text">Штраф: ${Sh1.toFixed(1)} грн</div>
        
        <div class="result-text"><strong>Після покращення:</strong><br></div>
        <div class="result-text">Частка без небалансів: ${(delta_eta2 * 100).toFixed(1)}%<br></div>
        <div class="result-text">Прибуток: ${Pi2.toFixed(1)} грн<br></div>
        <div class="result-text">Штраф: ${Sh2.toFixed(1)} грн</div>

        <div class="result-text"><strong>Прибуток після покращення (чистими):</strong> ${Pi.toFixed(1)}<br></div>

        <button class="button" onclick="reset()">Скинути</button>
    `;
}
