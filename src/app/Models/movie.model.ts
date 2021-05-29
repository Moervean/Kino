export class MovieModel {
  private _name: string;
  private _img: string;
  private _duration: string;
  private _rate: number;

  get rate(): number {
    return this._rate;
  }

  set rate(value: number) {
    this._rate = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get img(): string {
    return this._img;
  }

  set img(value: string) {
    this._img = value;
  }

  get duration(): string {
    return this._duration;
  }

  set duration(value: string) {
    this._duration = value;
  }


  constructor(name: string, img: string, duration: string, rate: number) {
    this._name = name;
    this._img = img;
    this._duration = duration;
    this._rate = rate;
  }
}
