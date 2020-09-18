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
import {MessageFormatter}       from '@ultraq/icu-message-formatter';
import MessageFormatterProvider from './MessageFormatterProvider.js';
/* eslint-env jest */
import useMessageFormatter      from './useMessageFormatter.js';

import {mount} from 'enzyme';
import React   from 'react';

/**
 * Tests for the useMessageFormatter hook.
 */
describe('useMessageFormatter', function() {

	test('Context values are returned', function() {
		const formatter = new MessageFormatter();
		const locale = 'en-US';
		const messages = {
			GOODBYE: '😢'
		};

		const hookOutput = {};
		function TestComponent() {
			Object.assign(hookOutput, useMessageFormatter());
			return null;
		}
		mount(
			<MessageFormatterProvider formatter={formatter} locale={locale} messages={messages}>
				<TestComponent/>
			</MessageFormatterProvider>
		);

		expect(hookOutput).toEqual({
			formatter,
			locale,
			messages
		});
	});
});