import $$, { View, render } from './reimport.mjs';

export const PageView = new View(['<>html'], {
	$lang: '',

	[$$('<>head')]:{
		[$$('/meta')]   : { $httpEquiv: 'X-UA-Compatible', $content: 'IE=Edge' },
		[$$('/meta')]   : { $httpEquiv: 'Content-Type'   , $content: 'text/html; charset=UTF-8' },
		[$$('/meta')]   : { $name: 'viewport'            , $content: 'width=device-width, initial-scale=1, maximum-scale=1' },
		[$$('<>title')] : { $$: 'Title' },

		[$$('<>link')]: {
			_FOR: m=>m.links,

			$rel: link=>link.rel, $type: link=>link.type, $href: link=>link.href,
		},

		[$$('<>script')]: {
			_FOR: m=>m.scripts,

			$src: s=>s
		},
	},

	[$$('<>body')]:{
		[$$()]: {
			$id: 'root',
		}
	}
});

console.log(render(PageView, {links: [], scripts: []}));