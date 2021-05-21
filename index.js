var icon = document.getElementsByClassName('icon');
icon = [].slice.call(icon);

var div = document.getElementsByClassName('traveler');
div = [].slice.call(div);

var slider = document.getElementsByClassName('volume');
slider = [].slice.call(slider);

var sliderIndicator = document.getElementsByClassName('volumeIndicator');
sliderIndicator = [].slice.call(sliderIndicator);

var playing = false;

icon.forEach((e,i)=>{
	e.addEventListener('click',()=>{
		if(volume[i]>0){
			state[i] = !state[i];
			localStorage.state = state;
	
			if(state[i]){ // starting
				div[i].classList.add('on');
			}else{ // ending
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
		playing = true;
		song.forEach(e=>e.play());
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

		setInterval(()=>{
			song.forEach((e,i)=>{
				var v = e.volume();
				var t = state[i]?volume[i]:0;
				e.volume(v+fadeSpeed*(t-v))
			});
		},100);
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