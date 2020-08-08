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
import MessageFormatterProvider from '../MessageFormatterProvider.js';

import {MessageFormatter} from '@ultraq/icu-message-formatter';
import {mount}            from 'enzyme';
import React              from 'react';

/**
 * Tests for the React message formatter component.
 */
describe('formatters/FormattedMessage', function() {

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
			link: ({href}, linkText, values, locale) => (
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
		const link = wrapper.find('a');
		expect(wrapper.text()).toBe('Go to our documentation page to learn more');
		expect(link.text()).toBe('documentation page');
		expect(link.prop('href')).toBe('https://help.mywebsite.com');
	});
});
