import request from 'request-promise-native';
import _ from 'lodash';

import {ShipmentProvider} from './provider';
import ShipmentDeal from '../deal'
import Location from '../location'

class CanadaPost implements ShipmentProvider {
    readonly providerName: string = 'Canada Post';
    async getDeals(postalCode: string) {
        const url = 'https://7ywg61mqp6.execute-api.us-east-1.amazonaws.com/prod/rates/';
        const deals = await request.get({'uri':url+postalCode, 'json':true});
        _.forEach(deals, deal => {deal['provider_name'] = this.providerName;});

        return deals;
    }
    async orderShipment(destination: Location, deal: ShipmentDeal) {
        const url = 'https://7ywg61mqp6.execute-api.us-east-1.amazonaws.com/prod/shipments';
        return await request.post({
            'url': url,
            'headers': {'content-type': 'application/json'},
            'json': true,
            'body': {
                'rate_id': deal.id,
                'destination': destination,
            },
        });
    }
}
const canadaPost = new CanadaPost();

export default canadaPost;
