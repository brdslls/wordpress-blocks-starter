## 1. Run local project

a. If project was created previously:
    - Run Docker container (e.g. using Docker Desktop)
    - Open http://localhost:8888/wp-admin/ (default login data for @wordpress/env: admin, password)

b. If this is a new project
    - Go to the working directory, e.g. `cd /app`
    - Install wp-env locally as a dev dependency `npm i @wordpress/env --save-dev`
    - Create WordPress .wp-env.json
    - In .wp-env.json add mappings param (eg volumes in Docker) for ./app/themes and ./app/plugins directories
    ```json
    {
        "mappings": {
            "wp-content/plugins" : "./plugins",
            "wp-content/themes" : "./themes"
        }
    }
    ```
    - Start env `npx wp-env start` (start WordPress for development on port 8888 http://localhost:8888​) or run container using Docker. The current working directory must be a WordPress installation, a plugin, a theme, or contain a .wp-env.json file. After first install, use the ['--update' flag](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/#wp-env-start) to download updates to mapped sources and to re-apply WordPress configuration options. `wp-env stop` stops running WordPress for development and tests and frees the ports. `wp-env run <container>` the run command can be used to open shell sessions, invoke WP-CLI commands, or run any arbitrary commands inside of a container.

## 2. Prepare directory for multiple blocks
By default `create-block` command create block as separate plugin with wp-scripts package (step-by-step creation) `npx @wordpress/create-block`

If you need [multiple blocks](https://medium.com/@hayatbiralem/how-to-get-off-to-a-good-start-when-developing-a-wordpress-block-theme-3b822c7550ef) with common directory and wp-scripts: create block as usual (install wp-scripts), then remove block-specific directories and create each block with prefix --no-plugin (don't install wp-scripts) (simple `npm i @wordpress/scripts --save-dev` cause warning deprecated for some packages). Run `npx @wordpress/create-block blocks-directory-name --namespace theme-name|plugin-name` then remove /blocks-directory-name/build and all inside /blocks-directory-name/src then run `cd blocks-directory-name/src && npx @wordpress/create-block block-name --namespace theme-name|plugin-name --no-plugin`

## 3. Create new block
1. Go to the /blocks/src directory and edit a block (block.json, edit.js, save.js) or duplicate an existing block folder and rename it (including name in the block.json, edit.js, etc)
2. register block in functions.php
```php
add_action('init', function(){
    register_block_type(get_template_directory() . 'blocks-directory-name/build/block-1-path-to-block.json-directory'); /* path to block.json file or to the directory with this file */
});
```
3. If you run local project (see [1](https://github.com/brdslls/wordpress-blocks-starter/?tab=readme-ov-file#1-run-local-project)) you can run `npm run start` to look for a files change (rerun after css/js file added). 
4. Run `npm run build` to build for production.
5. Copy /blocks/src and /blocks/build to the themes/blocks for production website

## Add editable fields to the block
- base [developer.wordpress.org](https://developer.wordpress.org/block-editor/)
- core blocks [developer.wordpress.org](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/) [github.com](https://github.com/WordPress/gutenberg/tree/c54fa0beb059a2e3b2d2f5a32f26ab47598be0b6/packages/components/src)
- field for upload image [github.com](https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/media-upload/README.md)
