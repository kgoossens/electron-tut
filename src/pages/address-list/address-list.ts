import { HomePage } from './../home/home';
import { AddressServiceProvider } from './../../providers/address-service/address-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Address } from '../../providers/address';

/**
 * Generated class for the AddressListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address-list',
  templateUrl: 'address-list.html',
})
export class AddressListPage {

  public addresses: Promise<Address[]>;
  constructor(public navCtrl: NavController, private addressService: AddressServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressListPage');
    this.addresses = this.addressService.fetchAll();
  }

  selectLocation(address: Address) {
    this.navCtrl.setRoot(HomePage, { address });
  }

}
