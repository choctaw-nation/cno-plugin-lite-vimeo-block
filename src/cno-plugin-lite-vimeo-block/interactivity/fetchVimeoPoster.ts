import { LiteVimeoContext } from '../../types/lite-vimeo';

export async function fetchVimeoPoster( context: LiteVimeoContext ) {
	try {
		const apiUrl = `https://vimeo.com/api/v2/video/${ context.videoId }.json`;
		const apiResponse = ( await ( await fetch( apiUrl ) ).json() )[ 0 ];
		const tnLarge = apiResponse.thumbnail_large as string;
		const imgId = tnLarge
			.slice( tnLarge.lastIndexOf( '/' ) + 1 )
			.split( '_' )[ 0 ];

		context.posterUrlWebp = `https://i.vimeocdn.com/video/${ imgId }.webp?mw=1100&mh=619&q=70`;
		context.posterUrlJpeg = `https://i.vimeocdn.com/video/${ imgId }.jpg?mw=1100&mh=619&q=70`;
	} catch ( err ) {
		// eslint-disable-next-line no-console
		console.error( 'Lite Vimeo: Failed to load thumbnail', err );
	}
}
