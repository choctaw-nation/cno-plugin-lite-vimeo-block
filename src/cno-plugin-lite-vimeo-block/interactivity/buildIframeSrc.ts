import { LiteVimeoContext } from '../../types/lite-vimeo';

export function buildIframeSrc( context: LiteVimeoContext ): string {
	const {
		videoId,
		isUnlisted,
		hash,
		loop,
		enableTracking,
		autoPlay,
		showControls,
		videoStartAt,
	} = context;

	let params = 'hd=1&autohide=1&autoplay=1';
	params += loop ? '&loop=1' : '';
	params += enableTracking ? '' : '&dnt=1';
	params += autoPlay ? '&muted=1' : '';

	let controls = true;
	if ( autoPlay ) {
		controls = false;
		if ( showControls ) {
			controls = true;
		}
	}
	params += false === controls ? '&controls=0' : '';

	const path = `/video/${ videoId }${
		isUnlisted ? `?h=${ hash }&${ params }` : `?${ params }`
	}`;
	const srcUrl = new URL( path, 'https://player.vimeo.com/' );
	if ( videoStartAt ) {
		srcUrl.hash = `t=${ videoStartAt }`;
	}
	return srcUrl.toString();
}
