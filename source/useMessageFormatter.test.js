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
import useMessageFormatter from './useMessageFormatter.js';

import {renderHook} from '@testing-library/react-hooks';
import {MessageFormatter} from '@ultraq/icu-message-formatter';

/**
 * Tests for the useMessageFormatter hook.
 */
describe('useMessageFormatter', function() {
	const formatter = new MessageFormatter('en-US');
	const messages = {
		GOODBYE: '😢'
	};

	// eslint-disable-next-line react/prop-types, jsdoc/require-jsdoc
	function Wrapper({children}) {
		return (
			<MessageFormatterProvider formatter={formatter} messages={messages}>
				{children}
			</MessageFormatterProvider>
		);
	}

	test('Context values are returned', function() {
		const {result} = renderHook(() => useMessageFormatter(), {
			wrapper: Wrapper
		});

		expect(result.current).toEqual({
			formatter,
			messages
		});
	});
});
