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

    const linkData = {
      isBidirectional: this.gda.edgeIsEdgeDirectional(linkId) ? this.gda.isDirectionalEdgeBiDirectional(linkId) : null,
      reverseFlag: reverseFlag
  }

    if (!this.adjacentListMap.has(fromId)) {
      this.adjacentListMap.set(fromId, new Map([[toId, new Map([[linkId, linkData ]]) ]]));
    } else {
      const fromMap =this.adjacentListMap.get(fromId);

      if (fromMap!.has(toId)) {
          fromMap!.get(toId)!.set(
              linkId, 
              linkData
          );
      } else {
          fromMap!.set(toId, new Map([[linkId, linkData ]]));
      }
    }
  }
}