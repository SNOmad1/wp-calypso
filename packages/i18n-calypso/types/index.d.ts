// Type definitions for i18n-calypso
// Project: i18n-calypso

import * as React from 'react';

declare namespace i18nCalypso {
	type LocaleData = Record< string, any >;
	type NormalizedTranslateArgs =
		| ( TranslateOptions & { original: string } )
		| ( TranslateOptions & {
				original: string;
				plural: string;
				count: number;
		  } );

	export type Substitution = string | number | React.ReactFragment;

	export type Substitutions =
		| Substitution
		| Substitution[]
		| { [ placeholder: string ]: Substitution };

	export interface ComponentInterpolations {
		[ placeholder: string ]: React.ReactElement;
	}

	export interface TranslateOptions {
		/**
		 * Arguments you would pass into sprintf to be run against the text for string substitution.
		 */
		args?: Substitutions;

		/**
		 * Comment that will be shown to the translator for anything that may need to be explained about the translation.
		 */
		comment?: string;

		/**
		 * Components to be interpolated in the translated string.
		 */
		components?: ComponentInterpolations;

		/**
		 * Provides the ability for the translator to provide a different translation for the same text in two locations (dependent on context). Usually context should only be used after a string has been discovered to require different translations. If you want to provide help on how to translate (which is highly appreciated!), please use a comment.
		 */
		context?: string;
	}

	// This deprecated signature is still supported
	export interface DeprecatedTranslateOptions extends TranslateOptions {
		original: string | { single: string; plural: string; count: number };
	}

	export type TranslateOptionsText = TranslateOptions & { textOnly: true };
	export type TranslateOptionsPlural = TranslateOptions & { count: number };
	export type TranslateOptionsPluralText = TranslateOptionsPlural & { textOnly: true };

	// Translate hooks, like component interpolation or highlighting untranslated strings,
	// force us to declare the return type as a generic React node, not as just string.
	export type TranslateResult = React.ReactChild;

	export function translate( options: DeprecatedTranslateOptions ): React.ReactChild;
	export function translate( original: string ): React.ReactChild;
	export function translate( original: string, options: TranslateOptions ): React.ReactChild;
	export function translate( original: string, options: TranslateOptionsText ): string;
	export function translate(
		original: string,
		plural: string,
		options: TranslateOptionsPlural
	): React.ReactChild;
	export function translate(
		original: string,
		plural: string,
		options: TranslateOptionsPluralText
	): string;

	export function setLocale( localeData: LocaleData ): void;
	export function addTranslations( localeData: LocaleData ): void;
	export function hasTranslation( original: string ): boolean;

	export function configure( options: Record< string, any > ): void;

	export interface NumberFormatOptions {
		decimals?: number;
		decPoint?: string;
		thousandsSep?: string;
	}

	export function numberFormat( number: number, numberOfDecimalPlaces: number ): string;
	export function numberFormat( number: number, options: NumberFormatOptions ): string;

	export interface LocalizeProps {
		locale: string;
		translate: typeof translate;
		numberFormat: typeof numberFormat;
	}

	// Infers prop type from component C
	export type GetProps< C > = C extends React.ComponentType< infer P > ? P : never;

	export type WithoutLocalizedProps< OrigProps > = Pick<
		OrigProps,
		Exclude< keyof OrigProps, keyof LocalizeProps >
	>;

	export type LocalizedComponent< C > = React.ComponentClass<
		WithoutLocalizedProps< GetProps< C > >
	>;

	export function localize< C >( component: C ): LocalizedComponent< C >;

	export function useTranslate(): typeof translate & { localeSlug: string | undefined };

	export function reRenderTranslations(): void;

	export type TranslateHook = (
		translation: React.ReactChild,
		options: NormalizedTranslateArgs
	) => React.ReactChild;
	export function registerTranslateHook( hook: TranslateHook ): void;

	export type ComponentUpdateHook = ( ...args: any ) => any;
	export function registerComponentUpdateHook( hook: ComponentUpdateHook ): void;

	export function getLocale(): LocaleData;
	export function getLocaleSlug(): string | null;
	export function getLocaleVariant(): string | undefined;
	export function isRtl(): boolean;
	export const defaultLocaleSlug: string;

	export type EventListener = ( ...payload: any ) => any;
	export function on( eventName: string, listener: EventListener ): void;
	export function off( eventName: string, listener: EventListener ): void;
	export function emit( eventName: string, ...payload: any ): void;
}

export = i18nCalypso;
export as namespace i18nCalypso;
