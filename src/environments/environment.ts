// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'http://localhost:8000/api',
  storageURL : 'http://localhost:8000/storage/',
  MIN_INIT_WAITING_DELAY: 1000,            //Minimum delay the la page loading initial (Config load)
  EMAIL_CONTACT: 'contact@gma500.fr',      //Email de contact
  ADDRESS1: 'Maison des associations',      //Contact address
  ADDRESS2: '16, rue de l\'ancien Palais de Justice',
  ADDRESS3: '06130 GRASSE',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
