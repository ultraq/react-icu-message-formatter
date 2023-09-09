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

import MessageFormatterProvider from './MessageFormatterProvider.js';
import withMessageFormatter from './withMessageFormatter.js';

import {render} from '@testing-library/react';
import {MessageFormatter} from '@ultraq/icu-message-formatter';
import React from 'react';

/**
 * Tests for the higher-order component.
 */
describe('withMessageFormatter', function() {

	test('Context made available to components', function() {
		const formatter = new MessageFormatter('en-US');
		const messages = {
			GOODBYE: '😢'
		};
		let givenFormatter;
		let givenMessages;

		// eslint-disable-next-line react/prop-types
		const WrappedComponent = withMessageFormatter(function Component({formatter, messages}) {
			givenFormatter = formatter;
			givenMessages = messages;
			return (
				<span>Hi! 👋</span>
			);
		});

		render(
			<MessageFormatterProvider formatter={formatter} messages={messages}>
				<WrappedComponent/>
			</MessageFormatterProvider>
		);

		expect(givenFormatter).toBe(formatter);
		expect(givenMessages).toBe(messages);
	});

	test('Context made available to components - messageResolver edition', function() {
		const formatter = new MessageFormatter('en-US');
		const messageResolver = () => ({
			GOODBYE: '😢'
		});
		let givenFormatter;
		let givenMessageResolver;

		// eslint-disable-next-line react/prop-types
		const WrappedComponent = withMessageFormatter(function Component({formatter, messageResolver}) {
			givenFormatter = formatter;
			givenMessageResolver = messageResolver;
			return (
				<span>Hi! 👋</span>
			);
		});

		render(
			<MessageFormatterProvider formatter={formatter} messageResolver={messageResolver}>
				<WrappedComponent/>
			</MessageFormatterProvider>
		);

		expect(givenFormatter).toBe(formatter);
		expect(givenMessageResolver).toBe(messageResolver);
	});
});
