## Run project
- if project was created previously:
  - open docker and run container
  - http://localhost:8888/wp-admin/ (admin, password)


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

1. scaffold block folder and files (or duplicate existing block)
2. edit fields in block.json, edit.js, save.js
3. register block in functions.php (path to block.json file or to the directory with this file)
```php
add_action('init', function(){
    register_block_type(get_template_directory() . 'blocks-directory-name/build/block-1-path-to-block.json-directory');
    register_block_type(get_template_directory() . 'blocks-directory-name/build/block-2-path-to-block.json-directory');
});
```

`npm run start` (run from blocks directory) look for a files change (rerun after css/js file added). `npm run build` build for production.

## Add editable fields to the block
- base [developer.wordpress.org](https://developer.wordpress.org/block-editor/)
- core blocks [developer.wordpress.org](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/) [github.com](https://github.com/WordPress/gutenberg/tree/c54fa0beb059a2e3b2d2f5a32f26ab47598be0b6/packages/components/src)
- field for upload image [github.com](https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/media-upload/README.md)
