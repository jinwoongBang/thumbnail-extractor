import uuid from 'react-uuid';

import type {
	ThumbnailInfoInterface,
	ThumbnailOptions,
} from 'components/thumbnailExtractor/types';

import { SCALES } from 'components/thumbnailExtractor/constants';
// import { thumbnailWorker } from '../utils/workers';

const TEMP_VIDEO_ELEMENT = document.createElement('video');

class ThumbnailInfo implements ThumbnailInfoInterface {
	id: string;
	videoSrc: string;
	thumbnailSrc?: string;
	seconds: number;
	options: ThumbnailOptions = {
		scale: 'Origin',
		format: 'png',
	};

	constructor(props: Omit<ThumbnailInfoInterface, 'id'>) {
		this.id = uuid();
		this.seconds = props.seconds;
		this.videoSrc = props.videoSrc;
		this.options.scale = props.options?.scale || 'Origin';
		this.options.format = props.options?.format || 'png';
	}

	getFormatTimeString() {
		const hours = Math.floor(this.seconds / 3600);
		const minutes = Math.floor((this.seconds % 3600) / 60);
		const remainingSeconds = Math.round(this.seconds % 60);

		const formattedMinutes = String(minutes).padStart(2, '0');
		const formattedSeconds = String(remainingSeconds).padStart(2, '0');

		if (hours > 0) {
			const formattedHours = String(hours).padStart(2, '0');
			return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
		} else {
			return `${formattedMinutes}:${formattedSeconds}`;
		}
	}

	getThumbnail(options: ThumbnailOptions) {
		const { videoSrc, seconds } = this;
		TEMP_VIDEO_ELEMENT.src = videoSrc;
		TEMP_VIDEO_ELEMENT.load();

		TEMP_VIDEO_ELEMENT.onloadedmetadata = function () {
			TEMP_VIDEO_ELEMENT.currentTime = seconds;
		};

		const scale = options.scale ? SCALES[options.scale] : 1;
		console.debug({ scale, format: options.format });

		return new Promise<string>((resolve, reject) => {
			try {
				TEMP_VIDEO_ELEMENT.onseeked = async () => {
					const offScreenCanvas = new OffscreenCanvas(
						TEMP_VIDEO_ELEMENT.videoWidth * scale,
						TEMP_VIDEO_ELEMENT.videoHeight * scale,
					);
					const offScreenContext = offScreenCanvas.getContext('2d');
					offScreenContext!.drawImage(
						TEMP_VIDEO_ELEMENT,
						0,
						0,
						offScreenCanvas.width,
						offScreenCanvas.height,
					);

					const blob = await offScreenCanvas.convertToBlob({
						type: `image/${options.format}`,
					});

					console.time(`${this.id}::createObjectURL()`);
					const imageDataURL = URL.createObjectURL(blob);
					console.timeEnd(`${this.id}::createObjectURL()`);

					this.thumbnailSrc = imageDataURL;

					resolve(imageDataURL);
				};
			} catch (error) {
				reject(error);
			}
		});
	}
}

export default ThumbnailInfo;
