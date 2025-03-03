import { useState } from 'react';

import {
	ThumbnailExtractor,
	ThumbnailInfoInterface,
} from 'components/thumbnailExtractor';
import Modal from 'components/modal/Modal';

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const [thumbnailList, setThumbnailList] = useState<ThumbnailInfoInterface[]>(
		[],
	);

	const handleClickConfirm = (thumbnailList: ThumbnailInfoInterface[]) => {
		setThumbnailList((state) => [...state, ...thumbnailList]);
		closeModal();
	};

	return (
		<main className="flex justify-center items-center p-5 w-svw min-h-[100vh] min-w-60 bg-slate-800">
			<section className="flex flex-col py-5 w-full h-full border border-white rounded-lg bg-white divide-y">
				<div className="flex px-5 pb-5 h-30">
					<h1>
						<strong>포스트 쓰기</strong>
					</h1>
				</div>
				<div className="flex flex-col flex-grow gap-5 justify-center items-center px-5 min-h-[10vh]">
					{thumbnailList.map((thumbnail) => (
						<span key={thumbnail.id}>
							<img src={thumbnail.thumbnailSrc} alt="Video Thumbnail" />
						</span>
					))}
				</div>
				<div className="flex justify-between px-5 pt-5">
					<div className="flex gap-2">
						<button className="py-1 px-4 border rounded-lg bg-slate-800 text-white">
							사진
						</button>
						<button
							className="py-1 px-4 border rounded-lg bg-slate-800 text-white"
							onClick={openModal}
						>
							영상
						</button>
					</div>
					<div>
						<button className="py-1 px-4 border rounded-lg bg-slate-800 text-white">
							등록
						</button>
					</div>
				</div>
			</section>

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<ThumbnailExtractor
					options={{
						scale: 'Origin',
						format: 'png',
					}}
					onConfirm={handleClickConfirm}
					onCancel={closeModal}
				/>
			</Modal>
		</main>
	);
}

export default App;
