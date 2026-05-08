import type { LiteVimeoBlockAttributes } from './types/lite-vimeo';

export function parseArgs( attributes: LiteVimeoBlockAttributes ) {
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
	let videoHash: string | undefined;
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
		videoStartAt,
		loop: loop ? true : undefined,
		isUnlisted,
		videoTitle,
		autoPlay,
		customThumbnailURL,
		enableTracking: false === disableTracking ? true : undefined,
		showControls: true === playerControls ? true : undefined,
	};
}

export function parseVideoId( videoID: string ) {
	let cleanVideoId = videoID as string;
	let videoHash: string | undefined;
	if ( videoID.includes( '/' ) ) {
		[ cleanVideoId, videoHash ] = videoID.split( '/' );
	}
	return { videoId: cleanVideoId, hash: videoHash };
}
