Student API
===========

La student API est un serveur d'API REST, codé en node.js et basé sur une base de données MongoDB. Cette API fournit toutes les méthodes pour créer, lire, modifier et supprimer (CRUD) des étudiants dans l'application distribuée. Elle fournit aussi des méthodes pour gérer le cursus d'un étudiant, sous la forme de deux listes d'UE liées à chaque étudiant : current_ues pour les UE en cours et validated_ues pour les UE validées.

# Table des matières
- [Documentation de l'API REST](#)
    - [/students](#)
    - [/students/:studentId](#)
    - [/students/:studentId/current_ues](#)
    - [/students/:studentId/validated_ues](#)
- [Fonctionnement de l'API REST](#)

# Documentation de l'API REST
L'API est accessibles selon 4 URLs différentes :

| URL                                  | Méthodes supportées     | Description |
|--------------------------------------|-------------------------|-------------|
| `/students`                          | `GET`, `POST`           | Cette adresse permet de consulter la liste de tous les étudiants (éventuellement avec un filtre) ou d'en créer de nouveaux. |
| `/students/:studentId`               | `GET`, `PUT`, `DELETE`  | Cette adresse, utilisant l'ID unique d'un étudiant, permet de consulter ou modifier ses informations ou supprimer l'étudiant. |
| `/students/:studentId/current_ues`   | `GET`, `POST`, `DELETE` | Cette adresse, utilisant l'ID unique d'un étudiant, permet de consulter, ajouter ou retirer des UE actuellement suivies par l'étudiant |
| `/students/:studentId/validated_ues` | `GET`, `POST`, `DELETE` | Cette adresse, utilisant l'ID unique d'un étudiant, permet de consulter, ajouter ou retirer des UE validées par l'étudiant |

Toutes les réponses de l'API sont au format JSON, tandis que les requêtes vers l'API doivent encoder leurs paramètres selon le MIME x-www-form-urlencoded.

## /students
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

Il est possible de filtrer les résultats en ajoutant des paramètres à la requête GET.

 * Exemple 1 : `GET /students?matricule=42` ne retournera que les étudiants ayant le matricule 42
 * Exemple 2 : `GET /students?last_name=De%20Wolf` ne retournera que les étudiants dont le nom de famille est "De Wolf"

#### POST `/students`

Crée un nouvel étudiant. En cas de succès, l'utilisateur est redirigé vers `GET /students/:studentId` lui permettant de consulter le nouvel étudiant créé, ID compris.

 * Paramètres obligatoires : `matricule`, `first_name`, `last_name`
 * Paramètres facultatifs : `current_ues`, `validated_ues`




## `/students/:studentId`
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



## `/students/:studentId/current_ues`
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


## `/students/:studentId/validated_ues`
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

# Fonctionnement de l'API REST
