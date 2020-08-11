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
/* eslint-env jest */
import FormattedHtmlMessage     from './FormattedHtmlMessage.js';
import MessageFormatterProvider from './MessageFormatterProvider.js';

import {MessageFormatter} from '@ultraq/icu-message-formatter';
import {mount}            from 'enzyme';
import React              from 'react';

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

	test('Message resolution', function() {
		const formatter = new MessageFormatter();
		const messages = {
			GREETING: 'Hi! 👋'
		};
		const messageResolver = jest.fn((id, locale) => messages[id]);
		const wrapper = mount(
			<MessageFormatterProvider formatter={formatter} locale="en-NZ" messageResolver={messageResolver}>
				<FormattedHtmlMessage id="GREETING"/>
			</MessageFormatterProvider>
		);
		expect(messageResolver).toHaveBeenCalledWith('GREETING', 'en-NZ');
		expect(wrapper.text()).toBe(messages.GREETING);
	});
});
