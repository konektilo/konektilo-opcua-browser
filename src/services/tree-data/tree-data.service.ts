import {Injectable} from '@angular/core';
import {KonektiloBrowserService} from '../konektilo-browser/konektilo-browser.service';
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
    const konektiloBrowseResponse = await this.konektiloBrowser.readNode(konektiloOpcUaServer.browseUrl);
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
    const konektiloBrowseResponse = await this.konektiloBrowser.readNode(foundBrowseNode.browseUrl);
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
    return this.treeData;
  }

  private searchTree(browseNode: KonektiloBrowseNodeInternal) {
    for (const topLevelBrowseNode of this.treeData) {
      const stack = [topLevelBrowseNode];
      while (stack.length) {
        const node = stack.pop();
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
