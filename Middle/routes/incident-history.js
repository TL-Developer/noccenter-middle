const express = require('express');
const router = express.Router();
const axios = require('axios')

router.get('/', async (req, res, next) => {
  try {
    const result = await axios.get('http://10.50.0.18:8138/api/v1/incident-history');
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
    const result = await axios.post('http://10.50.0.18:8138/api/v1/incident-history', body);

    await axios.post('http://10.50.0.18:8138/api/v1/teams', {
      "message": body.message
    });

    await axios.post('http://10.50.0.18:8138/api/v1/zabix', {
      "eventId": [body.eventId],
      "message": body.message
    });

    res.send(result.data );
  } catch (error) {
    console.log(error)
    res.error();
  }
});


router.delete('/:id', async (req, res, next) => {
  try {
    const body = req.body;
    const result = await axios.delete(`http://10.50.0.18:8138/api/v1/incident-history/${req.params.id}`, body);
    res.json(result.data );
  } catch (error) {
    console.log(error)
    res.error();
  }
});


router.put('/', async (req, res, next) => {
  try {
    const body = req.body;
    const result = await axios.delete(`http://10.50.0.18:8138/api/v1/incident-history`, body);
    res.json(result.data );
  } catch (error) {
    console.log(error)
    res.error();
  }
});

module.exports = router;

