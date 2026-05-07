export function getElements() {
  return {
    input: document.getElementById("bairro-input"),
    button: document.getElementById("enviar-btn"),
    tentativasCount: document.getElementById("tentativas-count"),
    melhorPalpite: document.getElementById("melhor-palpite"),
    dicaProximidade: document.getElementById("dica-proximidade"),
    compartilharBtn: document.getElementById("compartilhar-btn"),
    resultado: document.getElementById("resultado"),
    celebration: document.getElementById("celebration"),
    bairroAcertado: document.getElementById("bairro-acertado"),
    ajudaBtn: document.getElementById("ajuda-btn"),
    fecharBtn: document.getElementById("fechar-btn"),
    overlay: document.getElementById("overlay"),
  };
}

export function initAutocomplete(input, nomesBairros, normalizeString) {
  new Awesomplete(input, {
    list: nomesBairros,
    filter: function (text, typedInput) {
      return (
        normalizeString(text)
          .toLowerCase()
          .indexOf(normalizeString(typedInput.toLowerCase())) !== -1
      );
    },
  });
}

export function bindHelpModal({ ajudaBtn, fecharBtn, overlay }) {
  ajudaBtn.addEventListener("click", function () {
    overlay.classList.remove("hidden");
  });

  fecharBtn.addEventListener("click", function () {
    overlay.classList.add("hidden");
  });
}

export function updateTentativas(tentativasCount, tentativas) {
  tentativasCount.textContent = tentativas;
}

export function updateMelhorPalpite(melhorPalpite, bairrosDigitados) {
  if (bairrosDigitados.length === 0) {
    melhorPalpite.textContent = "Melhor palpite: nenhum ainda";
    return;
  }

  const melhor = bairrosDigitados[0];
  melhorPalpite.textContent =
    `Melhor palpite: ${melhor.nome} (${melhor.distancia.toFixed(2)} km)`;
}

export function updateDicaProximidade(dicaProximidade, bairrosDigitados) {
  if (bairrosDigitados.length === 0) {
    dicaProximidade.textContent =
      "Proximidade da última tentativa: aguardando palpite";
    return;
  }

  const ultimoPalpite = bairrosDigitados[bairrosDigitados.length - 1];
  dicaProximidade.textContent =
    `Proximidade da última tentativa: ${ultimoPalpite.faixaProximidade}`;
}

export function setShareFeedback(compartilharBtn, texto) {
  compartilharBtn.textContent = texto;
}

export function clearResultado(resultado) {
  resultado.replaceChildren();
}

export function appendMensagem(resultado, tag, texto) {
  const element = document.createElement(tag);
  element.textContent = texto;
  resultado.appendChild(element);
}

export function renderResultados(resultado, state) {
  clearResultado(resultado);

  if (state.acertou) {
    appendMensagem(resultado, "h3", `Bairro correto! - ${state.bairrocerto}`);
    appendMensagem(
      resultado,
      "p",
      "Todo dia o bairro muda. Volte amanhã para o próximo bairro!"
    );
    return;
  }

  if (state.bairrosDigitados.length === 0) {
    appendMensagem(resultado, "p", "Nenhum bairro digitado.");
    return;
  }

  const lista = document.createElement("ul");
  state.bairrosDigitados.forEach(function (bairro) {
    const item = document.createElement("li");
    item.textContent = `${bairro.nome}: ${bairro.distancia.toFixed(
      2
    )} km, direção: ${bairro.direcao}`;
    lista.appendChild(item);
  });
  resultado.appendChild(lista);
}

export function showCelebration(celebration, bairroAcertado, nomeBairro) {
  bairroAcertado.textContent = nomeBairro;
  celebration.classList.add("celebration-active");

  setTimeout(function () {
    celebration.classList.remove("celebration-active");
  }, 4000);
}
