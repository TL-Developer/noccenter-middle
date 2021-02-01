const express = require('express');
const router = express.Router();
const axios = require('axios')

router.post('/', async (req, res, next) => {
  try {
    
    const body = req.body;
    console.log(body)
    const result = await axios.post(`http://10.91.20.82/api/v1/teams`, body);
    res.send(result.data );

  } catch (error) {
    console.log(error)
    res.error();
  }
});


module.exports = router;