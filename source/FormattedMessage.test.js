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
		const formatter = new MessageFormatter();
		const messages = {
			GREETING: 'Hi there! 👋'
		};
		const wrapper = mount(
			<MessageFormatterProvider formatter={formatter} locale="en-NZ" messages={messages}>
				<FormattedMessage id="GREETING"/>
			</MessageFormatterProvider>
		);
		expect(wrapper.text()).toBe(messages.GREETING);
	});
});
