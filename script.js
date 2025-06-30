function generarFormulario() {
    return `
        <div class="input-group">
            <label for="mi">Inversión:</label>
            <input type="number" id="mi" placeholder="Inversión">
        </div>
        <div class="input-group">
            <label for="in">Ingreso Anual:</label>
            <input type="number" id="in" placeholder="Ingreso Anual">
        </div>
        <div class="input-group">
            <label for="costo">Costo Anual:</label>
            <input type="number" id="costo" placeholder="Costo Anual">
        </div>
        <div class="input-group">
            <label for="i">Interés Anual (i):</label>
            <input type="number" id="i" placeholder="Interés Anual (%)">
        </div>
        <div class="input-group">
            <label for="k">Valor de salvamento (k):</label>
            <input type="number" id="k" placeholder="Valor residual">
        </div>
        <div class="input-group">
            <label for="n">Cantidad de años (n):</label>
            <input type="number" id="n" placeholder="Número de períodos">
        </div>
    `;
}

function calcular() {
    const ingreso = parseFloat(document.getElementById("in").value);
    const costo = parseFloat(document.getElementById("costo").value);
    const tasa = parseFloat(document.getElementById("i").value);
    const periodos = parseFloat(document.getElementById("n").value);
    const salvamento = parseFloat(document.getElementById("k").value);
    const inversion = parseFloat(document.getElementById("mi").value);

    const A = ingreso - costo;
    const parte1 = (1 - Math.pow(1 + tasa, -periodos)) / tasa;
    let P = A * parte1;

    if (!isNaN(salvamento)) {
        const parte2 = salvamento / Math.pow(1 + tasa, periodos);
        P += parte2;
    }

    const resultado = P / inversion;

    const resultadoElement = document.getElementById("resultado");
    resultadoElement.innerHTML = `$$P = ${resultado.toFixed(5)}$$`;
    MathJax.typeset([resultadoElement]);

    const convenienciaElement = document.getElementById("conveniencia");
    convenienciaElement.textContent = resultado > 1 ? "Es conveniente" : "No es conveniente";
}

function mostrarpasos() {
    const pasosContainer = document.getElementById('pasosContainer');
    pasosContainer.style.display = pasosContainer.style.display === "none" ? "block" : "none";

    const ingreso = parseFloat(document.getElementById("in").value);
    const costo = parseFloat(document.getElementById("costo").value);
    const tasa = parseFloat(document.getElementById("i").value);
    const periodos = parseFloat(document.getElementById("n").value);
    const salvamento = parseFloat(document.getElementById("k").value);
    const inversion = parseFloat(document.getElementById("mi").value);

    const A = ingreso - costo;
    const parte1 = (1 - Math.pow(1 + tasa, -periodos)) / tasa;
    let parte2 = 0;
    if (!isNaN(salvamento)) {
        parte2 = salvamento / Math.pow(1 + tasa, periodos);
    }
    let P = A * parte1 + parte2;
    const resultado = P / inversion;

    const pasos = `
1. Calcular A (Ingreso Neto):
   A = ${ingreso} - ${costo} = ${A}

2. Calcular el factor de anualidad:
   Parte 1 = [1 - (1 + ${tasa})^(-${periodos})] / ${tasa} = ${parte1.toFixed(5)}

3. Calcular valor presente del salvamento:
   Parte 2 = ${salvamento} / (1 + ${tasa})^${periodos} = ${parte2.toFixed(5)}

4. Calcular P (Beneficio/Costo):
   P = (${A} * ${parte1.toFixed(5)}) + ${parte2.toFixed(5)} = ${P.toFixed(5)}

5. Dividir entre inversión:
   Resultado = ${P.toFixed(5)} / ${inversion} = ${resultado.toFixed(5)}
    `;

    document.getElementById("pasos").value = pasos;
}
