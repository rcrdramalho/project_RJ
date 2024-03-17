import "./style.css";
import leaflet from "leaflet";
import * as turf from "@turf/turf";
import bairros from "./bairros.json";
import regioes from "./regioes.json";

//Declarando dados
const bairrosData = {...bairros };
const regioesData = {...regioes};
const nomesBairros = [
    "Paquetá","Freguesia (Ilha)","Bancários","Galeão","Tauá","Portuguesa","Moneró","Vigário Geral","Cocotá","Jardim América","Jardim Carioca","Pavuna","Cordovil","Jardim Guanabara","Parada de Lucas",
    "Parque Colúmbia","Praia da Bandeira","Penha Circular","Cacuia","Irajá","Anchieta","Acari","Pitangueiras","Costa Barros","Brás de Pina","Penha","Zumbi","Ribeira","Coelho Neto","Guadalupe","Parque Anchieta",
    "Barros Filho","Vista Alegre","Ricardo de Albuquerque","Colégio","Honório Gurgel","Olaria","Vila da Penha","Maré","Vila Militar","Cidade Universitária","Rocha Miranda","Ramos","Realengo","Vila Kosmos","Marechal Hermes",
    "Vicente de Carvalho","Paciência","Engenho da Rainha","Complexo do Alemão","Vaz Lobo","Padre Miguel","Bento Ribeiro","Turiaçú","Bonsucesso","Inhaúma","Tomás Coelho","Santíssimo","Madureira","Osvaldo Cruz","Santa Cruz",
    "Magalhães Bastos","Senador Camará","Cavalcanti","Campo dos Afonsos","Higienópolis","Manguinhos","Engenheiro Leal","Pilares","Del Castilho","Piedade","Cascadura","Vila Valqueire","Maria da Graça","Quintino Bocaiúva",
    "Jardim Sulacap","Campinho","Abolição","Senador Vasconcelos","Cosmos","Jacarezinho","Cachambi","Praça Seca","Benfica","Engenho de Dentro","São Cristóvão","Vasco da Gama","Inhoaíba","Todos os Santos",
    "Jacaré","Encantado","Rocha","Méier","Gamboa","Santo Cristo","Centro","Sampaio","Riachuelo","Saúde","São Francisco Xavier","Engenho Novo","Mangueira","Tanque","Taquara","Água Santa","Lins de Vasconcelos",
    "Freguesia (Jacarepaguá)","Cidade Nova","Praça da Bandeira","Vila Isabel","Maracanã","Glória","Rio Comprido","Santa Teresa","Estácio","Tijuca","Catumbi","Grajaú","Pechincha","Andaraí","Catete",
    "Flamengo","Laranjeiras","Guaratiba","Vargem Grande","Alto da Boa Vista","Cosme Velho","Curicica","Botafogo","Urca","Cidade de Deus","Sepetiba","Anil","Jacarepaguá","Camorim","Humaitá","Gardênia Azul",
    "Jardim Botânico","Vargem Pequena","Copacabana","Leme","Lagoa","Itanhangá","Gávea","Barra da Tijuca","Leblon","Ipanema","São Conrado","Rocinha","Pedra de Guaratiba","Recreio dos Bandeirantes","Vidigal",
    "Joá","Barra de Guaratiba","Grumari","Caju","Deodoro","Lapa","Campo Grande","Bangu","Gericinó","Jabour","Vila Kennedy","Ilha de Guaratiba"
  ]

//Definindo estado do dia
const dataAtual = new Date();
const seedR = parseInt(dataAtual.getDate().toString() + dataAtual.getMonth().toString() + dataAtual.getFullYear().toString());
const bairroPrincIndex = (seedR^2) % bairrosData.features.length;
const bairroPrinc = bairrosData.features[bairroPrincIndex];


//Cria o mapa inicial
const newPolygonLayer = leaflet.geoJSON(bairroPrinc, {
    style: function (feature) {
        return { color: "black", fillColor: "black", fillOpacity: 100 };
    },
});
const setZoom = Math.floor(Math.random() * 5) + 11;
const mymap = leaflet.map("mapid").setView(turf.centroid(bairroPrinc).geometry.coordinates.reverse(), setZoom);
newPolygonLayer.addTo(mymap);

//Declarando variáveis para o jogo
var acertou = false;
var bairrocerto = '';
let textoDigitado = '';
const bairrosDigitados = [];

//Construindo sugestões
document.addEventListener("DOMContentLoaded", function() {
  new Awesomplete(document.querySelector("#bairro-input"), {
      list: nomesBairros
  });
});
const input = document.getElementById('bairro-input');
const button = document.getElementById('enviar-btn');

//Tentativas
button.addEventListener('click', function() {
    textoDigitado = input.value;

    bairrosData.features.forEach(function(feature) {
      if (feature.properties.nome.toLowerCase() === textoDigitado.toLowerCase()) {

        //Calcula a distância entre o chute e o bairro do dia
          const centroid1 = turf.centroid(bairroPrinc).geometry.coordinates;
          const centroid2 = turf.centroid(feature).geometry.coordinates;
          const distance = turf.distance(centroid1, centroid2, { units: "kilometers" });

        //Monta a lista de bairros chutados
          bairrosDigitados.push({ nome: feature.properties.nome, distancia: distance });
          bairrosDigitados.sort((a, b) => a.distancia - b.distancia);

        //Desenha o bairro chutado
        if(feature == bairroPrinc){
          const newPolygonLayer = L.geoJSON(feature, {
              style: function (feature) {
                  return {color: "green", fillColor: "green", fillOpacity: 100}; // Defina as cores do polígono conforme necessário
              },
          });
          newPolygonLayer.addTo(mymap);
          acertou = true;
          bairrocerto = textoDigitado;

        }else{
          const fillColor = calcularCor(distance);
          const newPolygonLayer = L.geoJSON(feature, {
              style: function (feature) {
                  return {color: "gray", fillColor: fillColor, fillOpacity: 100}; // Defina as cores do polígono conforme necessário
              },
          });
          newPolygonLayer.addTo(mymap);
        }

        mostrarBairrosDigitados();
  
        return;
      }
    });
  });
  
  // Função para mostrar a lista de bairros digitados
  function mostrarBairrosDigitados() {
      const resultado = document.getElementById('resultado');
      resultado.innerHTML = '<h2></h2>';

      if(acertou){
        resultado.innerHTML += `<h1>Bairo correto!! - ${bairrocerto}</h1>`;
      }else{
        if (bairrosDigitados.length === 0) {
            resultado.innerHTML += '<p>Nenhum bairro digitado.</p>';
        } else {
            resultado.innerHTML += '<ul>';
            bairrosDigitados.forEach(function(bairro) {
                resultado.innerHTML += `<li>${bairro.nome}: ${bairro.distancia.toFixed(2)} km</li>`;
            });
            resultado.innerHTML += '</ul>';
        }
      }
  }

  //Calcula a cor do bairro com base na distância para o bairro do dia
  function calcularCor(distance) {
    let red, green;
    if(distance <= 15){
        red = 255 - (distance/15)*255;
        green = 255;
    } else if(distance <= 25){
        red = 255;
        green = (distance/15)*255;
    } else {
        red = 255;
        green = 0;
    }
    return `rgb(${red}, ${green}, 42)`;
}


//Ativa o modo fácil
const botaoRegioes = L.Control.extend({
    options: {
        position: 'topright'
    },

    onAdd: function (map) {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        container.innerHTML = '<button id="botaoRegioes" class="botao-regioes">Mostrar Regiões <span>(modo fácil)</span></button>';
        container.onclick = function () {
            regioesData.features.forEach(function(regiao){
                var contorno = leaflet.geoJSON(regiao,{
                    style: function(regiao){
                        return {color: regiao.properties.color}
                    },
                    onEachFeature: function (feature, layer) {
                        layer.bindPopup(feature.properties.subprefeitura);
                      },
                });
        
                contorno.addTo(mymap);
            });

            document.getElementById('botaoRegioes').disabled = true;
        };

        return container;
    }
});
mymap.addControl(new botaoRegioes());
