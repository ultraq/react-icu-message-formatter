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

import MessageFormatterContext from './MessageFormatterContext.ts';
import type {MessageResolver} from './Types.js';

import type {MessageFormatter} from '@ultraq/icu-message-formatter';
import React, {type JSX, memo, type ReactNode, useEffect} from 'react';

interface MessageFormatterProviderProps {
	children: ReactNode;
	formatter: MessageFormatter;
	messages?: Record<string, string>;
	messageResolver?: MessageResolver | null;
}

/**
 * React component that embeds the module context to let React applications use
 * the much simpler message formatting components for emitting strings.
 *
 * @author Emanuel Rabina
 */
function MessageFormatterProvider({children, formatter, messages, messageResolver}: MessageFormatterProviderProps):
	JSX.Element {

	/**
	 * Warn if prop combinations don't make sense for the library.
	 */
	useEffect(() => {
		if (process.env.NODE_ENV !== 'production' && messageResolver && messages) {
			console.warn('Both messageResolver and messages props are present - messageResolver will take precedence.');
		}
	}, []); // eslint-disable-line @eslint-react/exhaustive-deps

	return (
		<MessageFormatterContext.Provider value={{
			formatter,
			messages: messages ?? {},
			messageResolver: messageResolver ?? null
		}}>
			{children}
		</MessageFormatterContext.Provider>
	);
}

export default memo(MessageFormatterProvider);
