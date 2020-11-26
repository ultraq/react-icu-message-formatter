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
import FormattedMessage         from './FormattedMessage.js';
import MessageFormatterProvider from './MessageFormatterProvider.js';

import {MessageFormatter} from '@ultraq/icu-message-formatter';
import {mount}            from 'enzyme';
import React              from 'react';

/**
 * Tests for the React message formatter component.
 */
describe('FormattedMessage', function() {

	test('Documentation example', function() {
		const formatter = new MessageFormatter({
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

	test('Nested component', function() {
		const formatter = new MessageFormatter({
			/* eslint-disable */
			link: ({href}, linkText) => (
				<a href={href}>{linkText}</a>
			)
			/* eslint-enable */
		});
		const messages = {
			EXTERNAL_LINK: 'Go to our {docPageLink, link, documentation page} to learn more'
		};
		const wrapper = mount(
			<MessageFormatterProvider formatter={formatter} locale="en-NZ" messages={messages}>
				<FormattedMessage id="EXTERNAL_LINK" values={{
					docPageLink: {
						href: 'https://help.mywebsite.com'
					}
				}}/>
			</MessageFormatterProvider>
		);

		expect(wrapper.text()).toBe('Go to our documentation page to learn more');
		const link = wrapper.find('a');
		expect(link.text()).toBe('documentation page');
		expect(link.prop('href')).toBe('https://help.mywebsite.com');
	});

	test('Message resolution', function() {
		const formatter = new MessageFormatter();
		const messages = {
			GREETING: 'Hi! 👋'
		};
		const messageResolver = jest.fn((id) => messages[id]);
		const wrapper = mount(
			<MessageFormatterProvider formatter={formatter} locale="en-NZ" messageResolver={messageResolver}>
				<FormattedMessage id="GREETING"/>
			</MessageFormatterProvider>
		);

		expect(messageResolver).toHaveBeenCalledWith('GREETING', 'en-NZ');
		expect(wrapper.text()).toBe(messages.GREETING);
	});

	test('Message resolution errors fall back to an empty string', function() {
		const formatter = new MessageFormatter();
		const error = new Error('Forced failure');
		const messageResolver = jest.fn(() => {
			throw error;
		});
		const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
		const wrapper = mount(
			<MessageFormatterProvider formatter={formatter} locale="en-NZ" messageResolver={messageResolver}>
				<FormattedMessage id="NOTHING"/>
			</MessageFormatterProvider>
		);

		expect(messageResolver).toThrowError(error);
		expect(consoleError).toHaveBeenCalledWith(
			'Failed to resolve a message for id: NOTHING, locale: en-NZ.  Falling back to using an empty string.'
		);
		expect(wrapper.text()).toBe('');
		consoleError.mockRestore();
	});

	test('Emits HTML', function() {
		const formatter = new MessageFormatter();
		const messages = {
			GREETING: 'Hello <strong>{name}</strong>!'
		};
		const wrapper = mount(
			<MessageFormatterProvider formatter={formatter} locale="en-NZ" messages={messages}>
				<FormattedMessage id="GREETING" values={{
					name: 'Emanuel'
				}}/>
			</MessageFormatterProvider>
		);

		expect(wrapper.text()).toBe('Hello Emanuel!');
	});
});
