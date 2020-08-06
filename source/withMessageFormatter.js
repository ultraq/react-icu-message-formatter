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

import React from 'react';

/**
 * A higher-order component that applies the ICU Message Formatter context
 * objects, `formatter`, `locale`, and `messages` to the given component as
 * props.
 * 
 * @author Emanuel Rabina
 * @param {*} Component
 * @return {*}
 */
export default (Component) => (props) => (
	<FormatterContext.Consumer>
		{formatter => (
			<LocaleContext.Consumer>
				{locale => (
					<MessagesContext.Consumer>
						{messages => (
							<Component formatter={formatter} locale={locale} messages={messages} {...props}/>
						)}
					</MessagesContext.Consumer>
				)}
			</LocaleContext.Consumer>
		)}
	</FormatterContext.Consumer>
);
