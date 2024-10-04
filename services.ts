
//TODO: make services
if (req.method == 'GET') {
    connection.query('SELECT * FROM User', function (error, results, fields) {
        if (error) throw error;
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify(results));
      });
}