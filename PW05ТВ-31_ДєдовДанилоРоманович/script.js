power_line_reliability_indicator = {
    // w t_v mu t_p
    "PL-110": [0.007, 10, 0.167, 35],
    "PL-35": [0.02, 8, 0.167, 35],
    "PL-10": [0.02, 10, 0.167, 35],
    "KL-10_transh": [0.03, 44, 1, 9],
    "KL-10_cabel": [0.005, 17.5, 1, 9]
};

reliability_indicator_electrical_equipment  = {
    // w t_v mu t_p
    "T-110": [0.015, 100, 1, 43],
    "T-35": [0.02, 80, 1, 28],
    "T-10_cabel": [0.005, 60, 0.5, 10],
    "T-10_air": [0.05, 60, 0.5, 10],
    "B-110_elegas": [0.01, 30, 0.1, 10],
    "B-10_lowoil": [0.02, 15, 0.33, 15],
    "B-10_vacuum": [0.01, 15, 0.33, 15],
    "tires": [0.03, 2, 0.167, 5]
};

function getParam(equipmentName, index) {
    if (power_line_reliability_indicator[equipmentName]) {
        return power_line_reliability_indicator[equipmentName][index];
    } else if (reliability_indicator_electrical_equipment[equipmentName]) {
        return reliability_indicator_electrical_equipment[equipmentName][index];
    } else {
        console.warn("Не знайдено обладнання:", equipmentName);
        return 0;
    }
}

function calculateReliability() {
    const equipment1 = document.getElementById("equipment1").value;
    const equipment2 = document.getElementById("equipment2").value;
    const equipment3 = document.getElementById("equipment3").value;
    const equipment4 = document.getElementById("equipment4").value;
    const equipment5 = document.getElementById("equipment5").value;
    const equipment5_quantity = parseInt(document.getElementById("equipment5_quantity").value);
    const length = parseInt(document.getElementById("length").value);
    
    const w1 = getParam(equipment1, 0);
    const w2 = getParam(equipment2, 0);
    const w3 = getParam(equipment3, 0);
    const w4 = getParam(equipment4, 0);
    const w5 = getParam(equipment5, 0);

    const t_v1 = getParam(equipment1, 1);
    const t_v2 = getParam(equipment2, 1);
    const t_v3 = getParam(equipment3, 1);
    const t_v4 = getParam(equipment4, 1);
    const t_v5 = getParam(equipment5, 1);

    const w_oc = w1 + (w2 * length) + w3 + w4 + (w5 * equipment5_quantity);

    const t_voc = (t_v1 * w1 + t_v2 * (w2 * length) + t_v3 * w3 + t_v4 * w4 + (t_v5 * equipment5_quantity * w5)) / w_oc;

    const k_aoc = (w_oc * t_voc) / 8760;
    const k_poc = 1.2 * (43 / 8760);

    const w_dk = 2 * w_oc * (k_aoc + k_poc);
    const w_dc = w_dk + 0.02;

    document.getElementById("inputs").classList.add("hidden");
    let resultContainer = document.getElementById("result");
    resultContainer.classList.remove("hidden");

    document.getElementById("result").innerHTML = `
        <div class="title">Результати розрахунку 3.1</div>
        <div class="result-text"><i>w<sub>ос</sub></i>: <strong>${w_oc.toFixed(4)}</strong></div>
        <div class="result-text"><i>t<sub>вос</sub></i>: <strong>${t_voc.toFixed(2)} год</strong></div>
        <div class="result-text"><i>k<sub>аос</sub></i>: <strong>${k_aoc.toFixed(5)}</strong></div>
        <div class="result-text"><i>k<sub>пос</sub></i>: <strong>${k_poc.toFixed(4)}</strong></div>
        <div class="result-text"><i>w<sub>дк</sub></i>: <strong>${w_dk.toFixed(4)}</strong></div>
        <div class="result-text"><i>w<sub>дс</sub></i>: <strong>${w_dc.toFixed(4)}</strong></div>
        <button class="button" onclick="reset()">Скинути</button>
    `;
}

function calculateLosses() {
    const zpera = parseFloat(document.getElementById("zpera").value);
    const zperp = parseFloat(document.getElementById("zperp").value);

    const MWa = 0.01 * 45 * 0.001 * 5.12 * 1000 * 6451;
    const MWp = 4 * 0.001 * 5.12 * 1000 * 6451;

    const Mz = zpera * MWa + zperp * MWp;

    document.getElementById("inputs").classList.add("hidden");
    let resultContainer = document.getElementById("result");
    resultContainer.classList.remove("hidden");

    document.getElementById("result").innerHTML = `
        <div class="title">Результати розрахунку 3.2</div>
        <div class="result-text"><i>M(W<sub>нед.а</sub>)</i>: <strong>${MWa.toFixed(0)}</strong></div>
        <div class="result-text"><i>M(W<sub>нед.п</sub>): <strong>${MWp.toFixed(0)}</strong></div>
        <div class="result-text"><i>M(З<sub>пер</sub>)</i>: <strong>${Mz.toFixed(0)}</strong></div>
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
