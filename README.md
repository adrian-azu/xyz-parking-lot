## XYZ PARKING LOT

## Prerequisites

- Node.js 16 and up

## Run Locally

### Clone the repository and install node packages

```
git clone https://github.com/adrian-azu/xyz-parking-lot.git
cd xyz-parking-lot
npm install
```

#### Start the server

```bash
  npm start:dev
```

Try requesting with postman http://locahost:3000/

## API Reference

POST /parking-lot
POST /parking-lot/find-slots
POST /parking-lot/add-time
POST /vehicle/park
POST /vehicle/unpark

#### CREATE PARKING LOT

```http
  POST /parking-lot
```

| Parameter  | Type     | Description                                |
| :--------- | :------- | :----------------------------------------- |
| `entrance` | `number` | **Required**. Number of entrance           |
| `slots`    | `number` | **Required**. Number of slots per entrance |

#### GET PARKING LOT MAP

```http
  GET /parking-lot
```

#### FIND AVAILABLE SLOTS

```http
    POST /parking-lot/find-slots
```

| Parameter  | Type     | Description                                   |
| :--------- | :------- | :-------------------------------------------- |
| `entrance` | `number` | **Required**. Entrance number vehicle entered |
| `sizes`    | `number` | **Required**. Size of the vehicle             |

`@return { Slot, VehicleId }`

#### PARK VEHICLE

```http
    POST /vehicle/park
```

| Parameter   | Type     | Description                                                     |
| :---------- | :------- | :-------------------------------------------------------------- |
| `slot`      | `Object` | **Required**. `Slot` returned on **FIND AVAILABLE SLOT API**    |
| `vehicleId` | `number` | **Required**. VehicleId returned on **FIND AVAILABLE SLOT API** |

#### PARK VEHICLE

```http
    POST /vehicle/unpark
```

| Parameter   | Type     | Description                                   |
| :---------- | :------- | :-------------------------------------------- |
| `vehicleId` | `number` | **Required**. VehicleId of the parked vehicle |

#### ADD TIME

```http
    POST /parking-lot/add-time
```

| Parameter  | Type     | Description                                                             |
| :--------- | :------- | :---------------------------------------------------------------------- |
| `time`     | `number` | **Required**. Time count to be added                                    |
| `dateType` | `string` | **Required**. Date time adjustment type. `enum: [days, hours, minutes]` |

## Built With

- Node.js
- Express

#### Map Visualization

```
ENTRANCE: A, B, C
SLOTS: 9
A
+----+----+----+
| A1 | A2 | A3 |
+----+----+----+
| A4 | A5 | A6 |
+----+----+----+
| A7 | A8 | A9 |
+----+----+----+
B
+----+----+----+
| B1 | B2 | B3 |
+----+----+----+
| B4 | B5 | B6 |
+----+----+----+
| B7 | B8 | B9 |
+----+----+----+
C
+----+----+----+
| C1 | C2 | C3 |
+----+----+----+
| C4 | C5 | C6 |
+----+----+----+
| C7 | C8 | C9 |
+----+----+----+
\*/
```
