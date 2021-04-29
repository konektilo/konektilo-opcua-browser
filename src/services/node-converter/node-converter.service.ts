import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NodeConverterService {
  constructor() {
  }

  public static extractNode(node: string): ExtractedNode {
    const namespace = node.match(/ns=\d;/)[0].replace(/ns=/, '').replace(/;/, '');
    const nodeId = node.match(/;.=.+/)[0].substring(3);
    const nodeType = node.match(/;.=.+/)[0].substring(1, 2);
    return {nodeId, nodeType, namespace, nodeTypeLong: NodeConverterService.getLongNodeType(nodeType)};
  }

  private static getLongNodeType(nodeType: string): string {
    let nodeTypeLong = '';

    switch (nodeType) {
      case 'b':
        nodeTypeLong = 'Opaque';
        break;
      case 'g':
        nodeTypeLong = 'Guid';
        break;
      case 'i':
        nodeTypeLong = 'Numeric';
        break;
      case 's':
        nodeTypeLong = 'String';
        break;
    }

    return nodeTypeLong;
  }
}
