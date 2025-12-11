import type { BlockAttributes } from '@wordpress/blocks';
import { parseArgs } from '../utils';
import BlockControls from './BlockControls';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit( props ) {
	const {
		videoID,
		enableTracking,
		loop,
		isUnlisted,
		videoTitle,
		videoStartAt,
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
					},
				} ) }
			>
				{ videoID ? (
					<lite-vimeo
						videoid={ videoID }
						loop={ loop }
						customPlaceholder={ customThumbnailURL }
						videoTitle={ videoTitle }
						start={ `${ videoStartAt }s` }
						unlisted={ isUnlisted }
						enableTracking={ enableTracking }
						style={
							! props.isSelected
								? { pointerEvents: 'none' }
								: undefined
						}
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
			</div>
		</>
	);
}
