
react-icu-message-formatter
===========================

[![Build Status](https://travis-ci.com/ultraq/react-icu-message-formatter.svg?branch=master)](https://travis-ci.com/ultraq/react-icu-message-formatter)
[![Coverage Status](https://coveralls.io/repos/github/ultraq/react-icu-message-formatter/badge.svg?branch=master)](https://coveralls.io/github/ultraq/react-icu-message-formatter?branch=master)
[![npm](https://img.shields.io/npm/v/@ultraq/react-icu-message-formatter.svg?maxAge=3600)](https://www.npmjs.com/package/@ultraq/react-icu-message-formatter)
[![Bundlephobia minified size](https://img.shields.io/bundlephobia/min/@ultraq/react-icu-message-formatter)](https://bundlephobia.com/result?p=@ultraq/react-icu-message-formatter@)

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
import {MessageFormatter} from '@ultraq/icu-message-formatter'; 
import {MessageFormatterProvider} from '@ultraq/react-icu-message-formatter';
import {toCurrencyString} from 'my-custom-currency-library';

let formatter = new MessageFormatter({
  currency: ({value, currency}, options, values, locale) => toCurrencyString(value, currency, locale)
});
let messages = {
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

### Nested React components in formatted strings

Since you can define your own type handlers, those handlers can also contain JSX
content, allowing you to nest components within formatted strings.  One example
I keep running into is having to render links for client-side routing, which can
be done using this library:

```jsx
import {MessageFormatter} from '@ultraq/icu-message-formatter'; 
import {MessageFormatterProvider} from '@ultraq/react-icu-message-formatter';
import {Link} from 'react-router';

let formatter = new MessageFormatter({
  link: ({to}, linkText) => (
    <Link to={to}>{linkText}</Link>
  )
});
let messages = {
  EXAMPLE: 'Go to {helpLink, link, our help pages} to learn more'
};

<MessageFormatterProvider formatter={formatter} locale="en-NZ" messages={messages}>
  <FormattedMessage id="EXAMPLE" values={{
    helpLink: {
      to: 'https://help.mywebsite.com'
    }
  }}/>
</MessageFormatterProvider>

// Is the same as having written:
// "Go to <Link to="https://help.mywebsite.com">our help pages</Link> to learn more"
// in JSX
```

### Message resolvers for custom message bundle handling

As an application grows, it can be quite cumbersome to maintain a single large
message bundle, so you might split it up in some way.  Some methods will let you
be able to reconstruct the entire message bundle statically and continue to pass
that result to the `<MessageFormatterProvider>` through the `messages` prop as
before.  But others, like code-splitting, will be more dynamic and have you
adding to the message bundle as your users work their way through your
application.

For these situations, `<MessageFormatterProvider>` also has a `messageResolver`
prop, which is a function called with the message `id` and `locale` whenever a
message needs to be retrieved for formatting.

How you then manage your bundle (eg: add to it as pages are loaded, as
components are loaded, namespace them to avoid collisions, etc), and then
retrieve those messages (eg: the `id` prop for `<FormattedMessage>` could
include namespaces, special path separators, etc) is up to you.  eg:

```jsx
// Messages.js
const messageBundle = {
  common: {
    NEXT_PAGE: 'Next page'
  }
};

export function addMessages(namespace, messages) {
  messageBundle[namespace] = messages;
}

export function messageResolver(id, locale) {
  let [namespace, key] = id.split(':');
  return dynamicMessageBundle[namespace][key];
}

// Page1.js
import Page1Messages from './Page1Messages.json'

class Page1 extends Component {
  componentDidMount() {
    addMessages('page1', Page1Messages);
  }
  render() {
    return (
      <div>
        <FormattedMessage id="page1:PAGE1_MESSAGE"/>
        <a href="/page2.html"><FormattedMessage id="common:NEXT_PAGE"/></a>
      </div>
    );
  }
}

// App.js
import {MessageFormatter} from '@ultraq/icu-message-formatter'; 
import {MessageFormatterProvider} from '@ultraq/react-icu-message-formatter';
import {messageResolver} from './messages.js';

let formatter = new MessageFormatter();

<MessageFormatterProvider formatter={formatter} locale="en-NZ" messageResolver={messageResolver}>
  <Page1/>
</MessageFormatterProvider>
```


API
---

### MessageFormatterProvider

```javascript
import {MessageFormatterProvider} from '@ultraq/react-icu-message-formatter';
```

Configures the message formatting context for your application.

Props:
 - **formatter**: a `MessageFormatter` instance from the `icu-message-formatter`
   package
 - **locale**: the locale to pass to the `formatter` and any custom formatters
   you have configured
 - **messages**: object whose keys are used as the `id` values for identifying
   which message to bring up and format.  Not required if `messageResolver` is
   used.
 - **messageResolver**: a message lookup function that is passed the `id` and
   `locale`, called whenever a message needs to be resolved for formatting.
   Not required if `messages` is used.

### FormattedMessage

```javascript
import {FormattedMessage} from '@ultraq/react-icu-message-formatter';
```

React wrapper for the ICU message formatter's `format` method, using the props
and context to pass along to that method.

Props:
 - **id**: the value of the key from the configured `messages` to use as the
   message that you wish to have formatted for display
 - **values**: optional, an object of placeholder data to fill out the message

### FormattedHtmlMessage

```javascript
import {FormattedHtmlMessage} from '@ultraq/react-icu-message-formatter';
```

React wrapper for the ICU message formatter's `format` method that allows for
HTML to be emitted.  Only use this component for messages that you have complete
control over (ie: not user-entered strings), otherwise you open yourself up to
XSS attacks.

Props:
 - **id**: the value of the key from the configured `messages` to use as the
   message that you wish to have formatted for display
 - **values**: optional, an object of placeholder data to fill out the message

### withMessageFormatter(Component)

```javascript
import {withMessageFormatter} from '@ultraq/react-icu-message-formatter';
```

A higher-order component function that applies the context objects, `formatter`,
`locale`, `messages`, and `messageResolver` to the given component as props.

 - **Component**: the React component to wrap
