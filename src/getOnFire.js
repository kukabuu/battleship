import showStatistics from './showStatistics';

export default function getOnFire(gameStatus) {
	return onFire;

	function onFire(e) {
		const counter = gameStatus.counter,
			columnTemplate = /column-(\d)-(\d)/,
			dot = document.createElement('div'),
			generatedShips = gameStatus.generatedShips;

		if (!gameStatus.isStarted && columnTemplate.test(e.target.className)) return false; 

		let [noUse, row, column] = e.target.className.match(columnTemplate);

		row = (row < 0) ? 0 : +row;
		column = (column < 0) ? 0 : +column;

		const shipSize = +generatedShips[row][column];

		if (!e.target.getElementsByClassName("dot")[0]) {
			e.target.append(dot);
			counter.shoots++;
			if (shipSize !== 0) {
				dot.className = "dot hit";
				counter.hits++;
				generatedShips[row][column] = -shipSize;
				tryToSink(shipSize, [row, column], gameStatus);
			} else dot.className = "dot miss";
		}

		if (gameStatus.shipsCount === counter.hits) {
			showStatistics(counter);
			gameStatus.isStarted = false;
			document.getElementById("start-game").innerText = "Start new game";
		}
	}
}



function tryToSink(shipSize, coordinate, gameStatus) {
	const [row, column] = coordinate,
		generatedShips = gameStatus.generatedShips;
	
	if (shipSize === 1) {
		document.getElementsByClassName(`column-${row}-${column}`)[0].className += " sunk";
		return true;
	}

	let nextCoordinate = row + 1,
		numOfHited = 1,
		hittedCoordinates = [coordinate];

	while(nextCoordinate < 10 && numOfHited < shipSize && generatedShips[nextCoordinate][column] !== ""){
		if (generatedShips[nextCoordinate][column] > 0) break;
		hittedCoordinates.push([nextCoordinate, column]);
		numOfHited++;
		nextCoordinate++;
	}

	nextCoordinate = row - 1;
	while(nextCoordinate > -1 && numOfHited < shipSize && generatedShips[nextCoordinate][column] !== ""){
		if (generatedShips[nextCoordinate][column] > 0) break;
		numOfHited++;
		hittedCoordinates.push([nextCoordinate, column]);
		nextCoordinate--;
	}

	nextCoordinate = column + 1;
	while(nextCoordinate < 10 && numOfHited < shipSize && generatedShips[row][nextCoordinate] !== ""){
		if (generatedShips[row][nextCoordinate] > 0) break;
		hittedCoordinates.push([row, nextCoordinate]);
		numOfHited++
		nextCoordinate++;
	}

	nextCoordinate = column - 1;
	while(nextCoordinate > -1 && numOfHited < shipSize && generatedShips[row][nextCoordinate] !== ""){
		if (generatedShips[row][nextCoordinate] > 0) break;
		hittedCoordinates.push([row, nextCoordinate]);
		numOfHited++
		nextCoordinate--;
	}

	if(numOfHited === shipSize) {
		hittedCoordinates.forEach(
			([row, column]) => document.getElementsByClassName(`column-${row}-${column}`)[0].className += " sunk"
		);
	}
}