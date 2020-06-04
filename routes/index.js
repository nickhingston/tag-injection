let express = require('express');
let rp = require('request-promise')
let router = express.Router();

/* GET home page. */
router.get('/cases/:id', function(req, res, next) {
  return rp(`https://dev.vpop-pro.com/api/v1/cases/${req.params.id}`)
    .then((response) => {
      // <meta property="og:title" content="<%= name %>" />
      // <meta property="og:url" content="<%= url %>" />
      // <meta property="og:description" content="<%= description %>" />
      // <meta property="og:image" content="<%= thumbUrl %>" />
      // <meta name="twitter:card" content="<%= thumbUrl %>" />
      // <meta name="twitter:title" content="<%= name %>" />
      // <meta name="twitter:description" content="<%= description %>" />
      // <meta name="twitter:image" content="<%= thumbUrl %>" />
      const json = JSON.parse(response);
      res.render('index', { 
        name: json.name,
        url: `${req.protocol}://${req.get('host')}/cases/${req.params.id}`,
        thumbUrl: `https://dev.vpop-pro.com/api/v1/xrays/${json.xrays[0].id}/thumb`,
        description: `temp description!`      
      });
    })
    .catch(next)
});

module.exports = router;
