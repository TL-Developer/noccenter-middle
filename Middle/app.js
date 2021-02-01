const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http')
const app = express();
const cors = require('cors');
const server = http.createServer(app);
const axios = require('axios');
const PORT = 3002

// rotas
const automation = require('./routes/automation');
const automationModel = require('./routes/automation-model');
const escalation = require('./routes/escalation');
const severity = require('./routes/severity');
const incidentHistory = require('./routes/incident-history');

//bff
const zabbix = require('./bff/zabbix');
const asterisk = require('./bff/asterisk');
const teams = require('./bff/teams');




const q = 'NOCCenterBFF_Queue';
const io = require('./emit/socket')
const sio = io(server);


const bail = (err) => {
  console.error(err);
  process.exit(1);
}

// Publisher
const publisher = (conn) => {
  conn.createChannel(on_open);

  function on_open(err, ch) {
    if (err != null) bail(err);
    ch.assertExchange(q, 'fanout', {
      durable: false
    });
    ch.assertQueue(q);
    ch.sendToQueue(q, Buffer.from('Connected RabbitMQ'));
  }
}

// Consumer
const consumer = (conn) => {
  var ok = conn.createChannel(on_open);

  function on_open(err, ch) {
    if (err != null) bail(err);
    ch.assertQueue(q);
    ch.consume(q, function (msg) {
      if (msg !== null) {
        sio.emit('incidents_messages', msg.content.toString());
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });
  }
}


require('amqplib/callback_api')
  .connect('amqp://rvback:82v4Fcjmi7@hrabbitrv02', function (err, conn) {
    if (err != null) bail(err);
    consumer(conn);
    publisher(conn);
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser())
app.use(cors(optionsCors))


app.use('/api/v1/automation', automation);
app.use('/api/v1/escalation', escalation);
app.use('/api/v1/automation-model', automationModel);
app.use('/api/v1/severity', severity);
app.use('/api/v1/incident-history', incidentHistory);

app.use('/api/v1/zabbix', zabbix);
app.use('/api/v1/asterisk', asterisk);
app.use('/api/v1/teams', teams);


var optionsCors = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}


server.listen(PORT);