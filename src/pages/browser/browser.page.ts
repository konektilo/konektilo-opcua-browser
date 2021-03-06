import {Component} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {KonektiloBrowserService} from '../../services/konektilo-browser/konektilo-browser.service';
import {TreeDataService} from '../../services/tree-data/tree-data.service';
import {KonektiloOpcUaServer} from '../../models/KonektiloOpcUaServer';
import {Storage} from '@ionic/storage';
import {ViewWillEnter} from '@ionic/angular';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.page.html',
  styleUrls: ['./browser.page.scss'],
})
export class BrowserPage implements ViewWillEnter {
  selectedBrowseNode: KonektiloBrowseNodeInternal;
  opcUaServers: KonektiloOpcUaServer[] = [];
  selectedOpcUaServer: KonektiloOpcUaServer;

  treeControl = new FlatTreeControl<KonektiloBrowseNodeInternal>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    (node: KonektiloBrowseNodeInternal, level: number) => {
      node.level = level;
      return node;
    }
    , node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(public konektiloBrowser: KonektiloBrowserService, public treeDataService: TreeDataService, public storage: Storage) {
  }

  async ionViewWillEnter() {
    await this.fetchOpcUaServers();

    if (this.opcUaServers.length > 0 && this.selectedOpcUaServer === undefined) {
      this.selectedOpcUaServer = this.opcUaServers[0];
    }
  }

  hasChild = (_: number, node: KonektiloBrowseNodeInternal) => node.expandable;

  onExpandNode(browseNode: KonektiloBrowseNodeInternal) {
    this.treeDataService.nodeExpanded(browseNode).then(res => this.dataSource.data = res);
  }

  readNode(browseNode: KonektiloBrowseNodeInternal) {
    this.selectedBrowseNode = browseNode;
  }

  async fetchOpcUaServers() {
    this.opcUaServers = [];
    const konektiloResponse = await this.konektiloBrowser.readOpcUaServer();

    if (konektiloResponse.result !== undefined) {
      Object.keys(konektiloResponse.result).forEach(opcUaServerKey => this.opcUaServers.push(konektiloResponse.result[opcUaServerKey]));
    }
  }

  selectOpcUaServer() {
    this.dataSource.data = [];
    this.treeDataService.getInitialTree(this.selectedOpcUaServer).then(initialTree => this.dataSource.data = initialTree);
  }

  compareOpcUaServer(s1: KonektiloOpcUaServer, s2: KonektiloOpcUaServer): boolean {
    return s1.name === s2.name;
  }
}
