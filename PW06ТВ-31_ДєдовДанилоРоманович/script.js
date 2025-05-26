function calculate() {
    const equipmentData = {
        "Шліфувальний верстат (1-4)": {
            eta: 0.92,
            cos_phi: 0.9,
            U: 0.38,
            count: 4,
            Pn: null,
            k_v: 0.15,
            tg_phi: 1.33,

            nPn: null,
            nPnKv: null,
            nPnKvtg_phi: null,
            nPn2: null,
            Ip: null
        },
        "Свердлильний верстат (5-6)": {
            eta: 0.92,
            cos_phi: 0.9,
            U: 0.38,
            count: 2,
            Pn: 14,
            k_v: 0.12,
            tg_phi: 1,

            nPn: null,
            nPnKv: null,
            nPnKvtg_phi: null,
            nPn2: null,
            Ip: null
        },
        "Футувальний верстат (9-12)": {
            eta: 0.92,
            cos_phi: 0.9,
            U: 0.38,
            count: 4,
            Pn: 42,
            k_v: 0.15,
            tg_phi: 1.33,

            nPn: null,
            nPnKv: null,
            nPnKvtg_phi: null,
            nPn2: null,
            Ip: null
        },
        "Циркулярна пила (13)": {
            eta: 0.92,
            cos_phi: 0.9,
            U: 0.38,
            count: 1,
            Pn: 36,
            k_v: 0.3,
            tg_phi: null,

            nPn: null,
            nPnKv: null,
            nPnKvtg_phi: null,
            nPn2: null,
            Ip: null
        },
        "Прес (16)": {
            eta: 0.92,
            cos_phi: 0.9,
            U: 0.38,
            count: 1,
            Pn: 20,
            k_v: 0.5,
            tg_phi: 0.75,

            nPn: null,
            nPnKv: null,
            nPnKvtg_phi: null,
            nPn2: null,
            Ip: null
        },
        "Полірувальний верстат (24)": {
            eta: 0.92,
            cos_phi: 0.9,
            U: 0.38,
            count: 1,
            Pn: 40,
            k_v: null,
            tg_phi: 1,

            nPn: null,
            nPnKv: null,
            nPnKvtg_phi: null,
            nPn2: null,
            Ip: null
        },
        "Фрезерний верстат (26-27)": {
            eta: 0.92,
            cos_phi: 0.9,
            U: 0.38,
            count: 2,
            Pn: 32,
            k_v: 0.2,
            tg_phi: 1,

            nPn: null,
            nPnKv: null,
            nPnKvtg_phi: null,
            nPn2: null,
            Ip: null
        },
        "Вентилятор (36)": {
            eta: 0.92,
            cos_phi: 0.9,
            U: 0.38,
            count: 1,
            Pn: 20,
            k_v: 0.65,
            tg_phi: 0.75,

            nPn: null,
            nPnKv: null,
            nPnKvtg_phi: null,
            nPn2: null,
            Ip: null
        }
    };

    const totalWorkshopLoad = [81, 2330, 752, 657, 96388];

    const power = parseFloat(document.getElementById("power").value);             // Pn для шліфувального верстата
    const utilization = parseFloat(document.getElementById("utilization").value); // k_v для полірувального верстата
    const powerFactor = parseFloat(document.getElementById("powerFactor").value); // tg_phi для циркулярної пили

    // призначення відсутніх значень
    equipmentData["Шліфувальний верстат (1-4)"].Pn = power;
    equipmentData["Полірувальний верстат (24)"].k_v = utilization;
    equipmentData["Циркулярна пила (13)"].tg_phi = powerFactor;

    // підсумки
    let total_nPn = 0;
    let total_nPn2 = 0;
    let total_nPnKv = 0;
    let total_nPnKvtg_phi = 0;

    // обчислення для кожного елементу
    for (const key in equipmentData) {
        const d = equipmentData[key];

        // розрахункові струми на I рівні електропостачання
        d.Ip = (d.count * d.Pn) / (Math.sqrt(3) * d.U * d.eta * d.cos_phi); 

        // потужність nPn
        d.nPn = d.count * d.Pn;
        total_nPn += d.nPn;

        // nPn^2
        d.nPn2 = d.count * d.Pn * d.Pn;
        total_nPn2 += d.nPn2;

        // nPn * k_v
        if (d.k_v !== null) {
            d.nPnKv = d.count * d.Pn * d.k_v;
            total_nPnKv += d.nPnKv;
        }

        // nPn * k_v * tg_phi
        if (d.k_v !== null && d.tg_phi !== null) {
            d.nPnKvtg_phi = d.count * d.Pn * d.k_v * d.tg_phi;
            total_nPnKvtg_phi += d.nPnKvtg_phi;
        }
    }

    const U = 0.38; 
    const Kv = total_nPnKv / total_nPn;
    const eta = Math.ceil(Math.pow(total_nPn, 2) / total_nPn2);
    const Kp = 1.25;
    const Pp = total_nPnKv * Kp;
    const Qp = total_nPnKvtg_phi;
    const Sp = Math.sqrt(Pp * Pp + Qp * Qp);
    const Ip = Pp / U;

    const Kv_all = totalWorkshopLoad[2] / totalWorkshopLoad[1];
    const eta_all = Math.pow(totalWorkshopLoad[1], 2) / totalWorkshopLoad[4];
    const Kp_all = 0.7;
    const Pp_all = totalWorkshopLoad[2] * Kp_all;
    const Qp_all = Kp_all * totalWorkshopLoad[3];
    const Sp_all = Math.sqrt(Pp_all * Pp_all + Qp_all * Qp_all);
    const Ip_all = Pp_all / U;

    document.getElementById("inputs").classList.add("hidden");
    let resultContainer = document.getElementById("result");
    resultContainer.classList.remove("hidden");

    // вивід результатів
    resultContainer.innerHTML = `
        <div class="title">Результати</div>

        <div class="result-text"><strong>📊 Підсумкові значення для ШР1, ШР2, ШР3:</strong><br></div>
        <div class="result-text">Коефіцієнт використання Kv: ${Kv.toFixed(4)}<br></div>
        <div class="result-text">Ефективність η: ${eta.toFixed(4)}<br></div>
        <div class="result-text">Коефіцієнт попиту Kp: ${Kp}<br></div>
        <div class="result-text">Активна потужність Pp: ${Pp.toFixed(2)} кВт<br></div>
        <div class="result-text">Реактивна потужність Qp: ${Qp.toFixed(2)} кВАр<br></div>
        <div class="result-text">Повна потужність Sp: ${Sp.toFixed(2)} кВА<br></div>
        <div class="result-text">Загальний струм Ip: ${Ip.toFixed(2)} А<br></div>

        <div class="result-text"><strong>🏭 Підсумкові значення для всього цеху:</strong><br></div>
        <div class="result-text">Коефіцієнт використання Kv: ${Kv_all.toFixed(4)}<br></div>
        <div class="result-text">Ефективність η: ${eta_all.toFixed(4)}<br></div>
        <div class="result-text">Коефіцієнт попиту Kp: ${Kp_all}<br></div>
        <div class="result-text">Активна потужність Pp: ${Pp_all.toFixed(2)} кВт<br></div>
        <div class="result-text">Реактивна потужність Qp: ${Qp_all.toFixed(2)} кВАр<br></div>
        <div class="result-text">Повна потужність Sp: ${Sp_all.toFixed(2)} кВА<br></div>
        <div class="result-text">Загальний струм Ip: ${Ip_all.toFixed(2)} А<br></div>

        <button class="button" onclick="reset()">Скинути</button>
    `;
}

function reset() {
    document.getElementById("result").classList.add("hidden");
    document.getElementById("inputs").classList.remove("hidden");
}