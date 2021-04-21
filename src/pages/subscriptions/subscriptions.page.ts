import {Component, EventEmitter} from '@angular/core';
import {SavedNodesStorageService} from '../../services/saved-nodes-storage/saved-nodes-storage.service';
import {SignalRService} from '../../services/signal-r-service/signal-r.service';
import {ViewWillEnter} from '@ionic/angular';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})
export class SubscriptionsPage implements ViewWillEnter {
  allSavedSubscriptionNodes: SavedNode[] = [];
  opcUaServers: Set<string> = new Set();
  selectedSubsNodes: SavedNode[] = [];
  selectedOpcUaServer: string;
  onChildClickDelete = new EventEmitter<SavedNode>();

  constructor(public savedNodesStorageService: SavedNodesStorageService, public signalRService: SignalRService) {
    this.onChildClickDelete.subscribe(savedNode => {
      this.savedNodesStorageService.deleteSavedNode(savedNode).then();

      const index = this.selectedSubsNodes.findIndex(e => e.nodeId === savedNode.nodeId &&
        e.opcUaServer === savedNode.opcUaServer);

      if (index > -1) {
        this.selectedSubsNodes.splice(index, 1);
      }
    });
  }

  async ionViewWillEnter() {
    this.allSavedSubscriptionNodes = await this.savedNodesStorageService.getAllSubscriptionSavedNodes();
    this.opcUaServers = new Set(this.allSavedSubscriptionNodes.map(item => item.opcUaServer));

    if (this.selectedOpcUaServer !== undefined) {
      this.onOpcUaServerClick(this.selectedOpcUaServer);
    }
  }

  onOpcUaServerClick(opcUaServer: string) {
    this.selectedOpcUaServer = opcUaServer;
    this.selectedSubsNodes = [];

    if (opcUaServer === 'ALLOPCUASERVERS') {
      this.allSavedSubscriptionNodes.forEach(savedNode => {
        this.signalRService.subscribeToNode(savedNode);
        this.selectedSubsNodes.push(savedNode);
      });
    } else {
      this.selectedSubsNodes = this.allSavedSubscriptionNodes.filter(item => item.opcUaServer === opcUaServer);
      this.selectedSubsNodes.forEach(subsNode => this.signalRService.subscribeToNode(subsNode));
    }
  }
}
