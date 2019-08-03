import request from 'request-promise-native';
import _ from 'lodash';

import ShipmentDeal from '../deal';
import Location from '../location'
import canadaPost from './canadaPost';
import boxKnight from './boxKnight';

interface ShipmentProvider {
    readonly providerName: string,
    getDeals(postalCode: string): Promise<ShipmentDeal[]>,
    orderShipment(destination: Location, deal: ShipmentDeal): Promise<void>,
}

const providers = [canadaPost, boxKnight];
const providersByName = _.keyBy(providers, 'providerName');

export {ShipmentProvider, providersByName};
