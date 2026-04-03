# Changelog

Todas as mudanças relevantes deste projeto estão resumidas aqui com base no histórico de commits.

O formato segue uma linha do tempo simples, organizada por fases do projeto.

## [Unreleased]

### Added

- Contador de tentativas exibido na interface do jogo.
- Suporte para enviar palpites pressionando `Enter`.
- Novo `README.md` com instruções de execução, mecânica do jogo e recursos principais.

### Changed

- Ajustes na experiência de uso para tornar as ações do jogador mais visíveis e documentadas.

## [2026-04-02] - Automação e CI

### Added

- Workflow inicial de CI com GitHub Actions para instalar dependências e gerar build do projeto.
- Arquivos de suporte para automação de sugestão de README via `gh-aw`.

### Fixed

- Correção de indentação no workflow YAML para permitir a execução do Actions.

### Notes

- Esta fase também inclui commits experimentais de validação da automação agentic no repositório.

## [2025-07-04] - Ajustes de lógica do jogo

### Changed

- Atualizações na lógica principal em `main.js`, expandindo o comportamento do jogo após as melhorias de interface e feedback.

## [2025-04-22] - Busca com acentuação flexível

### Added

- Suporte para ignorar acentuação ao buscar bairros no campo de entrada, melhorando a usabilidade do autocomplete.

## [2025-04-19] - Identidade visual

### Changed

- Atualização do ícone do projeto, incluindo upload do novo asset e renomeação para `icon.png`.

## [2025-04-18] - Feedback visual da partida

### Added

- Melhorias de feedback visual para o jogador durante a partida.

### Changed

- Ajustes em `index.html`, `main.js` e `style.css` para reforçar estados do jogo e acabamento visual.

## [2025-04-01] - Consolidação da interface

### Changed

- Versão final para desktop.
- Ajustes de posicionamento da interface.
- Melhorias de responsividade para celular.

## [2025-03-31] - Evolução diária do projeto

### Changed

- Continuidade do desenvolvimento da segunda fase do jogo, registrada no commit `dia 2`.

## [2024-06-12] - Documentação inicial

### Added

- Criação do arquivo `ReadMe` com a descrição inicial do projeto.

## [2024-03-16] a [2024-03-18] - Primeira implementação

### Added

- Estrutura inicial do jogo.
- Primeiras versões de `index.html`, `main.js`, `style.css` e dados geográficos do projeto.

### Changed

- Série de commits incrementais refinando a lógica principal até a primeira versão jogável.
- Correções para exibição do bairro correto e ajustes gerais de funcionamento.
