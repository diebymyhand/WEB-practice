function calculate_71() {
    const voltage = 10;
    const Sm = parseFloat(document.getElementById("Sm").value);
    const Tm = parseFloat(document.getElementById("Tm").value);
    const Ik = parseFloat(document.getElementById("Ik").value);
    const tf = parseFloat(document.getElementById("tf").value);
    const Jek = checkJek(Tm);

    // розрахунок струмів
    const IM = (Sm / 2) / (Math.sqrt(3) * voltage);
    const IMpa = 2 * IM;

    // економічний переріз
    const Sek = IM / Jek;

    const Ct = 92; 
    const Smin = (Ik * Math.sqrt(tf)) / Ct;

    const Srecommended = Math.ceil(Math.max(Sek, Smin));

    document.getElementById("inputs").classList.add("hidden");
    let resultContainer = document.getElementById("result");
    resultContainer.classList.remove("hidden");

    resultContainer.innerHTML = `
        <div class="title">Результати розрахунку 7.1</div>
        <div class="result-text">Розрахунковий струм Iм: <strong>${IM.toFixed(2)} А</strong></div>
        <div class="result-text">Післяаварійний струм Iм.па: <strong>${IMpa.toFixed(2)} А</strong></div>
        <div class="result-text">Обрана густина струму Jек: <strong>${Jek.toFixed(2)} А/мм²</strong></div>
        <div class="result-text">Економічний переріз Sек: <strong>${Sek.toFixed(2)} мм²</strong></div>
        <div class="result-text">Мінімальний переріз по термостійкості Sмін: <strong>${Smin.toFixed(2)} мм²</strong></div>
        <div class="result-text">
            <strong>Рекомендований переріз кабелю:</strong> <span style="font-size: 1.2em;">${Srecommended} мм²</span>
        </div>
        <br>
        <button class="button" onclick="reset()">Скинути</button>
    `;
}

function checkJek(Tm) {
    if (Tm > 1000 && Tm <= 3000) {
        return 1.6;
    } else if (Tm > 3000 && Tm <=5000) {
        return 1.4;
    } else {
        return 1.2;
    }
}

function calculate_72() {
    const voltage = parseFloat(document.getElementById("voltage").value);
    const Sk = parseFloat(document.getElementById("Sk").value);

    const Xc = Math.pow(10.5, 2) / Sk;
    const Xt = (10.5 / 100) * (Math.pow(10.5, 2) / 6.3);

    const Xsum = Xc + Xt;

    const Ip0 = 10.5 / (Math.sqrt(3) * Xsum);

    document.getElementById("inputs").classList.add("hidden");
    let resultContainer = document.getElementById("result");
    resultContainer.classList.remove("hidden");

    resultContainer.innerHTML = `
        <div class="title">Результати розрахунку 7.2</div>
        <div class="result-text">Опір системи X<sub>c</sub>: <strong>${Xc.toFixed(2)} Ом</strong></div>
        <div class="result-text">Опір трансформатора X<sub>T</sub>: <strong>${Xt.toFixed(2)} Ом</strong></div>
        <div class="result-text">Сумарний опір X<sub>Σ</sub>: <strong>${Xsum.toFixed(2)} Ом</strong></div>
        <div class="result-text">Початкове діюче значення струму трифазного КЗ I<sub>П0</sub>: <strong>${Ip0.toFixed(2)} кА</strong></div>
        <button class="button" onclick="reset()">Скинути</button>
    `;
}

function calculate_74() {
    // Константи
    const ukmax = 11.1;
    const snom = 6.3;
    const uvn = 115;
    const unn = 11;
    const r0 = 0.64;
    const x0 = 0.363;
    const l = 12.37;

    const rcn = parseFloat(document.getElementById("rcn").value);
    const xcn = parseFloat(document.getElementById("xcn").value);
    const rcmin = parseFloat(document.getElementById("rcmin").value);
    const xcmin = parseFloat(document.getElementById("xcmin").value);

    // реактивний опір трансформатора
    const xt = (ukmax * Math.pow(uvn, 2)) / (100 * snom);

    // опори на шинах 110 кВ
    // нормальний режим
    const rsh = rcn;
    const xsh = xcn + xt;
    const zsh = Math.sqrt(rsh * rsh + xsh * xsh);

    // мінімальний режим
    const rshmin = rcmin;
    const xshmin = xcmin + xt;
    const zshmin = Math.sqrt(rshmin * rshmin + xshmin * xshmin);

    // коефіцієнт приведення
    const kpr = Math.pow(unn, 2) / Math.pow(uvn, 2);

    // опори на шинах 10 кВ
    // нормальний режим
    const rshn = rsh * kpr;
    const xshn = xsh * kpr;
    const zshn = Math.sqrt(rshn * rshn + xshn * xshn);

    // мінімальний режим
    const rshnmin = rshmin * kpr;
    const xshnmin = xshmin * kpr;
    const zshnmin = Math.sqrt(rshnmin * rshnmin + xshnmin * xshnmin);

    // струми КЗ на шинах 10 кВ
    // нормальний режим
    const i3shn = (unn * 1000) / (Math.sqrt(3) * zshn);
    const i2shn = i3shn * Math.sqrt(3) / 2;

    // мінімальний режим
    const i3shnmin = (unn * 1000) / (Math.sqrt(3) * zshnmin);
    const i2shnmin = i3shnmin * Math.sqrt(3) / 2;

    // опори лінії
    const rl = r0 * l;
    const xl = x0 * l;

    // сумарні опори в кінці лінії
    // нормальний режим
    const rsigman = rl + rshn;
    const xsigman = xl + xshn;
    const zsigman = Math.sqrt(rsigman * rsigman + xsigman * xsigman);

    // мінімальний режим
    const rsigmanmin = rl + rshnmin;
    const xsigmanmin = xl + xshnmin;
    const zsigmanmin = Math.sqrt(rsigmanmin * rsigmanmin + xsigmanmin * xsigmanmin);

    // струми КЗ в кінці лінії
    // нормальний режим
    const i3ln = (unn * 1000) / (Math.sqrt(3) * zsigman);
    const i2ln = i3ln * Math.sqrt(3) / 2;

    // мінімальний режим
    const i3lnmin = (unn * 1000) / (Math.sqrt(3) * zsigmanmin);
    const i2lnmin = i3lnmin * Math.sqrt(3) / 2;

    document.getElementById("inputs").classList.add("hidden");
    let resultContainer = document.getElementById("result");
    resultContainer.classList.remove("hidden");

    resultContainer.innerHTML = `
        <div class="title">Результати розрахунку 7.4</div>
        
        <div class="result-text">На шинах 10 кВ</div>
        <div class="result-text">Нормальний режим:</div>
        <div class="result-text">Повний опір Z<sub>Σ,н</sub>: <strong>${zshn.toFixed(2)} Ом</strong></div>
        <div class="result-text">Струм трифазного КЗ I<sub>кз(3)</sub>: <strong>${i3shn.toFixed(2)} кА</strong></div>
        <div class="result-text">Струм двофазного КЗ I<sub>кз(2)</sub>: <strong>${i2shn.toFixed(2)} кА</strong></div>
        
        <div class="result-text">Мінімальний режим:</div>
        <div class="result-text">Повний опір Z<sub>Σ,н,min</sub>: <strong>${zshnmin.toFixed(2)} Ом</strong></div>
        <div class="result-text">Струм трифазного КЗ I<sub>кз(3)</sub>: <strong>${i3shnmin.toFixed(2)} кА</strong></div>
        <div class="result-text">Струм двофазного КЗ I<sub>кз(2)</sub>: <strong>${i2shnmin.toFixed(2)} кА</strong></div>
        
        <div class="result-text">В кінці лінії 10 кВ</div>
        <div class="result-text">Нормальний режим:</div>
        <div class="result-text">Повний опір Z<sub>Σ,л</sub>: <strong>${zsigman.toFixed(2)} Ом</strong></div>
        <div class="result-text">Струм трифазного КЗ I<sub>кз(3)</sub>: <strong>${i3ln.toFixed(2)} кА</strong></div>
        <div class="result-text">Струм двофазного КЗ I<sub>кз(2)</sub>: <strong>${i2ln.toFixed(2)} кА</strong></div>
        
        <div class="result-text">Мінімальний режим:</div>
        <div class="result-text">Повний опір Z<sub>Σ,л,min</sub>: <strong>${zsigmanmin.toFixed(2)} Ом</strong></div>
        <div class="result-text">Струм трифазного КЗ I<sub>кз(3)</sub>: <strong>${i3lnmin.toFixed(2)} кА</strong></div>
        <div class="result-text">Струм двофазного КЗ I<sub>кз(2)</sub>: <strong>${i2lnmin.toFixed(2)} кА</strong></div>
        
        <button class="button" onclick="reset()">Скинути</button>
    `;
}

function showCategory(category) {
    document.querySelectorAll(".category").forEach(div => div.classList.add('hidden'));
    document.getElementById(category).classList.remove('hidden');
    
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove('active-tab'));
    document.querySelector(`.tab[onclick="showCategory('${category}')"]`).classList.add('active-tab');
}

function reset() {
    document.querySelectorAll(".container").forEach(div => div.classList.remove("hidden"));
    document.getElementById("result").classList.add("hidden");
}
