import {Component, EventEmitter} from '@angular/core';
import {ViewWillEnter} from '@ionic/angular';
import {SavedNodesStorageService} from '../../services/saved-nodes-storage/saved-nodes-storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements ViewWillEnter {
  allSavedFavoriteNodes: SavedNode[] = [];
  opcUaServers: Set<string> = new Set();
  selectedFavoriteNodes: SavedNode[] = [];
  selectedOpcUaServer: string;
  onChildClickDelete = new EventEmitter<SavedNode>();

  constructor(public savedNodesStorageService: SavedNodesStorageService) {
    this.onChildClickDelete.subscribe(subscriptionNode => {
      const index = this.selectedFavoriteNodes.findIndex(e => e.nodeId === subscriptionNode.nodeId &&
        e.opcUaServer === subscriptionNode.opcUaServer);

      if (index > -1) {
        this.selectedFavoriteNodes.splice(index, 1);
      }
    });
  }

  async ionViewWillEnter() {
    this.allSavedFavoriteNodes = await this.savedNodesStorageService.getAllFavoriteSavedNodes();
    this.opcUaServers = new Set(this.allSavedFavoriteNodes.map(item => item.opcUaServer));

    if (this.selectedOpcUaServer !== undefined) {
      this.onOpcUaServerClick(this.selectedOpcUaServer);
    }
  }

  onOpcUaServerClick(opcUaServer: string) {
    this.selectedOpcUaServer = opcUaServer;
    this.selectedFavoriteNodes = [];

    if (opcUaServer === 'ALLOPCUASERVERS') {
      this.allSavedFavoriteNodes.forEach(savedNode => {
        this.selectedFavoriteNodes.push(savedNode);
      });
    } else {
      this.selectedFavoriteNodes = this.allSavedFavoriteNodes.filter(item => item.opcUaServer === opcUaServer);
    }
  }
}
