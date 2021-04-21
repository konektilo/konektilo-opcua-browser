import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SavedNodesStorageService {
  storageKey = 'savedNodes';

  constructor(public storage: Storage) {
    this.getAllNodes().then(subscriptions => {
      if (subscriptions === null) {
        this.storage.set(this.storageKey, []);
      }
    });
  }

  async getAllNodes(): Promise<SavedNode[]> {
    await this.storage.ready();
    return this.storage.get(this.storageKey);
  }

  async getAllFavoriteSavedNodes(): Promise<SavedNode[]> {
    const savedNodes = await this.getAllNodes();
    return savedNodes.filter(savedNode => savedNode.savedAsFavorite === true);
  }

  async getAllSubscriptionSavedNodes(): Promise<SavedNode[]> {
    const savedNodes = await this.getAllNodes();
    return savedNodes.filter(savedNode => savedNode.savedAsSubscription === true);
  }

  async saveNode(savedNode: SavedNode): Promise<any> {
    const savedNodes = await this.getAllNodes();

    const nodeIndex = savedNodes.findIndex(item => item.nodeId === savedNode.nodeId && item.opcUaServer === savedNode.opcUaServer);

    if (nodeIndex !== -1) {
      if (savedNode.savedAsFavorite === false && savedNode.savedAsSubscription === false) {
        await this.deleteSavedNode(savedNode);
      } else {
        savedNodes[nodeIndex] = savedNode;
      }
    } else {
      savedNodes.push(savedNode);
    }

    return this.storage.set(this.storageKey, savedNodes);
  }

  async deleteSavedNode(savedNode: SavedNode): Promise<any> {
    await this.storage.ready();
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
    await this.storage.ready();
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
