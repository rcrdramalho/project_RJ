import * as turf from "@turf/turf";
import { bairrosData, regioesData, nomesBairros, getBairroDoDia } from "./data";
import {
  normalizeString,
  obterDirecao,
  createPopupBairro,
  montarResumoCompartilhavel,
} from "./utils";
import {
  getElements,
  initAutocomplete,
  bindHelpModal,
  updateTentativas,
  updateMelhorPalpite,
  setShareFeedback,
  clearResultado,
  appendMensagem,
  renderResultados,
  showCelebration,
} from "./dom";
import {
  createGameMap,
  addFeatureLayer,
  addRegioesControl,
  configureMapBounds,
} from "./map";

function calcularCor(distance) {
  let red;
  let green;

  if (distance <= 15) {
    red = 255 - (distance / 15) * 255;
    green = 255;
  } else if (distance <= 25) {
    red = 255;
    green = (distance / 15) * 255;
  } else {
    red = 255;
    green = 0;
  }

  return `rgb(${red}, ${green}, 42)`;
}

export function initGame() {
  const bairroPrinc = getBairroDoDia();
  const { map } = createGameMap(bairroPrinc);
  const elements = getElements();

  const state = {
    acertou: false,
    bairrocerto: "",
    bairrosDigitados: [],
    tentativas: 0,
  };

  initAutocomplete(elements.input, nomesBairros, normalizeString);
  bindHelpModal(elements);
  addRegioesControl(map, regioesData);
  configureMapBounds(map);
  updateTentativas(elements.tentativasCount, state.tentativas);
  updateMelhorPalpite(elements.melhorPalpite, state.bairrosDigitados);

  function compartilharProgresso() {
    const resumo = montarResumoCompartilhavel(state);

    navigator.clipboard
      .writeText(resumo)
      .then(function () {
        setShareFeedback(elements.compartilharBtn, "Progresso copiado!");
        setTimeout(function () {
          setShareFeedback(elements.compartilharBtn, "Compartilhar progresso");
        }, 2000);
      })
      .catch(function () {
        alert(resumo);
      });
  }

  function processarTentativa() {
    const textoDigitado = elements.input.value.trim();

    if (!textoDigitado) {
      return;
    }

    const bairroNormalizado = normalizeString(textoDigitado).toLowerCase();
    const feature = bairrosData.features.find(function (currentFeature) {
      return (
        normalizeString(currentFeature.properties.nome).toLowerCase() ===
        bairroNormalizado
      );
    });

    if (!feature) {
      clearResultado(elements.resultado);
      appendMensagem(
        elements.resultado,
        "p",
        "Bairro inválido. Escolha um bairro listado nas sugestões."
      );
      return;
    }

    state.tentativas += 1;
    updateTentativas(elements.tentativasCount, state.tentativas);

    const centroid1 = turf.centroid(bairroPrinc).geometry.coordinates;
    const centroid2 = turf.centroid(feature).geometry.coordinates;
    const distance = turf.distance(centroid1, centroid2, {
      units: "kilometers",
    });
    const direcao = obterDirecao(centroid2, centroid1);

    state.bairrosDigitados.push({
      nome: feature.properties.nome,
      distancia: distance,
      direcao,
      feature,
    });
    state.bairrosDigitados.sort((a, b) => a.distancia - b.distancia);
    updateMelhorPalpite(elements.melhorPalpite, state.bairrosDigitados);

    if (feature === bairroPrinc) {
      const layer = addFeatureLayer(map, feature, {
        style: function () {
          return {
            color: "green",
            fillColor: "green",
            fillOpacity: 0.8,
            weight: 3,
            className: "bairro-correto",
          };
        },
        popupFactory: createPopupBairro,
      });

      map.fitBounds(layer.getBounds(), { padding: [50, 50] });

      setTimeout(function () {
        showCelebration(
          elements.celebration,
          elements.bairroAcertado,
          feature.properties.nome
        );
      }, 500);

      state.acertou = true;
      state.bairrocerto = textoDigitado;
    } else {
      const fillColor = calcularCor(distance);
      addFeatureLayer(map, feature, {
        style: function () {
          return { color: "gray", fillColor, fillOpacity: 100 };
        },
        popupFactory: createPopupBairro,
      });
    }

    renderResultados(elements.resultado, state);
    elements.input.value = "";
  }

  elements.button.addEventListener("click", processarTentativa);
  elements.input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      processarTentativa();
    }
  });
  elements.compartilharBtn.addEventListener("click", compartilharProgresso);
}
