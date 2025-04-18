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
const setZoom = Math.floor(Math.random() * 5) + 11;
const mymap = leaflet
  .map("mapid")
  .setView(turf.centroid(bairroPrinc).geometry.coordinates.reverse(), 10);
newPolygonLayer.addTo(mymap);

//Declarando variáveis para o jogo
var acertou = false;
var bairrocerto = "";
let textoDigitado = "";
const bairrosDigitados = [];

//Construindo sugestões
document.addEventListener("DOMContentLoaded", function () {
  new Awesomplete(document.querySelector("#bairro-input"), {
    list: nomesBairros,
  });
});
const input = document.getElementById("bairro-input");
const button = document.getElementById("enviar-btn");

//Tentativas
// Modifique a parte onde você desenha o bairro chutado (dentro do event listener do botão "enviar")
button.addEventListener("click", function () {
  textoDigitado = input.value;

  bairrosData.features.forEach(function (feature) {
    if (feature.properties.nome.toLowerCase() === textoDigitado.toLowerCase()) {
      // Código existente...
      const centroid1 = turf.centroid(bairroPrinc).geometry.coordinates;
      const centroid2 = turf.centroid(feature).geometry.coordinates;
      const distance = turf.distance(centroid1, centroid2, {
        units: "kilometers",
      });

      bairrosDigitados.push({
        nome: feature.properties.nome,
        distancia: distance,
        feature: feature
      });
      bairrosDigitados.sort((a, b) => a.distancia - b.distancia);

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
            layer.bindPopup(feature.properties.nome);
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
            layer.bindPopup(feature.properties.nome);
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
});

// Função para mostrar a lista de bairros digitados
function mostrarBairrosDigitados() {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "<h2></h2>";

  if (acertou) {
    resultado.innerHTML += `<h3>Bairro correto! - ${bairrocerto}</h3>\n<p>Todo dia o bairro muda. Volte amanhã para o próximo bairro!</p>`;
  } else {
    if (bairrosDigitados.length === 0) {
      resultado.innerHTML += "<p>Nenhum bairro digitado.</p>";
    } else {
      resultado.innerHTML += "<ul>";
      bairrosDigitados.forEach(function (bairro) {
        resultado.innerHTML += `<li>${bairro.nome}: ${bairro.distancia.toFixed(
          2
        )} km</li>`;
      });
      resultado.innerHTML += "</ul>";
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

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("ajuda-btn").addEventListener("click", function () {
    document.getElementById("overlay").classList.remove("hidden");
  });

  document.getElementById("fechar-btn").addEventListener("click", function () {
    document.getElementById("overlay").classList.add("hidden");
  });
});

mymap.setMinZoom(9); // Define um zoom mínimo seguro
mymap.setMaxZoom(14); // Define um zoom máximo permitido
mymap.setMaxBounds(mymap.getBounds()); // Impede que os jogadores naveguem para fora do mapa

const botaoDesistir = L.Control.extend({
  options: {
    position: 'topright'
  },

  onAdd: function(map) {
    const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    container.innerHTML = '<button id="botaoDesistir" class="botao-desistir">Desistir</button>';
    
    container.onclick = function() {
      // Verifica se o usuário já acertou para evitar revelar sem necessidade
      if (acertou) {
        alert("Você já acertou o bairro!");
        return;
      }
      
      // Confirma se o usuário realmente quer desistir
      if (confirm("Tem certeza que deseja desistir e revelar o bairro?")) {
        revelarBairroDoDia();
      }
    };
    
    return container;
  }
});

// Adiciona o controle do botão desistir ao mapa
mymap.addControl(new botaoDesistir());

// 3. Crie a função para revelar o bairro do dia
function revelarBairroDoDia() {
  // Remove o bairro escurecido (referência ao polígono preto inicial)
  mymap.eachLayer(function(layer) {
    // Verifica se a camada tem o estilo do bairro do dia (polígono preto)
    if (layer.feature && layer.feature === bairroPrinc) {
      mymap.removeLayer(layer);
    }
  });
  
  // Adiciona o bairro do dia com cor vermelha (indicando derrota)
  const bairroRevelado = L.geoJSON(bairroPrinc, {
    style: function(feature) {
      return { 
        color: 'purple', 
        fillColor: 'purple', 
        fillOpacity: 0.7,
        weight: 3
      };
    },
    onEachFeature: function(feature, layer) {
      // Adiciona popup com o nome do bairro
      layer.bindPopup(
        `<strong>${feature.properties.nome}</strong><br>Este era o bairro correto!`
      ).openPopup();
      
      // Faz o popup abrir automaticamente
      layer.on('click', function() {
        layer.openPopup();
      });
    }
  }).addTo(mymap);
  
  // Centraliza e dá zoom no bairro revelado
  mymap.fitBounds(bairroRevelado.getBounds(), { padding: [50, 50] });
  
  // Atualiza a interface para indicar que o jogo acabou
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `
    <h3>Jogo finalizado</h3>
    <p>O bairro correto era: <strong>${bairroPrinc.properties.nome}</strong></p>
    <p>Volte amanhã para tentar novamente!</p>
  `;
  
  // Desabilita o input para evitar mais tentativas
  document.getElementById("bairro-input").disabled = true;
  document.getElementById("enviar-btn").disabled = true;
  
  // Marca o jogo como finalizado (não com acerto)
  acertou = false;
  bairrocerto = bairroPrinc.properties.nome;
}

// 2. Crie o controle para o botão de dica
const botaoDica = L.Control.extend({
  options: {
    position: 'topright'
  },

  onAdd: function(map) {
    const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    container.innerHTML = '<button id="botaoDica" class="botao-dica">Dica</button>';
    
    container.onclick = function() {
      // Verifica se o usuário já acertou
      if (acertou) {
        alert("Você já acertou o bairro!");
        return;
      }
      
      // Cria a dica no formato solicitado
      const nomeBairro = bairroPrinc.properties.nome;
      const primeiraLetra = nomeBairro.charAt(0);
      const asteriscos = '*'.repeat(nomeBairro.length - 1);
      const dicaFormatada = primeiraLetra + asteriscos;
      
      // Exibe a dica em um alert simples
      alert(`Nome: ${dicaFormatada}`);
    };
    
    return container;
  }
});

// 3. Adiciona o controle ao mapa
mymap.addControl(new botaoDica());