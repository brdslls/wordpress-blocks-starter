/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

import { PanelBody, TextControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { text1, link1, image1 } = attributes;
	const ALLOWED_MEDIA_TYPES = [ 'image' ];
	let image1Url = (image1 && image1.url) ? image1.url : '';
	return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Settings', 'blocktheme' ) }>
					<TextControl
						label={ __(
							'Text 1',
							'blocktheme'
						) }
						value={ text1 || '' }
						onChange={ ( value ) =>
							setAttributes( { text1: value } )
						}
					/>
					<TextControl
						label={ __(
							'Link 1',
							'blocktheme'
						) }
						value={ link1 || '' }
						onChange={ ( value ) =>
							setAttributes( { link1: value } )
						}
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes({
									image1: { title: media.title, filename: media.filename, url: media.url, updated: '' }
								})
							}
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							multiple={false}
							render={({ open }) => (
							<p>
								<button onClick={open}>
									{ image1 ? 'Replace image 1' : 'Upload image 1' }
								</button>
								<span>
									{ image1 ? ' ' + image1.filename : '' }
								</span>
							</p>
							)}
						/>
					</MediaUploadCheck>
                </PanelBody>
            </InspectorControls>
			<div { ...useBlockProps() }>
				<p><big>Block 1 static</big></p>
				<p title="Text 1">{ text1 }</p>
				<p title="Link 1">{ link1 }</p>
				<p title="Image 1"><img src={ image1Url } width="50" height="50" /></p>
			</div>
        </>
	);
}
