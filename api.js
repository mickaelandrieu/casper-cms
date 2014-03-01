var server = require('webserver').create(),
    system = require('system'),
    fs     = require('fs'),
    port   = system.env.PORT || 8080,
    casper = require('casper').create(),
    utils = require('utils');

var service = server.listen(port, function(request, response) {
    console.log(request.url)
    var method = request.method;
    var url = request.url;
    if (method == 'GET') {
        // beta routing
        if (url !== '/favicon.ico') {
            console.log(url)
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html; charset=utf-8');
            var path = 'pages/'+url+'.html';
            if(fs.isFile(path)) {
                response.write(fs.read('pages/'+url+'.html'));
            }else {
                response.write(fs.read('pages/index.html'));
            }

            response.close();
        }

    } else if (method == 'POST') {
         response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.write('APPEL EN POST, TODO');
        response.close();
    } else if (method == 'DELETE') {
        // TODO :delete a resource
        response.statusCode = 302;
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.write(fs.read('pages/index.html'));
        response.close();
    }

});

if(service) console.log("server started - http://localhost:" + server.port);
