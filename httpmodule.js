const http = require("http")
const fs = require('fs')
const { parse } = require('querystring');


let server = http.createServer((req, res) => {
    if(req.url === '/' && req.method === 'POST'){ 
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            var parsedJson = parse(body);

            var newUser = parsedJson.username;
            var wordInText = `This is a new File. Name: ${newUser}`

            fs.writeFile(newUser, wordInText, (err)=> {
                console.log('Information Saved');
            })

            res.end('This data belonges to: ' + parsedJson.username);
        })
    } else if(req.method == 'GET')
    {
          fs.readFile('./index.html', 'UTF-8', (err, data) => {
            if(err){
                throw err;
            }
            else {res.write(data)}
        res.end();
    })
    }});

server.listen("3000")
console.log("Listening on port 3000 ... ")