declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">;
  render(): Render[".md"];
}>;
"contact": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "contact";
  data: any
} & { render(): Render[".md"] };
};
"pages": {
"elements.mdx": {
	id: "elements.mdx";
  slug: "elements";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdx"] };
};
"posts": {
"1-writings-modelado-1-api-crud-modelado-anemico-dominio.md": {
	id: "1-writings-modelado-1-api-crud-modelado-anemico-dominio.md";
  slug: "1-writings-modelado-1-api-crud-modelado-anemico-dominio";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"1-writings-modelado-2-migracion-api-crud-api-ddd.md": {
	id: "1-writings-modelado-2-migracion-api-crud-api-ddd.md";
  slug: "1-writings-modelado-2-migracion-api-crud-api-ddd";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"1-writings-modelado-3-bienvenidos-modelado-enriquecido-dominio.md": {
	id: "1-writings-modelado-3-bienvenidos-modelado-enriquecido-dominio.md";
  slug: "1-writings-modelado-3-bienvenidos-modelado-enriquecido-dominio";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"1-writings-operaciones-lectura-alto-rendimiento-serverless.md": {
	id: "1-writings-operaciones-lectura-alto-rendimiento-serverless.md";
  slug: "1-writings-operaciones-lectura-alto-rendimiento-serverless";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"1-writings-vision-pragmatica-desarrollo-software.md": {
	id: "1-writings-vision-pragmatica-desarrollo-software.md";
  slug: "1-writings-vision-pragmatica-desarrollo-software";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2-mongo-sessions-1-indices.md": {
	id: "2-mongo-sessions-1-indices.md";
  slug: "2-mongo-sessions-1-indices";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2-mongo-sessions-2-indices-simples-multiclave.md": {
	id: "2-mongo-sessions-2-indices-simples-multiclave.md";
  slug: "2-mongo-sessions-2-indices-simples-multiclave";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2-mongo-sessions-3-propiedades-indices.md": {
	id: "2-mongo-sessions-3-propiedades-indices.md";
  slug: "2-mongo-sessions-3-propiedades-indices";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2-mongo-sessions-4-indices-compuestos.md": {
	id: "2-mongo-sessions-4-indices-compuestos.md";
  slug: "2-mongo-sessions-4-indices-compuestos";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2-mongo-sessions-5-optimizacion-consultas copy.md": {
	id: "2-mongo-sessions-5-optimizacion-consultas copy.md";
  slug: "2-mongo-sessions-5-optimizacion-consultas-copy";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2-mongo-sessions-6-busquedas-avanzadas.md": {
	id: "2-mongo-sessions-6-busquedas-avanzadas.md";
  slug: "2-mongo-sessions-6-busquedas-avanzadas";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2-mongo-sessions-7-busquedas-avanzadas-multi-idioma.md": {
	id: "2-mongo-sessions-7-busquedas-avanzadas-multi-idioma.md";
  slug: "2-mongo-sessions-7-busquedas-avanzadas-multi-idioma";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2-mongo-sessions-8-validacion-esquemas.md": {
	id: "2-mongo-sessions-8-validacion-esquemas.md";
  slug: "2-mongo-sessions-8-validacion-esquemas";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2-mongo-sessions-9-vistas-estandar.md": {
	id: "2-mongo-sessions-9-vistas-estandar.md";
  slug: "2-mongo-sessions-9-vistas-estandar";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"3-phd-enabling-definition.md": {
	id: "3-phd-enabling-definition.md";
  slug: "3-phd-enabling-definition";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"3-phd-interoperabilidad-industria-40.md": {
	id: "3-phd-interoperabilidad-industria-40.md";
  slug: "3-phd-interoperabilidad-industria-40";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"3-phd-lenguaje-ciencia-datos.md": {
	id: "3-phd-lenguaje-ciencia-datos.md";
  slug: "3-phd-lenguaje-ciencia-datos";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"3-phd-metaherramienta.md": {
	id: "3-phd-metaherramienta.md";
  slug: "3-phd-metaherramienta";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"3-phd-on-the-need.md": {
	id: "3-phd-on-the-need.md";
  slug: "3-phd-on-the-need";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"3-phd-sistema-gestion-flujos-trabajo-algoritmos-evolutivos.md": {
	id: "3-phd-sistema-gestion-flujos-trabajo-algoritmos-evolutivos.md";
  slug: "3-phd-sistema-gestion-flujos-trabajo-algoritmos-evolutivos";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"3-phd-swel.md": {
	id: "3-phd-swel.md";
  slug: "3-phd-swel";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"3-phd-thesis.md": {
	id: "3-phd-thesis.md";
  slug: "3-phd-thesis";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
