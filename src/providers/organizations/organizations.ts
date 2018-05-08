import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';
@Injectable()
export class Organizations {

  constructor(public api: Api) { }

 list() {
  //  alert(params.id)
    return this.api.get('api/gurudwaraservices/getAllOrganizationsByCId').share();
  }
  linkOrganization(AppUserModel:any) {
 //alert(AppUserModel)
    return this.api.post('api/gurudwaraservices/linkOrganization',AppUserModel).share();
  }

  listbyId() {
  //  alert(params.id)
    return this.api.get('api/gurudwaraservices/getOrganizationsByCId').share();
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
