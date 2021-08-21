export declare type _llFromVertexId = string;
export declare type _llToVertexId = string;
export declare type _llLinkId = string;
export interface _adjacentListMapRecordItem {
    linkId: string;
    isBidirectional: boolean;
    reverseFlag: boolean;
}
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
}
//# sourceMappingURL=types.d.ts.map