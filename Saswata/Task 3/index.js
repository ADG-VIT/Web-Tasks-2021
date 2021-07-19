const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
});