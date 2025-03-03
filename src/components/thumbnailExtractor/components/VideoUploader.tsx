import React from 'react';
import { AiOutlineDownload } from 'react-icons/ai';

interface VideoUploaderProps {
	onUpload: (file: File) => void;
}

const VideoUploader = ({ onUpload }: VideoUploaderProps) => {
	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file && file.type.startsWith('video/')) {
			onUpload(file);
		} else if (file) {
			alert(`동영상 파일만 선택할 수 있습니다.`);
		} else {
			alert(`유효하지 않은 파일입니다.`);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center gap-5 aspect-square">
			<AiOutlineDownload className="w-20 h-20" />
			<p className="">
				<strong>동영상 파일을 선택</strong>하거나 이곳으로 드래그 앤 드롭하세요.
			</p>
			<input
				className="absolute w-full h-full border opacity-0"
				type="file"
				// accept="video/*"
				onChange={handleChangeFile}
			/>
		</div>
	);
};

export default VideoUploader;
