export type SearchConfigFilterFunction = (inputPk: string) => boolean;

export interface BFSSearchConfig {
  finishVertexByPK?: SearchConfigFilterFunction;
  vertexFilterByPK?: SearchConfigFilterFunction;
  edgeFilterByPK?: SearchConfigFilterFunction;
  boundaryVertexFilterByPK?: SearchConfigFilterFunction;
  ignoreDirectionality: boolean;
}

export interface _VISITED_ITEM {
  _ID: string;
  _FROM: string | null;
  _LINK: string | null;
  _BOUNDARY: boolean;
}

export interface _ADJACENT_VERTEX {
  _ID: string;
  _LINK: string;
}

export type _llFromVertexId = string;
export type _llToVertexId = string;
export type _llLinkId = string;

export interface _adjacentListMapLinkItem {
  isBidirectional: boolean | null;
  reverseFlag: boolean;
}

export type _adjacentListMapRecordItem = Map<_llLinkId, _adjacentListMapLinkItem>;
export type _adjacentListMapRecord = Map<_llToVertexId, _adjacentListMapRecordItem>;
export type _adjacentListMap = Map<_llFromVertexId, _adjacentListMapRecord>;

export interface GraphDataAccess<V, E> {
  getAllVerticeKeys: () => Array<string>;
  getAllEdgesKeys: () => Array<string>;

  getVertexByPk: (pkValue: string) => V;

  getLinkedVerticesMap: (pkValue: string) => _adjacentListMapRecord;

  edgeGetFromValue: (edgePk: string) => string;
  edgeGetToValue: (edgePk: string) => string;

  edgeIsEdgeDirectional: (edgePk: string) => boolean;
  isDirectionalEdgeBiDirectional: (edgePk: string) => boolean;

  // Mutation operations
  addVertex: (vertexData: Partial<V>) => string;
  addEdge: (edgeData: Partial<E>) => string;
}