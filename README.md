Question-1:What is JSX, and why is it used?

    JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like structures directly within your code. It is used because it makes UI code more readable and easier to write, which is then transpiled into standard React.createElement() calls.



Question-2: What is the difference between State and Props?

    Props (Properties) are read-only inputs passed from a parent component to a child component to configuration it.
    State is a private, internal data store managed within the component itself that can change over time, usually in response to user actions.



Question-3: What is the useState hook, and how does it work?

    useState is a React Hook that allows functional components to hold and update local state. It returns an array containing the current state value and a function to update it. When the setter function is called, React schedules a re-render of the component with the new value.



Question-4: How can you share state between components?

    State can be shared using the following methods:
    Lifting State Up: Moving the state to the closest common ancestor.
    Context API: Providing data to an entire tree of components without manual prop drilling.
    State Management Libraries: Using tools like Redux, Zustand, or Recoil for complex global states.



Question-5: How is event handling done in React?

    React handles events using camelCase naming (e.g., onClick instead of onclick) and passes a function as the event handler rather than a string. These events are "SyntheticEvents," which are cross-browser wrappers around the browser’s native events.