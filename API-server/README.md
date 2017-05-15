Student API
===========

#### GET `/students`

Gets an array of all the students

```js
/*
 * GET `/students`
 */

// response:
[
  {
    "id": 1,
    "matricule": "42",
    "first_name": "Christophe",
    "last_name": "De Wolf"
  },
  {
    "id": 2,
    "matricule": "43",
    "first_name": "Guillaume",
    "last_name": "Verfaille"
  }
]
```
##### `where` parameter includes a where clause in the query

`/students?where={matricule:"42"}`

Expects the same parameters as the [bookshelf.js where method](http://bookshelfjs.org/#Model-where)

##### `load` parameter will load related models and include them in the response

`/students?load=validated_ues`

Expects a comma delimited string of relations. Calls the [bookshelf.js load method](http://bookshelfjs.org/#Model-load) method with an array of relations.



#### GET `/students/:identifier`

Gets a student

```js
/*
 * GET `/students/2`
 */

// response:
{
  "id": 2,
  "matricule": "43",
  "first_name": "Guillaume",
  "last_name": "Verfaille"
}

```

##### `load` parameter will load related models and include them in the response

`/students/2?load=validated_ues,current_ues`

Expects a comma delimited string of relations. Calls the [bookshelf.js load method](http://bookshelfjs.org/#Model-load) method with an array of relations.

#### POST `/students`

Creates a student

```js
/*
 * POST `/students` { "marticule": "44", "first_name": "Benjamin", "last_name": "Aiglon" }
 */

// response:
{
  "matricule": "44",
  "first_name": "Benjamin",
  "last_name": "Aiglon",
  "id": 3
}

```


#### PUT `/students/:identifier`

Modifies a student

```js
/*
 * PUT `/students/1` { "last_name": "Das Wulf" }
 */

// response:
{
  "id": 1,
  "matricule": "42",
  "first_name": "Christophe",
  "last_name": "Das Wulf"
}

```


#### DELETE `/students/:identifier`

Deletes a student

```js
/*
 * DELETE `/students/3`
 */

// response:
true

```


#### GET `/students/:identifier/validated_ues`

Gets an array of validated_ues of a student

```js
/*
 * GET `/students/2/validated_ues`
 */

// response:
[
  {
    "student_id": 2,
    "ue_id": 222
  },
  {
    "student_id": 2,
    "ue_id": 223
  }
]

```

#### GET `/students/:identifier/current_ues`

Gets an array of current_ues of a student

```js
/*
 * GET `/students/2/current_ues`
 */

// response:
[
  {
    "student_id": 2,
    "ue_id": 332
  },
  {
    "student_id": 2,
    "ue_id": 333
  }
]

```


#### POST `/students/:identifier/validated_ues`

Add a validated_ue to a student

```js
/*
 * POST `/students/2/validated_ues` { "ue_id": "3" }
 */

// response:
{}

```

#### POST `/students/:identifier/current_ues`

Add a current_ue to a student

```js
/*
 * POST `/students/2/current_ues` { "ue_id": "3" }
 */

// response:
{}

```
