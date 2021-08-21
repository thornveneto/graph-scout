import {
  GraphDataAccess,
  BFSSearchConfig,
  SearchConfigFilterFunction,
  _adjacentListMapRecordItem,
  _ADJACENT_VERTEX,
  _VISITED_ITEM
} from "./types";

export class GraphHelper<V, E> {
  gda: GraphDataAccess<V, E>;

  constructor(gda: GraphDataAccess<V, E>) {
    this.gda = gda;
  }

  adjacentVertices(
    nodePk: string,
    vertexFilterByPK: SearchConfigFilterFunction | undefined, 
    edgeFilterByPK: SearchConfigFilterFunction | undefined,
    ignoreDirectionality: boolean
  ) {

    // TODO: Assumption: only one link is supported at the moment
    let mappedData: Array<_ADJACENT_VERTEX> = [];

    this.gda.getLinkedVerticesMap(nodePk).forEach((linkRecordValueItem: _adjacentListMapRecordItem, keyAkaVertexId: string) => {

      let filterFlag = true;

      if (ignoreDirectionality) {
        filterFlag = true;
      } else if (linkRecordValueItem.reverseFlag && (linkRecordValueItem.isBidirectional === null || linkRecordValueItem.isBidirectional)){
        filterFlag = true;
      } else if (linkRecordValueItem.reverseFlag) {
        filterFlag = false;
      }

      if (filterFlag && edgeFilterByPK) {
        //filter flag is decorative here
        filterFlag = edgeFilterByPK(linkRecordValueItem.linkId);
      }
      if (filterFlag && vertexFilterByPK) {
        filterFlag = vertexFilterByPK(keyAkaVertexId);
      }

      if (filterFlag) {
        mappedData.push({_ID: keyAkaVertexId, _LINK: linkRecordValueItem.linkId});
      }
    });
 
    return mappedData;
  }
 
  linksBetweenTwoVertexSets(aSet: Set<string>, zSet: Set<string>, ignoreDirection: boolean) {
    let resultSet = new Set<string>();

    aSet.forEach((setItem: string) => {
      // TODO: add more logical treatment of ignore directionality

      this.gda.getLinkedVerticesMap(setItem).forEach((linkRecordValueItem: _adjacentListMapRecordItem, keyAkaVertexId: string) => {        
        if (zSet.has(keyAkaVertexId)) {
          if (ignoreDirection) {
            resultSet.add(linkRecordValueItem.linkId);
          } else if (linkRecordValueItem.isBidirectional) {
            resultSet.add(linkRecordValueItem.linkId);
          } else if (linkRecordValueItem.isBidirectional === null) {
            resultSet.add(linkRecordValueItem.linkId);
          } else if (/*not bidirectional*/linkRecordValueItem.reverseFlag === false){
            resultSet.add(linkRecordValueItem.linkId);
          } else {
            // do nothing
          }
          
        }
      });
    });

    return resultSet;
  }

  BFS(startNodePk: string, searchConfig: BFSSearchConfig) {

    let targetNodePk = null;
   
    const Q = [startNodePk];
    const VISITED = new Map<string,_VISITED_ITEM>();
    VISITED.set(startNodePk, {_ID: startNodePk, _FROM: null, _LINK: null, _BOUNDARY: false});
 
    while (Q.length > 0 && !targetNodePk) {
      const q = Q.shift()!;
 
      if (!VISITED.get(q)!._BOUNDARY) {

        const v = this.adjacentVertices(
          q, 
          (id: string) => !VISITED.has(id) && (!searchConfig.vertexFilterByPK || searchConfig.vertexFilterByPK(id)),
          searchConfig.edgeFilterByPK,
          searchConfig.ignoreDirectionality
         );
 
        v.every(item => {
   
          let shouldFinish = false;
          if (searchConfig.finishVertexByPK) {
       
            shouldFinish = searchConfig.finishVertexByPK(item._ID);
   
            if (shouldFinish) {
              targetNodePk = item._ID;
            }
          }      
   
          let isBoundaryNode = false;
          if (searchConfig.boundaryVertexFilterByPK) {
            isBoundaryNode = searchConfig.boundaryVertexFilterByPK(item._ID);
 
          }
   
          VISITED.set(item._ID, {_ID: item._ID, _FROM: q, _LINK: item._LINK, _BOUNDARY: isBoundaryNode});
          Q.push(item._ID);
   
          return !shouldFinish;
        });
      }
    }
 
    return [targetNodePk, VISITED];
  }
 
  traceVisitedMapPathAtoZ(visitedMap: Map<string, _VISITED_ITEM>, aPk: string, zPk: string) {
 
    if (!(aPk && zPk)) {
      throw new Error("tracePath aPk or zPk is null or undefined");
    }
 
    let resultMap = new Map();
    let v: string | null = zPk;

    const visitedItem = visitedMap.get(v);

    if (!visitedItem) {
      throw new Error("GraphHelper::traceVisitedMapPathAtoZ - visitedMap.get(v) is empty");
    }
 
    resultMap.set(v, visitedItem._LINK);
 
    while (v && v !== aPk) {
      v = visitedItem._FROM;
 
      if (v) {
        resultMap.set(v, visitedItem._LINK);
      }
     
    }
 
    return resultMap;
  }
}