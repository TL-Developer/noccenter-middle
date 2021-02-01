const express = require('express');
const router = express.Router();

const http = require('http');
const axios = require('axios');
const https = require('https');


const auth = async () => {
  
  try {
  
    var url = "https://opti.xpinc.io/zabbix-hml/api_jsonrpc.php";

    var obj = JSON.stringify({"params":{"user":"U004014","password":"@VLEBw70ms2101"},"jsonrpc":"2.0","method":"user.login","id":0});

    const agent = new https.Agent({  
      rejectUnauthorized: false
     });
     
    var result = await axios.post(url,obj, { httpsAgent: agent })
    return result.data;
    
  } catch (error) {
    console.log(error)
    res.error();
  }

}



router.get('/', async  (req, res, next) => {
  try {
  
    var url = "https://opti.xpinc.io/zabbix-hml/api_jsonrpc.php";

    const agent = new https.Agent({  
      rejectUnauthorized: false
     });
     
    var obj1 = {"params":{"user":"U004014","password":"@VLEBw70ms2101"},"jsonrpc":"2.0","method":"user.login","id":0};
    var result1 = await axios.post(url,obj1, { httpsAgent: agent })


     var obj =  {
       "jsonrpc": "2.0",
       "method": "problem.get",
       "params": {
           "output": "extend",
           "selectAcknowledges": "extend",
           "selectTags": "extend",
           "selectSuppressionData": "extend",
           "recent": "true",
           "sortfield": ["eventid"],
           "sortorder": "DESC"
       },
       "auth": result1.data.result,
       "id": 1
   }

    var result = await axios.post(url,obj, { httpsAgent: agent })

    // var items = JSON.parse(result.data);
    
    // var ret = items.result.map(data=>({


    //     "id":data.eventid,        
    //     "time": new Date(parseInt(data.clock+"000")), 
    //     "date": new Date(parseInt(data.clock+"000")),
    //     "host": data.name,        
    //     "problem": data.name,        
    //     "severity": ps[data.severity],        
    //     "duration": new Date(new Date() - new Date(data.clock+"000")),        
    //     "verified": false,        
    //     "notification": false,        
    //     "description": {"label": data.EVENT_TAGS }       
      
      
    //   }))

    res.json(result.data)
    
  } catch (error) {
    console.log(error)
    res.error();
  }
});



router.get('/:id', async  (req, res, next) => {
  try {
  
    var url = "https://opti.xpinc.io/zabbix-hml/api_jsonrpc.php";

    const agent = new https.Agent({  
      rejectUnauthorized: false
     });
     
    var obj1 = {"params":{"user":"U004014","password":"@VLEBw70ms2101"},"jsonrpc":"2.0","method":"user.login","id":0};
    var result1 = await axios.post(url,obj1, { httpsAgent: agent })
    console.log(result1.data.result)


     var obj =  {
       "jsonrpc": "2.0",
       "method": "problem.get",
       "params": {
           "output": "extend",
           "selectAcknowledges": "extend",
           "selectTags": "extend",
           "selectSuppressionData": "extend",
           "recent": "true",
           "eventids": `${req.params.id}`,
           "sortfield": ["eventid"],
           "sortorder": "DESC"
       },
       "auth": result1.data.result,
       "id": 1
   }

    var result = await axios.post(url,obj, { httpsAgent: agent })
    res.json(result.data)
    
  } catch (error) {
    console.log(error)
    res.error();
  }
});



router.post('/', async  (req, res, next) => {
  try {
    var body = req.body;

    var url = "https://opti.xpinc.io/zabbix-hml/api_jsonrpc.php";

    const agent = new https.Agent({  
      rejectUnauthorized: false
     });
     
    var obj1 = {"params":{"user":"U004014","password":"@VLEBw70ms2101"},"jsonrpc":"2.0","method":"user.login","id":0};
    var result1 = await axios.post(url,obj1, { httpsAgent: agent })
    console.log(result1.data.result)


     var obj =  {
       "jsonrpc": "2.0",
       "method": "event.acknowledge",
       "params": {
          "eventids": [body.eventId],
          "action": 12,
          "message": body.message,
          "severity": 4
       },
       "auth": result1.data.result,
       "id": 1
   }

    var result = await axios.post(url,obj, { httpsAgent: agent })
    res.json(result.data)
    
  } catch (error) {
    console.log(error)
    res.error();
  }
});




module.exports = router;