# PagifyPulse (Server)

### Project Overview
The server side of PagifyPulse is built using Node.js and Express.js, with MongoDB as the database. The server handles requests from the client side to fetch, filter, sort, and paginate products from the database.

### Features
- **Search**: API to search products by name using regular expressions.
- **Sorting**: API to sort products by date and price.
- **Filtering**: API to filter products by brand, category, and price range.
- **Pagination**: API to paginate through products with a specified limit.

### Technologies Used
- **Node.js**: For building the server.
- **Express.js**: For handling API routes.
- **MongoDB**: As the database to store products.
- **Vercel**: For deployment.

### API Endpoints
- `GET /products` - Fetch products with optional search, sorting, filtering, and pagination.
  - **Query Parameters**:
    - `search`: Search products by name.
    - `sort`: Sort products by date (`date-asc`, `date-desc`) and price (`price-asc`, `price-desc`).
    - `brand`: Filter products by brand.
    - `category`: Filter products by category.
    - `priceRange`: Filter products by price range.
    - `page`: Page number for pagination.
    - `limit`: Number of products per page.

### Installation

1. **Clone the repository.**
   ```bash
   git clone <repository-url>
   cd server
Install dependencies.

bash
Copy code
npm install
Set up environment variables.
Create a .env file in the root of your project and add the following:

env
Copy code
PORT=5000
DB_USER=<your-db-username>
DB_PASSWORD=<your-db-password>
Replace <your-db-username> and <your-db-password> with your actual MongoDB credentials.

Run the server.

bash
Copy code
npm start
Deployment
The server is deployed on Vercel. To deploy your server on Vercel:

Install the Vercel CLI.

bash
Copy code
npm install -g vercel
Deploy the server.

bash
Copy code
vercel
Follow the prompts to complete the deployment process.

Environment Variables on Vercel.

Go to your Vercel dashboard.
Select your project and go to the "Settings" tab.
Under "Environment Variables," add the same variables you defined in your .env file (PORT, DB_USER, DB_PASSWORD).
Troubleshooting
If you encounter issues with connecting to the database:

Ensure your MongoDB URI and credentials are correctly set in the .env file.
Check Vercel’s environment variable configuration if deployed.
Ensure the MongoDB Atlas IP Whitelist includes the IPs you are using.