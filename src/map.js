import leaflet from "leaflet";
import * as turf from "@turf/turf";

export function createGameMap(bairroPrinc) {
  const hiddenLayer = leaflet.geoJSON(bairroPrinc, {
    style: function () {
      return { color: "black", fillColor: "black", fillOpacity: 100 };
    },
  });

  const map = leaflet
    .map("mapid")
    .setView(turf.centroid(bairroPrinc).geometry.coordinates.reverse(), 10);

  hiddenLayer.addTo(map);

  return { map, hiddenLayer };
}

export function addFeatureLayer(map, feature, options) {
  const layer = leaflet.geoJSON(feature, {
    style: options.style,
    onEachFeature: function (currentFeature, layerInstance) {
      if (options.popupFactory) {
        layerInstance.bindPopup(options.popupFactory(currentFeature.properties.nome));
      }

      if (options.onEachFeature) {
        options.onEachFeature(currentFeature, layerInstance);
      }

      layerInstance.on("click", function () {
        layerInstance.openPopup();
      });
    },
  });

  layer.addTo(map);
  return layer;
}

export function addRegioesControl(map, regioesData) {
  const BotaoRegioes = leaflet.Control.extend({
    options: {
      position: "topright",
    },

    onAdd: function (leafletMap) {
      const container = leaflet.DomUtil.create(
        "div",
        "leaflet-bar leaflet-control"
      );
      container.innerHTML =
        '<button id="botaoRegioes" class="botao-regioes">Mostrar Regiões</button>';

      let modoFacilAtivo = false;
      let contornos = [];

      container.onclick = function () {
        if (!modoFacilAtivo) {
          regioesData.features.forEach(function (regiao) {
            const contorno = leaflet.geoJSON(regiao, {
              style: function (feature) {
                return { color: feature.properties.color };
              },
              onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.subprefeitura);
              },
            });
            contorno.addTo(leafletMap);
            contornos.push(contorno);
          });

          document.getElementById("botaoRegioes").innerHTML = "Ocultar Regiões";
          modoFacilAtivo = true;
        } else {
          contornos.forEach((contorno) => leafletMap.removeLayer(contorno));
          contornos = [];

          document.getElementById("botaoRegioes").innerHTML = "Mostrar Regiões";
          modoFacilAtivo = false;
        }
      };

      return container;
    },
  });

  map.addControl(new BotaoRegioes());
}

export function configureMapBounds(map) {
  map.setMinZoom(9);
  map.setMaxZoom(14);
  map.setMaxBounds(map.getBounds());
}
