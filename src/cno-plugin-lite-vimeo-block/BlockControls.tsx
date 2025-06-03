import { InspectorControls } from '@wordpress/block-editor';
import { BlockAttributes } from '../types/lite-vimeo';
import {
	PanelBody,
	PanelRow,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

/**
 * Inspector Controls for the Swiper block.
 */
export default function BlockControls( {
	attributes,
	setAttributes,
}: {
	attributes: BlockAttributes;
	setAttributes: ( {} ) => void;
} ) {
	const {
		autoplay,
		videoID,
		isUnlisted,
		autoload,
		enableTracking,
		loop,
		customThumbnailURL,
	} = attributes;
	return (
		<InspectorControls>
			<PanelBody title="Lite Vimeo Settings">
				<PanelRow>
					<TextControl
						label="Video ID"
						value={ videoID }
						__nextHasNoMarginBottom
						onChange={ ( value ) =>
							setAttributes( { videoID: value } )
						}
						autoComplete="off"
						help="The ID of the Vimeo video to embed. If unlisted, the pattern should be “###/###”"
						required={ true }
					/>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label="Unlisted"
						checked={ isUnlisted }
						__nextHasNoMarginBottom
						onChange={ ( value ) =>
							setAttributes( { isUnlisted: value } )
						}
						help="If the video is unlisted, toggle this option to enable extra parameters to help the video facade look correct."
					/>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label="Autoload"
						checked={ autoload }
						__nextHasNoMarginBottom
						onChange={ ( value ) =>
							setAttributes( { autoload: value } )
						}
						help="Waits to load the video until it is scrolled into view. Can help with performance, and also can cause bugs. Use with caution."
					/>
				</PanelRow>
				{ autoplay && (
					<PanelRow>
						<ToggleControl
							label="Autoplay"
							checked={ autoplay }
							__nextHasNoMarginBottom
							onChange={ ( value ) =>
								setAttributes( { autoplay: value } )
							}
							help="Whether to autoplay the video."
						/>
					</PanelRow>
				) }

				<PanelRow>
					<ToggleControl
						label="Enable Tracking"
						checked={ enableTracking }
						__nextHasNoMarginBottom
						onChange={ ( value ) =>
							setAttributes( { enableTracking: value } )
						}
						help="Whether to enable tracking."
					/>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label="Loop"
						checked={ loop }
						__nextHasNoMarginBottom
						onChange={ ( value ) =>
							setAttributes( { loop: value } )
						}
						help="Whether to loop the video."
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);
}
