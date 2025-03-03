import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import 'index.css';
import videoBlobURL from 'stories/assets/ForBiggerBlazes.mp4';

import {
	ThumbnailExtractor,
	ThumbnailInfoInterface,
} from 'components/thumbnailExtractor';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'ThumbnailExtractor/ThumbnailExtractor',
	component: ThumbnailExtractor,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		options: {
			description: `썸네일 추출 옵션
      
	options: {
	  scale : 'Origin' | '1/4' | '1/2' | '3/4'
	  format : 'png' | 'jpg'
	}
      `,
			control: 'object',
		},
		onConfirm: {
			description: `추출된 썸네일 정보 리스트 확인
    
	thumbnailInfo : {
	  // UUID	
	  id: string; 

	  // 추출된 비디오 리소스 경로
	  videoSrc: string;

	  // 추출된 썸네일 리소스 경로
	  thumbnailSrc?: string; 

	  // 썸네일 추출 지점
	  seconds: number; 
	  
	  // 추출된 썸네일 메타데이터 정보
	  options?: ThumbnailOptions; 
	}[]
      `,
		},
	},
	args: {
		onConfirm(thumbnailInfoList) {
			alert(JSON.stringify(thumbnailInfoList));
		},
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	// args: { onConfirm: fn(), onCancel: fn() },
} satisfies Meta<typeof ThumbnailExtractor>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BeforeUploadVideo: Story = {
	args: {
		options: {
			scale: 'Origin',
			format: 'png',
		},
		onConfirm: () => {},
		onCancel: () => {},
	},
};

export const AfterUploadVideo: Story = {
	args: {
		options: {
			scale: '1/2',
			format: 'png',
		},
		videoBlobURL,
		onConfirm: (thumbnailList: ThumbnailInfoInterface[]) => {
			alert(JSON.stringify(thumbnailList));
		},
		onCancel: () => {},
	},
};
