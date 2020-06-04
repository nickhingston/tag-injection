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

        const tagData = {
          name: json.name,
          url: `${req.protocol}://${req.get('host')}/cases/${req.params.id}`,
          thumbUrl: `${apiUrl}/xrays/${json.xrays[0].id}/thumb`,
          description: `temp description!`   
        };
        
        res.send(htmlPage.replace('<title>vPOP</title>',`         
          <title>vPOP</title>
          <meta property="og:title" content="${tagData.name}" />
          <meta property="og:url" content="${tagData.url}" />
          <meta property="og:description" content="${tagData.description}" />
          <meta property="og:image" content="${tagData.thumbUrl}" />
          <meta name="twitter:card" content="${tagData.thumbUrl}" />
          <meta name="twitter:title" content="${tagData.name}" />
          <meta name="twitter:description" content="${tagData.description}" />
          <meta name="twitter:image" content="${tagData.thumbUrl}" />`));
  
      })
    )
    .catch(next)
});

module.exports = router;
