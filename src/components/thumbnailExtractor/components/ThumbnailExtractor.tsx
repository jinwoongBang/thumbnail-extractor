import { useRef, useState } from 'react';

import type {
	ThumbnailInfoInterface,
	ThumbnailOptions,
} from 'components/thumbnailExtractor/types';
import VideoUploader from 'components/thumbnailExtractor/components/VideoUploader';
import ThumbnailExtractorBody, {
	ThumbnailExtractorBodyRef,
} from 'components/thumbnailExtractor/components/ThumbnailExtractorBody';

export interface ThumbnailExtractorProps {
	options?: ThumbnailOptions;
	videoBlobURL?: string;
	onConfirm: (thumbnailInfoList: ThumbnailInfoInterface[]) => void;
	onCancel: () => void;
}

/**
 * Props for the ThumbnailExtractor component.
 *
 * @interface ThumbnailExtractorProps
 * @prop {ThumbnailOptions} [options] - Optional settings for the thumbnail extraction process.
 * @prop {string} [videoBlobURL] - Optional URL of the video blob from which thumbnails will be extracted.
 * @prop {(thumbnailInfoList: ThumbnailInfoInterface[]) => void} onConfirm - Callback function to be called when thumbnail extraction is confirmed. Receives a list of thumbnail information objects as an argument.
 * @prop {() => void} onCancel - Callback function to be called when the thumbnail extraction process is cancelled.
 */
const ThumbnailExtractor = ({
	options,
	videoBlobURL,
	onConfirm,
	onCancel,
}: ThumbnailExtractorProps) => {
	const [videoSrc, setVideoSrc] = useState<string | null>(videoBlobURL || null);
	const thumbnailExtractorBodyRef = useRef<ThumbnailExtractorBodyRef>(null);

	const handleUpload = (file: File) => {
		const blobURL = URL.createObjectURL(file);
		setVideoSrc(blobURL);
	};

	const handleClickConfirm = () => {
		const thumbnailList = thumbnailExtractorBodyRef.current?.getThumbnailList();
		onConfirm(thumbnailList || []);
	};

	return (
		<section className="flex flex-col p-5 max-w-[100vw] max-h-[100vh] border border-white rounded-lg bg-white">
			<div className="pb-5 h-30 flex justify-center">
				<h1 className="text-xl">
					<strong>{videoSrc ? '사진 올리기' : '동영상 업로드'}</strong>
				</h1>
			</div>
			<div className="flex flex-col justify-center items-center gap-2 relative px-5 py-5 border-2 border-dashed border-slate-500">
				{videoSrc ? (
					<ThumbnailExtractorBody
						ref={thumbnailExtractorBodyRef}
						videoSrc={videoSrc}
						options={options}
					/>
				) : (
					<VideoUploader onUpload={handleUpload} />
				)}
			</div>
			<div className="flex justify-between gap-4 pt-5 w-full h-15">
				<button className="flex-1 rounded-lg" onClick={onCancel}>
					취소
				</button>
				<button
					className="flex-1 rounded-lg text-sky-700"
					onClick={handleClickConfirm}
				>
					확인
				</button>
			</div>
		</section>
	);
};

export default ThumbnailExtractor;
