export interface ThumbnailInfoInterface {
	id: string;
	videoSrc: string;
	thumbnailSrc?: string;
	seconds: number;
	options?: ThumbnailOptions;
}

export type ScaleType = '1/4' | '1/2' | '3/4' | 'Origin';
export type ThumbnailFormatType = 'jpeg' | 'png';

export type Scales = {
	[key in ScaleType]: number;
};

export type ThumbnailOptions = {
	scale: ScaleType;
	format: ThumbnailFormatType;
};
