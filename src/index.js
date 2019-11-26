import createGameField from './createGameField';
import generateFieldWithShips from './generateFieldWithShips';
import initializeGame from './initializeGame';

const button = document.getElementById("start-game"),
	field = document.getElementById("field"),
	statisticsDiv = document.getElementById("statistics"),
	isButtonClick = {isStarted: false},
	generatedShips = [],
	shipsDictionary = [],
	onFire = initializeGame(generatedShips, isButtonClick, shipsDictionary);
	
function onClickStartButton(e) {
	e.preventDefault();
	isButtonClick.isStarted = !isButtonClick.isStarted;
	if (isButtonClick.isStarted) {
		button.innerText = "Finish game";
		generateFieldWithShips(generatedShips, shipsDictionary);
		console.log(generatedShips);
		console.log(shipsDictionary);
		const shoots = [...document.getElementsByClassName("dot")];
		if (shoots.length) {
			for (let shoot of shoots) {
				shoot.remove();
			}
		}
		statisticsDiv.style.visibility = "hidden";
	} else button.innerText = "Start new game";
}

button.addEventListener("click", onClickStartButton);
field.addEventListener("click", onFire);
createGameField();

//переменные, которые использую один раз, назначить в index