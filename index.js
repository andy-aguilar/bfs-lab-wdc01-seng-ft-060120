function bfs(rootNode, vertices, edges){
    const queue = []
    const nodeOrder = []
    rootNode.distance = 0

    addVertexToQueue(rootNode, queue)
    addVertexToQueue(rootNode, nodeOrder)

    while(queue.length != 0){
        let currentNode = queue.shift()
        let adjacentNodes = findAdjacent(currentNode.name, vertices, edges);
        let updatedNodes = markDistanceAndPredecessor(currentNode, adjacentNodes)
        updatedNodes.forEach(node => {
            addVertexToQueue(node, queue)
            addVertexToQueue(node, nodeOrder)
        })

    }
    return nodeOrder
}

function addVertexToQueue(node, queue){
    queue.push(node)
}

function findAdjacent(node, vertices, edges){
    const vertNames = []
    edges.forEach(edge => {
        if(edge[0] === node){
            vertNames.push(edge[1])
        }
        else if(edge[1] === node){
            vertNames.push(edge[0])
        }
    })

    const adjacent = []
    
    vertNames.forEach(vertName => {
        vertices.forEach(vertex => {
            if(vertex.distance === null && vertex.name === vertName){
                adjacent.push(vertex)
            }
        })
    })
    return adjacent
}

function markDistanceAndPredecessor(vertex, adjacentNodes){
    return adjacentNodes.map(node =>{
        node.predecessor = vertex;
        node.distance = vertex.distance + 1
        return node
    })
}

let edges = [
	['14th&6th', '23rd&6th'],
	['23rd&6th', '34th&6th'],
	['34th&6th', '28th&Bwy'],
	['28th&Bwy', '23rd&Bwy'],
	['23rd&Bwy', '14th&Lex'],
	['14th&Lex', '23rd&Lex']
]

let vertices = [
  {name: '34th&6th', distance: null, predecessor: null},
  {name: '23rd&6th', distance: null, predecessor: null},
  {name: '14th&6th', distance: null, predecessor: null},
  {name: '28th&Bwy', distance: null, predecessor: null},
  {name: '23rd&Bwy', distance: null, predecessor: null},
  {name: '14th&Lex', distance: null, predecessor: null},
  {name: '23rd&Lex', distance: null, predecessor: null},
]

bfs(vertices[0], vertices, edges)