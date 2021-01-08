import {Injectable} from '@angular/core';
import {KonektiloBrowserService} from '../konektilo-browser/konektilo-browser.service';
import {KonektiloResponse} from '../../models/KonektiloResponse';
import {KonektiloOpcUaServer} from '../../models/KonektiloOpcUaServer';

@Injectable({
  providedIn: 'root'
})
export class TreeDataService {
  treeData: KonektiloBrowseNodeInternal[] = [];

  constructor(public konektiloBrowser: KonektiloBrowserService) {
  }

  async getInitialTree(konektiloOpcUaServer: KonektiloOpcUaServer): Promise<KonektiloBrowseNodeInternal[]> {
    this.treeData = [];
    const konektiloBrowseResponse = await this.konektiloBrowser.readNode(konektiloOpcUaServer.browseUrl).toPromise();
    Object.entries(konektiloBrowseResponse.result).forEach(([key, value]) => {
      const intBrowseNode = value as unknown as KonektiloBrowseNodeInternal;
      intBrowseNode.nodeId = key;
      intBrowseNode.name = value.displayName;
      intBrowseNode.children = [];
      intBrowseNode.childrenFetched = false;
      intBrowseNode.expandable = intBrowseNode.childCount > 0;
      intBrowseNode.level = undefined;
      this.treeData.push(intBrowseNode);
    });
    return this.treeData;
  }

  async nodeExpanded(browseNode: KonektiloBrowseNodeInternal) {
    const foundBrowseNode = this.searchTree(browseNode);
    if (foundBrowseNode === undefined) {
      // TODO: Improve error handling if node not found
      return;
    }
    console.log('found in tree: ' + foundBrowseNode);
    // this.konektiloBrowser.readNode(foundBrowseNode.browseUrl).subscribe(konektiloBrowseResponse => {
    //   // console.log(resp);
    //   // browseNode.children = browseNode.children.concat(resp);
    //   // const foundNode = this.TREE_DATA.find(node => node.nodeId === browseNode.nodeId);
    //   foundBrowseNode.childrenFetched = true;
    //   Object.entries(konektiloBrowseResponse.result).forEach(([key, value]) => {
    //     const intBrowseNode = value as unknown as KonektiloBrowseNodeInternal;
    //     intBrowseNode.nodeId = key;
    //     intBrowseNode.name = value.displayName;
    //     intBrowseNode.children = [];
    //     intBrowseNode.childrenFetched = false;
    //     intBrowseNode.expandable = intBrowseNode.childCount > 0;
    //     intBrowseNode.level = undefined;
    //     foundBrowseNode.children.push(intBrowseNode);
    //   });
    //   // this.TREE_DATA.find(node => node.nodeId === browseNode.nodeId).children = resp;
    //   // this.dataSource.data = this.TREE_DATA;
    // });
    const konektiloBrowseResponse = await this.konektiloBrowser.readNode(foundBrowseNode.browseUrl).toPromise();
    Object.entries(konektiloBrowseResponse.result).forEach(([key, value]) => {
      const intBrowseNode = value as unknown as KonektiloBrowseNodeInternal;
      intBrowseNode.nodeId = key;
      intBrowseNode.name = value.displayName;
      intBrowseNode.children = [];
      intBrowseNode.childrenFetched = false;
      intBrowseNode.expandable = intBrowseNode.childCount > 0;
      intBrowseNode.level = undefined;
      foundBrowseNode.children.push(intBrowseNode);
    });
    return this.treeData
  }

  private searchTree(browseNode: KonektiloBrowseNodeInternal) {
    for (const topLevelBrowseNode of this.treeData) {
      const stack = [topLevelBrowseNode];
      while (stack.length) {
        const node = stack.pop();
        // console.log('--------------');
        // console.log(node);
        if (node.nodeId === browseNode.nodeId) {
          return node;
        }
        if (node.children) {
          stack.push(...node.children);
        }
      }
    }
    return undefined;
  }
}
