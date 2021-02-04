import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionStorageService {
  storageKey = 'subscriptions';

  constructor(public storage: Storage) {
    this.getAllSubscriptions().then(subscriptions => {
      if (subscriptions === null) {
        this.storage.set(this.storageKey, new Map());
      }
    });
  }

  async getAllSubscriptions(): Promise<Map<string, [SubscriptionNode]>> {
    await this.storage.ready();
    return this.storage.get(this.storageKey);
  }

  async saveSubscription(subscriptionNode: SubscriptionNode): Promise<any> {
    await this.storage.ready();
    const subscriptions = await this.getAllSubscriptions();

    // Check if opc-ua server exists
    if (Array.from(subscriptions.keys()).find(item => item === subscriptionNode.opcUaServer) === undefined) {
      subscriptions.set(subscriptionNode.opcUaServer, [subscriptionNode]);
    } else {
      // Check if nodeId exists in list of opc-ua server subscriptions
      if (subscriptions.get(subscriptionNode.opcUaServer).find(item => item.nodeId === subscriptionNode.nodeId) === undefined) {
        subscriptions.get(subscriptionNode.opcUaServer).push(subscriptionNode);
      }
    }

    return this.storage.set(this.storageKey, subscriptions);
  }

  async deleteSubscription(subscriptionNode: SubscriptionNode): Promise<any> {
    await this.storage.ready();
    const subscriptions = await this.getAllSubscriptions();

    const index = subscriptions.get(subscriptionNode.opcUaServer).findIndex(item => item.nodeId === subscriptionNode.nodeId);
    if (index > -1) {
      subscriptions.get(subscriptionNode.opcUaServer).splice(index, 1);
    }

    return this.storage.set(this.storageKey, subscriptions);
  }

  async deleteAllSubscriptions(): Promise<any> {
    await this.storage.ready();
    return this.storage.set(this.storageKey, new Map());
  }

  async elementInSubscriptions(subscriptionNode: SubscriptionNode): Promise<undefined | SubscriptionNode> {
    await this.storage.ready();
    const subscriptions = await this.getAllSubscriptions();

    return subscriptions.get(subscriptionNode.opcUaServer)?.find(item => item.nodeId === subscriptionNode.nodeId);
  }
}
