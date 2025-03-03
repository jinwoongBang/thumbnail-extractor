import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';

import ThumbnailInfo from 'components/thumbnailExtractor/models/ThumbnailInfo';
import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai';

type ThumbnailProps = {
	thumbnail: ThumbnailInfo;
	onRemove: (id: string) => void;
};

const Thumbnail = ({ thumbnail, onRemove }: ThumbnailProps) => {
	const [isMouseEnter, setIsMouseEnter] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [file, setFile] = useState<string | null>(null);

	const bgStyle = useMemo(
		() => ({
			backgroundImage: `url('${file}')`,
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
		}),
		[file],
	);

	useEffect(() => {
		thumbnail
			.getThumbnail({
				scale: thumbnail.options.scale,
				format: 'png',
			})
			.then((thumbnailImage: string) => {
				setFile(thumbnailImage);
				setIsLoading(false);
			});
	}, [thumbnail]);

	const handleRemove = () => {
		onRemove(thumbnail.id);
	};

	const handleMouseEnter = () => {
		setIsMouseEnter(true);
	};

	const handleMouseLeave = () => {
		setIsMouseEnter(false);
	};

	return (
		<span
			style={bgStyle}
			className="relative basis-1/4 aspect-square border border-dashed bg-slate-200"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{isLoading && (
				<div className="absolute w-full h-full flex justify-center items-center">
					<AiOutlineLoading3Quarters className="text-3xl animate-spin" />
				</div>
			)}
			<button
				className={clsx(
					'absolute top-2 right-2 text-white text-xl opacity-1 transition-opacity duration-300',
					!isMouseEnter && 'opacity-0',
				)}
				onClick={handleRemove}
			>
				<AiOutlineClose className="drop-shadow-md" />
			</button>
			{/* <div className="relative aspect-square overflow-hidden">
				<img
					className={clsx(
						'absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-auto h-full object-cover',
					)}
					src={thumbnail.file}
					alt="Video Thumbnail"
				/>
			</div> */}
			<p className="py-1 px-2 absolute bottom-2 right-2 rounded text-white text-xs sm:text-sm bg-black/40">
				{thumbnail.getFormatTimeString()}
			</p>
		</span>
	);
};

export default Thumbnail;
