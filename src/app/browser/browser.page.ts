import {Component, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {KonektiloBrowserService} from '../services/konektilo-browser/konektilo-browser.service';
import {TreeDataService} from '../services/tree-data/tree-data.service';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Fruit',
//     children: [
//       {name: 'Apple'},
//       {name: 'Banana'},
//       {name: 'Fruit loops'},
//     ]
//   }, {
//     name: 'Vegetables',
//     children: [
//       {
//         name: 'Green',
//         children: [
//           {name: 'Broccoli'},
//           {name: 'Brussels sprouts'},
//         ]
//       }, {
//         name: 'Orange',
//         children: [
//           {name: 'Pumpkins'},
//           {name: 'Carrots'},
//         ]
//       },
//     ]
//   },
// ];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-browser',
  templateUrl: './browser.page.html',
  styleUrls: ['./browser.page.scss'],
})
export class BrowserPage implements OnInit {
  // tslint:disable-next-line:variable-name
  private _transformer = (node: KonektiloBrowseNodeInternal, level: number) => {
    // return {
    //   expandable: node.childCount > 0,
    //   name: node.browseName,
    //   level,
    // };
    node.level = level;
    return node;
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  TREE_DATA: KonektiloBrowseNodeInternal[] = [];

  constructor(public konektiloBrowser: KonektiloBrowserService, public treeDataService: TreeDataService) {
    // this.konektiloBrowser.readNode('http://localhost:8080/api/v1/browse/opcuatestserver')
    //   .subscribe(konektiloResponse => {
    //     console.log(konektiloResponse.result);
    //     Object.entries(konektiloResponse.result).forEach(([key, value]) => {
    //       const intBrowseNode = value as KonektiloBrowseNodeInternal;
    //       intBrowseNode.nodeId = key;
    //       intBrowseNode.children = [];
    //       intBrowseNode.childrenFetched = false;
    //       this.TREE_DATA.push(intBrowseNode);
    //     });
    //     console.log(this.TREE_DATA);
    //     this.dataSource.data = this.TREE_DATA;
    //   });
    // this.konektiloBrowser.readNodeNew('http://localhost:8080/api/v1/browse/opcuatestserver').then(resp => {
    //   console.log(resp);
    //   this.TREE_DATA = this.TREE_DATA.concat(resp);
    //   this.dataSource.data = this.TREE_DATA;
    // });
    const opcUaTestServer = {
      name: 'opcuatestserver',
      browseUrl: 'http://localhost:8080/api/v1/browse/opcuatestserver',
      comment: '',
      online: true
    };
    this.treeDataService.getInitialTree(opcUaTestServer).then(initialTree => this.dataSource.data = initialTree);
  }

  ngOnInit() {
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onExpand(browseNode: KonektiloBrowseNodeInternal) {
    console.log(browseNode);
    // this.konektiloBrowser.readNodeNew(browseNode.browseUrl).then(resp => {
    //   console.log(resp);
    //   // browseNode.children = browseNode.children.concat(resp);
    //   const foundNode = this.TREE_DATA.find(node => node.nodeId === browseNode.nodeId);
    //   foundNode.children = resp;
    //   foundNode.childrenFetched = true;
    //   // this.TREE_DATA.find(node => node.nodeId === browseNode.nodeId).children = resp;
    //   this.dataSource.data = this.TREE_DATA;
    // });
    this.treeDataService.nodeExpanded(browseNode).then(res => this.dataSource.data = res);
  }
}
