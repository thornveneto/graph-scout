import { GraphDataAccess, _adjacentListMap } from "./types";
export declare class GraphAdjacencyMap<V, E> {
    adjacentListMap: _adjacentListMap;
    gda: GraphDataAccess<V, E>;
    constructor(gda: GraphDataAccess<V, E>);
    addAdjacencyMapRecord: (linkId: string, fromId: string, toId: string, reverseFlag: boolean) => void;
}
//# sourceMappingURL=GraphAdjacencyMap.d.ts.map