
import withMessageFormatter from './withMessageFormatter.js';

import PropTypes          from 'prop-types';
import React, {Component} from 'react';

/**
 * React wrapper for the ICU message formatter's `format` method that allows for
 * HTML to be emitted.  Only use this component for messages that you have
 * complete control over (ie: not user-entered strings), otherwise you open
 * yourself up to XSS attacks.
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

		let {formatter, id, locale, messages, values} = this.props;
		return (
			<span dangerouslySetInnerHTML={{
				__html: formatter.format(messages[id], values, locale)
			}}/>
		);
	}
});
