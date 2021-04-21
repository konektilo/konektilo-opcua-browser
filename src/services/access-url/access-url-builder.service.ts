import {Injectable} from '@angular/core';
import {NodeConverterService} from '../node-converter/node-converter.service';

@Injectable({
  providedIn: 'root'
})
export class AccessUrlBuilderService {
  constructor() {
  }

  public static build(savedNode: SavedNode): string {
    // TODO get baseUrl dynamic
    const baseUrl = 'http://localhost:5000/api/v1/server/';
    const extractedNode = NodeConverterService.extractNode(savedNode.nodeId);
    return baseUrl + savedNode.opcUaServer + '/namespace/' + extractedNode.namespace + '/identifier/' + extractedNode.nodeId +
      '?identifierType=' + extractedNode.nodeTypeLong;
  }
}
