
import FormatterContext from './contexts/FormatterContext.js';
import LocaleContext    from './contexts/LocaleContext.js';
import MessagesContext  from './contexts/MessagesContext.js';

import React from 'react';

/**
 * A higher-order component that applies the ICU Message Formatter context
 * objects, `formatter`, `locale`, and `messages` to the given component as
 * props.
 * 
 * @param {*} Component
 * @return {*}
 */
export default function withMessageFormatter(Component) {
	return (
		<FormatterContext.Consumer>
			{formatter => (
				<LocaleContext.Consumer>
					{locale => (
						<MessagesContext.Consumer>
							{messages => (
								<Component formatter={formatter} locale={locale} messages={messages}/>
							)}
						</MessagesContext.Consumer>
					)}
				</LocaleContext.Consumer>
			)}
		</FormatterContext.Consumer>
	);
}
