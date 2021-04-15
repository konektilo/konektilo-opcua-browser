interface KonektiloResult {
  nodeId: string;
  opcUaServer: string;
  serverTimeStamp: string;
  sourceTimeStamp: string;
  variableDisplayname: string;
  variableData: any;
  variableType: string;
  variableStatusCode: string;
  statusCode: {
    Code: number;
  };
}
