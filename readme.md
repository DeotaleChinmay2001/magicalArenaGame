# Magical Arena Project

## Problem Statement

Design a turn-based game "Magical Arena" where players with attributes (health, strength, attack) engage in combat using dice rolls to determine damage. Implemented in Java, Go, or Node.js without external libraries, the solution emphasizes clear, modular design with frequent commits and comprehensive unit tests. Evaluation focuses on simplicity, readability, effective modeling, maintainability, and high test coverage, ensuring the solution meets requirements for clarity, flexibility, and robustness in gameplay mechanics and code structure.

## Introduction

Magical Arena is a Node.js project written in TypeScript, designed for a turn-based combat system between two players. Each player has attributes for health, strength, and attack. The frontend application is built using React with TypeScript, and the backend server is developed with Node.js. The project demonstrates proficiency in class design, express server setup, and simple combat logic.

## Features

Backend Features (Node.js)

- Player Class: Manages player attributes and health status.
- Dice Class: Simulates dice rolls for random values.
- Game Class: Handles game logic, turns, and state management.
- Express Server: Provides API endpoints for game creation and actions.

Frontend Features (React)

- Player State Management: Uses useState for player attributes and game state.
- Game Initialization: Sends requests to create a new game and reset state.
- Turn-Based Gameplay: Manages turn flow and updates UI dynamically.
- UI and User Experience: Displays game status, logs, and controls.

Technical and Design Considerations

- Modular Design: Encapsulates logic in separate classes for clarity.
- State Management: Ensures synchronization between frontend and backend.
- Concurrency Support: Handles multiple concurrent games with unique IDs.
- Future Enhancements: Potential addition of a recovery mechanism for game state persistence.

## Getting Started

Follow these instructions to set up the project on your local machine for development and testing.

### Prerequisites

- Node.js (v16 or higher)
- npm (v6 or higher)

### Installation

1. Unzip folder provided

#### Backend Setup

2. cd magical-arena
3. npm install
4. npm run dev (The server will be running at http://localhost:3000)
5. npm run build
6. npm run start:prod

#### Frontend Setup

7. cd magical-arena-client
8. npm install
9. npm run dev
10. npm run build
11. npm run serve
