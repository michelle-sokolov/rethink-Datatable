const express = require('express');
const router = express.Router();
// const validUrl = require('valid-url');
// const shortId = require('shortid');
// const config = require('config');

// const Url = require('../models/url');

// route POST /api/url/shorten
// create short URL
router.post('/shorten', async (req, res) => {
    console.log(req, res)
    // const { longUrl } = req.body;
    //  const baseUrl = config.get('baseURL');

    /* if (!validUrl.isUri(baseUrl)) {
       //  return res.status(401).json('invalid');
     }
     // create URL Code
  //   const urlCode = shortId.generate();
     // check long version of URL
     if (validUrl.isUri(longUrl)) {
         try {
             let url = await Url.findOne({ longUrl });
             // if (url) {
             res.json(url)
             //  }
             /*  else {
                   const shortUrl = baseUrl + '/' + urlCode;
   
                   url = new Url({
                       longUrl,
                       shortUrl,
                       urlCode,
                       date: new Date()
                   });
                   await url.save();
   
                   res.json(url)
   
               }
         } catch (error) {
             console.error(err);
             res.status(500).json('server error')
         }
     }
     else {
         res.status(401).json('invalid long URL')
     }*/
});

module.exports = router;