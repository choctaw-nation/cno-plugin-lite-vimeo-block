import { useState, useEffect } from '@wordpress/element';
import { loadImagePlaceholder } from '../interactivity/loadImagePlaceholder';
interface VideoPosterProps {
	customThumbnailURL?: string;
	videoTitle: string;
	context: {
		videoId: string;
		posterUrlWebp: string;
		posterUrlJpeg: string;
		playAriaLabel: string;
	};
	scope: 'editor' | 'save';
}
export default function VideoPoster( {
	customThumbnailURL,
	videoTitle,
	context,
	scope,
}: VideoPosterProps ) {
	return (
		<picture>
			{ customThumbnailURL && (
				<img
					className="lv-custom-placeholder"
					src={ customThumbnailURL }
					decoding="async"
					loading="lazy"
					alt={ `Play: ${ videoTitle }` }
				/>
			) }
			{ ! customThumbnailURL &&
				( scope === 'editor' ? (
					<EditorVideoPoster context={ context } />
				) : (
					<InteractivityVideoPoster />
				) ) }
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
			loadImagePlaceholder( context ).then( () => {
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
				aria-label={ localContext.playAriaLabel }
				alt={ localContext.playAriaLabel }
			/>
		</>
	);
}
function InteractivityVideoPoster() {
	/* eslint-disable jsx-a11y/alt-text -- IGNORE: alt is being set via data binding in the save context. */
	return (
		<>
			<source
				type="image/webp"
				data-wp-bind--srcset="context.posterUrlWebp"
			/>
			<source
				type="image/jpeg"
				data-wp-bind--srcset="context.posterUrlJpeg"
			/>
			<img
				className="lv-fallback-placeholder"
				referrerPolicy="origin"
				width={ 1100 }
				height={ 619 }
				decoding="async"
				loading="lazy"
				data-wp-bind--src="context.posterUrlJpeg"
				data-wp-bind--aria-label="context.playAriaLabel"
				data-wp-bind--alt="context.playAriaLabel"
			/>
		</>
	);
}
