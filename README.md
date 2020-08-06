
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
library.  Then, anywhere in your application, use the `<FormattedMessage>`
component to format strings from the configured message bundle, passing any
placeholder data to it for the desired output.

Taking the plain JS example from the ICU Message Formatter readme, turning that
into React would look something like this:

```jsx
import MessageFormatter from '@ultraq/icu-message-formatter'; 
import {MessageFormatterProvider} from '@ultraq/react-icu-message-formatter';
import {toCurrencyString} from 'my-custom-currency-library';

let formatter = new MessageFormatter({
  currency: ({value, currency}, options, values, locale) => toCurrencyString(value, currency, locale)
});
const messages = {
  EXAMPLE: 'Hey {name}, that\'s gonna cost you {amount, currency}!'
};

<MessageFormatterProvider formatter={formatter} locale="en-NZ" messages={messages}>
  <FormattedMessage id="EXAMPLE" values={{
    name: 'Emanuel',
    amount: {
      value: 2,
      currency: 'GBP'
    }
  }}/>
</MessageFormatterProvider>

// App will output "Hey Emanuel, that's gonna cost you £2.00!"
```


API
---

### MessageFormatterProvider

Configures the message formatting context for your application.

Props:
 - **formatter**: a `MessageFormatter` instance from the ICU message formatter
   package
 - **locale**: the locale to pass to the `formatter` and any custom formatters
   you have configured
 - **messages**: object whose keys are used as the `id` values for identifying
   which message to bring up and format

### FormattedMessage

React wrapper for the ICU message formatter's `format` method, using the props
and context to pass along to that method.

Props:
 - **id**: the value of the key from the configured `messages` to use as the
   message that you wish to have formatted for display
 - **values**: optional, an object of placeholder data to fill out the message

### FormattedHtmlMessage

React wrapper for the ICU message formatter's `format` method that allows for
HTML to be emitted.  Only use this component for messages that you have complete
control over (ie: not user-entered strings), otherwise you open yourself up to
XSS attacks.

Props:
 - **id**: the value of the key from the configured `messages` to use as the
   message that you wish to have formatted for display
 - **values**: optional, an object of placeholder data to fill out the message

### withMessageFormatter(Component)

A higher-order component function, which will pass the `formatter`, `locale`,
and `messages` values configured in the [MessageFormatterProvider](#messageformatterprovider)
to your React component as props with those names respectively.

 - **Component**: the React component to wrap
