import type { BlockAttributes } from '@wordpress/blocks';
import type { LiteVimeoAttributes } from './types/lite-vimeo';

export function parseArgs( attributes: BlockAttributes ): LiteVimeoAttributes {
	const {
		videoID,
		disableTracking,
		loop,
		isUnlisted,
		videoTitle,
		customThumbnailURL,
		autoPlay,
		videoStartAt,
		playerControls,
	} = attributes;

	return {
		videoID,
		videoStartAt: videoStartAt || 0,
		loop: loop ? true : undefined,
		isUnlisted,
		videoTitle,
		autoPlay,
		customThumbnailURL:
			isUnlisted && customThumbnailURL !== ''
				? customThumbnailURL
				: undefined,
		enableTracking: false === disableTracking ? true : undefined,
		showControls: true === playerControls ? true : undefined,
	};
}
