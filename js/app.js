function $(element) {
	return document.querySelector(element);
}

function updateSetting(key, value) {
	if(image !== null) {
		settings[key] = value;
		renderImage();
	}
}

function resetSetting() {
	settings.brightness = `100`;
	settings.saturation = `100`;
	settings.blur = `0`;
	settings.inversion = `0`;

	brightnessInput.value = settings.brightness;	
	saturationInput.value = settings.saturation;
	blurInput.value = settings.blur;
	inversionInput.value = settings.inversion;
}

function generateFilter() {
	const { brightness, saturation, blur, inversion } = settings;
	return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%)`;
}

function renderImage() {
	canvas.width = image.width;
	canvas.height = image.height;
	ctx.filter = generateFilter();
	ctx.drawImage(image, 0, 0);
}

const canvas = $(`#canvas`);
const ctx = canvas.getContext(`2d`);
const imageFileInput = $(`#imageFileInput`);
const brightnessInput = $(`#brightness`);
const saturationInput = $(`#saturation`);
const blurInput = $(`#blur`);
const inversionInput = $(`#inversion`);
let settings = {};
let image = null;

brightnessInput.addEventListener(`input`, function() {
	updateSetting(`brightness`, this.value);	
});

saturationInput.addEventListener(`input`, function() {
	updateSetting(`saturation`, this.value);
});

blurInput.addEventListener(`input`, function() {
	updateSetting(`blur`, this.value);
});

inversionInput.addEventListener(`input`, function() {
	updateSetting(`inversion`, this.value);
});

imageFileInput.addEventListener(`change`, function() {
	image = new Image();
	image.addEventListener(`load`, function() {
		renderImage();
		resetSetting();
	});
	image.src = URL.createObjectURL(imageFileInput.files[0]);
});

window.addEventListener(`load`, resetSetting());
