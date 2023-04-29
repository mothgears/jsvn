import $$, { View, render, FOR } from './reimport.mjs';
import fse from 'fs-extra';

export const PageView = new View(['<>html'], {
	$lang: m=>m.lang,

	[$$('<>head')]:{
		[$$('/meta')]   : { $httpEquiv: 'X-UA-Compatible', $content: 'IE=Edge' },
		[$$('/meta')]   : { $httpEquiv: 'Content-Type'   , $content: 'text/html; charset=UTF-8' },
		[$$('/meta')]   : { $name: 'viewport'            , $content: 'width=device-width, initial-scale=1, maximum-scale=1' },
		[$$('<>title')] : { $$: 'Title' },

		[$$(FOR)]: m=>m.links,
		[$$('<>link')]: {
			$rel: link=>link.rel, $type: link=>link.type, $href: link=>link.href,
		},

		[$$(FOR)]: m=>m.scripts,
		[$$('<>script')]: {
			$src: s=>s,
		},
	},

	[$$('<>body')]:{
		[$$()]: {
			$id: 'root',
		}
	}
});

await fse.outputFile('page.html', render(PageView, {
	lang: 'en',
	links: [{rel: 'stylesheet', type:'text/css', href: 'styles.css'}],
	scripts: ['/script.js']
}));