const fadeTime = 1000;

var state = localStorage.state || 'false,false,false,false,false,false';
state = state.split(',');
state = state.map(v=>v==='true');

var volume = localStorage.volume || '0.5,0.5,0.5,0.5,0.5,0.5';
volume = volume.split(',');
volume = volume.map(parseFloat);

var loadState = 6;

var song = [
	new Howl({
		src:['resources/chert.ogg','resources/chert.wav'],
		loop: true,
		volume: 0,
		onload: ()=>{loadState -= 1;},
		onloaderror:err=>{
			document.getElementById('loader').innerHTML = 
			`ERROR<p>chert: ${err}</p>`
		}
	}),
	new Howl({
		src:['resources/esker.ogg','resources/esker.wav'],
		loop: true,
		volume: 0,
		onload: ()=>{loadState -= 1;},
		onloaderror:err=>{
			document.getElementById('loader').innerHTML = 
			`ERROR<p>esker: ${err}</p>`
		}
	}),
	new Howl({
		src:['resources/riebeck.ogg','resources/riebeck.wav'],
		loop: true,
		volume: 0,
		onload: ()=>{loadState -= 1;},
		onloaderror:err=>{
			document.getElementById('loader').innerHTML = 
			`ERROR<p>riebeck: ${err}</p>`
		}
	}),
	new Howl({
		src:['resources/gabbro.ogg','resources/gabbro.wav'],
		loop: true,
		volume: 0,
		onload: ()=>{loadState -= 1;},
		onloaderror:err=>{
			document.getElementById('loader').innerHTML = 
			`ERROR<p>gabbro: ${err}</p>`
		}
	}),
	new Howl({
		src:['resources/feldspar.ogg','resources/feldspar.wav'],
		loop: true,
		volume: 0,
		onload: ()=>{loadState -= 1;},
		onloaderror:err=>{
			document.getElementById('loader').innerHTML = 
			`ERROR<p>feldspar: ${err}</p>`
		}
	}),
	new Howl({
		src:['resources/solanum.ogg','resources/solanum.wav'],
		loop: true,
		volume: 0,
		onload: ()=>{loadState -= 1;},
		onloaderror:err=>{
			document.getElementById('loader').innerHTML = 
			`ERROR<p>solanum: ${err}</p>`
		}
	})
];
