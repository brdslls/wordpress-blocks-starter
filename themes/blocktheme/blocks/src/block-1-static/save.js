/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
    const { text1, link1, image1 } = attributes;
	let image1Url = (image1 && image1.url) ? image1.url : '';
	return (
		<section { ...useBlockProps.save() }>
			<a href={ link1 }>
				{ text1 }
			</a>
			<img src={ image1Url } alt="" />
			<p style={{ backgroundImage: 'url(' + image1Url + ')' }}></p>
		</section>
	);
}
