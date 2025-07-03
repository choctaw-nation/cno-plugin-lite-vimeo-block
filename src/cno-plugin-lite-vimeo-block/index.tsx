import { registerBlockType } from '@wordpress/blocks';
import { video } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import './lite-vimeo/index';

/**
 * Internal dependencies
 */
import block from './block.json';
import { BlockAttributes, LiteVimeoAttributes } from '../types/lite-vimeo';
import BlockControls from './BlockControls';

registerBlockType( block.name, {
	icon: video,
	edit: ( props ) => {
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
				<div { ...useBlockProps() }>
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
	},
	save: ( { attributes }: { attributes: BlockAttributes } ) => {
		const {
			videoID,
			enableTracking,
			loop,
			isUnlisted,
			autoPlay,
			videoStartAt,
			videoTitle,
			customThumbnailURL,
		} = parseArgs( attributes );

		return ! videoID ? null : (
			<div { ...useBlockProps.save() }>
				<lite-vimeo
					videoid={ videoID }
					loop={ loop }
					customPlaceholder={ customThumbnailURL }
					start={ `${ videoStartAt }s` }
					videoTitle={ videoTitle }
					unlisted={ isUnlisted }
					enableTracking={ enableTracking }
					autoload={ true === autoPlay ? 'true' : undefined }
					autoplay={ true === autoPlay ? 'true' : undefined }
				/>
			</div>
		);
	},
} );

function parseArgs( attributes: BlockAttributes ): LiteVimeoAttributes {
	const {
		videoID,
		disableTracking,
		loop,
		isUnlisted,
		videoTitle,
		customThumbnailURL,
		autoPlay,
		videoStartAt,
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
		enableTracking: ! disableTracking,
	};
}
