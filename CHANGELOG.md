# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [2.1.0] 2026-04-06

### Removed

- Removed the "Desistir" (Give Up) button to maintain focus on discovery and attempts.

### Deprecated

- The "Dica (legado)" (Legacy Hint) button is now deprecated and will be removed in a future release.

### Fixed

- Fixed daily neighborhood seed generation to depend only on date (removed seconds for consistent daily selection).
- Improved neighborhood input validation with error messages for invalid entries.

### Changed

- Updated gameplay instructions in the README to reflect button changes.
- Added a 60-character limit to the neighborhood input field.
- Improved code quality by refactoring DOM manipulation to use proper methods.

## [2.0.0] 2026-04-06

### Added

- Attempt counter displayed in the game interface.
- Support for submitting guesses by pressing `Enter`.
- Direction indicator (north/south/east/west) to help guide the next guess.
- Summary of the best guess so far displayed in the interface.

### Changed

- Usability improvements to make player actions more visible and better documented.
- The list of submitted neighborhoods now also shows the approximate direction for each guess.

## [1.5.1] 2025-07-04

### Changed

- Updated the main game logic.

## [1.5.0] 2025-04-22

### Added

- Added accent-insensitive neighborhood search to make guesses easier to type and find.

## [1.0.1] 2025-04-18

### Added

- Added gameplay feedback improvements to the interface.

### Changed

- Refined the visual and interactive experience across the main HTML, CSS, and JavaScript files.

## [1.0.0] 2025-04-01

### Changed

- Finalized the desktop version of the interface.
- Improved layout positioning.
- Improved mobile responsiveness.

## [0.0.2] 2025-03-31

### Changed

- Continued the second development phase of the game.

## [0.0.1] 2024-03-18

### Fixed

- Fixed issues related to correct neighborhood handling in the core game logic.

## [0.0.0] 2024-03-16

### Added

- Initial project structure.
- First playable versions of the HTML, CSS, JavaScript, and geographic data files.

### Changed

- Iterated on the initial gameplay implementation through several early commits.
