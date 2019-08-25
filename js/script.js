class Snake {
	constructor() {
		this.dir = 0;
		this.ndir = [];
		this.dead = false;
		this.segments = [
			[4, 8], 
			[3, 8], 
			[2, 8]
		];
		this.archive = [
			[4, 8], 
			[3, 8], 
			[2, 8]
		];
	}
	
	show() {
		for (let g of this.segments) {
			fill(255);
			rect(g[0] * 25, g[1] * 25, 25, 25);
		}
	}
	
	move() {
		if (!this.dead) {
			if (this.ndir.length > 0) {
				this.dir = this.ndir[this.ndir.length - 1];
				this.ndir.pop();
			}
			for (let i = 0; i < this.segments.length; i++) {
				this.archive[i] = [this.segments[i][0], this.segments[i][1]];
			}
			switch(this.dir) {
				case 0:
					this.segments[0][0]++;
					break;
				case 1:
					this.segments[0][1]++;
					break;
				case 2:
					this.segments[0][0]--;
					break;
				case 3:
					this.segments[0][1]--;
			}
			if (this.segments[0][0] == apple[0] && this.segments[0][1] == apple[1]) {
				this.eat();
			}
			for (let i = 1; i < this.segments.length; i++) {
				if (this.segments[0][0] == this.segments[i][0] && this.segments[0][1] == this.segments[i][1]) {
					this.die();
				}
			}
			
			if (this.segments[0][0] == -1 || this.segments[0][0] == 16 || this.segments[0][1] == -1 || this.segments[0][1] == 16) {
				this.die();
			} else {
				for (let i = 1; i < this.segments.length; i++) {
					this.segments[i][0] = this.archive[i - 1][0];
					this.segments[i][1] = this.archive[i - 1][1];
				}
			}
		}
	}
	
	eat() {
		this.segments.push(this.archive[this.archive.length - 1]);
		apple = [Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)];
	}
	
	die() {
		this.dead = true;
		console.log('GAME OVER');
		setTimeout(function() {
			init();
			delete this;
		}, 1000);
	}
}

let s, apple, score, record;

function setup() {
	createCanvas(400, 400);
	init();
	record = 0;
	ld();
}

function init() {
	s = new Snake();
	apple = [8, 8];
	score = 0;
}

function draw() {
	frameRate(score + 3);
	background(0);
	stroke(255);
	noFill();
	for (let i = 0; i < 16; i++) {
		for (let j = 0; j < 16; j++) {
			rect(i * 25, j * 25, 25, 25);
		}
	}
	fill(255, 0, 0);
	rect(apple[0] * 25, apple [1] * 25, 25, 25);

	s.show();
	s.move();
	
	score = s.segments.length - 3;
	if (score > record) {
		record = score;
		sv();
	}
	document.getElementById('score').innerHTML = `Score: ${score}`;
	document.getElementById('record').innerHTML = `Record: ${record}`;
}

function keyPressed() {
	switch(keyCode) {
		case 37:
			if (s.dir != 0) {
				s.ndir.push(2);
			}
			break;
		case 38:
			if (s.dir != 1) {
				s.ndir.push(3);
			}
			break;
		case 39:
			if (s.dir != 2) {
				s.ndir.push(0);
			}
			break;
		case 40:
			if (s.dir != 3) {
				s.ndir.push(1);
			}
			break;
	}
}

function sv() {
	localStorage.setItem('sv', JSON.stringify({record: record}));
}

function ld() {
	if (JSON.parse(localStorage.getItem('sv'))) {
		let sg = JSON.parse(localStorage.getItem('sv'));
		console.log(sg);
		if (sg.record != undefined) {
			record = sg.record;
		}
		return true;
	} else {
		return false;
	}
}