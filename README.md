React
   │
   ├── REST API ───────────────┐
   │                           │
   └── WebSocket ──────────────┤
                               ▼
                         Flask Backend
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
             REST routes              WebSocket
                 │                           │
                 ▼                           ▼
          User / Profile              Chat / Messages
          Like / Match
          Search
          Recommendation
                 │
                 ▼
               Neo4j
