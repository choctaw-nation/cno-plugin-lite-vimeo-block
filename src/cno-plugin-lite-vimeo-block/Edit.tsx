import type { BlockAttributes } from '@wordpress/blocks';
import { parseArgs } from '../utils';
import BlockControls from './BlockControls';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit( props ) {
	const {
		videoID,
		videoTitle,
		customThumbnailURL,
	} = parseArgs( props.attributes as BlockAttributes );

	return (
		<>
			<BlockControls { ...props } />
			<div
				{ ...useBlockProps( {
					style: {
						aspectRatio: '16 / 9',
						width: '100%',
						position: 'relative',
					},
				} ) }
			>
				{ videoID ? (
					<iframe
						title={ videoTitle }
						src={ `https://player.vimeo.com/video/${ videoID }?autoplay=0&dnt=1` }
						style={ {
							position: 'absolute',
							width: '100%',
							height: '100%',
							border: 'none',
							pointerEvents: ! props.isSelected
								? 'none'
								: undefined,
						} }
						allowFullScreen
					/>
				) : (
					<div
						style={ {
							aspectRatio: '16/9',
							border: '2px solid red',
							backgroundColor: 'rgba( 255, 0, 0, 0.5 )',
							alignContent: 'center',
						} }
					>
						<p style={ { textAlign: 'center', fontSize: 40 } }>
							CNO Lite Vimeo Block
						</p>
						<p style={ { textAlign: 'center', fontSize: 20 } }>
							Video ID is required.
						</p>
					</div>
				) }
				{ videoID && customThumbnailURL && (
					<img
						src={ customThumbnailURL }
						alt=""
						style={ {
							position: 'absolute',
							inset: 0,
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							pointerEvents: 'none',
						} }
					/>
				) }
			</div>
		</>
	);
}
