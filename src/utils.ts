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

	// For unlisted videos the videoID is "numericId/hash"; split them apart.
	let cleanVideoId = videoID as string;
	let videoHash = '';
	if (
		isUnlisted &&
		typeof videoID === 'string' &&
		videoID.includes( '/' )
	) {
		[ cleanVideoId, videoHash ] = videoID.split( '/' );
	}

	return {
		videoID: cleanVideoId,
		videoHash,
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
