
//размещение кораблей на поле
export default function arrangeShips(gameStatus) {
	const field = createEmptyMatrix(10),
		shipTypes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

	for (let shipType of shipTypes) {
		let checkedPosition = false,
			position = [];
		while (!checkedPosition) {
			position = setShipPosition(shipType, field);
			checkedPosition = checkShipPosition(position, shipType, field);
		}
		setShipToField(position, shipType, field);
	}

	gameStatus.generatedShips.splice(0, gameStatus.generatedShips.length, ...field);
}
//создание пустого поля размером size x size
function createEmptyMatrix(size) {
	const field = [];

	for (let i = 0; i < size; i++) {
		field[i] = [];
		for (let j = 0; j < size; j++) {
			field[i][j] = 0;
		}
	}

	return field;
}
//установить направление расположения корабля и начальной координаты
function setShipPosition(shipLength, field) {
	const direction = generateDirection(),
		[row, column] = generateOriginCoordinate(direction, shipLength, field);

	return [direction, row, column];
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
//установка корабля на поле
function setShipToField(position, shipLength, field) {
	const [direction, row, column] = position;
	
	for (let i = 0; i < shipLength; i++) {
		if (direction[0] === 0) field[row][column + i] = shipLength;
		else field[row + i][column] = shipLength;
	}

	setShipBorder(position, shipLength, field);
}
//генерация числа, отвечающего за направление корабля: [0, 1] - по горизонтали, [1, 0] - по вертикали
function generateDirection() {
	const direction = generateRandomNumber(1) ? [1, 0] : [0, 1];
	return direction;
}
//генерация начальной координаты field[row][column] для размещения корабля
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
//установить границы корабля
function setShipBorder(position, shipLength, field) {
	const [direction, row, column] = position,
		extremePoint = field.length, //10
		[rowBorderBeginning, rowBorderEnd] = findBorderBeginningEnd(row, direction[0]),
		[columnBorderBeginning, columnBorderEnd] = findBorderBeginningEnd(column, direction[1]);

	for (let i = rowBorderBeginning; i < rowBorderEnd; i++) {
		for (let j = columnBorderBeginning; j < columnBorderEnd; j++) {
			if (field[i][j] === 0) field[i][j] = '';
		}
	}

	function findBorderBeginningEnd(coordinate, direction) {
		let coordinateEnd;
		const coordinateStart = (coordinate === 0) ? coordinate : coordinate - 1,
			length = coordinate + direction * shipLength;
		if (direction === 1 && length === extremePoint) {
			coordinateEnd = length; //10
		} else if (direction === 1 && length < extremePoint) {
			coordinateEnd = length + 1;
		} else if (direction === 0 && coordinate === extremePoint - 1) {
			coordinateEnd = extremePoint;
		} else coordinateEnd = coordinate + 2;
		return [coordinateStart, coordinateEnd];
	}

}
//генерация случайного числа от 0 до index
function generateRandomNumber(index) {
	return Math.floor(Math.random()*(index + 1));
}