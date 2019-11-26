export default function generateFieldWithShips(generatedShips, shipsDictionary) {
	const shipsCollection = [];
	generatedShips.splice(0, generatedShips.length, ...arrangeShips());
	shipsDictionary.splice(0, shipsDictionary.length, ...shipsCollection);
	//добавление корабля на поле
	function addShipToField(position, shipLength, field) {
		const [direction, row, column] = position;
		const coordin = []; //new
		const hits = []; //new
		
		for (let i = 0; i < shipLength; i++) {
			if (direction[0] === 0) {
				field[row][column + i] = shipLength;
				coordin.push([row, column + i]); //new
			} else {
				field[row + i][column] = shipLength;
				coordin.push([row + i, column]); //new
			}
			hits.push(0);
		}
		setShipBorder(position, shipLength, field);
		addShipToDictionary(shipLength, coordin, hits); //new
	}
	//добавление корабля в словарь
	function addShipToDictionary(shipLength, coordin, hits) { //new
		shipsCollection.push({
			"shipType": shipLength,
			"coordin": coordin,
			"hits": hits
		});
	}
	//размещение кораблей на поле
	function arrangeShips() {
		const field = initEmptyField(10);
		const shipTypes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
		for (let shipType of shipTypes) {
			let checkedPosition = false,
				position = [];
			while (!checkedPosition) {
				position = getInitialShipPosition(shipType, field);
				checkedPosition = checkShipPosition(position, shipType, field);
			}
			addShipToField(position, shipType, field);
		}
		return field;
	}
	//проверка возможности размещения корабля с полученными координатами и направлением
	function checkShipPosition(position, shipLength, field) {
		const [direction, row, column] = position;
		for (let i = 0; i < shipLength; i++) {
			if (direction[0] === 0 && field[row][column + i] !== 0) return false
			else if (direction[0] === 1 && field[row + i][column] !== 0) return false; 
		}
		return true;
	}
	//создание пустого поля размером size x size
	function initEmptyField(size) {
		let field = [];
		for (let i = 0; i < size; i++) {
			field[i] = [];
			for (let j = 0; j < size; j++) {
				field[i][j] = 0;
			}
		}
		return field;
	}
	//генерация числа, отвечающего за направление корабля: [0, 1] - по горизонтали, [1, 0] - по вертикали
	function generateDirection() {
		const direction = generateRandomNumber(1) ? [1, 0] : [0, 1];
		return direction;
	}
	//генерация случайного числа от 0 до index
	function generateRandomNumber(index) {
		return Math.floor(Math.random()*(index + 1));
	}
	//генерация начальной координаты field[row][column]
	function generateOriginCoordinate(direction, shipLength, field) {
		let maxColumn = field[0].length - 1,
			maxRow = field.length - 1;
		if (direction[0] === 0) { //по горизонтали
			maxColumn = field[0].length - shipLength;
		} else { //по вертикали
			maxRow = field.length - shipLength;
		}
		const row = generateRandomNumber(maxRow),
			column = generateRandomNumber(maxColumn);
		return [row, column]
	}
	//получение направление расположения корабля и начальной координаты
	function getInitialShipPosition(shipLength, field) {
		const direction = generateDirection(),
			[row, column] = generateOriginCoordinate(direction, shipLength, field);
		return [direction, row, column];
	}
	//установить границы корабля
	function setShipBorder(position, shipLength, field) {
		const [direction, row, column] = position,
			extremePoint = field.length; //10
		function findBorderStartEnd(coordinate, direction) {
			let coordinateEnd;
			const coordinateStart = (coordinate === 0) ? coordinate : coordinate - 1;
			const length = coordinate + direction * shipLength;
			if (direction === 1 && length === extremePoint) {
				coordinateEnd = length; //10
			} else if (direction === 1 && length < extremePoint) {
				coordinateEnd = length + 1;
			} else if (direction === 0 && coordinate === extremePoint - 1) {
				coordinateEnd = coordinate;
			} else coordinateEnd = coordinate + 2;
			return [coordinateStart, coordinateEnd];
		}
		const [rowBorderStart, rowBorderEnd] = findBorderStartEnd(row, direction[0]),
			[columnBorderStart, columnBorderEnd] = findBorderStartEnd(column, direction[1]);

		for (let i = rowBorderStart; i < rowBorderEnd; i++) {
			for (let j = columnBorderStart; j < columnBorderEnd; j++) {
				if (field[i][j] === 0) field[i][j] = '';
			}
		}
	}

}
