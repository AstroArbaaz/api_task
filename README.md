# ecommerce_api_task
## Project Setup

### Requirements
- Node.js (v22 or later)
- PostgreSQL (v17 or later)
- Docker (optional, for containerized setup)
- Memcached (v1.6 or later)

### Installation
1. Clone the repository:
  ```sh
  git clone https://github.com/AstroArbaaz/ecommerce_api_task.git
  cd ecommerce_api_task
  ```

2. Install dependencies:
  ```sh
  npm install
  ```

3. Set up environment variables:
  ```sh
  cp .env.example .env
  # Update .env with your configuration
  ```

### Database Setup
1. Start PostgreSQL and Memcached using Docker:
  ```sh
  docker-compose up -d
  ```

2. Run database migrations:
  ```sh
  npx prisma migrate deploy
  ```

3. Generate Prisma client:
  ```sh
  npx prisma generate
  ```

### Running the Server
1. Start the server:
  ```sh
  npm run dev
  ```

2. The server will be running at `http://localhost:4000`.

## API Contracts

### User
- **Create User**
  - **URL:** `/api/users`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "email": "string",
      "password": "string",
      "name": "string"
    }
    ```

- **Login**
  - **URL:** `/api/login`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

- **Update User**
  - **URL:** `/api/users/:id`
  - **Method:** `PUT`
  - **Body:**
    ```json
    {
      "email": "string",
      "password": "string",
      "name": "string"
    }
    ```

### Event
- **Create Event**
  - **URL:** `/api/events`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "name": "string",
      "date": "string",
      "totalSeats": "number"
    }
    ```

- **Get Events**
  - **URL:** `/api/events`
  - **Method:** `GET`

- **Get Event by ID**
  - **URL:** `/api/events/:id`
  - **Method:** `GET`

- **Update Event**
  - **URL:** `/api/events/:id`
  - **Method:** `PUT`
  - **Body:**
    ```json
    {
      "name": "string",
      "date": "string",
      "totalSeats": "number"
    }
    ```

- **Delete Event**
  - **URL:** `/api/events/:id`
  - **Method:** `DELETE`

### Seat
- **Create Seat**
  - **URL:** `/api/seats`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "eventId": "string",
      "label": "string"
    }
    ```

- **Get Seats**
  - **URL:** `/api/seats`
  - **Method:** `GET`

- **Get Seat by ID**
  - **URL:** `/api/seats/:id`
  - **Method:** `GET`

- **Update Seat**
  - **URL:** `/api/seats/:id`
  - **Method:** `PUT`
  - **Body:**
    ```json
    {
      "eventId": "string",
      "label": "string",
      "status": "string"
    }
    ```

- **Delete Seat**
  - **URL:** `/api/seats/:id`
  - **Method:** `DELETE`

### Booking
- **Create Booking**
  - **URL:** `/api/bookings`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "eventId": "string",
      "userId": "string",
      "seatId": "string"
    }
    ```

- **Get Bookings**
  - **URL:** `/api/bookings`
  - **Method:** `GET`

- **Get Booking by ID**
  - **URL:** `/api/bookings/:id`
  - **Method:** `GET`

- **Update Booking**
  - **URL:** `/api/bookings/:id`
  - **Method:** `PUT`
  - **Body:**
    ```json
    {
      "eventId": "string",
      "userId": "string",
      "seatId": "string",
      "status": "string"
    }
    ```

- **Delete Booking**
  - **URL:** `/api/bookings/:id`
  - **Method:** `DELETE`