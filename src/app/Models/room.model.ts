export class Room {
  private _roomNumber: number;
  private _seatsNumber: number;
  private _freeSeatsNumber: number;
  private _freeSeats: boolean[];

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

  get freeSeats(): boolean[] {
    return this._freeSeats;
  }

  set freeSeats(value: boolean[]) {
    this._freeSeats = value;
  }

  constructor(roomNumber: number, seatsNumber: number) {
    this._roomNumber = roomNumber;
    this._seatsNumber = seatsNumber;
    this._freeSeatsNumber = seatsNumber;
    this._freeSeats = new Array(seatsNumber);
    for (let i = 0; i < seatsNumber; i++){
      this._freeSeats[i] = true;
    }
  }
  getReservedSeats(): number{
    this._freeSeatsNumber = this.seatsNumber;
    for(let i =0; i < this.seatsNumber;i++){
      if(this.freeSeats[i] === false){
        this._freeSeatsNumber--;
      }
    }
    return this._seatsNumber - this._freeSeatsNumber;
  }
}
