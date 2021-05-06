const volumeTarget = 0.2;
const volumeSpeed = 0.01;
const fadeSpeed = volumeSpeed/volumeTarget;

var travelers = [
	{
		song: songs[0],
		vid1:document.getElementById('chert-vid1'),
		vid2:document.getElementById('chert-vid2'),
		div:document.getElementById('chert'),
		status:false,
	},{
		song: songs[1],
		vid1:document.getElementById('esker-vid1'),
		vid2:document.getElementById('esker-vid2'),
		div:document.getElementById('esker'),
		status:false,
	},{
		song: songs[2],
		vid1:document.getElementById('riebeck-vid1'),
		vid2:document.getElementById('riebeck-vid2'),
		div:document.getElementById('riebeck'),
		status:false,
	},{
		song: songs[3],
		vid1:document.getElementById('gabbro-vid1'),
		vid2:document.getElementById('gabbro-vid2'),
		div:document.getElementById('gabbro'),
		status:false,
	},{
		song: songs[4],
		vid1:document.getElementById('feldspar-vid1'),
		vid2:document.getElementById('feldspar-vid2'),
		div:document.getElementById('feldspar'),
		status:false,
	},{
		song: songs[5],
		vid1:document.getElementById('solanum-vid1'),
		vid2:document.getElementById('solanum-vid2'),
		div:document.getElementById('solanum'),
		status:false,
	}
];

travelers.forEach(e=>{
	e.vid2.style.opacity = 0;
	e.div.addEventListener('click',()=>{
		e.status = !e.status;
		pos = e.song.seek();
		travelers.forEach(e2=>{
			e2.song.seek(pos);
		})
	})
})

document.addEventListener('click',()=>{
	travelers.forEach(e=>{e.song.play()})

	setInterval(()=>{
		travelers.forEach(e=>{
			var v = e.song.volume();
			var a = parseFloat(e.vid2.style.opacity);
	
			if(e.status && v<volumeTarget)v += volumeSpeed;
			if(!e.status && v>0)v -= volumeSpeed;
	
			if(e.status && a<1)a += fadeSpeed;
			if(!e.status && a>0)a -= fadeSpeed;
	
			if(v<0)v=0;
			if(v>volumeTarget)v=volumeTarget;
	
			if(a<0)a=0;
			if(a>1)a=1;
	
			e.song.volume(v);
			e.vid2.style.opacity = a;
		})
	},100)
},{once:true})