## 🏗️ Architecture

```text
                              ┌──────────────────┐
                              │  React Frontend  │
                              └────────┬─────────┘
                                       │
                         ┌─────────────┴─────────────┐
                         │                           │
                     REST API                   WebSocket
                         │                           │
                         └─────────────┬─────────────┘
                                       ▼
                              ┌──────────────────┐
                              │  Flask Backend   │
                              └────────┬─────────┘
                                       │
                         ┌─────────────┴─────────────┐
                         │                           │
                    REST Routes                 WebSocket
                         │                           │
                         ▼                           ▼
              ┌─────────────────────┐       ┌──────────────────┐
              │ User / Profile      │       │ Chat / Messages  │
              │ Like / Match        │       └────────┬─────────┘
              │ Search              │                │
              │ Recommendation      │                │
              └──────────┬──────────┘                │
                         │                            │
                         └────────────┬───────────────┘
                                      ▼
                              ┌──────────────────┐
                              │      Neo4j       │
                              │  Graph Database  │
                              └──────────────────┘
```


## REST API

POST   /api/auth/register
POST   /api/auth/login

GET    /api/users
GET    /api/users/:id

PUT    /api/profile

POST   /api/users/:id/like
DELETE /api/users/:id/like

GET    /api/matches
GET    /api/recommendations


## WebSocket

```text
    Alice ── WebSocket ──> Flask ──> Neo4j
                           │
                           └──> Bob
```
