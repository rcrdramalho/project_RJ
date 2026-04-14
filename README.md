# BairroGuessr

Jogo diário em que você tenta descobrir qual é o bairro do dia na cidade do Rio de Janeiro.

## Tecnologias

- Vite
- JavaScript
- Leaflet
- Turf.js

## Como rodar

```bash
npm install
npm run dev
```

## Como jogar

- Observe o mapa e tente descobrir qual é o bairro do dia.
- Digite o nome de um bairro no campo de busca.
- Clique em `Enviar` para registrar o palpite.
- O jogo mostra a distância e a direção aproximada entre o bairro escolhido e o bairro correto.
- Use o botão `Mostrar Regiões` para visualizar as regiões da cidade e o botão `Dica (legado)` se quiser uma ajuda extra.

## Recursos

- Autocomplete de bairros
- Coloração por proximidade
- Indicação de direção para orientar o próximo palpite
- Resumo do melhor palpite até o momento
- Destaque visual quando o jogador acerta
- Modo fácil com exibição das regiões

## Notas de compatibilidade

- `Dica (legado)` continua disponível nesta versão, mas está em processo de descontinuação.
- O botão `Desistir` foi removido para manter a experiência centrada em tentativa e descoberta.

## Segurança

- A aplicação usa uma Content Security Policy para restringir origens permitidas de scripts, estilos e outros recursos.
- Recursos externos carregados por CDN usam políticas mais restritivas de `referrer` e `crossorigin`.
