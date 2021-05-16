var icon = document.getElementsByClassName('icon');
icon = [].slice.call(icon);

var div = document.getElementsByClassName('traveler');
div = [].slice.call(div);

var slider = document.getElementsByClassName('volume');
slider = [].slice.call(slider);

var sliderIndicator = document.getElementsByClassName('volumeIndicator');
sliderIndicator = [].slice.call(sliderIndicator);

icon.forEach((e,i)=>{
	if(urlParams.get('gif') !== null){
		e.src = e.src.replace('.jpg', '.gif')
	}

	e.addEventListener('click',()=>{
		if(volume[i]>0){
			state[i] = !state[i];
			localStorage.state = state;
	
			var vCurrent = song[i].volume() || 0;
			var vTarget = volume[i];
	
			if(state[i]){ // starting
				song[i].fade(vCurrent,vTarget,
					fadeTime * (vTarget - vCurrent) / vTarget);
	
				div[i].classList.add('on');
			}else{ // ending
				song[i].fade(vCurrent,0,
					fadeTime * vCurrent / vTarget);
	
				div[i].classList.remove('on');
			}
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

		if(e.value == 0){
			state[i] = false;
			localStorage.state = state;

			song[i].volume(0);

			div[i].classList.remove('on');
			div[i].classList.add('muted');
		}else{
			state[i] = true;
			localStorage.state = state;

			song[i].volume(e.value);

			div[i].classList.add('on');
			div[i].classList.remove('muted');
		}
	})
})

state.forEach((e,i)=>{
	if(e)div[i].classList.add('on');
});

volume.forEach((e,i)=>{
	if(e===0)div[i].classList.add('muted');
});

function start(){
	document.getElementById('loader').innerHTML='Click to start';
	document.addEventListener('click',()=>{
		song.forEach((e,i)=>{
			e.play();
			if(state[i])e.fade(0,volume[i],fadeTime);
		})
		document.getElementById('loader').remove();

		setInterval(()=>{
			song.forEach(e=>{
				if(!e.playing()){
					e.play()
				}
			})

			t = song[0].seek();
			song.forEach(e=>{
				s = e.seek()
				if (s - seekThreshold > t || s + seekThreshold < t){
					e.seek(t);
				}
			})
		},1000)
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