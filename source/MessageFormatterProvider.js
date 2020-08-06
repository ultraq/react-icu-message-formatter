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

import FormatterContext from './contexts/FormatterContext.js';
import LocaleContext    from './contexts/LocaleContext.js';
import MessagesContext  from './contexts/MessagesContext.js';

import PropTypes          from 'prop-types';
import React, {Component} from 'react';

/**
 * React component that embeds the many contexts that are combined to let React
 * applications use the much simpler message formatting components for creating
 * strings.
 * 
 * @author Emanuel Rabina
 */
export default class MessageFormatterProvider extends Component {

	static propTypes = {
		children: PropTypes.node.isRequired,
		formatter: PropTypes.object,
		locale: PropTypes.string,
		messages: PropTypes.object
	};

	/**
	 * @return {*}
	 */
	render() {

		let {children, formatter, locale, messages} = this.props;

		return (
			<FormatterContext.Provider value={formatter}>
				<LocaleContext.Provider value={locale}>
					<MessagesContext.Provider value={messages}>
						{children}
					</MessagesContext.Provider>
				</LocaleContext.Provider>
			</FormatterContext.Provider>
		);
	}
}
