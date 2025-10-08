# Dragon vs Tiger Betting Game

## Overview
A continuous server-driven betting game featuring Dragon vs Tiger with 25-second rounds (15 seconds betting + 10 seconds revealing). The game runs 24/7 independently of player activity with anonymous session-based multiplayer synchronization.

## Recent Changes (October 8, 2025)
- Successfully migrated from Lovable/Supabase to Replit fullstack environment
- Fixed query client to properly handle array query keys for parameterized API routes
- Removed all Supabase dependencies and authentication files
- Simplified TopBar component (removed auth)
- Updated LoadingScreen to use new API endpoint for server connection test
- Game is now fully functional with balance and betting working correctly

## Architecture

### Backend (Express + Node.js)
- **Game Manager**: Continuous server-driven game loop running 24/7
  - 25-second rounds: 15s betting phase + 10s revealing phase
  - Automatic round progression and winner calculation
  - Payout system: 2x for dragon/tiger wins, 8x for tie wins
- **Storage**: In-memory storage (MemStorage) for game state, rounds, bets, and balances
- **API Routes**: RESTful endpoints for game state, betting, and balance operations

### Frontend (React + Vite)
- **UI Framework**: React with shadcn/ui components
- **Routing**: wouter for client-side routing
- **State Management**: React Query for server state with 1-second polling
- **Session**: Anonymous localStorage-based sessions (no authentication)
- **Real-time Updates**: Polling-based synchronization with server

### Database
- **ORM**: Drizzle ORM with Neon PostgreSQL
- **Tables**: game_rounds, bets, player_balances, profiles
- **Schema Location**: shared/schema.ts

## Project Structure
```
client/src/          - Frontend React application
server/              - Express backend
  - gameManager.ts   - Continuous game loop logic
  - routes.ts        - API endpoints
  - storage.ts       - Storage interface and MemStorage implementation
shared/              - Shared types and schemas
  - schema.ts        - Drizzle ORM schema definitions
```

## Key Features
- Server-driven continuous game loop (runs independently of players)
- Anonymous session-based multiplayer
- Real-time balance updates
- Betting with chip selection (10, 50, 100, 500, 10k)
- Payout calculation and automatic balance updates
- Mobile-responsive casino-style interface

## Development
- Run: `npm run dev` (already configured in workflow)
- Server + Client run on same port via Vite integration
- Hot reload enabled for both frontend and backend

## User Preferences
None specified yet.
