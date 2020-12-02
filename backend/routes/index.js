const express = require('express');
const router = express.Router();

// const Url = require('../models/url');

// route GET /:code
// redirect to original URL 
router.get('/:code', async (req, res) => {
    try {
        console.log(req)
        console.log(res)
        //  const url = await Url.findOne({ urlCode: req.params.code });
        // if (url) {
        //  return res.redirect(url.longUrl)
        //   }
        //  else {
        //       return res.status(404).json('no URL found')
        //   }
    } catch (error) {
        console.log(error);
        res.status(500).json('server error')
    }
})
module.exports = router;

