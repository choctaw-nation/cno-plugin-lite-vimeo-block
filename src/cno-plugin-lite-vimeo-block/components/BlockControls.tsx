import {
	InspectorControls,
	MediaPlaceholder,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	Button,
	ColorPalette,
	Panel,
	PanelBody,
	PanelRow,
	RangeControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { isBlobURL } from '@wordpress/blob';
import { LiteVimeoBlockAttributes } from '../../types/lite-vimeo';

const FlexBlockStyles = {
	display: 'block',
	flex: '1 1 0%',
	maxHeight: '100%',
	maxWidth: '100%',
	minHeight: '0',
	minWidth: '0',
};

export default function BlockControls( {
	attributes,
	setAttributes,
}: {
	attributes: LiteVimeoBlockAttributes;
	setAttributes: ( attributes: Partial< LiteVimeoBlockAttributes > ) => void;
} ) {
	const {
		videoTitle,
		videoStartAt,
		videoID,
		isUnlisted,
		disableTracking,
		loop,
		buttonColor,
		useCustomThumbnail,
		customThumbnailURL,
		autoPlay,
		playerControls,
		gradientOpacity,
	} = attributes;
	const shouldUseCustomThumbnail = isUnlisted || useCustomThumbnail;

	const toggles = [
		{
			label: 'Unlisted',
			checked: isUnlisted,
			onChange: ( value: boolean ) =>
				setAttributes( {
					isUnlisted: value,
				} ),
		},
		{
			label: 'Use Custom Thumbnail',
			checked: shouldUseCustomThumbnail,
			onChange: ( value: boolean ) =>
				setAttributes( { useCustomThumbnail: value } ),
			help: 'Use a custom thumbnail instead of the default Vimeo thumbnail.',
		},
	];
	const advancedToggles = [
		{
			label: 'Disable Tracking',
			checked: disableTracking,
			onChange: ( value: boolean ) =>
				setAttributes( { disableTracking: value } ),
		},
		{
			label: 'Loop',
			checked: loop,
			onChange: ( value: boolean ) => setAttributes( { loop: value } ),
			help: loop && 'Looped videos are muted.',
		},
		{
			label: 'Autoplay',
			checked: autoPlay,
			onChange: ( value: boolean ) =>
				setAttributes( { autoPlay: value } ),
			help: 'Autoplay the video when it becomes visible.',
		},
	];
	const palette = useSelect(
		( select ) => select( blockEditorStore ).getSettings().colors,
		[]
	);
	return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody title="Lite Vimeo Settings" initialOpen={ true }>
						<PanelRow>
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label="Video ID"
								value={ videoID }
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
						{ toggles.map( ( toggle ) => (
							<PanelRow key={ toggle.label }>
								<ToggleControl
									__nextHasNoMarginBottom
									label={ toggle.label }
									checked={ toggle.checked }
									onChange={ toggle.onChange }
									help={ toggle.help }
								/>
							</PanelRow>
						) ) }
					</PanelBody>
				</Panel>
				{ shouldUseCustomThumbnail && (
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
									let url;
									if ( isBlobURL( media.url ) ) {
										url = media.url;
									} else {
										url = media.sizes
											? media.sizes[ '1080p' ].url
											: media.media_details.sizes[
													'1080p'
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
								onError={ ( error ) =>
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
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody title="Button Color" initialOpen={ true }>
					<p>Select a color for the button&apos;s hover state</p>
					<ColorPalette
						colors={ [
							...palette,
							{
								name: 'Vimeo Blue',
								color: '#62afed',
								slug: 'vimeo-blue',
							},
						] }
						value={ buttonColor }
						onChange={ ( value ) =>
							setAttributes( { buttonColor: value } )
						}
					/>
				</PanelBody>
				<PanelBody title="Gradient Control" initialOpen={ true }>
					<p>Set the gradient overlay for the block</p>
					<RangeControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label="Gradient Opacity"
						value={ gradientOpacity }
						onChange={ ( value ) =>
							setAttributes( { gradientOpacity: value } )
						}
						min={ 0 }
						max={ 1 }
						step={ 0.01 }
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="advanced">
				<div
					style={ {
						marginBlockStart: '.5rem',
						display: 'flex',
						flexDirection: 'column',
						gap: '1.5rem',
					} }
				>
					{ advancedToggles.map( ( toggle ) => (
						<div style={ FlexBlockStyles } key={ toggle.label }>
							<ToggleControl
								__nextHasNoMarginBottom
								label={ toggle.label }
								onChange={ toggle.onChange }
								help={ toggle.help }
								checked={ toggle.checked }
							/>
						</div>
					) ) }
					{ autoPlay && (
						<>
							<div style={ FlexBlockStyles }>
								<ToggleControl
									__nextHasNoMarginBottom
									label="Player Controls"
									onChange={ ( value ) =>
										setAttributes( {
											playerControls: value,
										} )
									}
									help="Enables Player Controls for the video."
									checked={ playerControls }
								/>
							</div>
							<div style={ FlexBlockStyles }>
								<RangeControl
									__next40pxDefaultSize
									__nextHasNoMarginBottom
									label="Autoplay Threshold"
									min={ 0 }
									max={ 100 }
									onChange={ ( value ) =>
										setAttributes( {
											autoplayThreshold: Number( value ),
										} )
									}
									help="The percentage of the video that needs to be in view for autoplay to trigger. Set to 0 to autoplay as soon as any part of the video is in view."
									value={ attributes.autoplayThreshold }
								/>
							</div>
							<div style={ FlexBlockStyles }>
								<ToggleControl
									__nextHasNoMarginBottom
									label="Autoplay Muted"
									onChange={ ( value ) =>
										setAttributes( {
											autoplayMuted: value,
										} )
									}
									autoComplete="off"
									help="Whether the video should be muted when autoplaying. Note: Videos that autoplay without being muted may not play in some browsers."
									checked={ attributes.autoplayMuted }
								/>
							</div>
						</>
					) }
					<div style={ FlexBlockStyles }>
						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label="Alternate Video Title"
							onChange={ ( value ) =>
								setAttributes( { videoTitle: value } )
							}
							autoComplete="off"
							help="The title of the Vimeo video to embed. Defaults to “Play: [title]”"
							value={ videoTitle || '' }
						/>
					</div>
					<div style={ FlexBlockStyles }>
						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label="Alternate Start Time"
							type="number"
							min={ 0 }
							onChange={ ( value ) => {
								setAttributes( {
									videoStartAt: Math.max(
										0,
										Number( value )
									),
								} );
							} }
							help="The alternate start time (in seconds) of the video to embed."
							value={ Math.max( 0, videoStartAt ) }
						/>
					</div>
				</div>
			</InspectorControls>
		</>
	);
}
