var http = require('http');
var url = require('url');
var fs = require('fs');

messagedata = require ('./messages.json');

http.createServer(function (req, res) {
    q = url.parse(req.url, true).query;

    if (q.text && q.author) {
        min = Math.ceil(999999999999);
        max = Math.floor(100000000000);
        var number = Math.floor(Math.random() * (max - min) + min);
        messagedata [number] = {
            author: q.author,
            message: q.text,
        };
        fs.writeFile("./messages.json", JSON.stringify (messagedata, null, 4), err => {
            if (err) throw err;
            res.writeHead(200, {'Access-Control-Allow-Origin': "*"})
            res.write('200');
            return res.end();
        });
    }

    if (q.data) {
        if (q.data === 'messages') {
            let rawdata = fs.readFileSync('messages.json');
            res.writeHead(200, {'Access-Control-Allow-Origin': "*"}, {'Content-Type': "text/json"})
            res.write(rawdata);
            return res.end();
        }
    }
}).listen(4600);