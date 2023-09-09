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

import FormattedMessage from './FormattedMessage.js';
import MessageFormatterProvider from './MessageFormatterProvider.js';

import {render, screen} from '@testing-library/react';
import {MessageFormatter} from '@ultraq/icu-message-formatter';
import React from 'react';

/**
 * Tests for the React message formatter component.
 */
describe('FormattedMessage', function() {

	test('Documentation example', function() {
		const formatter = new MessageFormatter('en-NZ', {
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
		render(
			<MessageFormatterProvider formatter={formatter} messages={messages}>
				<FormattedMessage id="EXAMPLE" values={{
					name: 'Emanuel',
					amount: {
						value: 2,
						currency: 'GBP'
					}
				}}/>
			</MessageFormatterProvider>
		);

		expect(screen.getByText('Hey Emanuel, that\'s gonna cost you £2.00!')).toBeInTheDocument();
	});

	test('Nested component', function() {
		const formatter = new MessageFormatter('en-NZ', {
			/* eslint-disable */
			link: ({href}, linkText) => (
				<a href={href}>{linkText}</a>
			)
			/* eslint-enable */
		});
		const messages = {
			EXTERNAL_LINK: 'Go to our {docPageLink, link, documentation page} to learn more'
		};
		const {container} = render(
			<MessageFormatterProvider formatter={formatter} messages={messages}>
				<FormattedMessage id="EXTERNAL_LINK" values={{
					docPageLink: {
						href: 'https://help.mywebsite.com'
					}
				}}/>
			</MessageFormatterProvider>
		);

		expect(container).toHaveTextContent('Go to our documentation page to learn more');
		const link = screen.getByRole('link');
		expect(link).toHaveTextContent('documentation page');
		expect(link).toHaveAttribute('href', 'https://help.mywebsite.com');
	});

	test('Message resolution', function() {
		const formatter = new MessageFormatter('en-NZ');
		const messages = {
			GREETING: 'Hi! 👋'
		};
		const messageResolver = jest.fn((id) => messages[id]);
		render(
			<MessageFormatterProvider formatter={formatter} messageResolver={messageResolver}>
				<FormattedMessage id="GREETING"/>
			</MessageFormatterProvider>
		);

		expect(messageResolver).toHaveBeenCalledWith('GREETING', 'en-NZ');
		expect(screen.getByText(messages.GREETING)).toBeInTheDocument();
	});

	test('Message resolution errors fall back to an empty string', function() {
		const formatter = new MessageFormatter('en-NZ');
		const error = new Error('Forced failure');
		const messageResolver = jest.fn(() => {
			throw error;
		});
		const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {
		});
		const {container} = render(
			<MessageFormatterProvider formatter={formatter} messageResolver={messageResolver}>
				<FormattedMessage id="NOTHING"/>
			</MessageFormatterProvider>
		);

		expect(messageResolver).toThrowError(error);
		expect(consoleError).toHaveBeenCalledWith(
			'Failed to resolve a message for id: NOTHING, locale: en-NZ.  Falling back to using an empty string.'
		);
		expect(container).toHaveTextContent('');
		consoleError.mockRestore();
	});

	test('Emits HTML', function() {
		const formatter = new MessageFormatter('en-NZ');
		const messages = {
			GREETING: 'Hello <strong>{name}</strong>, your random number for the day is <strong>{randomNumber}</strong> 😉'
		};
		const {asFragment} = render(
			<MessageFormatterProvider formatter={formatter} messages={messages}>
				<FormattedMessage id="GREETING" values={{
					name: 'Emanuel',
					randomNumber: 4 // https://xkcd.com/221/
				}}/>
			</MessageFormatterProvider>
		);

		expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <span>
    <span>
      Hello 
      <strong>
        Emanuel
      </strong>
      , your random number for the day is 
      <strong>
        4
      </strong>
       😉
    </span>
  </span>
</DocumentFragment>
`);
	});
});
