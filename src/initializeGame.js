export default function initializeGame(generatedShips, isButtonClick, shipsDictionary) {
	
	const counter = {hits: 0, shoots: 0},
		shipsCount = 20; //20

	function onFire(e) {
		if (isButtonClick.isStarted && /column-(\d)-(\d)/.test(e.target.className)) {
			let row = e.target.className.match(/column-(\d)-(\d)/)[1],
				column = e.target.className.match(/column-(\d)-(\d)/)[2];

			row = (row < 0) ? 0 : row;
			column = (column < 0) ? 0 : column;

			const ceilValue = +generatedShips[row][column];
			if (!e.target.getElementsByClassName("dot")[0]) {
				const dot = document.createElement('div');
				let sunkShipCoord;
				e.target.append(dot);
				if (ceilValue !== 0) {
					dot.className = "dot hit";
					counter.hits++;
					sunkShipCoord = isSunk(shipsDictionary, [row, column], ceilValue); //new
					if (sunkShipCoord) {
						//найти column c данными координатами и перекрасить цвет
						//[ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ]
						for (let yx of sunkShipCoord) { // Ошибка - с середины игры не перекрвашивает цвет
							document.querySelector(`.column-${yx[0]}-${yx[1]}`).children[0].className = `dot sunk`; //new
						}
					}
				} else dot.className = "dot miss";
				counter.shoots++;
			}
			if (shipsCount === counter.hits) {
				showStatistic(counter);
				isButtonClick.isStarted = false;
				document.getElementById("start-game").innerText = "Start new game";
			}
		} else console.log("press button", isButtonClick.isStarted);
	}
	
	return onFire;
}

function isSunk(shipsDictionary, coordinates, shipType) { //new
	let [row, column] = coordinates;
	for (let ship of shipsDictionary) {
		if (ship["shipType"] === shipType) {
			for(let i =  0; i < shipType; i++) {
				if (ship["coordin"][i][0] === +row 
				&& ship["coordin"][i][1] === +column) {
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


function showStatistic(counter) {
	const shootsSpan = document.getElementById("shoots-count"),
		hitsSpan = document.getElementById("hits-count");
	document.getElementById("statistics").style.visibility = "visible";
	shootsSpan.innerText = counter.shoots;
	hitsSpan.innerText = counter.hits;
	counter.shoots = 0;
	counter.hits = 0;
}