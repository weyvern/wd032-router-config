const express = require('express');
const usersRouter = require('./routes/usersRouter');

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());
app.use('/users', usersRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
