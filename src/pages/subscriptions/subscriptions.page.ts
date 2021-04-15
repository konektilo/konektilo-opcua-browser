import {Component, EventEmitter} from '@angular/core';
import {SubscriptionStorageService} from '../../services/subscription-storage/subscription-storage.service';
import {SignalRService} from '../../services/signal-r-service/signal-r.service';
import {ViewWillEnter} from '@ionic/angular';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})
export class SubscriptionsPage implements ViewWillEnter {
  allStorageSubscriptions: Map<string, SubscriptionNode[]> = new Map<string, [SubscriptionNode]>();
  opcUaServers: string[] = [];
  selectedSubsNode: SubscriptionNode[] = [];
  selectedOpcUaServer: string;
  onChildClickDelete = new EventEmitter<SubscriptionNode>();

  constructor(public subscriptionStorageService: SubscriptionStorageService, public signalRService: SignalRService) {
    this.onChildClickDelete.subscribe(subscriptionNode => {
      this.subscriptionStorageService.deleteSubscription(subscriptionNode).then();

      const index = this.selectedSubsNode.findIndex(e => e.nodeId === subscriptionNode.nodeId &&
        e.opcUaServer === subscriptionNode.opcUaServer);

      if (index > -1) {
        this.selectedSubsNode.splice(index, 1);
      }
    });
  }

  async ionViewWillEnter() {
    this.allStorageSubscriptions = await this.subscriptionStorageService.getAllSubscriptions();
    this.opcUaServers = Array.from(this.allStorageSubscriptions.keys());

    if (this.selectedOpcUaServer !== undefined) {
      this.onOpcUaServerClick(this.selectedOpcUaServer);
    }
  }

  onOpcUaServerClick(opcUaServer: string) {
    this.selectedOpcUaServer = opcUaServer;
    this.selectedSubsNode = [];

    if (opcUaServer === 'ALLOPCUASERVERS') {
      this.allStorageSubscriptions.forEach((subsNodes: SubscriptionNode[], _: string) => {
        subsNodes.forEach(subsNode => {
          this.signalRService.subscribeToNode(subsNode);
          this.selectedSubsNode.push(subsNode);
        });
      });
    } else {
      this.selectedSubsNode = this.allStorageSubscriptions.get(opcUaServer);
      this.selectedSubsNode.forEach(subsNode => this.signalRService.subscribeToNode(subsNode));
    }
  }
}
