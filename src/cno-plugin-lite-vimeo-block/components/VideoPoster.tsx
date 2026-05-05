import { useState, useEffect } from '@wordpress/element';
import { fetchVimeoPoster } from '../interactivity/fetchVimeoPoster';
interface VideoPosterProps {
	customThumbnailURL?: string;
	videoTitle: string;
	useCustomThumbnail: boolean;
	context: {
		isUnlisted: boolean;
		videoId: string;
		posterUrlWebp: string;
		posterUrlJpeg: string;
	};
}
export default function VideoPoster( {
	customThumbnailURL,
	useCustomThumbnail,
	videoTitle,
	context,
}: VideoPosterProps ) {
	return (
		<picture>
			{ useCustomThumbnail && customThumbnailURL && (
				<img
					className="lv-custom-placeholder"
					src={ customThumbnailURL }
					decoding="async"
					loading="lazy"
					alt={ `Play: ${ videoTitle }` }
				/>
			) }
			{ ! useCustomThumbnail && (
				<EditorVideoPoster context={ context } />
			) }
		</picture>
	);
}

function EditorVideoPoster( {
	context,
}: {
	context: VideoPosterProps[ 'context' ];
} ) {
	const [ localContext, setLocalContext ] = useState( context );

	useEffect( () => {
		if ( ! context.posterUrlWebp || ! context.posterUrlJpeg ) {
			fetchVimeoPoster( context ).then( () => {
				setLocalContext( { ...context } );
			} );
		}
	}, [ context ] );
	return (
		<>
			<source type="image/webp" srcSet={ localContext.posterUrlWebp } />
			<source type="image/jpeg" srcSet={ localContext.posterUrlJpeg } />
			<img
				className="lv-fallback-placeholder"
				referrerPolicy="origin"
				width={ 1100 }
				height={ 619 }
				decoding="async"
				loading="lazy"
				src={ localContext.posterUrlJpeg }
				alt=""
			/>
		</>
	);
}
