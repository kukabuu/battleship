import createGameField from './createGameField';
import arrangeShips from './arrangeShips';
import getOnFire from './getOnFire';

const button = document.getElementById("start-game"),
	field = document.getElementById("field"),
	statisticsDiv = document.getElementById("statistics"),
	gameStatus = {
		isStarted: false, 
		generatedShips: [], 
		counter : {
			hits: 0, 
			shoots: 0
		}, 
		shipsCount: 20
	},
	onFire = getOnFire(gameStatus);

button.addEventListener("click", onChangeGameStatus);
field.addEventListener("click", onFire);
createGameField();

function onChangeGameStatus(e) {
	e.preventDefault();
	gameStatus.isStarted = !gameStatus.isStarted;

	if (gameStatus.isStarted) {
		const shoots = [...document.getElementsByClassName("dot")],
			sunkenShips = [...document.getElementsByClassName("sunk")];

		arrangeShips(gameStatus);
		
		if (shoots.length) {
			for (let shoot of shoots) {
				shoot.remove();
			}
		}
		if (sunkenShips.length) {
			for (let sunkenShip of sunkenShips) {
				sunkenShip.classList.remove("sunk");
			}
		}
				
		button.innerText = "Finish game";
		statisticsDiv.style.visibility = "hidden";

	} else button.innerText = "Start new game";
}


