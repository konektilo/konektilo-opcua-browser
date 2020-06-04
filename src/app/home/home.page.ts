import {Component} from '@angular/core';
import {KonektiloOpcUaServer} from "../models/KonektiloOpcUaServer";
import {KonektiloBrowserService} from "../services/konektilo-browser/konektilo-browser.service";

interface Namespace {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  opcUaServer: KonektiloOpcUaServer[] = [];
  selectedOpcUaServer: KonektiloOpcUaServer;

  categories = ['fanspeed', '1', '2', 'speed', 'more'];

  items = ['matrix', 'My Devices', 'Server', 'Data'];

  namespaces: Namespace[] = [
    {value: 'namespace1', viewValue: '1'},
    {value: 'namespace2', viewValue: '2'},
    {value: 'namespace3', viewValue: '3'}
  ];

  constructor(public konektiloBrowser: KonektiloBrowserService) {
    this.konektiloBrowser.readOpcUaServer().subscribe(konektiloResponse => {
      for(let prop in konektiloResponse.result){
        this.opcUaServer.push(konektiloResponse.result[prop]);
      }
    });
  }

  opcUaServerSelected() {
    console.log(this.selectedOpcUaServer);
  }

  compareOpcUaServer(s1: KonektiloOpcUaServer, s2: KonektiloOpcUaServer): boolean{
    return s1.name === s2.name;
  }

  onCategoryChange(category) {
  };

}
