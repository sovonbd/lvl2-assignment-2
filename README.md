# lvl2-assignment-2

## Live Server

You can access the live server [here](https://lvl2-assignment-2-umber.vercel.app/).


## Description

This project is a Express application with TypeScript as the programming language, integrating MongoDB with Mongoose for effective data management. Ensure data integrity through validation using Zod..

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sovonbd/lvl2-assignment-2.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory of the project and specify the following environment variables:

   ```plaintext
   PORT=5000
   DATABASE_URL=mongodb://localhost:27017/mydatabase
   ```

   Replace `5000` with your desired port number, and `mongodb://localhost:27017/mydatabase` with the connection string to your MongoDB database.

## Usage

### Development

To run the project in development mode:

```bash
npm run start:dev
```

### Production

To build and run the project in production mode:

1. Build the project:

   ```bash
   npm run build
   ```

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
