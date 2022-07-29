import { ACCESS_TOKEN } from '../config/config';
import { LeadResponse, FieldDatum, Data } from '../types/lead.types';
import { Entry } from '../types/webhook.types';
// const bizSdk = require('facebook-nodejs-business-sdk');
// const Lead = bizSdk.Lead;
import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://graph.facebook.com/v14.0',
});
export class FacebookService {
  constructor() {
    this.init();
  }

  init = () => {
    // bizSdk.FacebookAdsApi.init(ACCESS_TOKEN);
  };

  logApiCallResult = (apiCallName: string, data: any) => {
    console.log(apiCallName);
    console.log('Data:' + JSON.stringify(data));
  };

  mapLead = (data: Data) => {
    const { field_data, ...rest } = data;
    let dataObject: any = {};
    field_data.forEach((fd) => {
      if (fd.name) {
        dataObject[fd.name] = fd.values.length > 0 ? fd.values[0] : null;
      }
    });
    return {
      ...rest,
      field_data: dataObject,
    };
  };

  getLead = async (id: string) => {
    const fields: any[] = [];
    const params = {};
    // const lead: LeadResponse = await new Lead(id).get(fields, params);
    const lead: any = await axiosApi.get(`/${id}`, {
      params: {
        access_token: ACCESS_TOKEN,
      }
    })
    return lead.data;
  };

  getLeadsByEntry = async (entry: Entry[]) => {
    const leads: any[] = [];
    for (let item of entry) {
      for (let change of item.changes) {
        const lead = await this.getLead(change?.value?.leadgen_id);
        lead && leads.push(lead);
      }
    }
    return leads;
  };
}

const facebookService = new FacebookService();
export default facebookService;
