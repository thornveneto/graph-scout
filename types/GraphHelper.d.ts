import { GraphDataAccess, BFSSearchConfig, SearchConfigFilterFunction, _ADJACENT_VERTEX, _VISITED_ITEM } from "./types";
export declare class GraphHelper<V, E> {
    gda: GraphDataAccess<V, E>;
    constructor(gda: GraphDataAccess<V, E>);
    adjacentVertices(nodePk: string, vertexFilterByPK: SearchConfigFilterFunction | undefined, edgeFilterByPK: SearchConfigFilterFunction | undefined, ignoreDirectionality: boolean): _ADJACENT_VERTEX[];
    linksBetweenTwoVertexSets(aSet: Set<string>, zSet: Set<string>, ignoreDirection: boolean): Set<string>;
    BFS(startNodePk: string, searchConfig: BFSSearchConfig): (Map<string, _VISITED_ITEM> | null)[];
    traceVisitedMapPathAtoZ(visitedMap: Map<string, _VISITED_ITEM>, aPk: string, zPk: string): Map<any, any>;
}
//# sourceMappingURL=GraphHelper.d.ts.map