import "./style.css";
import leaflet from "leaflet";
import * as turf from "@turf/turf";
import bairros from "./bairros.json";
import regioes from "./regioes.json";

//Declarando dados
const bairrosData = { ...bairros };
const regioesData = { ...regioes };
const nomesBairros = [
  "Paquetá",
  "Freguesia (Ilha)",
  "Bancários",
  "Galeão",
  "Tauá",
  "Portuguesa",
  "Moneró",
  "Vigário Geral",
  "Cocotá",
  "Jardim América",
  "Jardim Carioca",
  "Pavuna",
  "Cordovil",
  "Jardim Guanabara",
  "Parada de Lucas",
  "Parque Colúmbia",
  "Praia da Bandeira",
  "Penha Circular",
  "Cacuia",
  "Irajá",
  "Anchieta",
  "Acari",
  "Pitangueiras",
  "Costa Barros",
  "Brás de Pina",
  "Penha",
  "Zumbi",
  "Ribeira",
  "Coelho Neto",
  "Guadalupe",
  "Parque Anchieta",
  "Barros Filho",
  "Vista Alegre",
  "Ricardo de Albuquerque",
  "Colégio",
  "Honório Gurgel",
  "Olaria",
  "Vila da Penha",
  "Maré",
  "Vila Militar",
  "Cidade Universitária",
  "Rocha Miranda",
  "Ramos",
  "Realengo",
  "Vila Kosmos",
  "Marechal Hermes",
  "Vicente de Carvalho",
  "Paciência",
  "Engenho da Rainha",
  "Complexo do Alemão",
  "Vaz Lobo",
  "Padre Miguel",
  "Bento Ribeiro",
  "Turiaçú",
  "Bonsucesso",
  "Inhaúma",
  "Tomás Coelho",
  "Santíssimo",
  "Madureira",
  "Osvaldo Cruz",
  "Santa Cruz",
  "Magalhães Bastos",
  "Senador Camará",
  "Cavalcanti",
  "Campo dos Afonsos",
  "Higienópolis",
  "Manguinhos",
  "Engenheiro Leal",
  "Pilares",
  "Del Castilho",
  "Piedade",
  "Cascadura",
  "Vila Valqueire",
  "Maria da Graça",
  "Quintino Bocaiúva",
  "Jardim Sulacap",
  "Campinho",
  "Abolição",
  "Senador Vasconcelos",
  "Cosmos",
  "Jacarezinho",
  "Cachambi",
  "Praça Seca",
  "Benfica",
  "Engenho de Dentro",
  "São Cristóvão",
  "Vasco da Gama",
  "Inhoaíba",
  "Todos os Santos",
  "Jacaré",
  "Encantado",
  "Rocha",
  "Méier",
  "Gamboa",
  "Santo Cristo",
  "Centro",
  "Sampaio",
  "Riachuelo",
  "Saúde",
  "São Francisco Xavier",
  "Engenho Novo",
  "Mangueira",
  "Tanque",
  "Taquara",
  "Água Santa",
  "Lins de Vasconcelos",
  "Freguesia (Jacarepaguá)",
  "Cidade Nova",
  "Praça da Bandeira",
  "Vila Isabel",
  "Maracanã",
  "Glória",
  "Rio Comprido",
  "Santa Teresa",
  "Estácio",
  "Tijuca",
  "Catumbi",
  "Grajaú",
  "Pechincha",
  "Andaraí",
  "Catete",
  "Flamengo",
  "Laranjeiras",
  "Guaratiba",
  "Vargem Grande",
  "Alto da Boa Vista",
  "Cosme Velho",
  "Curicica",
  "Botafogo",
  "Urca",
  "Cidade de Deus",
  "Sepetiba",
  "Anil",
  "Jacarepaguá",
  "Camorim",
  "Humaitá",
  "Gardênia Azul",
  "Jardim Botânico",
  "Vargem Pequena",
  "Copacabana",
  "Leme",
  "Lagoa",
  "Itanhangá",
  "Gávea",
  "Barra da Tijuca",
  "Leblon",
  "Ipanema",
  "São Conrado",
  "Rocinha",
  "Pedra de Guaratiba",
  "Recreio dos Bandeirantes",
  "Vidigal",
  "Joá",
  "Barra de Guaratiba",
  "Grumari",
  "Caju",
  "Deodoro",
  "Lapa",
  "Campo Grande",
  "Bangu",
  "Gericinó",
  "Jabour",
  "Vila Kennedy",
  "Ilha de Guaratiba",
];

//Definindo estado do dia
const dataAtual = new Date();
const seedR = parseInt(
  dataAtual.getDate().toString() +
    dataAtual.getMonth().toString() +
    dataAtual.getFullYear().toString()
);
const bairroPrincIndex = (seedR ^ 2) % bairrosData.features.length;
const bairroPrinc = bairrosData.features[bairroPrincIndex];

//Cria o mapa inicial
const newPolygonLayer = leaflet.geoJSON(bairroPrinc, {
  style: function (feature) {
    return { color: "black", fillColor: "black", fillOpacity: 100 };
  },
});
const mymap = leaflet
  .map("mapid")
  .setView(turf.centroid(bairroPrinc).geometry.coordinates.reverse(), 10);
newPolygonLayer.addTo(mymap);

//Declarando variáveis para o jogo
var acertou = false;
var bairrocerto = "";
let textoDigitado = "";
const bairrosDigitados = [];
let tentativas = 0;

function normalizeString(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

//Construindo sugestões
document.addEventListener("DOMContentLoaded", function () {
  // Configure o Awesomplete com um filtro personalizado
  new Awesomplete(document.querySelector("#bairro-input"), {
    list: nomesBairros,
    filter: function(text, input) {
      // Normaliza tanto o texto da lista quanto o input do usuário
      return normalizeString(text).toLowerCase().indexOf(
        normalizeString(input.toLowerCase())) !== -1;
    }
  });
});
const input = document.getElementById("bairro-input");
const button = document.getElementById("enviar-btn");
const tentativasCount = document.getElementById("tentativas-count");
const melhorPalpite = document.getElementById("melhor-palpite");
const compartilharBtn = document.getElementById("compartilhar-btn");

function atualizarTentativas() {
  tentativasCount.textContent = tentativas;
}

function obterDirecao(centroidOrigem, centroidDestino) {
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

function atualizarMelhorPalpite() {
  if (bairrosDigitados.length === 0) {
    melhorPalpite.textContent = "Melhor palpite: nenhum ainda";
    return;
  }

  const melhor = bairrosDigitados[0];
  melhorPalpite.textContent =
    `Melhor palpite: ${melhor.nome} (${melhor.distancia.toFixed(2)} km)`;
}

function criarPopupBairro(nome, descricao) {
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

function limparResultado() {
  const resultado = document.getElementById("resultado");
  resultado.replaceChildren();
  return resultado;
}

function adicionarMensagemResultado(resultado, tag, texto) {
  const element = document.createElement(tag);
  element.textContent = texto;
  resultado.appendChild(element);
}

function montarResumoCompartilhavel() {
  const linhas = [
    "BairroGuessr",
    `Tentativas: ${tentativas}`,
  ];

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

async function compartilharProgresso() {
  const resumo = montarResumoCompartilhavel();

  try {
    await navigator.clipboard.writeText(resumo);
    compartilharBtn.textContent = "Progresso copiado!";
    setTimeout(function () {
      compartilharBtn.textContent = "Compartilhar progresso";
    }, 2000);
  } catch (error) {
    alert(resumo);
  }
}

//Tentativas
// Modifique a parte onde você desenha o bairro chutado (dentro do event listener do botão "enviar")
function processarTentativa() {
  textoDigitado = input.value.trim();

  if (!textoDigitado) {
    return;
  }

  const bairroNormalizado = normalizeString(textoDigitado).toLowerCase();
  let bairroEncontrado = false;

  bairrosData.features.forEach(function (feature) {
    if (normalizeString(feature.properties.nome).toLowerCase() === bairroNormalizado) {
      bairroEncontrado = true;
      tentativas += 1;
      atualizarTentativas();
      // Código existente...
      const centroid1 = turf.centroid(bairroPrinc).geometry.coordinates;
      const centroid2 = turf.centroid(feature).geometry.coordinates;
      const distance = turf.distance(centroid1, centroid2, {
        units: "kilometers",
      });
      const direcao = obterDirecao(centroid2, centroid1);

      bairrosDigitados.push({
        nome: feature.properties.nome,
        distancia: distance,
        direcao,
        feature
      });
      bairrosDigitados.sort((a, b) => a.distancia - b.distancia);
      atualizarMelhorPalpite();

      // Quando for o bairro correto
      if (feature == bairroPrinc) {
        // Criamos uma variável para o polígono aqui para poder referenciá-lo depois
        let bairroLayer;
        const newPolygonLayer = L.geoJSON(feature, {
          style: function (feature) {
            return { 
              color: "green", 
              fillColor: "green", 
              fillOpacity: 0.8,
              weight: 3,
              className: "bairro-correto" // Adiciona a classe CSS para animação
            };
          },
          onEachFeature: function(feature, layer) {
            layer.bindPopup(criarPopupBairro(feature.properties.nome));
            layer.on('click', function() {
              layer.openPopup();
            });
            bairroLayer = layer; // Armazena a referência da camada
          }
        });
        newPolygonLayer.addTo(mymap);
        
        // Faz o mapa centralizar e dar zoom no bairro correto
        const bounds = newPolygonLayer.getBounds();
        mymap.fitBounds(bounds, { padding: [50, 50] });
        
        // Mostra celebração após um pequeno delay
        setTimeout(function() {
          const celebration = document.getElementById("celebration");
          document.getElementById("bairro-acertado").textContent = feature.properties.nome;
          celebration.classList.add("celebration-active");
          
          // Remove a celebração após 4 segundos
          setTimeout(function() {
            celebration.classList.remove("celebration-active");
          }, 4000);
        }, 500);
        
        acertou = true;
        bairrocerto = textoDigitado;
      } else {
        // Resto do código para bairros incorretos...
        const fillColor = calcularCor(distance);
        const newPolygonLayer = L.geoJSON(feature, {
          style: function (feature) {
            return { color: "gray", fillColor: fillColor, fillOpacity: 100 };
          },
          onEachFeature: function(feature, layer) {
            layer.bindPopup(criarPopupBairro(feature.properties.nome));
            layer.on('click', function() {
              layer.openPopup();
            });
          }
        });
        newPolygonLayer.addTo(mymap);
      }

      mostrarBairrosDigitados();
      input.value = "";
      return;
    }
  });

  if (!bairroEncontrado) {
    const resultado = limparResultado();
    adicionarMensagemResultado(
      resultado,
      "p",
      "Bairro inválido. Escolha um bairro listado nas sugestões."
    );
  }
}

button.addEventListener("click", processarTentativa);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    processarTentativa();
  }
});

compartilharBtn.addEventListener("click", function () {
  compartilharProgresso();
});

// Função para inicializar a celebração (adicione esta função ao seu código)
function inicializarCelebracao() {
  // Cria o elemento de celebração se não existir
  if (!document.getElementById("celebration")) {
    const celebrationDiv = document.createElement("div");
    celebrationDiv.id = "celebration";
    celebrationDiv.className = "celebration-overlay";
    
    celebrationDiv.innerHTML = `
      <div class="celebration-message">
        <h2>Parabéns!</h2>
        <p>Você acertou o bairro: <span id="bairro-acertado"></span></p>
      </div>
    `;
    
    document.body.appendChild(celebrationDiv);
    
    // Adiciona evento para fechar ao clicar
    celebrationDiv.addEventListener('click', function() {
      celebrationDiv.classList.remove("celebration-active");
    });
  }
}

// Chame esta função no carregamento do documento
document.addEventListener("DOMContentLoaded", function() {
  // Código existente de carregamento
  document.getElementById("ajuda-btn").addEventListener("click", function() {
    document.getElementById("overlay").classList.remove("hidden");
  });

  document.getElementById("fechar-btn").addEventListener("click", function() {
    document.getElementById("overlay").classList.add("hidden");
  });
  
  // Inicializa a celebração
  inicializarCelebracao();
  atualizarTentativas();
  atualizarMelhorPalpite();
});

// Função para mostrar a lista de bairros digitados
function mostrarBairrosDigitados() {
  const resultado = limparResultado();

  if (acertou) {
    adicionarMensagemResultado(resultado, "h3", `Bairro correto! - ${bairrocerto}`);
    adicionarMensagemResultado(
      resultado,
      "p",
      "Todo dia o bairro muda. Volte amanhã para o próximo bairro!"
    );
  } else {
    if (bairrosDigitados.length === 0) {
      adicionarMensagemResultado(resultado, "p", "Nenhum bairro digitado.");
    } else {
      const lista = document.createElement("ul");
      bairrosDigitados.forEach(function (bairro) {
        const item = document.createElement("li");
        item.textContent = `${bairro.nome}: ${bairro.distancia.toFixed(
          2
        )} km, direção: ${bairro.direcao}`;
        lista.appendChild(item);
      });
      resultado.appendChild(lista);
    }
  }
}

//Calcula a cor do bairro com base na distância para o bairro do dia
function calcularCor(distance) {
  let red, green;
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

//Ativa o modo fácil
const botaoRegioes = L.Control.extend({
  options: {
    position: "topright",
  },

  onAdd: function (map) {
    const container = L.DomUtil.create("div", "leaflet-bar leaflet-control");
    container.innerHTML =
      '<button id="botaoRegioes" class="botao-regioes">Mostrar Regiões</button>';

    let modoFacilAtivo = false;
    const mymap = map;
    let contornos = []; // Armazena as camadas adicionadas

 

    container.onclick = function () {
      if (!modoFacilAtivo) {
        // Adiciona os contornos ao mapa e guarda as referências
        regioesData.features.forEach(function (regiao) {
          var contorno = L.geoJSON(regiao, {

            style: function (feature) {
              return { color: feature.properties.color };
            },

            onEachFeature: function (feature, layer) {
              layer.bindPopup(feature.properties.subprefeitura);
            },
          });
          contorno.addTo(mymap);
          contornos.push(contorno); // Armazena a camada adicionada
        });

        document.getElementById("botaoRegioes").innerHTML =
          "Ocultar Regiões";
        modoFacilAtivo = true;
      } else {
        // Remove todas as camadas armazenadas
        contornos.forEach((contorno) => mymap.removeLayer(contorno));
        contornos = []; // Limpa o array

        document.getElementById("botaoRegioes").innerHTML =
          "Mostrar Regiões";
        modoFacilAtivo = false;
      }
    };

    return container;
  },  
});

mymap.addControl(new botaoRegioes());

mymap.setMinZoom(9); // Define um zoom mínimo seguro
mymap.setMaxZoom(14); // Define um zoom máximo permitido
mymap.setMaxBounds(mymap.getBounds()); // Impede que os jogadores naveguem para fora do mapa

