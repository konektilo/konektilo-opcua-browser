import {Component} from '@angular/core';
import {KonektiloOpcUaServer} from "../models/KonektiloOpcUaServer";
import {KonektiloBrowserService} from "../services/konektilo-browser/konektilo-browser.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  opcUaServer: KonektiloOpcUaServer[] = [];
  opcUaFolders: any[] = [
    {name: 'Objects', namespace: 0, identifier: '85'},
    {name: 'Types', namespace: 0, identifier: '86'},
    {name: 'Views', namespace: 0, identifier: '87'}]
  visibleNodes: KonektiloBrowseNode[] = [];

  selectedOpcUaServer: KonektiloOpcUaServer;
  selectedFolder: any;

  selectFolderDisabled = true;

  categories = ['fanspeed', '1', '2', 'speed', 'more'];

  constructor(public konektiloBrowser: KonektiloBrowserService) {
    this.konektiloBrowser.readOpcUaServer().subscribe(konektiloResponse => {
      for (let prop in konektiloResponse.result) {
        this.opcUaServer.push(konektiloResponse.result[prop]);
      }
    });
  }

  selectOpcUaServer() {
    this.selectFolderDisabled = this.selectedOpcUaServer == undefined;
  }

  readBaseNodes() {
    this.konektiloBrowser.readBaseNode(this.selectedOpcUaServer.browseUrl, this.selectedFolder.namespace, this.selectedFolder.identifier).subscribe(konektiloResponse => {
      this.visibleNodes = [];
      for (let prop in konektiloResponse.result) {
        this.visibleNodes.push(konektiloResponse.result[prop]);
      }
    });
  }

  browseChildren(konektiloBrowseNode: KonektiloBrowseNode) {
    this.konektiloBrowser.readNode(konektiloBrowseNode.browseUrl).subscribe(konektiloResponse => {
      this.visibleNodes = [];
      for (let prop in konektiloResponse.result) {
        this.visibleNodes.push(konektiloResponse.result[prop]);
      }
    })
  }

  compareOpcUaServer(s1: KonektiloOpcUaServer, s2: KonektiloOpcUaServer): boolean {
    return s1.name === s2.name;
  }

  compareNamespaces(s1: any, s2: any): boolean {
    return s1.name === s2.name;
  }

  onCategoryChange(category) {
  };

}
