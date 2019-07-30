import express from 'express';
import bodyParser from 'body-parser';
import request from 'request-promise-native';

const port = 8000;

const jsonParser = bodyParser.json();
const app = express();

app.post('/getBestShippingRate', jsonParser, async (req, res) => {
    const destination = req.body;

    // canada post
    const cp_url = `https://7ywg61mqp6.execute-api.us-east-1.amazonaws.com/prod/rates/${postalCode}`;
    const cp_bestDeal = request.get({'uri':cp_url, 'json':true})
        .then((deals) => {
            const minPrice = Math.min(...deals.map(deal => deal['price']));
            const cheapestDeals = 
        });

    // box knight
    const bk_url = `https://lo2frq9f4l.execute-api.us-east-1.amazonaws.com/prod/rates/${postalCode}`;
    const bk_bestDeal = await request.get({'uri':bk_url, 'json':true})

    console.log(`cp rate: ${JSON.stringify(cp_bestDeal, null, 4)}`);
    console.log(`bk rate: ${JSON.stringify(bk_bestDeal, null, 4)}`);

    res.send(postalCode);
});

app.listen(port);
