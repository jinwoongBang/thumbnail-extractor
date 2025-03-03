import React, {
	forwardRef,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';

import { AiOutlinePlus } from 'react-icons/ai';

import Thumbnail from 'components/thumbnailExtractor/components/Thumbnail';
import ThumbnailInfo from 'components/thumbnailExtractor/models/ThumbnailInfo';
import {
	ThumbnailInfoInterface,
	ThumbnailOptions,
} from 'components/thumbnailExtractor/types';
import clsx from 'clsx';

// import { thumbnailWorker } from '../utils/workers';

interface ThumbnailExtractorBodyProps {
	videoSrc: string;
	// scale?: ScaleType;
	options?: ThumbnailOptions;
}

export interface ThumbnailExtractorBodyRef {
	getThumbnailList: () => ThumbnailInfoInterface[];
}

const ThumbnailExtractorBody = (
	{ videoSrc, options }: ThumbnailExtractorBodyProps,
	ref: React.Ref<ThumbnailExtractorBodyRef>,
) => {
	const videoRef = useRef<HTMLVideoElement>(null);

	const [thumbnailList, setThumbnailList] = useState<ThumbnailInfo[]>([]);
	const [height, setHeight] = useState(0);
	const [isVertical, setIsVertical] = useState(false);

	useImperativeHandle(ref, () => ({
		getThumbnailList: () => thumbnailList,
	}));

	const handleExtractThumbnail = () => {
		const video = videoRef.current;

		if (video) {
			setThumbnailList((state) => [
				...state,
				new ThumbnailInfo({
					seconds: video.currentTime,
					videoSrc,
					options,
				}),
			]);

			video.pause();
		}
	};

	const handleRemoveThumbnail = (id: string) => {
		setThumbnailList((state) =>
			state.filter((thumbnail) => id !== thumbnail.id),
		);
	};

	const handleLoadedData = () => {
		setIsVertical(videoRef.current!.videoWidth < videoRef.current!.videoHeight);
		setHeight(videoRef.current!.getBoundingClientRect().height || 0);
	};

	return (
		<div
			className={clsx(
				'flex gap-2',
				isVertical ? 'flex-row' : 'flex-col max-w-full',
			)}
		>
			<div className="flex">
				<video
					ref={videoRef}
					className={clsx(
						'w-full',
						isVertical ? 'max-h-[70vh]' : 'max-h-[40vh]',
					)}
					src={videoSrc}
					controls
					onLoadedData={handleLoadedData}
				/>
			</div>
			<div
				className={clsx('flex gap-1', isVertical ? `flex-col` : 'w-full')}
				style={{
					width: isVertical ? `${Math.round(height / 4)}px` : '100%',
				}}
			>
				{thumbnailList.map((thumbnail) => (
					<Thumbnail
						key={thumbnail.id}
						thumbnail={thumbnail}
						onRemove={handleRemoveThumbnail}
					/>
				))}
				{thumbnailList.length < 4 && (
					<button
						className="flex justify-center items-center basis-1/4 aspect-square border bg-slate-200 text-2xl"
						onClick={handleExtractThumbnail}
					>
						<AiOutlinePlus />
					</button>
				)}
			</div>
		</div>
	);
};

export default forwardRef<
	ThumbnailExtractorBodyRef,
	ThumbnailExtractorBodyProps
>(ThumbnailExtractorBody);
