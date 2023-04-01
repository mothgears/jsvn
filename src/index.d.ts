declare class SourceNode {
	get tagName   () :string
	get className () :string
	get viewName  () :string
	get virtual   () :boolean

	render (renderEngine :any, ...envs :any) :any
}

export class View extends SourceNode {
	get css() :string
	get dependencies() :any

	constructor(...params :Array<string|Array<any>|object>)

	getDependencyTree(list :any) :any
}
export function requireGlobal(target :string|Array<string>) :any
export function installCSS(view :View) :void
export function render(view :View, ...models :Array<any>) :string
export function IF() :any
export function FOR() :any
export default function $$(...base :Array<any>) :symbol;