var icon = document.getElementsByClassName('icon');
icon = [].slice.call(icon);

var div = document.getElementsByClassName('traveler');
div = [].slice.call(div);

var slider = document.getElementsByClassName('volume');
slider = [].slice.call(slider);

var sliderIndicator = document.getElementsByClassName('volumeIndicator');
sliderIndicator = [].slice.call(sliderIndicator);

icon.forEach((e,i)=>{
	e.addEventListener('click',()=>{
		state[i] = !state[i];
		localStorage.state = state;

		var vCurrent = song[i].volume() || 0;
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
	e.value = volume[i];

	sliderIndicator[i].innerHTML = Math.round(100*e.value)+'%';
	sliderIndicator[i].style.marginLeft = (520*e.value)+'px';
	e.addEventListener('input',()=>{
		volume[i] = e.value;

		sliderIndicator[i].innerHTML = Math.round(100*e.value)+'%';
		sliderIndicator[i].style.marginLeft = (520*e.value)+'px';


		localStorage.volume = volume;
		if(state[i]){song[i].volume(e.value)}

		if(e.value == 0){
			state[i] = false;
			localStorage.state = state;

			song[i].seek(song[0].seek());
			song[i].volume(0);

			div[i].classList.remove('on');
		}else{
			state[i] = true;
			localStorage.state = state;

			song[i].seek(song[0].seek());
			song[i].volume(e.value);

			div[i].classList.add('on');
		}
	})
})

state.forEach((e,i)=>{
	if(e)div[i].classList.add('on');
});

function start(){
	document.getElementById('loader').innerHTML='Click to start';
	document.addEventListener('click',()=>{
		song.forEach((e,i)=>{
			e.play();
			if(state[i])e.fade(0,volume[i],fadeTime);
		})
		document.getElementById('loader').remove();
	},{once:true,capture:true})
}

function wait(){
	if(loadState === 0){
		start();
	}else{
		setTimeout(wait);
	}
}
wait();