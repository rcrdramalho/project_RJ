import bairros from "../bairros.json";
import regioes from "../regioes.json";

export const bairrosData = { ...bairros };
export const regioesData = { ...regioes };

export const nomesBairros = bairrosData.features
  .map((feature) => feature.properties.nome)
  .sort((a, b) => a.localeCompare(b, "pt-BR"));

export function getBairroDoDia(date = new Date()) {
  const seed = parseInt(
    date.getDate().toString() +
      date.getMonth().toString() +
      date.getFullYear().toString()
  );

  const bairroPrincIndex = (seed ^ 2) % bairrosData.features.length;
  return bairrosData.features[bairroPrincIndex];
}
