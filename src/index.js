import $$ from './$$.js';
import { View } from './View.js';

$$.View = View;

export { default as importCSS } from './importStyles.js';
export { default as renderHTML } from './renderMarkup.js';
export default $$;