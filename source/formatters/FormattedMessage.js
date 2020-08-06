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

import withMessageFormatter from '../withMessageFormatter.js';

import PropTypes          from 'prop-types';
import React, {Component} from 'react';

/**
 * React wrapper for the ICU message formatter's `format` method, using the
 * props and context to pass along to that method.
 * 
 * @author Emanuel Rabina
 */
export default withMessageFormatter(class FormattedMessage extends Component {

	static propTypes = {
		formatter: PropTypes.object,
		id: PropTypes.string.isRequired,
		locale: PropTypes.string,
		messages: PropTypes.object,
		values: PropTypes.object
	};

	/**
	 * @return {*}
	 */
	render() {

		let {formatter, id, locale, messages, values, ...rest} = this.props;
		return (
			<span {...rest}>{formatter.format(messages[id], values, locale)}</span>
		);
	}
});
