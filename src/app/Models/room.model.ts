export class Room {
  private _roomNumber: number;
  private _seatsNumber: number;

  get roomNumber(): number {
    return this._roomNumber;
  }

  set roomNumber(value: number) {
    this._roomNumber = value;
  }

  get seatsNumber(): number {
    return this._seatsNumber;
  }

  set seatsNumber(value: number) {
    this._seatsNumber = value;
  }

  constructor(roomNumber: number, seatsNumber: number) {
    this._roomNumber = roomNumber;
    this._seatsNumber = seatsNumber;
  }
}
