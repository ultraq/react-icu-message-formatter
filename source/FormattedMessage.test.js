/* eslint-env jest */
import FormattedMessage         from './FormattedMessage.js';
import MessageFormatterProvider from './MessageFormatterProvider.js';

import MessageFormatter from '@ultraq/icu-message-formatter';
import {mount}          from 'enzyme';
import React            from 'react';

/**
 * Tests for the React message formatter component.
 */
describe('FormattedMessage', function() {

	test('Documentation example', function() {
		let formatter = new MessageFormatter({
			currency: ({value, currency}, options, values, locale) => {
				return new Intl.NumberFormat(locale, {
					style: 'currency',
					currency
				}).format(value);
			}
		});
		const messages = {
			EXAMPLE: 'Hey {name}, that\'s gonna cost you {amount, currency}!'
		};
		const wrapper = mount(
			<MessageFormatterProvider formatter={formatter} locale="en-NZ" messages={messages}>
				<FormattedMessage id="EXAMPLE" values={{
					name: 'Emanuel',
					amount: {
						value: 2,
						currency: 'GBP'
					}
				}}/>
			</MessageFormatterProvider>
		);
		expect(wrapper.text()).toBe('Hey Emanuel, that\'s gonna cost you £2.00!');
	});
});
