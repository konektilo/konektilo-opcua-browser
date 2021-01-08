import {Component, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {KonektiloBrowserService} from '../services/konektilo-browser/konektilo-browser.service';
import {TreeDataService} from '../services/tree-data/tree-data.service';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

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
    node.level = level;
    return node;
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(public konektiloBrowser: KonektiloBrowserService, public treeDataService: TreeDataService) {
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

  onExpandNode(browseNode: KonektiloBrowseNodeInternal) {
    this.treeDataService.nodeExpanded(browseNode).then(res => {
      this.dataSource.data = res;
      console.log(res);
    });
  }

  readNode(browseNode: KonektiloBrowseNodeInternal) {

  }
}
