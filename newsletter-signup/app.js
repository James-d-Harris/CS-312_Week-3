const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https')

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                },
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us22.api.mailchimp.com/3.0/lists/ebabd77507"

    const options = {
        method: "POST",
        auth: "James1:c2a48409a15eb7f77693403cfd29a454-us22"
    }

    const request = https.request(url, options, function(response){

        response.on("data", function(data){
            const parsed = JSON.parse(data);
            console.log(parsed);

            if( parsed.error_count === 0 ) {
                console.log("Success")
                res.sendFile(__dirname + "/success.html");
            } else {
                console.log("Failure");
                res.sendFile(__dirname + "/failure.html");
            };
        });
    });

    request.write(jsonData);
    request.end();
});


app.post("/failure", function(req, res){
    res.redirect("/")
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running.');
});


// API Key
// c2a48409a15eb7f77693403cfd29a454-us22

// List ID
// ebabd77507