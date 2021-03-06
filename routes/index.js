const express = require('express');
const rp = require('request-promise')
const router = express.Router();

const apiUrl = "https://vpop-pro.com/api/v1"
const appUrl = "https://app.vpop-pro.com"

let htmlPage = ""

const updatePage  = () => {
  // just get page from 
  rp(appUrl).then(response => htmlPage = response);
}
updatePage();
setInterval(updatePage, 1000*60*30) // update the page every 30mins incase we change it


/* GET home page. */
router.get('/cases/:id', (req, res, next) => {
  rp({ uri:`${apiUrl}/cases/${req.params.id}`, simple: false, resolveWithFullResponse: true })
    .then((response) => {
      if (response.statusCode != 200) {
        return res.send(htmlPage).end()
      }

      const json = JSON.parse(response.body);

      const tagData = {
        name: json.name,
        url: `${appUrl}/cases/${req.params.id}`,
        thumbUrl: `${apiUrl}/xrays/${json.xrays[0].id}/thumb.jpeg`,
        description: 'Made&nbsp;by&nbsp;VPOP&nbsp;PRO'
      };

      res.send(htmlPage.replace('<title>vPOP</title>',`         
        <title>vPOP</title>
	<meta name="description" content="Veterinary Preoperative Orthopaedic Planner" />
	<meta property="fb:app_id" content="267530317797644" />
	<meta property="og:description" content="Veterinary Preoperative Orthopaedic Planner" />      
        <meta property="og:type" content="article" />
        <meta property="og:title" content="${tagData.name}" />
        <meta property="og:url" content="${tagData.url}" />
	<meta property="og:image" itemprop="image" content="${tagData.thumbUrl}" />
	<meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${tagData.name}" />
        <meta name="twitter:description" content=“${tagData.description}" />
        <meta name="twitter:image" content="${tagData.thumbUrl}" />`
        ));

    })
    .catch(e => {
      console.error(e);
      res.send(htmlPage).end();
    })
});

module.exports = router;
