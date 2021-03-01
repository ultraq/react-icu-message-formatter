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

import PropTypes          from 'prop-types';
import React, {Component} from 'react';

/**
 * React component that embeds the module context to let React applications use
 * the much simpler message formatting components for emitting strings.
 * 
 * @author Emanuel Rabina
 */
export default class MessageFormatterProvider extends Component {

	static propTypes = {
		children: PropTypes.node.isRequired,
		formatter: PropTypes.object,
		messages: PropTypes.object,
		messageResolver: PropTypes.func
	};

	/**
	 * Constructor, warns if prop combinations don't make sense for the library.
	 * 
	 * @param {Object} props
	 */
	constructor(props) {

		super(props);

		/* global process */
		if (process.env.NODE_ENV !== 'production' && props.messageResolver && props.messages) {
			console.warn('Both messageResolver and messages props are present - messageResolver will take precedence.');
		}
	}

	/**
	 * @return {*}
	 */
	render() {

		let {children, formatter, messages, messageResolver} = this.props;

		return (
			<MessageFormatterContext.Provider value={{
				formatter,
				messages,
				messageResolver
			}}>
				{children}
			</MessageFormatterContext.Provider>
		);
	}
}
