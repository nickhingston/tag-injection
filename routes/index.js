const express = require('express');
const router = express.Router();

const apiUrl = process.env.API_URL || 'https://dev.vpop-pro.com/api/v1'
const appUrl = process.env.APP_URL || 'http://127.0.0.1:3000'

let htmlPage = ""

const updatePage  = async () => {
  // just get page from 
  const response = await fetch(`${appUrl}`, { method: 'GET' });
  htmlPage = await response.text();
}

updatePage();
setInterval(updatePage, 1000*60*30) // update the page every 30mins incase we change it

/* GET home page. */
router.get('/cases/:caseId/:id2?/:id3?', async (req, res, next) => {
  try {
    const response = await fetch(`${apiUrl}/cases/${req.params.caseId}`, { method: 'GET' });
    if (response.status != 200) {
      console.error('Error fetching case', response.status, await response.text());
      return res.send(htmlPage).end()
    }

    const json = await response.json();

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
  } catch (e) {
    console.error(e);
    res.send(htmlPage).end();
  }
});

module.exports = router;
