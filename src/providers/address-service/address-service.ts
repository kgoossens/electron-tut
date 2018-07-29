import { Injectable } from '@angular/core';
import { Address } from '../address';


@Injectable()
export class AddressServiceProvider {

  private addresses: Address[] = [];

  constructor() {
    console.log('Hello AddressServiceProvider Provider');

    this.addresses.push(new Address(1, 'Pain Quotidien', 'Markt 75', '', 'Wemmel', 'VLB', '1780', 'home', '', '50.909021', '4.3044463'));
    this.addresses.push(new Address(2, 'Cafe Op \'t Hoeksken', 'Zijp 2', '', 'Wemmel', 'VLB', '1780', 'home', '', '50.917992', '4.3201503'));
    this.addresses.push(new Address(3, 'Proxy Wemmel', 'Kaasmarkt 51', '', 'Wemmel', 'VLB', '1780', 'home', '', '50.908671', '4.2974163'));
  }

  fetchAll() : Promise<Address[]> {
    var p = Promise.resolve<Address[]>(this.addresses);
    return p;
  }

}
