# Web Educational Portal Project

## Description

Web Educational Portal is a Node.js web application built with Express and TypeScript. It uses MongoDB as the database and includes authentication features with JWT.

## Technologies Used

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Prettier for code formatting
- ESLint for linting

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

## Usage

- To start the development server with hot reload:

  ```bash
  yarn run dev
  ```

- The server will start on the default port (usually 3000). You can access the API endpoints as defined in the routes.

## Project Structure

- `src/` - Source code directory
  - `config/` - Configuration files (e.g., database connection)
  - `controllers/` - Route controllers
  - `middlewares/` - Express middlewares
  - `models/` - Mongoose models
  - `routes/` - Express route definitions
  - `services/` - Business logic and services
  - `utils/` - Utility functions

## Code Quality

- Prettier is used for code formatting. Configuration is in `.prettierrc`.
- ESLint is used for linting. Configuration is in `eslint.config.mjs`.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.

## License

This project is licensed under the MIT License.
