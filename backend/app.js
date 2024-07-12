require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const gbooksRoute = require('./routes/gbooksRoute');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = parseInt(process.env.PORT);

const bookRouter = require('./routes/bookRoute');
const usedbookRouter = require('./routes/usedbookRoute');
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');
const adminorderRouter = require('./routes/adminorderRoute');

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connection is established');
    })
    .catch((err) => {
        console.log('Error connecting to the Database', err.message);
    });

app.use(express.json());
app.use(gbooksRoute);
app.use(bookRouter);
app.use(usedbookRouter);
app.use('/auth', userRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use(adminorderRouter);

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});
