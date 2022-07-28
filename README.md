
react-icu-message-formatter
===========================

[![Build Status](https://github.com/ultraq/react-icu-message-formatter/actions/workflows/build.yml/badge.svg)](https://github.com/ultraq/react-icu-message-formatter/actions)
[![npm](https://img.shields.io/npm/v/@ultraq/react-icu-message-formatter.svg?maxAge=3600)](https://www.npmjs.com/package/@ultraq/react-icu-message-formatter)
[![Bundlephobia minified size](https://img.shields.io/bundlephobia/min/@ultraq/react-icu-message-formatter)](https://bundlephobia.com/result?p=@ultraq/react-icu-message-formatter)

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

Taking the example from the ICU Message Formatter readme and adding a little
HTML and React, that would look something like this:

```jsx
import {MessageFormatter} from '@ultraq/icu-message-formatter'; 
import {MessageFormatterProvider} from '@ultraq/react-icu-message-formatter';
import {toCurrencyString} from 'my-custom-currency-library';

let formatter = new MessageFormatter('en-NZ', {
  currency: ({value, currency}, options, values, locale) => toCurrencyString(value, currency, locale)
});
let messages = {
  EXAMPLE: 'Hey {name}, that\'s gonna cost you <strong>{amount, currency}</strong>!'
};

<MessageFormatterProvider formatter={formatter} messages={messages}>
  <FormattedMessage id="EXAMPLE" values={{
    name: 'Emanuel',
    amount: {
      value: 2,
      currency: 'GBP'
    }
  }}/>
</MessageFormatterProvider>

// The following HTML will be emitted:
// "Hey Emanuel, that's gonna cost you <strong>£2.00</strong>!"
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

let formatter = new MessageFormatter('en-NZ', {
  link: ({to}, linkText) => (
    <Link to={to}>{linkText}</Link>
  )
});
let messages = {
  EXAMPLE: 'Go to {helpLink, link, our help pages} to learn more'
};

<MessageFormatterProvider formatter={formatter} messages={messages}>
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
  return messageBundle[namespace][key];
}

// Page1.js
import Page1Messages from './Page1Messages.json'

class Page1 extends Component {
  constructor(props) {
    super(props);
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

let formatter = new MessageFormatter('en-NZ');

<MessageFormatterProvider formatter={formatter} messageResolver={messageResolver}>
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
 - **messages**: object whose keys are used as the `id` values for identifying
   which message to bring up and format.  Not required if `messageResolver` is
   used.
 - **messageResolver**: a message lookup function that is passed the `id` of the
   message being looked up and the `locale` from the current formatter, called
   whenever a message needs to be resolved for formatting.  Not required if
   `messages` is used.

### FormattedMessage

```javascript
import {FormattedMessage} from '@ultraq/react-icu-message-formatter';
```

React wrapper for the ICU message formatter's `format` method, using the props
and context to pass along to that method.

Since 0.6.0, this component also formats strings with HTML in them and
automatically escapes placeholder values, replacing the `<FormattedHtmlMessage>`
component which could open you up to XSS attacks.

Props:
 - **id**: the value of the key from the configured `messages` to use as the
   message that you wish to have formatted for display
 - **values**: optional, an object of placeholder data to fill out the message

### useMessageFormatter()

```javascript
import {useMessageFormatter} from '@ultraq/react-icu-message-formatter';
```

A hook for retrieving the message formatter context objects: `formatter`,
`messages`, and `messageResolver`.  Returns a single object with all of those
properties on it.

> React 16.8+ is needed to be able to use hooks.

### withMessageFormatter(Component)

```javascript
import {withMessageFormatter} from '@ultraq/react-icu-message-formatter';
```

A higher-order component function that applies the context objects, `formatter`,
`messages`, and `messageResolver` to the given component as props.

 - **Component**: the React component to wrap
