import { GraphDataAccess } from "./types";
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
export declare class GraphHelper<V, E> {
    gda: GraphDataAccess<V, E>;
    constructor(gda: GraphDataAccess<V, E>);
    adjacentVertices(nodePk: string, vertexFilterByPK: SearchConfigFilterFunction | undefined, edgeFilterByPK: SearchConfigFilterFunction | undefined, ignoreDirectionality: boolean): _ADJACENT_VERTEX[];
    linksBetweenTwoVertexSets(aSet: Set<string>, zSet: Set<string>, ignoreDirection: boolean): Set<string>;
    BFS(startNodePk: string, searchConfig: BFSSearchConfig): any[];
    traceVisitedMapPathAtoZ(visitedMap: Map<string, _VISITED_ITEM>, aPk: string, zPk: string): Map<any, any>;
}
