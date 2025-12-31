const express = require("express");
const app = express();
const path = require("path");
const router = require('./routers/router');

// Set up the view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// Default Use
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routing
app.use(router);

// Error Handler
app.use((req,res,next)=>{
  res.send('<h1 style="color:red;">Requested url was not found!</h1>')
})

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;

  console.error(err.stack || err);

  res.status(status).send(err.message || "Internal Server Error");
});

// Server listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});