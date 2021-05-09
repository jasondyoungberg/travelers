var video = document.getElementsByClassName('video');
video = [].slice.call(video);

var div = document.getElementsByClassName('traveler');
div = [].slice.call(div);

var slider = document.getElementsByClassName('volume');
slider = [].slice.call(slider);

video.forEach((e,i)=>{
	e.addEventListener('click',()=>{
		state[i] = !state[i];
		localStorage.state = state;

		var vCurrent = song[i].volume();
		var vTarget = volume[i];
		song[i].seek(song[0].seek());

		if(state[i]){ // starting
			song[i].fade(vCurrent,vTarget,
				fadeTime * (vTarget - vCurrent) / vTarget);

			div[i].classList.add('on');
		}else{ // ending
			song[i].fade(vCurrent,0,
				fadeTime * vCurrent / vTarget);

			div[i].classList.remove('on');
		}
	});
});

slider.forEach((e,i)=>{
	e.value = volume[i]
	e.addEventListener('input',()=>{
		volume[i] = e.value;
		localStorage.volume = volume;
		if(state[i]){song[i].volume(e.value)}
	})
})

state.forEach((e,i)=>{
	if(e)div[i].classList.add('on');
});

function start(){
	try{
		song.forEach((e,i)=>{
			e.play();
			if(state[i])e.fade(0,volume[i],fadeTime);
		})
		document.getElementById('loader').remove();
	}catch(err){
		console.error(err)
		document.getElementById('loader').innerHTML='Click to start';
		document.addEventListener('click',()=>{
			song.forEach((e,i)=>{
				e.play();
				if(state[i])e.fade(0,volume[i],fadeTime);
			})
			document.getElementById('loader').remove();
		},{once:true,capture:true})
	}
}

function wait(){
	if(loadState === 0){
		start();
	}else{
		setTimeout(wait);
	}
}
wait();