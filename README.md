# To-Let Intern

## Installation Steps

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd to-let-intern
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Install Client Dependencies
```bash
cd ../client
npm install
```

### 4. Setup Environment Variables

#### Server (.env file in server folder)
Create a `.env` file in the `server` folder with:
```
DATABASE_URL_NEW=your_mongodb_connection_string
FRONTEND=http://localhost:5173
JWT_SECRET=your_jwt_secret_key
```

#### Client (.env file in client folder)
Create a `.env` file in the `client` folder with:
```
VITE_BASE_URL=http://localhost:3000
```

### 5. Run the Application

#### Start Server
```bash
cd server
npm run dev
```

#### Start Client (in a new terminal)
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`


### video link: https://github.com/user-attachments/assets/7e54bcda-60aa-4462-ae2c-d07f212fec37
