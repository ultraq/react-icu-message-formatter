
import MessageFormatter                  from '@ultraq/icu-message-formatter';
import PropTypes                         from 'prop-types';
import React, {Component, createContext} from 'react';

export const FormatterContext = createContext(new MessageFormatter());
export const LocaleContext = createContext('en-NZ');
export const MessagesContext = createContext({});

/**
 * React component that embeds the many contexts that are combined to let React
 * applications use the much simpler message formatting components for creating
 * strings.
 * 
 * @author Emanuel Rabina
 */
export class MessageFormatterProvider extends Component {

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
