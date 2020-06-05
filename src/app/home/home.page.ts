import {Component} from '@angular/core';
import {KonektiloOpcUaServer} from "../models/KonektiloOpcUaServer";
import {KonektiloBrowserService} from "../services/konektilo-browser/konektilo-browser.service";
import {KonektiloService} from "../services/konektilo/konektilo.service";
import {KonektiloNodeResponse} from "../models/KonektiloNodeResponse";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  opcUaServer: KonektiloOpcUaServer[] = [];
  rootNodes: KonektiloBrowseNode[] = [];
  visibleNodes: KonektiloBrowseNode[] = [];
  browsingHistory: KonektiloBrowseNode[] = [];
  fullNode: KonektiloNodeResponse;
  fullNodeBrowseData: KonektiloBrowseNode;

  selectedOpcUaServer: KonektiloOpcUaServer;
  selectedRootNode: any;
  selectedNavbarNode: KonektiloBrowseNode;

  selectRootNodeDisabled = true;

  constructor(public konektiloBrowser: KonektiloBrowserService, public konektilo: KonektiloService) {
    this.konektiloBrowser.readOpcUaServer().subscribe(konektiloResponse => {
      for (let prop in konektiloResponse.result) {
        this.opcUaServer.push(konektiloResponse.result[prop]);
      }
    });
  }

  selectOpcUaServer() {
    this.selectedRootNode = undefined;
    this.rootNodes = [];
    this.browsingHistory = [];
    this.fullNode = undefined;
    this.fullNodeBrowseData = undefined;
    this.visibleNodes = [];
    this.konektiloBrowser.readRootNode(this.selectedOpcUaServer.browseUrl, 0, 84).subscribe(konektiloResponse => {
      for (let prop in konektiloResponse.result) {
        this.rootNodes.push(konektiloResponse.result[prop]);
      }
    });
    this.selectRootNodeDisabled = this.selectedOpcUaServer == undefined;
  }

  selectRootNode(konektiloBrowseNode: KonektiloBrowseNode) {
    this.browsingHistory = [];
    this.fullNode = undefined;
    this.fullNodeBrowseData = undefined;
    this.selectedRootNode = konektiloBrowseNode;
    this.fetchChildren(konektiloBrowseNode);
  }

  browseChildren(konektiloBrowseNode: KonektiloBrowseNode) {
    this.selectedNavbarNode = konektiloBrowseNode;
    if (this.browsingHistory[this.browsingHistory.length - 1]?.browseUrl !== konektiloBrowseNode.browseUrl) {
      this.browsingHistory.push(konektiloBrowseNode);
    }
    this.fetchChildren(konektiloBrowseNode);
  }

  fetchChildren(konektiloBrowseNode: KonektiloBrowseNode) {
    this.konektiloBrowser.readNode(konektiloBrowseNode.browseUrl).subscribe(konektiloResponse => {
      this.visibleNodes = [];
      this.fullNode = undefined;
      this.fullNodeBrowseData = undefined;
      for (let prop in konektiloResponse.result) {
        this.visibleNodes.push(konektiloResponse.result[prop]);
      }
    });
  }

  getDataFromNode(browseNode: KonektiloBrowseNode) {
    this.fullNodeBrowseData = browseNode;
    this.konektilo.readNode(browseNode.accessUrl).subscribe(konektiloResponse => this.fullNode = konektiloResponse);
  }

  compareOpcUaServer(s1: KonektiloOpcUaServer, s2: KonektiloOpcUaServer): boolean {
    return s1.name === s2.name;
  }

  compareBrowseNodes(s1: KonektiloBrowseNode, s2: KonektiloBrowseNode): boolean {
    return s1.browseUrl === s2.browseUrl;
  }

  onNodeChange(konektiloBrowseNode: KonektiloBrowseNode) {
    const nodePosition = this.browsingHistory.findIndex(element => element.browseUrl === konektiloBrowseNode.browseUrl);
    const toCutOff = this.browsingHistory.length - (nodePosition + 1);
    this.browsingHistory.splice(nodePosition + 1, toCutOff);
    this.browseChildren(konektiloBrowseNode);
  };

}
