export default function showStatistics(counter) {
	const shootsSpan = document.getElementById("shoots-count"),
		hitsSpan = document.getElementById("hits-count");
	document.getElementById("statistics").style.visibility = "visible";
	shootsSpan.innerText = counter.shoots;
	hitsSpan.innerText = counter.hits;
	counter.shoots = 0;
	counter.hits = 0;
}