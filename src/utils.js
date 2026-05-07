export function normalizeString(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function obterDirecao(centroidOrigem, centroidDestino) {
  const [origemLng, origemLat] = centroidOrigem;
  const [destinoLng, destinoLat] = centroidDestino;
  const partes = [];

  if (Math.abs(destinoLat - origemLat) > 0.01) {
    partes.push(destinoLat > origemLat ? "norte" : "sul");
  }

  if (Math.abs(destinoLng - origemLng) > 0.01) {
    partes.push(destinoLng > origemLng ? "leste" : "oeste");
  }

  return partes.length === 0 ? "muito perto" : partes.join("-");
}

export function createPopupBairro(nome, descricao) {
  const wrapper = document.createElement("div");
  const titulo = document.createElement("strong");
  titulo.textContent = nome;
  wrapper.appendChild(titulo);

  if (descricao) {
    wrapper.appendChild(document.createElement("br"));
    wrapper.appendChild(document.createTextNode(descricao));
  }

  return wrapper;
}

export function montarResumoCompartilhavel({
  tentativas,
  bairrosDigitados,
  acertou,
  bairrocerto,
}) {
  const linhas = ["BairroGuessr", `Tentativas: ${tentativas}`];

  if (bairrosDigitados.length > 0) {
    const melhor = bairrosDigitados[0];
    linhas.push(
      `Melhor palpite: ${melhor.nome} (${melhor.distancia.toFixed(2)} km)`
    );
  } else {
    linhas.push("Melhor palpite: nenhum ainda");
  }

  if (acertou) {
    linhas.push(`Resultado: acertei ${bairrocerto}`);
  }

  return linhas.join("\n");
}
