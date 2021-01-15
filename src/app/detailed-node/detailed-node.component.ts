import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {KonektiloService} from '../services/konektilo/konektilo.service';
import {KonektiloNodeResponse} from '../models/KonektiloNodeResponse';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-detailed-node',
  templateUrl: './detailed-node.component.html',
  styleUrls: ['./detailed-node.component.scss'],
})
export class DetailedNodeComponent implements OnInit, OnChanges {
  @Input() browseNode: KonektiloBrowseNodeInternal;
  fullNode: KonektiloNodeResponse;
  buttonsDisabled = true;
  dataToDisplay = '';

  constructor(public konektiloService: KonektiloService, public toastController: ToastController) {
    this.updateData();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.hasOwnProperty('browseNode') || changes?.browseNode.isFirstChange()) {
      return;
    }
    this.browseNode = changes.browseNode.currentValue;
    this.updateData();
  }

  updateData() {
    if (this.browseNode !== undefined) {
      this.konektiloService.readNode(this.browseNode.accessUrl).subscribe(fullNode => {
        this.fullNode = fullNode;
        this.buttonsDisabled = fullNode === undefined; // Disabled buttons if no node selected
        if (fullNode.result.variableData instanceof Object) {
          this.dataToDisplay = JSON.stringify(fullNode.result.variableData);
        } else {
          this.dataToDisplay = fullNode.result.variableData;
        }
      });
    }
  }

  async showCopyToast() {
    const toast = await this.toastController.create({
      message: 'Konektlo URL of node copied to clipboard.',
      duration: 2000
    });
    await toast.present();
  }

  onAddRemoveFavorites() {
    // TODO add/remove favorites
  }

  onAddRemoveSubscriptions() {
    // TODO add/remove to subscriptions
  }
}
