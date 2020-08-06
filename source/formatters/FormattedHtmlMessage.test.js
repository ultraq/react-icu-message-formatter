/* eslint-env jest */
import FormattedHtmlMessage     from './FormattedHtmlMessage.js';
import MessageFormatterProvider from '../MessageFormatterProvider.js';

import MessageFormatter from '@ultraq/icu-message-formatter';
import {mount}          from 'enzyme';
import React            from 'react';

/**
 * Tests for the HTML variant of the formatter component.
 */
describe('formatters/FormattedHtmlMessage', function() {

	test('Emits HTML', function() {
		let formatter = new MessageFormatter();
		let messages = {
			HTML_EXAMPLE: 'I have a <a href="#yeet">link</a> in here!'
		};
		const wrapper = mount(
			<MessageFormatterProvider formatter={formatter} locale="en-NZ" messages={messages}>
				<FormattedHtmlMessage id="HTML_EXAMPLE"/>
			</MessageFormatterProvider>
		);
		expect(wrapper.html()).toBe(`<span>${messages.HTML_EXAMPLE}</span>`);
	});
});
