import {Injectable} from '@angular/core';
import {NodeConverterService} from '../node-converter/node-converter.service';
import {SettingsStorageService} from '../settings-storage/settings-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccessUrlBuilderService {
  constructor(public settingsStorage: SettingsStorageService) {
  }

  async build(savedNode: SavedNode): Promise<string> {
    const baseUrl = await this.settingsStorage.getSettings();
    const extractedNode = NodeConverterService.extractNode(savedNode.nodeId);
    return baseUrl.konektiloUrl + '/api/v1/server/' + savedNode.opcUaServer + '/namespace/' + extractedNode.namespace + '/identifier/'
      + extractedNode.nodeId + '?identifierType=' + extractedNode.nodeTypeLong;
  }
}
