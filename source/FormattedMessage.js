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

import {flatten}                    from '@ultraq/array-utils';
import PropTypes                    from 'prop-types';
import React, {Component, Fragment} from 'react';

/**
 * React wrapper for the ICU message formatter's `format` method, using the
 * props and context to pass along to that method.
 * 
 * @author Emanuel Rabina
 */
export default class FormattedMessage extends Component {

	static contextType = MessageFormatterContext;
	static propTypes = {
		formatter: PropTypes.object,
		id: PropTypes.string.isRequired,
		locale: PropTypes.string,
		messages: PropTypes.object,
		messageResolver: PropTypes.func,
		values: PropTypes.object
	};

	/**
	 * @return {*}
	 */
	render() {

		let {formatter, locale, messages, messageResolver} = this.context;
		let {id, values, ...rest} = this.props;

		let message;
		if (messageResolver) {
			try {
				message = messageResolver(id, locale);
			}
			catch {
				console.error(`Failed to resolve a message for id: ${id}, locale: ${locale}.  Falling back to using an empty string.`);
			}
		}
		else {
			message = messages[id];
		}

		let formatParts = formatter.process(message, values, locale);

		return (
			<span {...rest}>
				{flatten(formatParts).map((formatPart, index) => (
					<Fragment key={index}>
						{formatPart}
					</Fragment>
				))}
			</span>
		);
	}
}
