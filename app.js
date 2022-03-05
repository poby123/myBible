const express = require('express')
const path = require('path')
const http = require('http') 
const https = require('https')
const fs = require('fs')

const app = express()

app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname)));

const port = process.env.PORT || 8080
// const options = {
//     key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem'), 'utf-8'),
//     cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'), 'utf-8'),
// }

app.set("views", path.join(__dirname));

app.get('/', (req, res) => {
  res.render('index.html')
})

// const server = https.createServer(options, app);
const server = http.createServer(app);
server.listen(port, function(){ 
    console.log('Server is running...');
});