import { InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import {
	Button,
	Flex,
	FlexBlock,
	Panel,
	PanelBody,
	PanelRow,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';
import type { BlockAttributes, BlockEditProps } from '@wordpress/blocks';

/**
 * Inspector Controls for the Swiper block.
 */
export default function BlockControls( {
	attributes,
	setAttributes,
}: BlockEditProps< BlockAttributes > ) {
	const {
		videoTitle,
		videoStartAt,
		videoID,
		isUnlisted,
		disableTracking,
		loop,
		customThumbnailURL,
		autoPlay,
		playerControls,
	} = attributes;
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Lite Vimeo Settings" initialOpen={ true }>
					<PanelRow>
						<TextControl
							label="Video ID"
							value={ videoID }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							onChange={ ( value ) => {
								setAttributes( {
									videoID: value,
									isUnlisted: value.includes( '/' ),
								} );
							} }
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
								setAttributes( {
									isUnlisted: value,
								} )
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Disable Tracking"
							checked={ disableTracking }
							__nextHasNoMarginBottom
							onChange={ ( value ) =>
								setAttributes( { disableTracking: value } )
							}
							help="Whether to disable tracking."
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
							help={ loop && 'Looped videos are muted.' }
						/>
					</PanelRow>
				</PanelBody>
			</Panel>
			{ isUnlisted && (
				<Panel>
					<PanelBody title="Custom Thumbnail Settings">
						{ customThumbnailURL && (
							<>
								<img src={ customThumbnailURL } alt="" />
								<Button
									__next40pxDefaultSize
									text="Clear Thumbnail"
									variant="secondary"
									isDestructive={ true }
									size="compact"
									onClick={ () =>
										setAttributes( {
											customThumbnailURL: undefined,
										} )
									}
								/>
							</>
						) }

						<MediaPlaceholder
							onSelect={ ( media ) => {
								let url = null;
								if ( isBlobURL( media.url ) ) {
									url = media.url;
								} else {
									url = media.sizes
										? media.sizes[
											'profile-swiper-video-thumbnail'
										].url
										: media.media_details.sizes[
											'profile-swiper-video-thumbnail'
										].source_url;
								}
								setAttributes( {
									customThumbnailURL: url,
								} );
							} }
							disableMediaButtons={ customThumbnailURL }
							allowedTypes={ [ 'image' ] }
							accept="image/*"
							multiple={ false }
							onError={
								( error ) =>
									// eslint-disable-next-line no-console
									console.error(
										'Media Placeholder Error:',
										error
									)
							}
							labels={ {
								title: 'Custom Thumbnail',
							} }
						/>
					</PanelBody>
				</Panel>
			) }
			<Panel>
				<PanelBody
					title="Advanced Lite Vimeo Settings"
					initialOpen={ false }
				>
					<Flex
						direction="column"
						gap={ 6 }
						as="div"
						style={ { marginBlockStart: '.5rem' } }
					>
						<FlexBlock>
							<ToggleControl
								label="Autoplay"
								__nextHasNoMarginBottom
								onChange={ ( value ) =>
									setAttributes( { autoPlay: value } )
								}
								autoComplete="off"
								help="Enables Autoplay for use as a background video."
								checked={ autoPlay }
							/>
						</FlexBlock>
						{ autoPlay && (
							<FlexBlock>
								<ToggleControl
									label="Player Controls"
									__nextHasNoMarginBottom
									onChange={ ( value ) =>
										setAttributes( {
											playerControls: value,
										} )
									}
									autoComplete="off"
									help="Enables Player Controls for the video."
									checked={ playerControls }
								/>
							</FlexBlock>
						) }
						<FlexBlock>
							<TextControl
								label="Alternate Video Title"
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								onChange={ ( value ) =>
									setAttributes( { videoTitle: value } )
								}
								autoComplete="off"
								help="The title of the Vimeo video to embed. Defaults to “Play: [title]”"
								value={ videoTitle || '' }
							/>
						</FlexBlock>
						<FlexBlock>
							<TextControl
								label="Alternate Start Time"
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								type="number"
								onChange={ ( value ) => {
									setAttributes( {
										videoStartAt: Number( value ),
									} );
								} }
								help="The alternate start time (in seconds) of the video to embed."
								value={ videoStartAt || 0 }
							/>
						</FlexBlock>
					</Flex>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
