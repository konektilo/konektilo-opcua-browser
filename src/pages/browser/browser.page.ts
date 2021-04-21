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
  konektiloUrl: string;
  opcUaServer: KonektiloOpcUaServer[] = [];
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

  ionViewWillEnter(): void {
    this.updateKonektiloUrl();

    if (this.selectedOpcUaServer !== undefined) {
      this.treeDataService.getInitialTree(this.selectedOpcUaServer).then(initialTree => this.dataSource.data = initialTree);
    }
  }

  hasChild = (_: number, node: KonektiloBrowseNodeInternal) => node.expandable;

  onExpandNode(browseNode: KonektiloBrowseNodeInternal) {
    this.treeDataService.nodeExpanded(browseNode).then(res => this.dataSource.data = res);
  }

  readNode(browseNode: KonektiloBrowseNodeInternal) {
    this.selectedBrowseNode = browseNode;
  }

  fetchOpcUaServer() {
    this.opcUaServer = [];
    this.konektiloBrowser.readOpcUaServer().then(konektiloResponse => {
      Object.keys(konektiloResponse.result).forEach(opcUaServer => this.opcUaServer.push(konektiloResponse.result[opcUaServer]));
    });
  }

  updateKonektiloUrl() {
    this.storage.ready().then(() => {
      this.storage.get('konektiloUrl').then((konektiloUrl) => {
        if (konektiloUrl === null) {
          this.konektiloUrl = 'http://localhost:80';
        } else {
          this.konektiloUrl = konektiloUrl;
        }
        this.fetchOpcUaServer();
      });
    });
  }

  selectOpcUaServer() {
    this.treeDataService.getInitialTree(this.selectedOpcUaServer).then(initialTree => this.dataSource.data = initialTree);
  }

  compareOpcUaServer(s1: KonektiloOpcUaServer, s2: KonektiloOpcUaServer): boolean {
    return s1.name === s2.name;
  }
}
