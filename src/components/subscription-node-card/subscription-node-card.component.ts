import {Component, Input, OnInit} from '@angular/core';
import {SignalRService} from '../../services/signal-r-service/signal-r.service';

@Component({
  selector: 'app-subscription-node-card',
  templateUrl: './subscription-node-card.component.html',
  styleUrls: ['./subscription-node-card.component.scss'],
})
export class SubscriptionNodeCardComponent implements OnInit {
  @Input() subscriptionNode: SubscriptionNode;
  konektiloResult: KonektiloResult = {
    nodeId: '-',
    opcUaServer: '-',
    serverTimeStamp: '-',
    sourceTimeStamp: '-',
    statusCode: {Code: 0},
    variableData: undefined,
    variableDisplayname: '-',
    variableStatusCode: '-',
    variableType: '-'
  };

  constructor(public signalRService: SignalRService) {
  }

  ngOnInit() {
    this.signalRService.getNewMessageSubscription().subscribe(konektiloResult => {
      if (this.subscriptionNode.nodeId === konektiloResult.nodeId && this.subscriptionNode.opcUaServer === konektiloResult.opcUaServer) {
        this.konektiloResult = konektiloResult;
      }
    });
  }
}
