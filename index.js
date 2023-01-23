const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");

const app = express();


//Init middleware
//Comment out to not run logger everytime a request is made
//app.use(logger);

//Handlebars Middleware -- Second part of tutorial. To create template renders. 
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

//HOMEPAGE ROUTE- Second part of tutorial - To render index view
app.get("/", (req, res) => res.render("index", {
    title: "Member App Project",
    members: members
}));


//Body parser middleware, to be to to post data on API
app.use(express.json());
//To be able to use urlencoded data - form submissions
app.use(express.urlencoded({ extended: false }));


//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Members API Routes
//To be able to use the routes we created. Fitst param is the route, second is the file we want to use
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
