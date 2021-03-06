export declare type SearchConfigFilterFunction = (inputPk: string) => boolean;
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
export declare type _llFromVertexId = string;
export declare type _llToVertexId = string;
export declare type _llLinkId = string;
export interface _adjacentListMapLinkItem {
    isBidirectional: boolean | null;
    reverseFlag: boolean;
}
export declare type _adjacentListMapRecordItem = Map<_llLinkId, _adjacentListMapLinkItem>;
export declare type _adjacentListMapRecord = Map<_llToVertexId, _adjacentListMapRecordItem>;
export declare type _adjacentListMap = Map<_llFromVertexId, _adjacentListMapRecord>;
export interface GraphDataAccess<V, E> {
    getAllVerticeKeys: () => Array<string>;
    getAllEdgesKeys: () => Array<string>;
    getVertexByPk: (pkValue: string) => V;
    getLinkedVerticesMap: (pkValue: string) => _adjacentListMapRecord;
    edgeGetFromValue: (edgePk: string) => string;
    edgeGetToValue: (edgePk: string) => string;
    edgeIsEdgeDirectional: (edgePk: string) => boolean;
    isDirectionalEdgeBiDirectional: (edgePk: string) => boolean;
    addVertex: (vertexData: Partial<V>) => string;
    addEdge: (edgeData: Partial<E>) => string;
}
//# sourceMappingURL=types.d.ts.map