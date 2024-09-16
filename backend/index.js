const express = require("express");
const app = express();
const router = require('./routes/index');
const cors = require('cors');

app.use(cors(
    {
        origin: ["https://walletwave.verce.app"],
        methods: ["POST", "GET", "PUT"],
        credentials: true
    }
));
app.use(express.json());
app.use('/api/v1', router);
app.get("/", (req, res) => {
    res.send("Hello");
})
app.listen(3000, () => {
    console.log("app listening on port 3000");
})

