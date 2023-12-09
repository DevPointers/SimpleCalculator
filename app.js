const hostName = "localhost";
const port = 3000;
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.post('/view', function(req, res) {
    const source = req.body.operation;
    const num1 = req.body.num1;
    const num2 = req.body.num2;
    const result = calculate(source, num1, num2);
    
    res.send("<html><body><p><b>Result: </b>" + `${result}` +  "</p></body><div><a href='/'>Go back</a><div></html>");
});

// Start the web server
server.listen(port, hostName, function(){
    console.log(`Server listening at port http://${hostName}:${port}`)
});

// Functions
function add(num1, num2) {
    return num1 + num2;
}
function sub(num1, num2) {
    return num1 - num2;
}
function mul(num1, num2) {
    return num1 * num2;
}
function div(num1, num2) {
    return num1 / num2;
}

function calculate(source, num1, num2)
{
    let result=0;
    switch (source) {
        case "add": 
            result =  add(parseFloat(num1), parseFloat(num2));
            break;
        case "sub": 
            result =  sub(parseFloat(num1), parseFloat(num2));
            break;
        case "mul": 
            result =  mul(parseFloat(num1), parseFloat(num2));
            break;
        case "div": 
            result =  div(parseFloat(num1), parseFloat(num2));
            break;
        default:
            break;
    }

    return result;
}