
import withMessageFormatter from './withMessageFormatter.js';

import PropTypes   from 'prop-types';
import {Component} from 'react';

/**
 * React wrapper for the ICU message formatter's `format` method, using the
 * props and context to pass along to that method.
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
		return formatter.format(messages[id], values, locale);
	}
});
