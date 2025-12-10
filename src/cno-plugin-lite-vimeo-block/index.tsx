import {
	type BlockAttributes,
	type BlockConfiguration,
	registerBlockType,
} from '@wordpress/blocks';
import { video } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import './lite-vimeo/index';

/**
 * Internal dependencies
 */
import block from './block.json';
import { parseArgs } from '../utils';
import Edit from './Edit';

registerBlockType( block.name, {
	icon: video,
	edit: Edit,
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
			showControls,
		} = parseArgs( attributes );
		return ! videoID ? null : (
			<div
				{ ...useBlockProps.save( {
					style: { aspectRatio: '16 / 9', width: '100%' },
				} ) }
			>
				<lite-vimeo
					videoid={ videoID }
					loop={ loop }
					customPlaceholder={ customThumbnailURL }
					start={ `${ videoStartAt }s` }
					videoTitle={ videoTitle }
					unlisted={ isUnlisted }
					enableTracking={ enableTracking ? 'true' : undefined }
					autoload={ true === autoPlay ? 'true' : undefined }
					autoplay={ true === autoPlay ? 'true' : undefined }
					showControls={ showControls ? 'true' : undefined }
				/>
			</div>
		);
	},
} as unknown as BlockConfiguration );
