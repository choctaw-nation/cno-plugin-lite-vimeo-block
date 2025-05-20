import React from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { video } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import './script.js';

/**
 * Internal dependencies
 */
import block from './block.json';
import { BlockAttributes, LiteVimeoAttributes } from '../types/lite-vimeo.js';
import BlockControls from './BlockControls';

registerBlockType( block.name, {
	icon: video,
	edit: ( { attributes, setAttributes } ) => {
		const {
			videoID,
			enableTracking,
			autoload,
			autoplay,
			loop,
			isUnlisted,
		} = parseArgs( attributes );
		return (
			<>
				<BlockControls
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
				<div { ...useBlockProps() }>
					<lite-vimeo
						videoid={ videoID }
						autoload={ autoload }
						autoplay={ autoplay }
						loop={ loop }
						isUnlisted={ isUnlisted }
						enableTracking={ enableTracking }
					/>
				</div>
			</>
		);
	},
	save: ( { attributes }: { attributes: BlockAttributes } ) => {
		const {
			videoID,
			enableTracking,
			autoload,
			autoplay,
			loop,
			isUnlisted,
		} = parseArgs( attributes );
		return (
			<div { ...useBlockProps.save() }>
				<lite-vimeo
					videoid={ videoID }
					autoload={ autoload }
					autoplay={ autoplay }
					loop={ loop }
					isUnlisted={ isUnlisted }
					enableTracking={ enableTracking }
				/>
			</div>
		);
	},
} );

function parseArgs( attributes: BlockAttributes ): LiteVimeoAttributes {
	const {
		videoID,
		enableTracking,
		autoload,
		autoplay,
		loop,
		isUnlisted,
		videoTitle,
		customThumbnailURL,
	} = attributes;
	return {
		videoID,
		autoload,
		autoplay: autoload && autoplay ? true : undefined,
		loop: loop ? true : undefined,
		isUnlisted,
		videoTitle,
		customThumbnailURL:
			isUnlisted && customThumbnailURL !== ''
				? customThumbnailURL
				: undefined,
		enableTracking,
	};
}
