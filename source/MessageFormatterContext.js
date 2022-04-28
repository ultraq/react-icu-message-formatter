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

import {MessageFormatter} from '@ultraq/icu-message-formatter';
import {createContext}    from 'react';

const defaultFormatter = new MessageFormatter('en-NZ');
const defaultMessages = {};

/**
 * @callback MessageResolver
 * @param {string} id
 * @param {string} locale
 * @return {string}
 */

/**
 * @typedef MessageFormatterContext
 * @property {MessageFormatter} formatter
 * @property {Record<string, any>} messages
 * @property {MessageResolver | null} messageResolver
 */

/**
 * The default formatting context.
 * 
 * @type {MessageFormatterContext}
 * @author Emanuel Rabina
 */
export default createContext({
	formatter: defaultFormatter,
	messages: defaultMessages,
	messageResolver: null
});
