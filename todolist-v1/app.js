const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let items = ["Buy Food", "Eat Food", "Cook food"];
let workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))
app.set('view engine', 'ejs');

app.get("/", function(req, res){

    let today = new Date();
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let date = today.toLocaleDateString("en-US", options);

    res.render("list", {title: date, newListItems: items});
});

app.post("/", function(req, res){
    let item = req.body.newItem;

    if( req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req,res){
    res.render("list", {title: "Work List", newListItems: workItems});
})

app.post("/work", function(req, res){
    let item = req.body.newItem;
    
    workItems.push(item);

    res.redirect("/work");
});


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running.');
});