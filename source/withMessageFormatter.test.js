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
import MessageFormatterProvider from './MessageFormatterProvider.js';
import withMessageFormatter     from './withMessageFormatter.js';

import {MessageFormatter} from '@ultraq/icu-message-formatter';
import {mount}            from 'enzyme';
import React              from 'react';

/**
 * Tests for the higher-order component. 
 */
describe('withMessageFormatter', function() {

	test('Context made available to components', function() {
		const formatter = new MessageFormatter();
		const locale = 'en-US';
		const messages = {
			GOODBYE: '😢'
		};
		const Component = () => (
			<span>Hi! 👋</span>
		);
		const WrappedComponent = withMessageFormatter(Component);
		const wrapper = mount(
			<MessageFormatterProvider formatter={formatter} locale={locale} messages={messages}>
				<WrappedComponent/>
			</MessageFormatterProvider>
		);
		const componentProps = wrapper.find(Component).props();
		expect(componentProps.formatter).toBe(formatter);
		expect(componentProps.locale).toBe(locale);
		expect(componentProps.messages).toBe(messages);
	});

	test('Context made available to components - messageResolver edition', function() {
		const formatter = new MessageFormatter();
		const locale = 'en-US';
		const messageResolver = () => ({
			GOODBYE: '😢'
		});
		const Component = () => (
			<span>Hi! 👋</span>
		);
		const WrappedComponent = withMessageFormatter(Component);
		const wrapper = mount(
			<MessageFormatterProvider formatter={formatter} locale={locale} messageResolver={messageResolver}>
				<WrappedComponent/>
			</MessageFormatterProvider>
		);
		const componentProps = wrapper.find(Component).props();
		expect(componentProps.formatter).toBe(formatter);
		expect(componentProps.locale).toBe(locale);
		expect(componentProps.messageResolver).toBe(messageResolver);
	});
});
