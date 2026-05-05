import {
	LiteVimeoContext,
	UnlistedLiteVimeoContext,
} from '../../types/lite-vimeo';

export function buildIframeSrc(
	context: LiteVimeoContext & UnlistedLiteVimeoContext
): string {
	const {
		loop,
		enableTracking,
		autoPlay,
		showControls,
		videoStartAt,
		videoId,
		hash,
	} = context;

	const params = new URLSearchParams( {
		hd: '1',
		autohide: '1',
		autoplay: '1',
		controls: '1',
	} );
	if ( hash ) {
		params.set( 'h', hash );
	}
	if ( loop ) {
		params.set( 'loop', '1' );
		params.set( 'muted', '1' );
	}
	if ( ! enableTracking ) {
		params.set( 'dnt', '1' );
	}
	if ( autoPlay ) {
		params.set( 'muted', '1' );
		params.set( 'controls', showControls ? '1' : '0' );
	}

	const path = `/video/${ videoId }?${ params.toString() }`;
	const srcUrl = new URL( path, 'https://player.vimeo.com/' );
	if ( videoStartAt ) {
		srcUrl.hash = `t=${ videoStartAt }`;
	}
	return srcUrl.toString();
}
