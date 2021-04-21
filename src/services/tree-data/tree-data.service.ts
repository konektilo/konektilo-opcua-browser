import {Injectable} from '@angular/core';
import {KonektiloBrowserService} from '../konektilo-browser/konektilo-browser.service';
import {KonektiloOpcUaServer} from '../../models/KonektiloOpcUaServer';

@Injectable({
  providedIn: 'root'
})
export class TreeDataService {

  constructor(public konektiloBrowser: KonektiloBrowserService) {
  }
  treeData: KonektiloBrowseNodeInternal[] = [];

  private static sortListAlphabetically(browseNodeInternals: KonektiloBrowseNodeInternal[]) {
    browseNodeInternals.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
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

    TreeDataService.sortListAlphabetically(this.treeData);
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

    TreeDataService.sortListAlphabetically(foundBrowseNode.children);
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

  private createIntBrowseNode() {
    // TODO for removing duplicated code
  }
}
