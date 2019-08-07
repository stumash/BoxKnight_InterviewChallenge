import express from 'express';
import bodyParser from 'body-parser';
import _ from 'lodash';

import {providersByName} from './shipping/providers/provider';
import Location from './shipping/location';
import ShipmentDeal from './shipping/deal';

const port = 8000;

const jsonParser = bodyParser.json();
const app = express();

app.post('/getBestShippingRate', jsonParser, async (req, res) => {
    const destination: Location = req.body;

    // this parallelizes requests to all shipment providers
    const deals: ShipmentDeal[] = _.flatten(await Promise.all(
        _.map(providersByName, provider => provider.getDeals(destination))
    ));

    // uncomment this to instead sequentially send requests to all shipment providers
    //const deals: ShipmentDeal[] = [];
    //for (let provider of providers) {
        //deals.concat(await provider.getDeals(destination.postalCode));
    //}

    const bestDeal: ShipmentDeal = _.sortBy(deals, ['price', 'estimate_days'])[0];

    res.send(bestDeal);

    const bestProvider = providersByName[bestDeal.provider_name];
    const shipment = await bestProvider.orderShipment(destination, bestDeal);
});

app.listen(port);
