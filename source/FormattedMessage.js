/*
 * Copyright 2020, Emanuel Rabina (http://www.ultraq.net.nz/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import MessageFormatterContext from './MessageFormatterContext.js';

import {escapeHtml} from '@ultraq/string-utils';
import PropTypes from 'prop-types';
import React, {Fragment, memo, useContext} from 'react';

/**
 * Return a copy of the passed object whose string values have been
 * HTML-escaped.
 *
 * @param {Record<string,any>} values
 * @return {Record<string,any>}
 */
function escapeStringValues(values) {
	return values ? Object.keys(values).reduce((acc, key) => {
		let value = values[key];
		acc[key] = typeof value === 'string' ? escapeHtml(value) : value;
		return acc;
	}, {}) : {};
}

/**
 * Return an array based off the passed formatting result where consecutive
 * strings are placed into their own array so that a single HTML string,
 * presumably an opening tag, a placeholder value, and a closing tag, can be
 * emitted in one go.
 *
 * @param {string[]} formatParts
 * @return {string[]}
 */
function groupStrings(formatParts) {
	return formatParts.flat(Infinity).reduce((acc, part) => {
		if (typeof part === 'string' || typeof part === 'number') {
			if (acc.length > 0 && Array.isArray(acc[acc.length - 1])) {
				acc[acc.length - 1].push(part);
			}
			else {
				acc.push([part]);
			}
		}
		else {
			acc.push(part);
		}
		return acc;
	}, []);
}

/**
 * @typedef {import('react').HTMLProps<HTMLSpanElement> & { id: string; values?: Record<string,any>}} FormattedMessageProps
 */

/**
 * React wrapper for the ICU message formatter's `format` method, using the
 * props and context to pass along to that method.
 *
 * Since 0.6.0, this component also formats strings with HTML in them and
 * automatically escapes placeholder values, replacing the `<FormattedHtmlMessage>`
 * component which could open you up to XSS attacks.
 *
 * @author Emanuel Rabina
 * @param {FormattedMessageProps} props
 * @return {import('react').JSX.Element}
 */
function FormattedMessage({id, values, ...rest}) {

	let {formatter, messages, messageResolver} = useContext(MessageFormatterContext);

	let message;
	if (messageResolver) {
		try {
			message = messageResolver(id, formatter.locale);
		}
		catch {
			console.error(`Failed to resolve a message for id: ${id}, locale: ${formatter.locale}.  Falling back to using an empty string.`);
		}
	}
	else {
		message = messages[id];
	}

	// String values are first escaped, sent through the formatting process, and
	// then consecutive strings are grouped together so they can be emitted as a
	// single HTML string.  This is because you can't emit unbalanced tags using
	// `dangerouslySetInnerHTML`.
	let parts = groupStrings(formatter.process(message, escapeStringValues(values)));

	return (
		<span {...rest}>
			{parts.map((part, index) => (
				<Fragment key={index}>
					{Array.isArray(part) ?
						<span dangerouslySetInnerHTML={{__html: part.join('')}}/> :
						part
					}
				</Fragment>
			))}
		</span>
	);
}

FormattedMessage.propTypes = {
	id: PropTypes.string.isRequired,
	values: PropTypes.object
};

export default memo(FormattedMessage);
