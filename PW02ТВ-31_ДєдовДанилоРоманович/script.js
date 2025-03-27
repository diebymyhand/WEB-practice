function calculate() {
    const coal = parseFloat(document.getElementById("coal").value);
    const mazut = parseFloat(document.getElementById("mazut").value);
    const naturalGas = parseFloat(document.getElementById("naturalGas").value);

    if (isNaN(coal) || isNaN(mazut) || isNaN(naturalGas)) {
        alert("Будь ласка, введіть коректні числові значення.");
        return;
    }    

    const QriCoal = 20.47;
    const QriMazut = 40.4;
    const QriGas = 33.08;

    const a_vinCoal = 0.8;
    const a_vinMazut = 1;

    const ArCoal = 25.2;
    const G_vinCoal = 1.5;
    const n_zu = 0.985;
    const ArMazut = 0.15;

    let kTvCoal = (Math.pow(10, 6) / QriCoal) * a_vinCoal * (ArCoal / (100 - G_vinCoal)) * (1 - n_zu);
    let EtvCoal = Math.pow(10, -6) * kTvCoal * QriCoal * coal;

    let kTvMazut = (Math.pow(10, 6) / QriMazut) * a_vinMazut * (ArMazut / 100 ) * (1 - n_zu);
    let EtvMazut = Math.pow(10, -6) * kTvMazut * QriMazut * mazut;

    showResult(kTvCoal, EtvCoal, kTvMazut, EtvMazut);
}

function reset() {
    document.getElementById("result").classList.add("hidden");      // ховає контейнер з результатами
    document.getElementById("inputs").classList.remove("hidden");   // відображає контейнер для вводу даних
}

function showResult(kTvCoal, EtvCoal, kTvMazut, EtvMazut) {
    document.getElementById("inputs").classList.add("hidden");      // ховає контейнер для вводу даних
    let resultContainer = document.getElementById("result");
    resultContainer.classList.remove("hidden");                     // відображає контейнер з результатами

    resultContainer.innerHTML = `
        <div class="title">Калькулятор</div>
        <div class="result-text">Коефіцієнт твердих частинок (вугілля): ${kTvCoal.toFixed(0)}</div>
        <div class="result-text">Валовий викид (вугілля): ${EtvCoal.toFixed(0)}</div>
        <div class="result-text">Коефіцієнт твердих частинок (мазут): ${kTvMazut.toFixed(2)}</div>
        <div class="result-text">Валовий викид (мазут): ${EtvMazut.toFixed(2)}</div>
        <div class="result-text">Коефіцієнт твердих частинок (газ): 0</div>
        <div class="result-text">Валовий викид (газ): 0</div>
        <button class="button" onclick="reset()">Скинути</button>
    `;
}
