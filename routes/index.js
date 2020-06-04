let express = require('express');
let rp = require('request-promise')
let router = express.Router();

const apiUrl = "https://dev.vpop-pro.com/api/v1"
const appUrl = "https://dev-app.vpop-pro.com/"

/* GET home page. */
router.get('/cases/:id', function(req, res, next) {
  return rp(appUrl)
    .then(htmlPage => rp(`${apiUrl}/cases/${req.params.id}`)
      .then((response) => {
        const json = JSON.parse(response);

        res.send(htmlPage.replace('<title>vPOP</title>',`         
          <title>vPOP</title>
          <meta property="og:title" content="${json.name}" />
          <meta property="og:url" content="${json.url}" />
          <meta property="og:description" content="${json.description}" />
          <meta property="og:image" content="${json.thumbUrl}" />
          <meta name="twitter:card" content="${json.thumbUrl}" />
          <meta name="twitter:title" content="${json.name}" />
          <meta name="twitter:description" content="${json.description}" />
          <meta name="twitter:image" content="${json.thumbUrl}" />`));
  
      })
    )
    .catch(next)
});

module.exports = router;
