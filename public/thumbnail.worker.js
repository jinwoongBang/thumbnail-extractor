self.onmessage = async function (event) {
	console.debug(event);
	const { videoSrc, currentTime } = event.data;
	const video = document.createElement('video');
	video.src = videoSrc;

	video.onloadedmetadata = function () {
		video.currentTime = currentTime;
	};

	const offScreenCanvas = new OffscreenCanvas(
		video.videoWidth * scale,
		video.videoHeight * scale,
	);
	const offScreenContext = offScreenCanvas.getContext('2d');
	offScreenContext.drawImage(
		video,
		0,
		0,
		offScreenCanvas.width,
		offScreenCanvas.height,
	);

	thumbnailWorker.postMessage({ videoSrc, currentTime: seconds });

	offScreenCanvas.convertToBlob({ type: 'image/png' }).then((blob) => {
		const imageDataURL = URL.createObjectURL(blob);
		this.file = imageDataURL;
		console.timeEnd('convertToBlob');
		self.postMessage({ message: 'success' });
	});
};
