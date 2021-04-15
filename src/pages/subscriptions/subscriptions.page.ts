import {Component, OnInit} from '@angular/core';
import {SubscriptionStorageService} from '../../services/subscription-storage/subscription-storage.service';
import {SignalRService} from '../../services/signal-r-service/signal-r.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})
export class SubscriptionsPage implements OnInit {
  allStorageSubscriptions: Map<string, SubscriptionNode[]> = new Map<string, [SubscriptionNode]>();
  opcUaServers: string[] = [];
  selectedSubsNode: SubscriptionNode[] = [];

  constructor(public subscriptionStorageService: SubscriptionStorageService, public signalRService: SignalRService) {
    // this.signalRService.getNewMessageSubscription().subscribe(test => console.log(test.variableData));
  }

  async ngOnInit() {
    this.allStorageSubscriptions = await this.subscriptionStorageService.getAllSubscriptions();
    this.opcUaServers = Array.from(this.allStorageSubscriptions.keys());
  }

  onOpcUaServerClick(opcUaServer: string) {
    this.selectedSubsNode = [];

    if (opcUaServer === undefined) {
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
