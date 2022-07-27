import { ACCESS_TOKEN } from '../config/config';
import { LeadResponse } from '../types/lead.types';
import { Entry } from '../types/webhook.types';
const bizSdk = require('facebook-nodejs-business-sdk');
const Lead = bizSdk.Lead;

export class FacebookService {
  constructor() {
    this.init();
  }

  init = () => {
    bizSdk.FacebookAdsApi.init(ACCESS_TOKEN);
  };

  logApiCallResult = (apiCallName: string, data: any) => {
    console.log(apiCallName);
    console.log('Data:' + JSON.stringify(data));
  };

  getLead = async (id: string) => {
    const fields: any[] = [];
    const params = {};
    const lead: LeadResponse = await new Lead(id).get(fields, params);
    return lead;
  };

  getLeadsByEntry = async (entry: Entry[]) => {
    const leads: any[] = [];
    console.log('entry', entry);
    for (let item of entry) {
      for (let change of item.changes) {
        const lead = await this.getLead(change?.value?.leadgen_id);
        leads.push(lead);
      }
    }
    return leads;
  };
}

const facebookService = new FacebookService();
export default facebookService;
