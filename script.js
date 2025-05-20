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

    const beneficios = parseFloat(form.beneficios.value.trim());
    const costos = parseFloat(form.costos.value.trim());
    const ajusteBeneficios = parseFloat(form.ajusteBeneficios.value.trim()) || 0;
    const ajusteCostos = parseFloat(form.ajusteCostos.value.trim()) || 0;

    if (isNaN(beneficios) || beneficios < 0 || isNaN(costos) || costos < 0) {
      resultDiv.textContent = 'Ingrese valores válidos y positivos en beneficios y costos.';
      return;
    }

    const beneficiosNetos = beneficios + ajusteBeneficios;
    const costosNetos = costos + ajusteCostos;

    if (costosNetos <= 0) {
      resultDiv.textContent = 'El total de costos debe ser mayor que cero.';
      return;
    }

    const rbmc = beneficiosNetos / costosNetos;

    resultDiv.innerHTML =
      'Beneficios netos: <strong>' + formatNumber(beneficiosNetos) + '</strong><br>' +
      'Costos netos: <strong>' + formatNumber(costosNetos) + '</strong><br><br>' +
      'Relación Beneficio-Costo Modificado: <strong>' + rbmc.toFixed(4) + '</strong>';
  }

  form.addEventListener('submit', calcularRBMC);
  btnLimpiar.addEventListener('click', limpiar);
});