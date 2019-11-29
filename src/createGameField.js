export default function createGameField() {
	const container = document.getElementById("field");
	for (let i = -1; i < 10; i++) {
		let row = document.createElement('div');
		row.className = `row-${i}`;
		container.append(row);
		for (let j = -1; j < 10; j++) {
			let column = document.createElement('div');
			column.className = `column-${i}-${j}`;
			if (i === -1 || j === -1) column.className = column.className + " no-border";
			if (i === -1 && j > -1) {
				let letter = String.fromCharCode(65 + j),
					spanLetter = document.createElement('span');
				spanLetter.className = 'coordinate';
				spanLetter.innerText = letter;
				column.append(spanLetter);
			} 
			if (i > -1 && j === -1) {
				let number = (i + 1).toString(),
					spanNumber = document.createElement('span');
				spanNumber.className = 'coordinate';
				spanNumber.innerText = number
				column.append(spanNumber);
			} 
			row.append(column);
		}
	}
	return true;
}