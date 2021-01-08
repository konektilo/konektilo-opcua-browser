import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {KonektiloService} from '../services/konektilo/konektilo.service';
import {KonektiloNodeResponse} from '../models/KonektiloNodeResponse';

@Component({
  selector: 'app-detailed-node',
  templateUrl: './detailed-node.component.html',
  styleUrls: ['./detailed-node.component.scss'],
})
export class DetailedNodeComponent implements OnInit, OnChanges {
  @Input() browseNode: KonektiloBrowseNodeInternal;
  fullNode: KonektiloNodeResponse;

  constructor(public konektiloService: KonektiloService) {
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
      this.konektiloService.readNode(this.browseNode.accessUrl).subscribe(fullNode => this.fullNode = fullNode);
    }
  }

}
