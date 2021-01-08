interface KonektiloBrowseNodeInternal {
  intBrowseNode: any;
  nodeId: string | number;
  browseName: string;
  name: string;
  class: number;
  className: string;
  childCount: number;
  children: KonektiloBrowseNodeInternal[]; // For building the tree view
  childrenFetched: boolean;
  browseUrl: string;
  accessUrl: string;
  expandable: boolean;
  level: number;
}
