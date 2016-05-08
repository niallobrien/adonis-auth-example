'use strict'

/*
|--------------------------------------------------------------------------
| Application Providers
|--------------------------------------------------------------------------
|
| Here we configure the providers required to run adonis application. They
| are registered only once and can be used inside any file using `use`
| keyword.
|
*/
const providers = [
  'adonis-framework/providers/ConfigProvider',
  'adonis-framework/providers/EnvProvider',
  'adonis-framework/providers/EventProvider',
  'adonis-framework/providers/HelpersProvider',
  'adonis-framework/providers/HashProvider',
  'adonis-framework/providers/MiddlewareProvider',
  'adonis-framework/providers/RequestProvider',
  'adonis-framework/providers/ResponseProvider',
  'adonis-framework/providers/RouteProvider',
  'adonis-framework/providers/ServerProvider',
  'adonis-framework/providers/SessionProvider',
  'adonis-framework/providers/StaticProvider',
  'adonis-framework/providers/ViewProvider',
  'adonis-lucid/providers/DatabaseProvider',
  'adonis-lucid/providers/LucidProvider',
  'adonis-middleware/providers/AppMiddlewareProvider',
  'adonis-auth/providers/AuthManagerProvider'
]

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are specific to ace, and are not registered when starting
| http server. It helps in reducing boot time.
|
*/
const aceProviders = [
  'adonis-lucid/providers/CommandsProvider',
  'adonis-lucid/providers/FactoryProvider',
  'adonis-lucid/providers/MigrationsProvider',
  'adonis-lucid/providers/SchemaProvider',
  'adonis-lucid/providers/SeederProvider',
  'adonis-ace/providers/CommandProvider',
  'adonis-commands/providers/GeneratorsProvider',
  'adonis-commands/providers/ReplProvider'
]

/*
|--------------------------------------------------------------------------
| Namespace Aliases
|--------------------------------------------------------------------------
|
| Each provider is registered with a long unique namespace. Here we alias
| them with a short unique name to keep our import statements short and
| sweet.
|
*/
const aliases = {
  Env: 'Adonis/Src/Env',
  Middleware: 'Adonis/Src/Middleware',
  Hash: 'Adonis/Src/Hash',
  Event: 'Adonis/Src/Event',
  Config: 'Adonis/Src/Config',
  Route: 'Adonis/Src/Route',
  Helpers: 'Adonis/Src/Helpers',
  Factory: 'Adonis/Src/Factory',
  Schema: 'Adonis/Src/Schema',
  Lucid: 'Adonis/Src/Lucid',
  Command: 'Adonis/Src/Command'
}

/*
|--------------------------------------------------------------------------
| Ace Commands
|--------------------------------------------------------------------------
|
| Ace Commands are also are registered inside the IoC container. Here we
| register with Ace Kernel using their unique namespace.
|
*/
const commands = [
  'App/Commands/Greet',
  'Adonis/Commands/Repl',
  'Adonis/Commands/Make:Controller',
  'Adonis/Commands/Make:Migration',
  'Adonis/Commands/Make:Model',
  'Adonis/Commands/Make:View',
  'Adonis/Commands/Make:Command',
  'Adonis/Commands/Make:Hook',
  'Adonis/Commands/Make:Middleware',
  'Adonis/Commands/Make:Seed',
  'Adonis/Commands/Make:Listener',
  'Adonis/Commands/Migration:Run',
  'Adonis/Commands/Migration:Rollback',
  'Adonis/Commands/Migration:Refresh',
  'Adonis/Commands/Migration:Reset',
  'Adonis/Commands/DB:Seed',
  'Adonis/Commands/Migration:Status',
  'Adonis/Commands/Key:Generate',
  'Adonis/Commands/Auth:Setup'
]

module.exports = { providers, aceProviders, aliases, commands }
