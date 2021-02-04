import {Component, OnInit} from '@angular/core';
import {SubscriptionStorageService} from '../../services/subscription-storage/subscription-storage.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})
export class SubscriptionsPage implements OnInit {
  subscriptions: Map<string, [SubscriptionNode]> = new Map<string, [SubscriptionNode]>();
  selectedSubsNode: SubscriptionNode[] = [];

  constructor(public subscriptionStorageService: SubscriptionStorageService) {
  }

  async ngOnInit() {
    this.subscriptions = await this.subscriptionStorageService.getAllSubscriptions();
  }

  onOpcUaServerClick(opcUaServer: string) {
    // TODO hier weitermachen
  }
}
