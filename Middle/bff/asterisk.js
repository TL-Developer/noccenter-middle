const express = require('express');
const router = express.Router();
const axios = require('axios')

router.post('/', async (req, res, next) => {
  try {
    
    const body = req.body;
    console.log(body)
    const result = await axios.post(`http://10.91.20.82/api/v1/Shell/runner?command=asterisk&arguments=-rx%20%22console%20dial%20${body.phoneNumber}%40interno%22`);
    res.send(result.data );

  } catch (error) {
    console.log(error)
    res.error();
  }
});


module.exports = router;