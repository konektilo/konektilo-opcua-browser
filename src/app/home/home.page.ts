import {Component} from '@angular/core';
import {KonektiloOpcUaServer} from "../models/KonektiloOpcUaServer";
import {KonektiloBrowserService} from "../services/konektilo-browser/konektilo-browser.service";
import {KonektiloNamespace} from "../models/KonektiloNamespace";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  opcUaServer: KonektiloOpcUaServer[] = [];
  namespaces: KonektiloNamespace[] = []

  selectedOpcUaServer: KonektiloOpcUaServer;
  selectedNamespace: KonektiloNamespace;

  categories = ['fanspeed', '1', '2', 'speed', 'more'];

  items = ['matrix', 'My Devices', 'Server', 'Data'];

  constructor(public konektiloBrowser: KonektiloBrowserService) {
    this.konektiloBrowser.readOpcUaServer().subscribe(konektiloResponse => {
      for (let prop in konektiloResponse.result) {
        this.opcUaServer.push(konektiloResponse.result[prop]);
      }
    });
  }

  fetchNamespaces() {
    this.konektiloBrowser.readNamespaces(this.selectedOpcUaServer.name).subscribe(konektiloResponse => {
      this.namespaces = [];
      for (let prop in konektiloResponse.result) {
        this.namespaces.push(konektiloResponse.result[prop]);
      }
    });
  }

  fetchNodes() {
    // TODO
    console.log(this.selectedNamespace);
  }

  compareOpcUaServer(s1: KonektiloOpcUaServer, s2: KonektiloOpcUaServer): boolean {
    return s1.name === s2.name;
  }

  compareNamespaces(s1: KonektiloNamespace, s2: KonektiloNamespace): boolean {
    return s1.number === s2.number;
  }

  onCategoryChange(category) {
  };

}
