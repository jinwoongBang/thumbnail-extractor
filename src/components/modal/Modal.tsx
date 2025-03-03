// src/Modal.tsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	useEffect(() => {
		const keyDownEscapeKey = (e: KeyboardEvent) =>
			e.key === 'Escape' ? onClose() : null;

		document.body.addEventListener('keydown', keyDownEscapeKey);
		return () => {
			document.body.removeEventListener('keydown', keyDownEscapeKey);
		};
	}, [onClose]);

	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div
			className="fixed inset-0 bg-black/50 flex justify-center items-center"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg relative"
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>,
		document.getElementById('modal-root') as HTMLElement,
	);
};

export default Modal;
