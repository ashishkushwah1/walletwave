const express = require("express");
const app = express();
const router = require('./routes/index');
const cors = require('cors');

const allowedOrigins = ['http://localhost:3000', 'https://walletwave-frontend.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps, curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // If you're sending cookies or using authentication tokens
}));
app.use(express.json());
app.use('/api/v1', router);
app.options('*', cors()); // Preflight all routes
app.get("/", (req, res) => {
    res.send("Hello");
})
app.listen(3000, () => {
    console.log("app listening on port 3000");
})

