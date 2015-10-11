## Students
Students, please note that it is **not necessary** to become an OSS member if you just want to apply for the curriculum. You can apply for the curriculum by clicking [this link][apply] and following the instructions on the page.

## Pull requests
We welcome pull requests! :smile:
If you want to contribute your code for the development of the OSS university app, you can open pull requests to the `develop` branches of the [front-end][front-end] or [back-end][back-end].
Please don't open pull requests to the `master` branches.

## Membership
That said, if you want to become a regular contributor to the project and a member of the Open Source Society, here are the steps you need to take:

1. Please fill out [this form here][form]
2. Within 48 hours we will send you a Slack invite so you can introduce yourself and come chat with us
3. If all goes well, we will send you an invite to the OSS organization on GitHub

## Workflow

Familiarize yourself with the process outlined in [Comparing Workflows][comparing-workflows].

To summarize:
- do not develop directly on the 'master' branch
- updates to 'master' will only occur during version increments
- only the 'develop' branch will be merged into 'master'
- if you're developing a new feature, create a new feature branch
- feature branches will be merged into develop following approval

## Style

Code style should follow [SemiStandard][semi-standard] (ie [Javascript Standard][standard] with semicolons).

> - **2 spaces** – for indentation
> - **Single quotes for strings** – except to avoid escaping
> - **No unused variables** – this one catches tons of bugs!
> - **Space after keywords** if (condition) { ... }
> - **Space after function name** function name (arg) { ... }
> - Always use === instead of == – but obj == null is allowed to check null || undefined.
> - Always handle the node.js err function parameter
> - Always prefix browser globals with window – except document and navigator are okay
>   - Prevents accidental use of poorly-named browser globals like open, length, event, and name.
> - **And more goodness** – give standard a try today!
tandard Style, or check out some of the repositories that use standard.

*Source: [github.com/feross/standard][standard]*

To Validate:

You need to have the devtools installed
```bash
npm install --dev
```

SemiStandard can be run with the tests
```bash
npm test
```

Or standalone
```bash
npm run check-style
```

[apply]: https://github.com/open-source-society/computer-science/issues/109
[front-end]: https://github.com/open-source-society/ossu-ui/tree/develop
[back-end]: https://github.com/open-source-society/ossu-api/tree/develop
[form]: https://soullesswaffle.typeform.com/to/xuTU4O
[comparing-workflows]: https://www.atlassian.com/git/tutorials/comparing-workflows
[semi-standard]: https://github.com/Flet/semistandard
[standard]: https://github.com/feross/standard
[more-goodness]: https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
