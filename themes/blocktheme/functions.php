<?php
// register blocks
add_action('init', function(){
    register_block_type(__DIR__ . '/blocks/build/block-1-static');
    register_block_type(__DIR__ . '/blocks/build/block-2-dynamic');
});
// disable wordpress version
remove_action('wp_head', 'wp_generator');
// disable emoji
add_action('init', function(){
	remove_action('wp_head', 'print_emoji_detection_script', 7);
	remove_action('admin_print_scripts', 'print_emoji_detection_script');
	remove_action('wp_print_styles', 'print_emoji_styles');
	remove_action('admin_print_styles', 'print_emoji_styles'); 
	remove_filter('the_content_feed', 'wp_staticize_emoji');
	remove_filter('comment_text_rss', 'wp_staticize_emoji'); 
	remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
	add_filter('tiny_mce_plugins', function($plugins){
		if(is_array($plugins)){
			return array_diff($plugins, ['wpemoji']);
		} else {
			return [];
		}
	});
});
// disable jquery-migrate
add_filter('wp_default_scripts', function($scripts){
	if(empty($scripts->registered['jquery']) || is_admin()) return;
	$deps = & $scripts->registered['jquery']->deps;
	$deps = array_diff($deps, ['jquery-migrate']);
});
// load style and script
add_action('wp_enqueue_scripts', function(){
	wp_enqueue_style('main', get_template_directory_uri() . '/assets/css/main.css', [], '1.0.0');
	wp_enqueue_script('main', get_template_directory_uri() . '/assets/js/main.js', ['jquery'], '1.0.0', true);
});
// defer script
add_filter('script_loader_tag', function($tag, $handle, $src){
    return (in_array($handle, ['main']) ? str_replace('src=', ' defer src=', $tag) : $tag);
}, 10, 3);
// load font
add_action('wp_head', function(){
	echo '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">';
}, 90);