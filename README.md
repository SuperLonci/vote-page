# Make a Bet

A web application to create bets and collect answers from friends. Share a bet, invite others to vote, and settle debates once and for all.

## Features

- **Create Bets**: Set up a new bet with a title, description, and answer type (text, number, or date)
- **Vote Anonymously**: Friends can submit their answers without creating an account
- **View Results**: See all submitted answers once you've cast your vote
- **Answer Types**: Support for text answers, numeric values, and date selections
- **Easy Sharing**: Simple URL-based sharing for inviting friends

## Tech Stack

- **Frontend**: Svelte with SvelteKit
- **Styling**: Tailwind CSS
- **Database**: SQLite with Drizzle ORM
- **Language**: TypeScript

## Getting Started

### Installation

```sh
npm install
npx drizzle-kit push
```

### Development

Start the development server:

```sh
npm run dev -- --open
```

### Production Build

```sh
npm run build
npm run preview
```

## Deployment

### Prerequisites

- Ubuntu server with Docker and Docker Compose installed
- Git installed
- Domain/server accessible for the application

### Deployment Steps

1. **Clone the Repository**

   ```sh
   cd /var/www/vote.lonci.de/public_html
   git clone <your-github-repo-url> .
   ```

2. **Fetch Latest Updates from GitHub**

   ```sh
   cd /var/www/vote.lonci.de/public_html
   git fetch origin
   git pull origin main
   ```

3. **Build the Docker Image**

   ```sh
   docker-compose build
   ```

4. **Start the Application**

   ```sh
   docker-compose up -d
   ```

   This will:
   - Build the Docker image if not already built
   - Start all services defined in `docker-compose.yml`
   - Run the application in detached mode (background)

5. **Verify Deployment**

   ```sh
   docker-compose ps
   docker-compose logs -f
   ```

### Updating the Deployment

To update your deployment with the latest code:

```sh
cd /yourfolder
git pull origin main
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Stopping the Application

```sh
docker-compose down
```

## How to Use

1. Visit the home page and click **"+ Start New Bet"**
2. Fill in the bet details (title, description, and answer type)
3. Submit to create the bet and get a unique URL
4. Share the URL with friends
5. Friends can submit their answers and see results
