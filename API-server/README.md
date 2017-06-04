# Student API

La student API est un serveur d'API REST, codé en node.js et basé sur une base de données MongoDB. Cette API fournit toutes les méthodes pour créer, lire, modifier et supprimer (CRUD) des étudiants dans l'application distribuée. Elle fournit aussi des méthodes pour gérer le cursus d'un étudiant, sous la forme de deux listes d'UE liées à chaque étudiant : `current_ues` pour les UE en cours et `validated_ues` pour les UE validées.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table des matières
- [Student API](#student-api)
- [Documentation de l'API REST](#documentation-de-lapi-rest)
  - [/students](#students)
    - [`GET /students`](#get-students)
    - [POST `/students`](#post-students)
  - [`/students/:studentId`](#studentsstudentid)
    - [`GET /students/:studentId`](#get-studentsstudentid)
    - [`PUT /students/:studentId`](#put-studentsstudentid)
    - [`DELETE /students/:studentId`](#delete-studentsstudentid)
  - [`/students/:studentId/current_ues`](#studentsstudentidcurrent_ues)
    - [`GET /students/:studentId/current_ues`](#get-studentsstudentidcurrent_ues)
    - [`POST /students/:studentId/current_ues`](#post-studentsstudentidcurrent_ues)
    - [`DELETE /students/:studentId/current_ues`](#delete-studentsstudentidcurrent_ues)
  - [`/students/:studentId/validated_ues`](#studentsstudentidvalidated_ues)
    - [`GET /students/:studentId/validated_ues`](#get-studentsstudentidvalidated_ues)
    - [`POST /students/:studentId/validated_ues`](#post-studentsstudentidvalidated_ues)
    - [`DELETE /students/:studentId/validated_ues`](#delete-studentsstudentidvalidated_ues)
- [Implémentation de l'API REST](#impl%C3%A9mentation-de-lapi-rest)
  - [Modèle](#mod%C3%A8le)
  - [Routes](#routes)
  - [Contrôleur](#contr%C3%B4leur)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Documentation de l'API REST
L'API est accessible au travers de 4 URLs différentes :

| URL                                  | Méthodes supportées     | Description |
|--------------------------------------|-------------------------|-------------|
| `/students`                          | `GET`, `POST`           | Cette adresse permet de consulter la liste de tous les étudiants (éventuellement avec un filtre) ou d'en créer de nouveaux. |
| `/students/:studentId`               | `GET`, `PUT`, `DELETE`  | Cette adresse, utilisant l'ID unique d'un étudiant, permet de consulter ou modifier ses informations ou supprimer l'étudiant. |
| `/students/:studentId/current_ues`   | `GET`, `POST`, `DELETE` | Cette adresse, utilisant l'ID unique d'un étudiant, permet de consulter, ajouter ou retirer des UE actuellement suivies par l'étudiant |
| `/students/:studentId/validated_ues` | `GET`, `POST`, `DELETE` | Cette adresse, utilisant l'ID unique d'un étudiant, permet de consulter, ajouter ou retirer des UE validées par l'étudiant |

Toutes les réponses de l'API sont au format JSON, tandis que les requêtes vers l'API doivent encoder leurs paramètres selon le MIME x-www-form-urlencoded.

### /students
Cette adresse permet de consulter la liste de tous les étudiants (éventuellement avec un filtre) ou d'en créer de nouveaux.

#### `GET /students`

Retourne un tableau de tous les étudiants

```js
// GET /students
[
  {
    "_id": "5919973a4cdd6828bd8b7110",
    "matricule": "42",
    "first_name": "Christophe",
    "last_name": "De Wolf",
    "__v": 18,
    "current_ues": [
      22,
      23,
      24
    ],
    "validated_ues": [
      18,
      20,
      21
    ]
  },
  {
    "_id": "59199c8f9690182d02527c24",
    "matricule": "45",
    "first_name": "Guillaume",
    "last_name": "Verfaille",
    "__v": 1,
    "current_ues": [
      20
    ],
    "validated_ues": []
  }
```

Il est possible de filtrer les résultats en ajoutant des paramètres à la requête GET. Attention ceci retourne également un tableau d'étudiants, même s'il n'y a qu'un seul résultat.

 * Exemple 1 : `GET /students?matricule=42` ne retournera que les étudiants ayant le matricule 42
 * Exemple 2 : `GET /students?last_name=De%20Wolf` ne retournera que les étudiants dont le nom de famille est "De Wolf"

#### POST `/students`

Crée un nouvel étudiant. En cas de succès, l'utilisateur est redirigé vers `GET /students/:studentId` lui permettant de consulter le nouvel étudiant créé, ID compris.

 * Paramètres obligatoires : `matricule`, `first_name`, `last_name`
 * Paramètres facultatifs : `current_ues`, `validated_ues`




### `/students/:studentId`
Cette adresse, utilisant l'ID unique d'un étudiant, permet de consulter ou modifier ses informations ou supprimer l'étudiant.

#### `GET /students/:studentId`

Retourne un objet JSON avec toutes les informations de l'étudiant dont l'identifiant (`_id`) est `:studentId`

```js
// GET /students/5919973a4cdd6828bd8b7110
{
  "_id": "5919973a4cdd6828bd8b7110",
  "matricule": "44",
  "first_name": "Christophe",
  "last_name": "De Wolf",
  "__v": 18,
  "current_ues": [
    22,
    23,
    24
  ],
  "validated_ues": [
    18,
    20,
    21
  ]
}
```

#### `PUT /students/:studentId`

Modifie les informations de l'étudiant dont l'identifiant (`_id`) est `:studentId`

* Paramètres facultatifs : `matricule`, `first_name`, `last_name`
* Paramètres ignorés : `current_ues`, `validated_ues` (ceux-ci doivent être modifiés par `/students/:studentId/current_ues` et `/students/:studentId/validated_ues`)

#### `DELETE /students/:studentId`

Supprime l'étudiant dont l'identifiant (`_id`) est `:studentId`



### `/students/:studentId/current_ues`
Cette adresse, utilisant l'ID unique d'un étudiant, permet de consulter, ajouter ou retirer des UE actuellement suivies par l'étudiant.

#### `GET /students/:studentId/current_ues`

Retourne un tableau JSON avec les UE actuelles de l'étudiant dont l'identifiant (`_id`) est `:studentId`

```js
// GET /students/5919973a4cdd6828bd8b7110/current_ues
[
  22,
  23,
  24
]
```

#### `POST /students/:studentId/current_ues`

Ajoute une UD à la liste des UE actuelles de l'étudiant dont l'identifiant (`_id`) est `:studentId`

* Paramètres obligatoires : `id`

#### `DELETE /students/:studentId/current_ues`

Supprime une UE à la liste des UE actuelles de l'étudiant dont l'identifiant (`_id`) est `:studentId`

* Paramètres obligatoires : `id`


### `/students/:studentId/validated_ues`
Cette adresse, utilisant l'ID unique d'un étudiant, permet de consulter, ajouter ou retirer des UE validées par l'étudiant.

#### `GET /students/:studentId/validated_ues`

Retourne un tableau JSON avec les UE validées de l'étudiant dont l'identifiant (`_id`) est `:studentId`

```js
// GET /students/5919973a4cdd6828bd8b7110/validated_ues
[
  18,
  20,
  21
]
```

#### `POST /students/:studentId/validated_ues`

Ajoute une UD à la liste des UE validées de l'étudiant dont l'identifiant (`_id`) est `:studentId`

* Paramètres obligatoires : `id`

#### `DELETE /students/:studentId/validated_ues`

Supprime une UE à la liste des UE validées de l'étudiant dont l'identifiant (`_id`) est `:studentId`

* Paramètres obligatoires : `id`

## Implémentation de l'API REST
Le serveur d'API est une application node.js utilisant une base de données MongoDB. C'est une application assez simple puisqu'elle tient en quatre fichiers : 

* [`server.js`](server.js) : contient le "**main**"" de l'application qui crée un serveur HTTP (sur le port 3000)
* [`api/models/studentModel.js`](api/models/studentModel.js) : contient le **modèle** d'un étudiant qui est une abstraction de la base de données MongoDB
* [`api/routes/studentRoutes.js`](api/routes/studentRoutes.js) : contient les **routes**, càd. les différentes URL et méthodes acceptées par le serveur HTTP
* [`api/controllers/studentController.js`](api/controllers/studentController.js) : contient le **contrôleur** càd. les différentes méthodes càd. la logique qui consulte et modifie la base de données selon la route

### Modèle
Le modèle peut être vu dans le fichier [`api/models/studentModel.js`](api/models/studentModel.js) :
```javascript
var StudentSchema = new Schema({
    matricule: {
        type: String,
        Required: 'matricule is mandatory'
    },
    first_name: {
        type: String,
        Required: 'first_name is mandatory'
    },
    last_name: {
        type: String,
        Required: 'last_name is mandatory'
    },
    validated_ues: {
        type: [Number]
    },
    current_ues: {
        type: [Number]
    }
});
```

Remarquons qu'il n'y a pas de modèle séparé pour `validated_ues` et `current_ues`, ce sont des tableaux directement liés à chaque étudiant. Cela est une facilité fournie par MongoDB qui est une base de données NoSQL stockant des documents Json. Lors de la première tentative d'implémentation de cette API, nous utilisions Sqlite3 qui nécessite un modèle séparé et des tables relationnelles, ce qui est beaucoup plus complexe.

### Routes
Dans le fichier [`api/routes/studentRoutes.js`](api/routes/studentRoutes.js) on peut voir d'abord que toutes les routes sont modifiées par une fonction qui ajoute des headers. Ceci facilite la communication cross-domain malgré les sécurités des navigateurs modernes.
```javascript
app.use('/', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
```
Pour la même raison toutes les routes gèrent également la méthode HTTP `OPTIONS`. Dans le reste du fichier on peut d'abord voir que les définitions de routes sont très simples grâce au routeur de node.js :
```javascript
app.route('/students')
   .get(controller.list_all)
   .options(controller.list_all)
   .post(controller.create);
```

### Contrôleur
Les fonctions appelées par les routes sont celles du contrôleur, dans le fichier [`api/controllers/studentController.js`](api/controllers/studentController.js). C'est ici qu'on implémente toute la logique permettant aux requêtes de correspondre à des actions sur la base de données.

Prenons pour exemple la fonction `read`, appelée pour récupérer les informations d'un étudiant après une requête `GET /students/:studentId` :
```javascript
exports.read = function(req, res) {
    Student.findById(req.params.studentId, function(err, student) {
        if (err) {
            handleError(err, res);
        } else {
            res.json(student);
        }
    });
};
```
On peut y voir que l'abstraction fournie par le modèle Mongoose simplifie grandement les requêtes vers la base de données. Le paramètre `req.arams.studentId` est automatiquement fourni par le routeur dont la ligne d'initialisation est `app.route('/students/:studentId')`.

Tout le contrôleur est implémenté de manière à attraper les erreurs qui pourraient survenir si l'utilisateur de l'API demande une action impossible ou avec des erreurs. Dans ce cas la réponse est générée par la fonction `handleError` qui fixe le code de réponse HTTP à `400` et transmet l'erreur dans son intégralité à l'utilisateur pour qu'il puise comprendre ce qui s'est mal passé.
```javascript
function handleError(err, res) {
    // ...
    res.status(400);
    res.json(err);
}
```