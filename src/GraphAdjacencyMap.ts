import { GraphDataAccess, _adjacentListMap } from "./types";

export class GraphAdjacencyMap<V, E> {
  adjacentListMap: _adjacentListMap;
  gda: GraphDataAccess<V, E>;

  constructor(gda: GraphDataAccess<V, E>) {
    this.adjacentListMap = new Map();
    this.gda = gda;

    this.addAdjacencyMapRecord = this.addAdjacencyMapRecord.bind(this);
  }

  addAdjacencyMapRecord = (linkId: string, fromId: string, toId: string, reverseFlag: boolean) => {

    if (!this.adjacentListMap.has(fromId)) {
      this.adjacentListMap.set(fromId, new Map([[toId, {
        linkId: linkId, 
        isBidirectional: this.gda.edgeIsEdgeDirectional(linkId) ? this.gda.isDirectionalEdgeBiDirectional(linkId) : null,
        reverseFlag: reverseFlag
      }]]));
    } else {
      this.adjacentListMap.get(fromId)!.set(toId, {
        linkId: linkId, 
        isBidirectional: this.gda.edgeIsEdgeDirectional(linkId) ? this.gda.isDirectionalEdgeBiDirectional(linkId) : null,
        reverseFlag: reverseFlag
      });
    }
  }
}