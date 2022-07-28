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

import {mount}                  from 'enzyme';
import React                    from 'react';

/**
 * Tests for the message formatter context provider.
 */
describe('MessageFormatterProvider', function() {

	test('Warning thrown when both messageResolver and messages props are used', function() {
		let consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
		mount(
			<MessageFormatterProvider messageResolver={jest.fn()} messages={{}}>
				<div/>
			</MessageFormatterProvider>
		);
		expect(consoleWarn).toHaveBeenCalledWith(
			'Both messageResolver and messages props are present - messageResolver will take precedence.'
		);
		consoleWarn.mockRestore();
	});
});
