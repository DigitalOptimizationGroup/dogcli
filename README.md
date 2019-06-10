# dogcli

Digital Optimization Group Edge Platform CLI - Developer Preview

<!-- toc -->
* [dogcli](#dogcli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @digitaloptgroup/cli
$ dog COMMAND
running command...
$ dog (-v|--version|version)
@digitaloptgroup/cli/0.0.1-dev-preview-19 linux-x64 node-v10.14.2
$ dog --help [COMMAND]
USAGE
  $ dog COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`dog apps:apply COLOR`](#dog-appsapply-color)
* [`dog apps:build`](#dog-appsbuild)
* [`dog apps:current`](#dog-appscurrent)
* [`dog apps:init`](#dog-appsinit)
* [`dog apps:list`](#dog-appslist)
* [`dog apps:new`](#dog-appsnew)
* [`dog apps:rollback COLOR`](#dog-appsrollback-color)
* [`dog apps:sharedataset EMAIL`](#dog-appssharedataset-email)
* [`dog autocomplete [SHELL]`](#dog-autocomplete-shell)
* [`dog cms:login`](#dog-cmslogin)
* [`dog domains:add HOSTNAME`](#dog-domainsadd-hostname)
* [`dog domains:status HOSTNAME`](#dog-domainsstatus-hostname)
* [`dog help [COMMAND]`](#dog-help-command)
* [`dog lambda:deploy COLOR PATH`](#dog-lambdadeploy-color-path)
* [`dog lambda:set`](#dog-lambdaset)
* [`dog lambda:show`](#dog-lambdashow)
* [`dog login`](#dog-login)
* [`dog logout`](#dog-logout)
* [`dog logs:assetLoadTime`](#dog-logsassetloadtime)
* [`dog logs:caughtError`](#dog-logscaughterror)
* [`dog logs:clientPing`](#dog-logsclientping)
* [`dog logs:error`](#dog-logserror)
* [`dog logs:fps`](#dog-logsfps)
* [`dog logs:longTasksTiming`](#dog-logslongtaskstiming)
* [`dog logs:mouseDistance`](#dog-logsmousedistance)
* [`dog logs:orientationChange`](#dog-logsorientationchange)
* [`dog logs:outcome`](#dog-logsoutcome)
* [`dog logs:pageScrolling`](#dog-logspagescrolling)
* [`dog logs:pageView`](#dog-logspageview)
* [`dog logs:performanceTiming`](#dog-logsperformancetiming)
* [`dog logs:proxyLogs`](#dog-logsproxylogs)
* [`dog logs:rapidClicking`](#dog-logsrapidclicking)
* [`dog logs:serverLogs`](#dog-logsserverlogs)
* [`dog logs:timeOnPage`](#dog-logstimeonpage)
* [`dog logs:timeOnSite`](#dog-logstimeonsite)
* [`dog logs:variationInViewport`](#dog-logsvariationinviewport)
* [`dog logs:variationMousedown`](#dog-logsvariationmousedown)
* [`dog proxy:abtest`](#dog-proxyabtest)
* [`dog proxy:apply`](#dog-proxyapply)
* [`dog proxy:canary`](#dog-proxycanary)
* [`dog proxy:gatekeep ORIGIN`](#dog-proxygatekeep-origin)
* [`dog proxy:localhost [PORT]`](#dog-proxylocalhost-port)
* [`dog proxy:prod PRODUCTIONBACKEND`](#dog-proxyprod-productionbackend)
* [`dog proxy:refresh`](#dog-proxyrefresh)
* [`dog proxy:rollback`](#dog-proxyrollback)
* [`dog proxy:show`](#dog-proxyshow)
* [`dog share`](#dog-share)
* [`dog start`](#dog-start)

## `dog apps:apply COLOR`

deploy your application to a chosen color

```
USAGE
  $ dog apps:apply COLOR

ARGUMENTS
  COLOR  (blue|green) the backend color to deploy to

OPTIONS
  -p, --path=path
  --force

EXAMPLES
  dog deploy blue
  dog deploy blue --force
  dog deploy green --path ./custom/script.js
```

_See code: [src/commands/apps/apply.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/apps/apply.ts)_

## `dog apps:build`

build your application from a template script

```
USAGE
  $ dog apps:build

OPTIONS
  -p, --pathToConfig=pathToConfig  [default: ./dog-app-config.json]
```

_See code: [src/commands/apps/build.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/apps/build.ts)_

## `dog apps:current`

show currently selected application

```
USAGE
  $ dog apps:current
```

_See code: [src/commands/apps/current.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/apps/current.ts)_

## `dog apps:init`

initalize an app in this directory (should be the root of your project)

```
USAGE
  $ dog apps:init
```

_See code: [src/commands/apps/init.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/apps/init.ts)_

## `dog apps:list`

list all apps in your account

```
USAGE
  $ dog apps:list
```

_See code: [src/commands/apps/list.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/apps/list.ts)_

## `dog apps:new`

create a new application

```
USAGE
  $ dog apps:new

EXAMPLE
  dog apps:new
```

_See code: [src/commands/apps/new.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/apps/new.ts)_

## `dog apps:rollback COLOR`

rollback a color to a prior deployment

```
USAGE
  $ dog apps:rollback COLOR

OPTIONS
  --force
```

_See code: [src/commands/apps/rollback.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/apps/rollback.ts)_

## `dog apps:sharedataset EMAIL`

share your BigQuery dataset with an email address associated with a Google Cloud Account

```
USAGE
  $ dog apps:sharedataset EMAIL
```

_See code: [src/commands/apps/sharedataset.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/apps/sharedataset.ts)_

## `dog autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ dog autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ dog autocomplete
  $ dog autocomplete bash
  $ dog autocomplete zsh
  $ dog autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.1.0/src/commands/autocomplete/index.ts)_

## `dog cms:login`

login & open the cms UI

```
USAGE
  $ dog cms:login
```

_See code: [src/commands/cms/login.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/cms/login.ts)_

## `dog domains:add HOSTNAME`

attach a CNAME to your application

```
USAGE
  $ dog domains:add HOSTNAME

OPTIONS
  -v, --validation=http|email|cname  [default: http] specify the validation method - http happens inline, email will
                                     send to the WHOIS contacts, cname will return a record that needs to be placed
```

_See code: [src/commands/domains/add.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/domains/add.ts)_

## `dog domains:status HOSTNAME`

check the status of a custom hostname

```
USAGE
  $ dog domains:status HOSTNAME
```

_See code: [src/commands/domains/status.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/domains/status.ts)_

## `dog help [COMMAND]`

display help for dog

```
USAGE
  $ dog help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `dog lambda:deploy COLOR PATH`

helper to deploy a lambda to your AWS account (requires AWS keys in your environment)

```
USAGE
  $ dog lambda:deploy COLOR PATH

ARGUMENTS
  COLOR  (blue|green) backend color to point at your new lambda version
  PATH   path to your zipped lambda function

OPTIONS
  --force
```

_See code: [src/commands/lambda/deploy.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/lambda/deploy.ts)_

## `dog lambda:set`

update your lambda deployment config

```
USAGE
  $ dog lambda:set

OPTIONS
  -a, --account=account    account ARN you want to assume for deployment (optional)
  -f, --function=function  ARN of the lambda to update
  -r, --region=region      region to deploy into
  -v, --version=version    version you want to send your traffic to
```

_See code: [src/commands/lambda/set.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/lambda/set.ts)_

## `dog lambda:show`

show current lambda config

```
USAGE
  $ dog lambda:show
```

_See code: [src/commands/lambda/show.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/lambda/show.ts)_

## `dog login`

sign in to your account

```
USAGE
  $ dog login
```

_See code: [src/commands/login.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/login.ts)_

## `dog logout`

sign out of your account

```
USAGE
  $ dog logout
```

_See code: [src/commands/logout.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logout.ts)_

## `dog logs:assetLoadTime`

live js & css asset performance - filter: --asset

```
USAGE
  $ dog logs:assetLoadTime

OPTIONS
  -a, --asset=asset  filter by fqdn of asset (https://example.com/static/abc123.js)
  -p, --prettyjson   print pretty JSON
```

_See code: [src/commands/logs/assetLoadTime.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/assetLoadTime.ts)_

## `dog logs:caughtError`

errors your application caught & logged - filter: --color

```
USAGE
  $ dog logs:caughtError

OPTIONS
  -c, --color=color  filter by backend color (blue)
  -p, --prettyjson   print pretty JSON
```

_See code: [src/commands/logs/caughtError.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/caughtError.ts)_

## `dog logs:clientPing`

front end application pings - filter: --color

```
USAGE
  $ dog logs:clientPing

OPTIONS
  -c, --color=color  filter by backend color (blue)
  -p, --prettyjson   print pretty JSON
```

_See code: [src/commands/logs/clientPing.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/clientPing.ts)_

## `dog logs:error`

errors caught globally from window.onerror - filter: --color

```
USAGE
  $ dog logs:error

OPTIONS
  -c, --color=color  filter by backend color (blue)
  -p, --prettyjson   print pretty JSON
```

_See code: [src/commands/logs/error.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/error.ts)_

## `dog logs:fps`

instances of client side frames per second dropping below 50 fps - filter: --color

```
USAGE
  $ dog logs:fps

OPTIONS
  -c, --color=color  filter by backend color (blue)
  -p, --prettyjson   print pretty JSON
```

_See code: [src/commands/logs/fps.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/fps.ts)_

## `dog logs:longTasksTiming`

instances of client side tasks that exceed 50ms using the browsers Long Tasks API - filter: --color

```
USAGE
  $ dog logs:longTasksTiming

OPTIONS
  -c, --color=color  filter by backend color (blue)
  -p, --prettyjson   print pretty JSON
```

_See code: [src/commands/logs/longTasksTiming.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/longTasksTiming.ts)_

## `dog logs:mouseDistance`

euclidean mouse distance, over 3 second intervals, from your applications: filter --rid

```
USAGE
  $ dog logs:mouseDistance

OPTIONS
  -p, --prettyjson  print pretty JSON
  -r, --rid=rid     filter by a single rid (get it from server or proxy logs)
```

_See code: [src/commands/logs/mouseDistance.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/mouseDistance.ts)_

## `dog logs:orientationChange`

orientation changes in your application - filter: --rid

```
USAGE
  $ dog logs:orientationChange

OPTIONS
  -p, --prettyjson  print pretty JSON
  -r, --rid=rid     filter by a single rid (get it from server or proxy logs)
```

_See code: [src/commands/logs/orientationChange.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/orientationChange.ts)_

## `dog logs:outcome`

custom implemented outcomes from your application - filter: --outcome

```
USAGE
  $ dog logs:outcome

OPTIONS
  -o, --outcome=outcome  filter by outcome (addToCart)
  -p, --prettyjson       print pretty JSON
```

_See code: [src/commands/logs/outcome.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/outcome.ts)_

## `dog logs:pageScrolling`

scrolling activity from your application - filter: --pathname

```
USAGE
  $ dog logs:pageScrolling

OPTIONS
  -n, --pathname=pathname  filter by pathname (/pricing)
  -p, --prettyjson         print pretty JSON
```

_See code: [src/commands/logs/pageScrolling.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/pageScrolling.ts)_

## `dog logs:pageView`

page views in realtime - filter: --pathname

```
USAGE
  $ dog logs:pageView

OPTIONS
  -n, --pathname=pathname  filter by pathname (/pricing)
  -p, --prettyjson         print pretty JSON
```

_See code: [src/commands/logs/pageView.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/pageView.ts)_

## `dog logs:performanceTiming`

application performance from the navigation timing api including timeToFirstByte, FCP, & TTI - filter: --property

```
USAGE
  $ dog logs:performanceTiming

OPTIONS
  -p, --prettyjson
      print pretty JSON

  -t, --property=property
      filter by performance timing property: 
      timeToFetchStart
      dnsLookupTime
      timeToFistByte
      timeToHtmlPage
      domInteractive
      pageLoadTime
      firstContentfulPaint
      firstPaint
      firstInputDelay
      tti
```

_See code: [src/commands/logs/performanceTiming.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/performanceTiming.ts)_

## `dog logs:proxyLogs`

proxy logs - filter: --country

```
USAGE
  $ dog logs:proxyLogs

OPTIONS
  -c, --country=country  filter proxy logs by a single country code (such as US)
  -p, --prettyjson       print pretty JSON
```

_See code: [src/commands/logs/proxyLogs.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/proxyLogs.ts)_

## `dog logs:rapidClicking`

incidences of "rapid/rage clicking" in your application

```
USAGE
  $ dog logs:rapidClicking

OPTIONS
  -p, --prettyjson  print pretty JSON
```

_See code: [src/commands/logs/rapidClicking.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/rapidClicking.ts)_

## `dog logs:serverLogs`

server logs - filter: --color

```
USAGE
  $ dog logs:serverLogs

OPTIONS
  -c, --color=color  filter by backend color (blue)
  -p, --prettyjson   print pretty JSON
```

_See code: [src/commands/logs/serverLogs.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/serverLogs.ts)_

## `dog logs:timeOnPage`

time on page activity events (event values are not cumulative) - filter: pathname

```
USAGE
  $ dog logs:timeOnPage

OPTIONS
  -n, --pathname=pathname  filter by pathname (/pricing)
  -p, --prettyjson         print pretty JSON
```

_See code: [src/commands/logs/timeOnPage.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/timeOnPage.ts)_

## `dog logs:timeOnSite`

time on site activity events (event values are not cumulative) - filter: visibility

```
USAGE
  $ dog logs:timeOnSite

OPTIONS
  -p, --prettyjson             print pretty JSON
  -v, --visibility=visibility  filter by visibility (hidden)
```

_See code: [src/commands/logs/timeOnSite.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/timeOnSite.ts)_

## `dog logs:variationInViewport`

variations entering the viewport - filter: --featureId

```
USAGE
  $ dog logs:variationInViewport

OPTIONS
  -f, --featureId=featureId  filter by featureId
  -p, --prettyjson           print pretty JSON
```

_See code: [src/commands/logs/variationInViewport.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/variationInViewport.ts)_

## `dog logs:variationMousedown`

mousedown events on variations - filter: --featureId

```
USAGE
  $ dog logs:variationMousedown

OPTIONS
  -f, --featureId=featureId  filter by featureId
  -p, --prettyjson           print pretty JSON
```

_See code: [src/commands/logs/variationMousedown.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/logs/variationMousedown.ts)_

## `dog proxy:abtest`

deploy a/b/n tests across any number of origins

```
USAGE
  $ dog proxy:abtest

OPTIONS
  -o, --origin=origin  (required) FQDN for an A/B test backend or a valid deployed color
```

_See code: [src/commands/proxy/abtest.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/proxy/abtest.ts)_

## `dog proxy:apply`

update your production proxy

```
USAGE
  $ dog proxy:apply

OPTIONS
  -f, --force
```

_See code: [src/commands/proxy/apply.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/proxy/apply.ts)_

## `dog proxy:canary`

run and manage canary releases

```
USAGE
  $ dog proxy:canary

OPTIONS
  -c, --canary=canary          (required) FQDN for an canary backend or a valid deployed color
  -p, --production=production  (required) FQDN for production backend or a valid deployed color

  -w, --weight=weight          (required) an integer between 1 and 100 that will equal the percentage of traffic sent to
                               the canary

  --force                      force the proxy config to do something that it not recommended

  --reassign                   forces a new salt to be created and all currently assigned visitors to be reallocated to
                               a random backend - not recommended
```

_See code: [src/commands/proxy/canary.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/proxy/canary.ts)_

## `dog proxy:gatekeep ORIGIN`

create a gatekeeping url to any given origin

```
USAGE
  $ dog proxy:gatekeep ORIGIN

ARGUMENTS
  ORIGIN  a valid deployed color or a fully qualified domain name
```

_See code: [src/commands/proxy/gatekeep.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/proxy/gatekeep.ts)_

## `dog proxy:localhost [PORT]`

(experimental) create a gatekeeping url that tunnels to your local development server

```
USAGE
  $ dog proxy:localhost [PORT]

ARGUMENTS
  PORT  [default: 3000] the port of your local server
```

_See code: [src/commands/proxy/localhost.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/proxy/localhost.ts)_

## `dog proxy:prod PRODUCTIONBACKEND`

set your local proxy config to a single production backend

```
USAGE
  $ dog proxy:prod PRODUCTIONBACKEND

ARGUMENTS
  PRODUCTIONBACKEND  a valid deployed color or a fully qualified domain name to set as your single production backend
```

_See code: [src/commands/proxy/prod.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/proxy/prod.ts)_

## `dog proxy:refresh`

refresh your local config from production environment

```
USAGE
  $ dog proxy:refresh
```

_See code: [src/commands/proxy/refresh.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/proxy/refresh.ts)_

## `dog proxy:rollback`

rollback proxy to a prior deployment

```
USAGE
  $ dog proxy:rollback
```

_See code: [src/commands/proxy/rollback.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/proxy/rollback.ts)_

## `dog proxy:show`

show current local & deployed proxy configs

```
USAGE
  $ dog proxy:show
```

_See code: [src/commands/proxy/show.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/proxy/show.ts)_

## `dog share`

create invite link/code for developer preview (allows someone else to create their own account)

```
USAGE
  $ dog share
```

_See code: [src/commands/share.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/share.ts)_

## `dog start`

run a local server for development

```
USAGE
  $ dog start

OPTIONS
  -F, --onlyfunctions        only run your functions (faster reloads)
  -f, --functions=functions  [default: functions.js]
  -p, --port=port
  -r, --routes=routes        relative path to your routes.json file
```

_See code: [src/commands/start.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-19/src/commands/start.ts)_
<!-- commandsstop -->
