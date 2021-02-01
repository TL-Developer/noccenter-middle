const express = require('express');
const router = express.Router();
const axios = require('axios')

router.get('/', async (req, res, next) => {
  try {
    const result = await axios.get('http://10.50.0.18:8138/api/v1/model');
    console.log(result)
    res.json(result.data);
  } catch (error) {
    console.log(error)
    res.error();
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const result = await axios.post('http://10.50.0.18:8138/api/v1/model', body);
    res.send(result.data );
  } catch (error) {
    console.log(error)
    res.error();
  }
});



router.delete('/:id', async (req, res, next) => {
  try {
    const body = req.body;
    const result = await axios.delete(`http://10.50.0.18:8138/api/v1/models/${req.params.id}`, body);
    res.json(result.data );
  } catch (error) {
    console.log(error)
    res.error();
  }
});



router.put('/', async (req, res, next) => {
  try {
    const body = req.body;
    const result = await axios.delete(`http://10.50.0.18:8138/api/v1/model`, body);
    res.json(result.data );
  } catch (error) {
    console.log(error)
    res.error();
  }
});


module.exports = router;