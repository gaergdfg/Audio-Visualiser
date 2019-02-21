const freqCount = 1 << 10
let barSize = null

const fft = new p5.FFT(0.85, freqCount)
let song = null

function preload() {
	song = loadSound("[Progressive House] - Eminence & Supermans Feinde - Night Goes On (feat. Q'AILA).mp3")
}

function setup() {
	createCanvas(windowWidth, windowHeight)
	barSize = windowWidth / freqCount
	fft.setInput()
	song.playMode("sustain")
	song.setVolume(0.1)
	song.play()
}

function draw() {
	clear()
	background(87)
	let arr = fft.analyze()
	noStroke()
	for (let i = 0; i < arr.length; i++) {
		fill(255)
		rect(i * barSize, height - map(arr[i], 0, 255, 0, height), (i + 1) * barSize - 1, map(arr[i], 0, 255, 0, height))
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
	windowWidth / freqCount
}

function mousePressed() {
	if (song.isPlaying()) {
		song.pause()
	} else {
		song.play()
	}
}