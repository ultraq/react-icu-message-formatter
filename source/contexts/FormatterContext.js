import MessageFormatter from '@ultraq/icu-message-formatter';
import {createContext}  from 'react';

export default createContext(new MessageFormatter());
