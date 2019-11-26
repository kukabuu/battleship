const ships = [
	{"shipType": 4, "coordin": [[0, 0], [0, 1], [0, 2], [0, 3]], "hits": [0, 0, 0, 0]},
	{"shipType": 3, "coordin": [[1, 0], [1, 1], [1, 2]], "hits": [0, 0, 0]},
	{"shipType": 3, "coordin": [[2, 0], [2, 1], [1, 2]], "hits": [0, 0, 0]},
	{"shipType": 2, "coordin": [[3, 0], [3, 1]], "hits": [0, 0]},
	{"shipType": 2, "coordin": [[4, 0], [4, 1]], "hits": [0, 0]},
	{"shipType": 1, "coordin": [[5, 0]], "hits": [0]},
	{"shipType": 1, "coordin": [[6, 0]], "hits": [0]}
];

function isSunk(ships, coordinates, shipType) {
	let [row, column] = coordinates;
	for (let ship of ships) {
		if (ship["shipType"] === shipType) {
			for(let i =  0; i < shipType; i++) {
				if (ship["coordin"][i][0] === row 
				&& ship["coordin"][i][1] === column) {
					ship["hits"][i] = 1;
				}
			}
			let hits = ship["hits"].filter(elem => elem === 1);
			if (hits.length === shipType) {
				return [...ship["coordin"]];
			}
		}
	}
	return false;
}

console.log(isSunk(ships, [0,0], 4));
console.log(isSunk(ships, [0,1], 4));
console.log(isSunk(ships, [0,2], 4));
console.log(isSunk(ships, [0,3], 4));
console.log(ships);
