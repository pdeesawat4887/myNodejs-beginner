const http = require('http');
const hostname = '192.168.8.132';
const port = 3000;

const request = require('request');
const argv = require('yargs').argv;

let apiKey = 'f5778e518c865ef2226bbef74614614d';
let city = argv.c || 'bangkok';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
let error = 'Error'

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    console.log(JSON.stringify(JSON.parse(body),null,2))
    let weatherM = JSON.parse(body)
    let message = `It's ${weatherM.main.temp} degrees in ${weatherM.name}!\nMostly ${weatherM.weather.main}\nMax-Min Temp: ${weatherM.main.temp_max} - ${weatherM.main.temp_min} degree`;
    // console.log(message);

    const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Welcome Node.js\n${message}\n`);
    });

    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  }
});

