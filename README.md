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
@digitaloptgroup/cli/0.0.1-dev-preview-33 linux-x64 node-v10.14.2
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
* [`dog cms:preview URL`](#dog-cmspreview-url)
* [`dog domains:add HOSTNAME`](#dog-domainsadd-hostname)
* [`dog domains:list`](#dog-domainslist)
* [`dog domains:status HOSTNAME`](#dog-domainsstatus-hostname)
* [`dog help [COMMAND]`](#dog-help-command)
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
* [`dog plugins`](#dog-plugins)
* [`dog plugins:install PLUGIN...`](#dog-pluginsinstall-plugin)
* [`dog plugins:link PLUGIN`](#dog-pluginslink-plugin)
* [`dog plugins:uninstall PLUGIN...`](#dog-pluginsuninstall-plugin)
* [`dog plugins:update`](#dog-pluginsupdate)
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

_See code: [src/commands/apps/apply.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/apps/apply.ts)_

## `dog apps:build`

build your application from a template script

```
USAGE
  $ dog apps:build

OPTIONS
  -p, --pathToConfig=pathToConfig  [default: ./dog-app-config.json]

EXAMPLE
  $ dog apps:build

  # Use a non-default path to your config
  dog apps:build --pathToConfig ./dog-app-config.json

  # Or with flag character
  dog apps:build -p ./dog-app-config.json
```

_See code: [src/commands/apps/build.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/apps/build.ts)_

## `dog apps:current`

show currently selected application

```
USAGE
  $ dog apps:current
```

_See code: [src/commands/apps/current.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/apps/current.ts)_

## `dog apps:init`

initalize an app in this directory (should be the root of your project)

```
USAGE
  $ dog apps:init
```

_See code: [src/commands/apps/init.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/apps/init.ts)_

## `dog apps:list`

list all apps in your account

```
USAGE
  $ dog apps:list
```

_See code: [src/commands/apps/list.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/apps/list.ts)_

## `dog apps:new`

create a new application

```
USAGE
  $ dog apps:new
```

_See code: [src/commands/apps/new.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/apps/new.ts)_

## `dog apps:rollback COLOR`

rollback a color to a prior deployment

```
USAGE
  $ dog apps:rollback COLOR

OPTIONS
  --force

EXAMPLE
  $ dog apps:rollback blue

  # Force rollback a backend receiving production traffic
  $ dog apps:rollback blue --force
```

_See code: [src/commands/apps/rollback.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/apps/rollback.ts)_

## `dog apps:sharedataset EMAIL`

share your BigQuery dataset with an email address associated with a Google Cloud Account

```
USAGE
  $ dog apps:sharedataset EMAIL

EXAMPLE
  $ dog apps:sharedataset sarah.smith@example.com
```

_See code: [src/commands/apps/sharedataset.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/apps/sharedataset.ts)_

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

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.1.1/src/commands/autocomplete/index.ts)_

## `dog cms:login`

login & open the cms UI

```
USAGE
  $ dog cms:login
```

_See code: [src/commands/cms/login.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/cms/login.ts)_

## `dog cms:preview URL`

generate a preview link to a chosen domain

```
USAGE
  $ dog cms:preview URL

ARGUMENTS
  URL  [default: http://localhost:3000] must be a fully qualified domain name

EXAMPLE
  $ dog cms:preview http://localhost:3000

  $ dog cms:preview https://www.example.com
```

_See code: [src/commands/cms/preview.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/cms/preview.ts)_

## `dog domains:add HOSTNAME`

attach a CNAME to your application

```
USAGE
  $ dog domains:add HOSTNAME

OPTIONS
  -v, --validation=http|email|cname  [default: http] specify the validation method - http happens inline, email will
                                     send to the WHOIS contacts, cname will return a record that needs to be placed

EXAMPLE
  $ dog domains:add www.example.com

  # Validate your domain automatically (default)
  $ dog domains:add www.example.com --validation http

  # Validate your domain by placing an extra CNAME with auth code
  $ dog domains:add www.example.com --validation cname

  # Validate your domain by receiving an email sent to your WHOIS contacts
  $ dog domains:add www.example.com --validation email
```

_See code: [src/commands/domains/add.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/domains/add.ts)_

## `dog domains:list`

list all domains associated with this app

```
USAGE
  $ dog domains:list
```

_See code: [src/commands/domains/list.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/domains/list.ts)_

## `dog domains:status HOSTNAME`

check the status of a custom hostname

```
USAGE
  $ dog domains:status HOSTNAME

EXAMPLE
  $ dog domains:status www.example.com
```

_See code: [src/commands/domains/status.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/domains/status.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_

## `dog login`

sign in to your account

```
USAGE
  $ dog login
```

_See code: [src/commands/login.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/login.ts)_

## `dog logout`

sign out of your account

```
USAGE
  $ dog logout
```

_See code: [src/commands/logout.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logout.ts)_

## `dog logs:assetLoadTime`

live js & css asset performance

```
USAGE
  $ dog logs:assetLoadTime

OPTIONS
  -a, --asset=asset  filter by fqdn of asset (https://example.com/build/main.js)
  -p, --prettyjson   print pretty JSON

EXAMPLE
  $ dog logs:assetLoadTime
  {"asset":"https://example.com/build/main.js","color":"green","duration":85,"protocol":"h2","rid":"abc-567","vid":"abc-
  123"}

  # Filter by asset
  $ dog logs:assetLoadTime --asset https://example.com/build/main.js

  # Pretty print JSON
  $ dog logs:assetLoadTime --prettyjson
  {
     "asset": "https://example.com/build/main.js",
     "color": "green",
     "duration": 85,
     "protocol": "h2",
     "rid": "abc-567",
     "vid": "abc-123"
  }
```

_See code: [src/commands/logs/assetLoadTime.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/assetLoadTime.ts)_

## `dog logs:caughtError`

errors your application caught & chose to log

```
USAGE
  $ dog logs:caughtError

OPTIONS
  -c, --color=color  filter by backend color (blue)
  -p, --prettyjson   print pretty JSON

EXAMPLE
  $ dog logs:caughtError

  # Filter by backend color
  $ dog logs:caughtError --color blue

  # Pretty print JSON
  $ dog logs:caughtError --prettyjson
```

_See code: [src/commands/logs/caughtError.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/caughtError.ts)_

## `dog logs:clientPing`

front end application pings

```
USAGE
  $ dog logs:clientPing

OPTIONS
  -c, --color=color  filter by backend color
  -p, --prettyjson   print pretty JSON

EXAMPLE
  $ dog logs:clientPing

  # Filter by backend color
  $ dog logs:clientPing --color blue

  # Pretty print JSON
  $ dog logs:clientPing --prettyjson
```

_See code: [src/commands/logs/clientPing.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/clientPing.ts)_

## `dog logs:error`

errors caught globally from window.onerror

```
USAGE
  $ dog logs:error

OPTIONS
  -c, --color=color  filter by backend color (blue)
  -p, --prettyjson   print pretty JSON

EXAMPLE
  $ dog logs:error
  
  # Filter by backend color
  $ dog logs:error --color blue
  
  # Pretty print JSON
  $ dog logs:error --prettyjson
```

_See code: [src/commands/logs/error.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/error.ts)_

## `dog logs:fps`

instances of client side frames per second dropping below 50 fps

```
USAGE
  $ dog logs:fps

OPTIONS
  -c, --color=color  filter by backend color (blue)
  -p, --prettyjson   print pretty JSON

EXAMPLE
  $ dog logs:fps
    
  # Filter by backend color
  $ dog logs:fps --color blue
    
  # Pretty print JSON
  $ dog logs:fps --prettyjson
```

_See code: [src/commands/logs/fps.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/fps.ts)_

## `dog logs:longTasksTiming`

instances of client side tasks that exceed 50ms using the browsers Long Tasks API

```
USAGE
  $ dog logs:longTasksTiming

OPTIONS
  -c, --color=color  filter by backend color (blue)
  -p, --prettyjson   print pretty JSON

EXAMPLE
  $ dog logs:longTasksTiming
      
  # Filter by backend color
  $ dog logs:longTasksTiming --color blue

  # Pretty print JSON
  $ dog logs:longTasksTiming --prettyjson
```

_See code: [src/commands/logs/longTasksTiming.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/longTasksTiming.ts)_

## `dog logs:mouseDistance`

euclidean mouse distance, over 3 second intervals, from your applications

```
USAGE
  $ dog logs:mouseDistance

OPTIONS
  -p, --prettyjson  print pretty JSON
  -r, --rid=rid     filter by a single rid (get it from server or proxy logs)

EXAMPLE
  $ dog logs:mouseDistance
      
  # Filter by a single request Id
  $ dog logs:mouseDistance --rid abc-123
      
  # Pretty print JSON
  $ dog logs:mouseDistance --prettyjson
```

_See code: [src/commands/logs/mouseDistance.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/mouseDistance.ts)_

## `dog logs:orientationChange`

orientation changes in your application

```
USAGE
  $ dog logs:orientationChange

OPTIONS
  -p, --prettyjson  print pretty JSON
  -r, --rid=rid     filter by a single rid (get it from server or proxy logs)

EXAMPLE
  $ dog logs:orientationChange
      
  # Filter by a single request Id
  $ dog logs:orientationChange --rid abc-123
      
  # Pretty print JSON
  $ dog logs:orientationChange --prettyjson
```

_See code: [src/commands/logs/orientationChange.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/orientationChange.ts)_

## `dog logs:outcome`

custom implemented outcomes from your application

```
USAGE
  $ dog logs:outcome

OPTIONS
  -o, --outcome=outcome  filter by outcome (addToCart)
  -p, --prettyjson       print pretty JSON

EXAMPLE
  $ dog logs:outcome
        
  # Filter by custom outcome (outcomes defined by user)
  $ dog logs:outcome --outcome cartAddItem
  $ dog logs:outcome --outcome heroImageClick
  $ dog logs:outcome --outcome searchAddFilter

        
  # Pretty print JSON
  $ dog logs:outcome --prettyjson
```

_See code: [src/commands/logs/outcome.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/outcome.ts)_

## `dog logs:pageScrolling`

scrolling activity from your application

```
USAGE
  $ dog logs:pageScrolling

OPTIONS
  -n, --pathname=pathname  filter by pathname (/pricing)
  -p, --prettyjson         print pretty JSON

EXAMPLE
  $ dog logs:pageScrolling
        
  # Filter by pathname
  $ dog logs:pageScrolling --pathname /about-us
        
  # Pretty print JSON
  $ dog logs:pageScrolling --prettyjson
```

_See code: [src/commands/logs/pageScrolling.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/pageScrolling.ts)_

## `dog logs:pageView`

page views in realtime

```
USAGE
  $ dog logs:pageView

OPTIONS
  -n, --pathname=pathname  filter by pathname (/pricing)
  -p, --prettyjson         print pretty JSON

EXAMPLE
  $ dog logs:pageView
        
  # Filter by pathname
  $ dog logs:pageView --pathname /about-us
        
  # Pretty print JSON
  $ dog logs:pageView --prettyjson
```

_See code: [src/commands/logs/pageView.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/pageView.ts)_

## `dog logs:performanceTiming`

application performance from the navigation timing api including timeToFirstByte, FCP, & TTI

```
USAGE
  $ dog logs:performanceTiming

OPTIONS
  -p, --prettyjson         print pretty JSON
  -t, --property=property  filter by performance timing property

EXAMPLE
  $ dog logs:performanceTiming
          
  # Filter by property
  $ dog logs:performanceTiming --property timeToFetchStart
  $ dog logs:performanceTiming --property dnsLookupTime
  $ dog logs:performanceTiming --property timeToFistByte
  $ dog logs:performanceTiming --property timeToHtmlPage
  $ dog logs:performanceTiming --property domInteractive
  $ dog logs:performanceTiming --property pageLoadTime
  $ dog logs:performanceTiming --property firstContentfulPaint
  $ dog logs:performanceTiming --property firstPaint
  $ dog logs:performanceTiming --property firstInputDelay
  $ dog logs:performanceTiming --property tti


  # Pretty print JSON
  $ dog logs:performanceTiming --prettyjson
```

_See code: [src/commands/logs/performanceTiming.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/performanceTiming.ts)_

## `dog logs:proxyLogs`

proxy logs

```
USAGE
  $ dog logs:proxyLogs

OPTIONS
  -c, --country=country  filter proxy logs by a single country code (such as US)
  -p, --prettyjson       print pretty JSON

EXAMPLE
  $ dog logs:proxyLogs
          
  # Filter by country
  $ dog logs:proxyLogs --country US
          
  # Pretty print JSON
  $ dog logs:proxyLogs --prettyjson
```

_See code: [src/commands/logs/proxyLogs.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/proxyLogs.ts)_

## `dog logs:rapidClicking`

incidences of "rapid/rage clicking" in your application

```
USAGE
  $ dog logs:rapidClicking

OPTIONS
  -p, --prettyjson  print pretty JSON

EXAMPLE
  $ dog logs:rapidClicking

  # Pretty print JSON
  $ dog logs:rapidClicking --prettyjson
```

_See code: [src/commands/logs/rapidClicking.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/rapidClicking.ts)_

## `dog logs:serverLogs`

server logs

```
USAGE
  $ dog logs:serverLogs

OPTIONS
  -c, --color=color  filter by backend color (blue)
  -p, --prettyjson   print pretty JSON

EXAMPLE
  $ dog logs:serverLogs
          
  # Filter by color
  $ dog logs:serverLogs --color green
          
  # Pretty print JSON
  $ dog logs:serverLogs --prettyjson
```

_See code: [src/commands/logs/serverLogs.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/serverLogs.ts)_

## `dog logs:timeOnPage`

time on page activity events (event values are not cumulative)

```
USAGE
  $ dog logs:timeOnPage

OPTIONS
  -n, --pathname=pathname  filter by pathname (/pricing)
  -p, --prettyjson         print pretty JSON

EXAMPLE
  $ dog logs:timeOnPage
            
  # Filter by pathname
  $ dog logs:timeOnPage --pathname /about-us
            
  # Pretty print JSON
  $ dog logs:timeOnPage --prettyjson
```

_See code: [src/commands/logs/timeOnPage.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/timeOnPage.ts)_

## `dog logs:timeOnSite`

time on site activity events (event values are not cumulative)

```
USAGE
  $ dog logs:timeOnSite

OPTIONS
  -p, --prettyjson             print pretty JSON
  -v, --visibility=visibility  filter by visibility (hidden)

EXAMPLE
  $ dog logs:timeOnSite
              
  # Filter by visibility
  $ dog logs:timeOnSite --visibility hidden
              
  # Pretty print JSON
  $ dog logs:timeOnSite --prettyjson
```

_See code: [src/commands/logs/timeOnSite.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/timeOnSite.ts)_

## `dog logs:variationInViewport`

variations entering the viewport

```
USAGE
  $ dog logs:variationInViewport

OPTIONS
  -f, --featureId=featureId  filter by featureId
  -p, --prettyjson           print pretty JSON

EXAMPLE
  $ dog logs:variationInViewport
          
  # Filter by featureId
  $ dog logs:variationInViewport --featureId abc-123
          
  # Pretty print JSON
  $ dog logs:variationInViewport --prettyjson
```

_See code: [src/commands/logs/variationInViewport.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/variationInViewport.ts)_

## `dog logs:variationMousedown`

mousedown events on variations

```
USAGE
  $ dog logs:variationMousedown

OPTIONS
  -f, --featureId=featureId  filter by featureId
  -p, --prettyjson           print pretty JSON

EXAMPLE
  $ dog logs:variationMousedown
          
  # Filter by featureId
  $ dog logs:variationMousedown --featureId abc-123
          
  # Pretty print JSON
  $ dog logs:variationMousedown --prettyjson
```

_See code: [src/commands/logs/variationMousedown.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/logs/variationMousedown.ts)_

## `dog plugins`

list installed plugins

```
USAGE
  $ dog plugins

OPTIONS
  --core  show core plugins

EXAMPLE
  $ dog plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/index.ts)_

## `dog plugins:install PLUGIN...`

installs a plugin into the CLI

```
USAGE
  $ dog plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  plugin to install

OPTIONS
  -f, --force    yarn install with force flag
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command 
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in 
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ dog plugins:add

EXAMPLES
  $ dog plugins:install myplugin 
  $ dog plugins:install https://github.com/someuser/someplugin
  $ dog plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/install.ts)_

## `dog plugins:link PLUGIN`

links a plugin into the CLI for development

```
USAGE
  $ dog plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello' 
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLE
  $ dog plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/link.ts)_

## `dog plugins:uninstall PLUGIN...`

removes a plugin from the CLI

```
USAGE
  $ dog plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

ALIASES
  $ dog plugins:unlink
  $ dog plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/uninstall.ts)_

## `dog plugins:update`

update installed plugins

```
USAGE
  $ dog plugins:update

OPTIONS
  -h, --help     show CLI help
  -v, --verbose
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/update.ts)_

## `dog proxy:abtest`

deploy a/b/n tests across any number of origins

```
USAGE
  $ dog proxy:abtest

OPTIONS
  -o, --origin=origin  (required) FQDN for an A/B test backend or a valid deployed color

EXAMPLE
  # A/B test between your blue and green backends
  $ dog proxy:abtest --origin blue --origin green

  # A/B test between your blue backend and example.com
  $ dog proxy:abtest --origin blue --origin https://www.example.com

  # A/B test between 3 origins
  $ dog proxy:abtest -o blue -o green -o https://www.example.com

  # A/B test between 4 origins
  $ dog proxy:abtest -o blue -o green -o https://www.example.com -o https://www.digitaloptgroup.com
```

_See code: [src/commands/proxy/abtest.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/proxy/abtest.ts)_

## `dog proxy:apply`

update your production proxy

```
USAGE
  $ dog proxy:apply

OPTIONS
  -f, --force
```

_See code: [src/commands/proxy/apply.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/proxy/apply.ts)_

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

EXAMPLE
  # Send 20% of your traffic to your green backend as a canary
  $ dog proxy:canary --production blue --canary green --weight 20

  # Increase to 50% of your traffic to your green backend
  $ dog proxy:canary -p blue -c green -w 50

  # Increase to 75% of your traffic to your green backend
  $ dog proxy:canary -p blue -c green -w 75

  # Force reassignment of all visitors on both backends (advanced - not recommended)
  $ dog proxy:canary -p blue -c green -w 50 --reassign

  # Decrease traffic allocated to canary backend (advanced - not recommended)
  $ dog proxy:canary -p blue -c green -w 5 --force
```

_See code: [src/commands/proxy/canary.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/proxy/canary.ts)_

## `dog proxy:gatekeep ORIGIN`

create a gatekeeping url to any given origin

```
USAGE
  $ dog proxy:gatekeep ORIGIN

ARGUMENTS
  ORIGIN  a valid deployed color or a fully qualified domain name

OPTIONS
  --cmsPreview

EXAMPLE
  $ dog proxy:gatekeep blue

  # Gatekeep and open preview mode of the CMS
  $ dog proxy:gatekeep blue --cmsPreview

  # Gatekeep to any FQDN on the internet
  $ dog proxy:gatekeep https://www.example.com
```

_See code: [src/commands/proxy/gatekeep.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/proxy/gatekeep.ts)_

## `dog proxy:localhost [PORT]`

(experimental) create a gatekeeping url that tunnels to your local development server

```
USAGE
  $ dog proxy:localhost [PORT]

ARGUMENTS
  PORT  [default: 3000] the port of your local server

OPTIONS
  -c, --cmsPreview  include realtime preview mode in created link

EXAMPLE
  $ dog proxy:localhost

  # Tunnel to a custom port (default 3000)
  $ dog proxy:localhost 3001

  # Include preview mode of the CMS
  $ dog proxy:localhost 3001 --cmsPreview
```

_See code: [src/commands/proxy/localhost.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/proxy/localhost.ts)_

## `dog proxy:prod PRODUCTIONBACKEND`

set your local proxy config to a single production backend

```
USAGE
  $ dog proxy:prod PRODUCTIONBACKEND

ARGUMENTS
  PRODUCTIONBACKEND  a valid deployed color or a fully qualified domain name to set as your single production backend

EXAMPLE
  $ dog proxy:prod blue

  # Set any FQDN as the production backend
  $ dog proxy:prod https://www.example.com
```

_See code: [src/commands/proxy/prod.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/proxy/prod.ts)_

## `dog proxy:refresh`

refresh your local config from production environment

```
USAGE
  $ dog proxy:refresh
```

_See code: [src/commands/proxy/refresh.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/proxy/refresh.ts)_

## `dog proxy:rollback`

rollback proxy to a prior deployment

```
USAGE
  $ dog proxy:rollback
```

_See code: [src/commands/proxy/rollback.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/proxy/rollback.ts)_

## `dog proxy:show`

show current local & deployed proxy configs

```
USAGE
  $ dog proxy:show
```

_See code: [src/commands/proxy/show.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/proxy/show.ts)_

## `dog share`

create invite link/code for developer preview (allows someone else to create their own account)

```
USAGE
  $ dog share
```

_See code: [src/commands/share.ts](https://github.com/DigitalOptGroup/dogcli/blob/v0.0.1-dev-preview-33/src/commands/share.ts)_

## `dog start`

run a local server for development

```
USAGE
  $ dog start

OPTIONS
  -p, --port=port
  -s, --script=script
```

_See code: [@digitaloptgroup/plugin-install-start](https://github.com/DigitalOptGroup/plugin-install-start/blob/v0.0.1-devpreview-02/src/commands/start.ts)_
<!-- commandsstop -->
