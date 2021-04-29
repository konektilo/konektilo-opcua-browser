import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SavedNodesStorageService {
  storageKey = 'savedNodes';

  constructor(public storage: Storage) {
    this.storage.ready().then(_ => {
        this.storage.get(this.storageKey).then(savedNodes => {
          if (savedNodes === null) {
            this.storage.set(this.storageKey, []);
          }
        });
      }
    );
  }

  private static sortListAlphabetically(savedNodes: SavedNode[]) {
    savedNodes.sort((a, b) => {
      const displayNameA = a.displayName.toUpperCase();
      const displayNameB = b.displayName.toUpperCase();
      if (displayNameA < displayNameB) {
        return -1;
      }
      if (displayNameA > displayNameB) {
        return 1;
      }

      return 0;
    });
  }

  async getAllNodes(): Promise<SavedNode[]> {
    await this.storage.ready();
    const allNodes = await this.storage.get(this.storageKey);
    SavedNodesStorageService.sortListAlphabetically(allNodes);
    return allNodes;
  }

  generateOpcUaServerListItems(opcUaServers: string[]): OpcUaServerListItem[] {
    const opcUaServerListItems = [];
    let lastChar = '';

    for (let i = 0, len = opcUaServers.length; i < len; i++) {
      const item = opcUaServers[i];

      if (item.charAt(0) !== lastChar) {
        opcUaServerListItems.push({name: item.charAt(0).toUpperCase(), letter: true});
        lastChar = item.charAt(0);
      }

      opcUaServerListItems.push({name: item, letter: false});
    }

    return opcUaServerListItems;
  }

  async getAllFavoriteSavedNodes(): Promise<SavedNode[]> {
    const savedNodes = await this.getAllNodes();
    return savedNodes.filter(savedNode => savedNode.savedAsFavorite === true);
  }

  async getAllFavSavedNodesDisplayName(): Promise<OpcUaServerListItem[]> {
    const savedNodes = await this.getAllFavoriteSavedNodes();
    const opcUaServers = Array.from(new Set(savedNodes.map(item => item.opcUaServer)));

    opcUaServers.unshift('All');

    return this.generateOpcUaServerListItems(opcUaServers);
  }

  async getAllSubscriptionSavedNodes(): Promise<SavedNode[]> {
    const savedNodes = await this.getAllNodes();
    return savedNodes.filter(savedNode => savedNode.savedAsSubscription === true);
  }

  async getAllSubSavedNodesDisplayName(): Promise<OpcUaServerListItem[]> {
    const savedNodes = await this.getAllSubscriptionSavedNodes();
    const opcUaServers = Array.from(new Set(savedNodes.map(item => item.opcUaServer)));

    opcUaServers.unshift('All');

    return this.generateOpcUaServerListItems(opcUaServers);
  }

  async saveNode(savedNode: SavedNode): Promise<any> {
    const savedNodes = await this.getAllNodes();

    const nodeIndex = savedNodes.findIndex(item => item.nodeId === savedNode.nodeId && item.opcUaServer === savedNode.opcUaServer);

    if (nodeIndex !== -1) {
      if (savedNode.savedAsFavorite === false && savedNode.savedAsSubscription === false) {
        await this.deleteSavedNode(savedNode);
        return;
      } else {
        savedNodes[nodeIndex] = savedNode;
      }
    } else {
      savedNodes.push(savedNode);
    }

    return this.storage.set(this.storageKey, savedNodes);
  }

  async deleteSavedNode(savedNode: SavedNode): Promise<any> {
    const savedNodes = await this.getAllNodes();

    const index = savedNodes.findIndex(item => item.nodeId === savedNode.nodeId);
    if (index > -1) {
      savedNodes.splice(index, 1);
    }

    return this.storage.set(this.storageKey, savedNodes);
  }

  async deleteAllSavedNodes(): Promise<any> {
    await this.storage.ready();
    return this.storage.set(this.storageKey, []);
  }

  async elementInSavedNodes(savedNode: SavedNode): Promise<undefined | SavedNode> {
    const savedNodes = await this.getAllNodes();
    return savedNodes.find(item => item.nodeId === savedNode.nodeId && item.opcUaServer === savedNode.opcUaServer);
  }

  async elementInSavedSubscriptions(savedNode: SavedNode): Promise<undefined | SavedNode> {
    const filteredNode = await this.elementInSavedNodes(savedNode);

    if (filteredNode === undefined) {
      return undefined;
    }

    if (filteredNode.savedAsSubscription === true) {
      return filteredNode;
    } else {
      return filteredNode;
    }
  }

  async elementInSavedFavorites(savedNode: SavedNode): Promise<undefined | SavedNode> {
    const filteredNode = await this.elementInSavedNodes(savedNode);

    if (filteredNode === undefined) {
      return undefined;
    }

    if (filteredNode.savedAsFavorite === true) {
      return filteredNode;
    } else {
      return filteredNode;
    }
  }
}
