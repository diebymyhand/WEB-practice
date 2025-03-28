function calculate_task1() {
    let h = parseFloat(document.getElementById("hydrogen").value);
    let c = parseFloat(document.getElementById("carbon").value);
    let s = parseFloat(document.getElementById("sulfur").value);
    let n = parseFloat(document.getElementById("nitrogen").value);
    let o = parseFloat(document.getElementById("oxygen").value);
    let w = parseFloat(document.getElementById("moisture").value);
    let a = parseFloat(document.getElementById("ash").value);

    if (isNaN(h) || isNaN(c) || isNaN(s) || isNaN(n) || isNaN(o) || isNaN(w) || isNaN(a)) {
        alert("Введіть всі значення!");
        return;
    }

    // коефіцієнти переходу
    let K_RS = 100 / (100 - w);
    let K_RG = 100 / (100 - w - a);

    // склад сухої маси
    let H_S = h * K_RS;
    let C_S = c * K_RS;
    let S_S = s * K_RS;
    let N_S = n * K_RS;
    let O_S = o * K_RS;
    let A_S = a * K_RS;

    // склад горючої маси
    let H_G = h * K_RG;
    let C_G = c * K_RG;
    let S_G = s * K_RG;
    let N_G = n * K_RG;
    let O_G = o * K_RG;

    // нижча теплоти згоряння для робочої, сухої та горючої маси
    let Q_RH = (339 * c + 1030 * h - 108.8 * (o - s) - 25 * w) / 1000; 
    let Q_SH = ((Q_RH + 0.025 * w) * K_RS); 
    let Q_GH = ((Q_RH + 0.025 * w) * K_RG); 

    document.getElementById("result").innerHTML = `
        <h3>Результат:</h3>
        <p>Коефіцієнт переходу до сухої маси: <strong>${K_RS.toFixed(2)}</strong></p>
        <p>Коефіцієнт переходу до горючої маси: <strong>${K_RG.toFixed(2)}</strong></p>
        <h4>Склад сухої маси (%):</h4>
        <p>H: ${H_S.toFixed(2)}, C: ${C_S.toFixed(2)}, S: ${S_S.toFixed(2)}, N: ${N_S.toFixed(2)}, O: ${O_S.toFixed(2)}, A: ${A_S.toFixed(2)}</p>
        <h4>Склад горючої маси (%):</h4>
        <p>H: ${H_G.toFixed(2)}, C: ${C_G.toFixed(2)}, S: ${S_G.toFixed(2)}, N: ${N_G.toFixed(2)}, O: ${O_G.toFixed(2)}</p>
        <h4>Нижча теплота згоряння:</h4>
        <p>Q<sub>Р</sub><sub>Н</sub> (робоча маса): <strong>${Q_RH.toFixed(4)} МДж/кг</strong></p>
        <p>Q<sub>С</sub><sub>Н</sub> (суха маса): <strong>${Q_SH.toFixed(4)} МДж/кг</strong></p>
        <p>Q<sub>Г</sub><sub>Н</sub> (горюча маса): <strong>${Q_GH.toFixed(4)} МДж/кг</strong></p>
    `;
}

function calculate_task2() {
    let carbon = parseFloat(document.getElementById("carbon_mazut").value);
    let hydrogen = parseFloat(document.getElementById("hydrogen_mazut").value);
    let oxygen = parseFloat(document.getElementById("oxygen_mazut").value);
    let sulfur = parseFloat(document.getElementById("sulfur_mazut").value);
    let qHg = parseFloat(document.getElementById("q_hg_mazut").value);
    let moisture = parseFloat(document.getElementById("moisture_mazut").value);
    let ash = parseFloat(document.getElementById("ash_mazut").value);
    let vanadium = parseFloat(document.getElementById("vanadium_mazut").value);

    if (isNaN(carbon) || isNaN(hydrogen) || isNaN(oxygen) || isNaN(sulfur) || isNaN(qHg) || isNaN(moisture) || isNaN(ash) || isNaN(vanadium)) {
        alert("Введіть всі значення!");
        return;
    }

    // коефіцієнт переходу до робочої маси
    let K_W = (100 - moisture - ash) / 100;

    // елементарний склад горючої маси після врахування вологості
    let C_W = carbon * K_W;
    let H_W = hydrogen * K_W;
    let O_W = oxygen * K_W;
    let S_W = sulfur * K_W;
    let V_W = vanadium * K_W;
    let A_W = ash * K_W;

    // нижча теплота згоряння для робочої маси мазуту
    let Q_R = qHg * K_W - 0.025 * moisture;

    document.getElementById("result_task2").innerHTML = `
        <h3>Результат:</h3>
        <p>Коефіцієнт переходу до робочої маси: <strong>${K_W.toFixed(2)}</strong></p>
        <h4>Елементарний склад горючої маси після врахування вологості:</h4>
        <p>C: ${C_W.toFixed(2)}, H: ${H_W.toFixed(2)}, O: ${O_W.toFixed(2)}, S: ${S_W.toFixed(2)}, V: ${V_W.toFixed(2)}, A: ${A_W.toFixed(2)}</p>
        <h4>Нижча теплота згоряння:</h4>
        <p>Q<sub>Р</sub> (робоча маса): <strong>${Q_R.toFixed(4)} МДж/кг</strong></p>
    `;
}
