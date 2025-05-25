window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('rbmc-form');
  const resultDiv = document.getElementById('result');
  const btnLimpiar = document.getElementById('btnLimpiar');

  function limpiar() {
    form.reset();
    resultDiv.textContent = '';
  }

  function formatNumber(num) {
    return num.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function calcularRBMC(event) {
  event.preventDefault();

  // Validar campos principales
  if (!form.beneficios.value.trim() || !form.costos.value.trim()) {
    resultDiv.textContent = 'Los campos de beneficios y costos son obligatorios.';
    return;
  }

  const valores = {
    beneficios: parseFloat(form.beneficios.value.trim()),
    costos: parseFloat(form.costos.value.trim()),
    ajusteBeneficios: parseFloat(form.ajusteBeneficios.value.trim()) || 0,
    ajusteCostos: parseFloat(form.ajusteCostos.value.trim()) || 0
  };

  // Validación numérica
  if ([valores.beneficios, valores.costos].some(isNaN)) {
    resultDiv.textContent = 'Valores numéricos inválidos en campos principales.';
    return;
  }

  // Validación de valores negativos en campos principales
  if (valores.beneficios < 0 || valores.costos < 0) {
    resultDiv.textContent = 'Beneficios y costos principales deben ser ≥ 0.';
    return;
  }

  // Cálculos
  const beneficiosNetos = valores.beneficios + valores.ajusteBeneficios;
  const costosNetos = valores.costos + valores.ajusteCostos;

  if (costosNetos <= 0) {
    resultDiv.textContent = 'Costos netos deben ser mayores a cero.';
    return;
  }

  const rbmc = beneficiosNetos / costosNetos;

  // Resultado mejorado
  resultDiv.innerHTML = `
    <div class="result-item">Beneficios netos: <strong>${formatNumber(beneficiosNetos)}</strong></div>
    <div class="result-item">Costos netos: <strong>${formatNumber(costosNetos)}</strong></div>
    <div class="result-highlight">RBMC: ${rbmc.toFixed(4)}</div>
    <div class="result-interpretation">
      ${rbmc >= 1 ? '✅ El proyecto es viable (RBMC ≥ 1)' : '❌ El proyecto no es viable (RBMC < 1)'}
    </div>
  `;
}

  form.addEventListener('submit', calcularRBMC);
  btnLimpiar.addEventListener('click', limpiar);
});
