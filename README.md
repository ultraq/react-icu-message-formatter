
react-icu-message-formatter
===========================

[![Build Status](https://travis-ci.com/ultraq/react-icu-message-formatter.svg?branch=master)](https://travis-ci.com/ultraq/react-icu-message-formatter)
[![Coverage Status](https://coveralls.io/repos/github/ultraq/react-icu-message-formatter/badge.svg?branch=master)](https://coveralls.io/github/ultraq/react-icu-message-formatter?branch=master)
[![npm](https://img.shields.io/npm/v/@ultraq/react-icu-message-formatter.svg?maxAge=3600)](https://www.npmjs.com/package/@ultraq/react-icu-message-formatter)

A `react-intl`-inspired message formatting library, built atop the
[lightweight ICU message formatter](https://github.com/ultraq/icu-message-formatter)
as a response to the large bundle size of `react-intl` and its dependencies, in
an attempt to keep bundle size down.


Installation
------------

```
npm install @ultraq/icu-message-formatter @ultraq/react-icu-message-formatter
```


Usage
-----

Wrap your application in the `<MessageFormatterProvider>` component.  This will
provide the message formatter context required by the other components in this
library:

```jsx
import MessageFormatter           from '@ultraq/icu-message-formatter'; 
import {MessageFormatterProvider} from '@ultraq/react-icu-message-formatter';

const formatter = new MessageFormatter();
const messages = {
  GREETING: 'Hi there! 👋'
};

<MessageFormatterProvider formatter={formatter} locale="en-NZ" messages={messages}>
  <FormattedMessage id="GREETING"/>
</MessageFormatterProvider>
```


API
---

### MessageFormatterProvider

Configures the message formatting context for your application.

Props:
 - **formatter**: a `MessageFormatter` instance from the [ICU message formatter](https://github.com/ultraq/icu-message-formatter)
   package
 - **locale**: the locale to pass to the `formatter` and any custom formatters
   you have configured
 - **messages**: object whose keys are used as the `id` values for identifying
   which message to bring up and format

### FormattedMessage

A React component for selecting the ICU message string to format.

Props:
 - **id**: the value of the key from the configured [`messages`](#messageformatterprovider)
   to use as the message that you wish to have formatted for display
 - **values**: optional, an object of placeholder data to fill out the message

### withMessageFormatter(Component)

A higher-order component function, which will pass the `formatter`, `locale`,
and `messages` values configured in the [MessageFormatterProvider](#messageformatterprovider)
to your React component as props with those names respectively.

 - **Component**: the React component to wrap
