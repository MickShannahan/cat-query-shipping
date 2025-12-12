# Cat Query Shipping 🚀📦

A space-themed game where players search for and recover lost shipments across the galaxy using database queries. Test your querying skills to find damaged and lost packages floating through space!

## Overview

Cat Query Shipping is a full-stack web application that gamifies database querying. Players take on the role of a space courier tracking down lost shipments with missing or corrupted data. Each shipment has varying difficulty ratings and glitches that must be overcome using precise queries.

### Features

- 🔍 Search for lost shipments using database queries
- 📊 Multiple difficulty levels based on data corruption
- 🎮 Game progression system with credits and awards
- 💬 Real-time chat using Socket.IO
- 🛒 In-game shop with items and mods
- 🏆 Achievement system
- 🔐 Auth0 authentication

## Tech Stack

### Server
- **Node.js** (v14+) with Express
- **MongoDB** with Mongoose ODM
- **Socket.IO** for real-time communication
- **Auth0** for authentication
- **ESM** modules

### Client
- **Vue 3** with Composition API
- **Vite** for fast development
- **Bootstrap 5** for styling
- **Axios** for HTTP requests
- **Socket.IO Client** for real-time features

## Prerequisites

- Node.js (v14 or higher recommended, v16+ for full compatibility)
- MongoDB Atlas account or local MongoDB instance
- Auth0 account (for authentication setup)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/MickShannahan/cat-query-shipping.git
cd cat-query-shipping
```

### 2. Install dependencies

Install dependencies for both server and client:

```bash
npm run setup:app
```

Or install them separately:

```bash
# Server dependencies
npm run setup:server

# Client dependencies
npm run setup:client
```

### 3. Configure Environment Variables

Create a `.env` file in the `cat-query-shipping` folder (the server directory). See the `example.env` file in that folder for reference.

Required environment variables:
- `NODE_ENV` - Set to 'dev' for development
- `PORT` - Server port (default: 3000)
- `CONNECTION_STRING` - MongoDB connection string for production
- `CONNECTION_STRING_DEV` - MongoDB connection string for development
- `AUTH_DOMAIN` - Your Auth0 domain
- `AUTH_AUDIENCE` - Your Auth0 API audience
- `AUTH_CLIENT_ID` - Your Auth0 client ID

### 4. Auth0 Setup

1. Create an Auth0 application at [auth0.com](https://auth0.com)
2. Configure your Auth0 application:
   - Set allowed callback URLs
   - Set allowed logout URLs
   - Enable RBAC (Role-Based Access Control)
3. Add the custom rule for extended user info (see server readme for details)
4. Copy your Auth0 credentials to the `.env` file

## Running the Application

### Development Mode

**Start the server:**
```bash
cd cat-query-shipping
npm run dev
```

**Start the client (in a separate terminal):**
```bash
cd cat-query-shipping.client
npm run serve
```

The server will run on `http://localhost:3000` (or your configured PORT)  
The client will run on `http://localhost:8080` (Vite default)

### Production Mode

Build and start the server:
```bash
npm start
```

## Project Structure

```
cat-query-shipping/
├── cat-query-shipping/          # Server application
│   ├── server/                  # Server source code
│   │   ├── controllers/         # API route controllers
│   │   ├── services/            # Business logic layer
│   │   ├── models/              # Mongoose schemas
│   │   ├── db/                  # Database configuration
│   │   ├── handlers/            # Socket.IO event handlers
│   │   └── utils/               # Utility functions
│   ├── client/                  # Static client files (served by server)
│   ├── index.js                 # Server entry point
│   └── package.json             # Server dependencies
│
├── cat-query-shipping.client/   # Vue 3 client application
│   ├── src/                     # Client source code
│   │   ├── components/          # Vue components
│   │   ├── pages/               # Page components
│   │   ├── services/            # API service layer
│   │   ├── models/              # Data models
│   │   └── assets/              # Static assets
│   ├── index.html               # HTML entry point
│   ├── vite.config.js           # Vite configuration
│   └── package.json             # Client dependencies
│
└── package.json                 # Root package scripts
```

## API Endpoints

### Shipments
- `GET /api/shipments` - Get all shipments (with query filters)
- `POST /api/shipments/query` - Search shipments with query object
- `GET /api/shipments/lost` - Get a random lost shipment
- `GET /api/shipments/abandon` - Abandon current shipment and get a new one
- `GET /api/shipments/count` - Get count of shipments
- `POST /api/shipments` - Create a new shipment (admin)

### Game
- `GET /api/game/shop` - Get shop items
- `GET /api/game/shop/buy/:id` - Buy an item from the shop

### Account
- `GET /api/account` - Get current user's account
- `PUT /api/account` - Update account

### Profiles
- `GET /api/profiles` - Get all profiles

### Items
- `GET /api/items` - Get user's inventory items

### Chat
- `GET /api/chats` - Get chat messages
- `POST /api/chats` - Send a chat message

## Game Mechanics

### Shipments
Shipments are generated with various levels of data corruption:
- **Missing Properties** - Some data fields are completely missing
- **Damaged Properties** - Data fields contain corrupted values
- **Damaged Keys** - Property names are corrupted
- **Glitches** - Special anomalies that affect the data

### Difficulty Ratings
Shipments have difficulty ratings from 1-20 based on the level of corruption. Higher difficulty shipments are worth more credits when successfully recovered.

### Credits
Players earn credits by finding and recovering lost shipments. Credits can be used to:
- Purchase items and mods from the shop
- Unlock higher difficulty shipments
- Abandon difficult shipments (costs credits)

### Mods
Special items that help recover shipment data more easily by revealing missing or corrupted information.

## Development

### Linting
```bash
# Server
cd cat-query-shipping
npm run lint

# Client
cd cat-query-shipping.client
npm run lint
```

### Building for Production
```bash
# Client build
cd cat-query-shipping.client
npm run build
```

## Contributing

This is an educational project. Feel free to fork and experiment!

## License

© CodeWorks® LLC, 2021. This project is for educational purposes.

---

**Happy Shipping! 🚀**
