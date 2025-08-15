## Run project

### Go to the working directory
`cd /app`

### Install wp-env locally as a dev dependency
`npm i @wordpress/env --save-dev`

### Create WordPress .wp-env.json. Add mappings param (eg volumes in Docker) if needed
./app/themes, ./app/plugins
```json
{
    "mappings": {
        "wp-content/plugins" : "./plugins",
        "wp-content/themes" : "./themes"
    }
}
```

### Start env
`npx wp-env start` start WordPress for development on port 8888 (​http://localhost:8888​). The current working directory must be a WordPress installation, a plugin, a theme, or contain a .wp-env.json file.

ATTENTION: after first install, use the '--update' flag to download updates to mapped sources and to re-apply WordPress configuration options. Running `wp-env start` (without flag) [rebuild](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/#wp-env-start) (?) wordpress without updating sources, don't remove database/volumes.

`wp-env stop` stops running WordPress for development and tests and frees the ports.

`wp-env run <container>` the run command can be used to open shell sessions, invoke WP-CLI commands, or run any arbitrary commands inside of a container.

## Scaffold block
By default create-block create block as separate plugin with wp-scripts package (step-by-step creation) `npx @wordpress/create-block`

If you need [multiple blocks](https://medium.com/@hayatbiralem/how-to-get-off-to-a-good-start-when-developing-a-wordpress-block-theme-3b822c7550ef) with common directory and wp-scripts: create block as usual (install wp-scripts), then remove block-specific directories and create each block with prefix --no-plugin (don't install wp-scripts) (simple `npm i @wordpress/scripts --save-dev` cause warning deprecated for some packages). Run `npx @wordpress/create-block blocks-directory-name --namespace theme-name|plugin-name` then remove /blocks-directory-name/build and all inside /blocks-directory-name/src then run `cd blocks-directory-name/src && npx @wordpress/create-block block-name --namespace theme-name|plugin-name --no-plugin`

register block in functions.php (path to block.json file or to the directory with this file)
```php
add_action('init', function(){
    register_block_type(get_template_directory() . 'blocks-directory-name/build/block-1-path-to-block.json-directory');
    register_block_type(get_template_directory() . 'blocks-directory-name/build/block-2-path-to-block.json-directory');
});
```

`npn run start` look for a files change (rerun after css/js file added). `npn run build` build for production.

## Add editable fields to the block
- [base](https://developer.wordpress.org/block-editor/getting-started/fundamentals/)
- field for [upload image](https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/media-upload/README.md)
- field [attributes](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/)