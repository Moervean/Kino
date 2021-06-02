export class MovieModel {
   id: number;


  get idg(): number {
    return this.id;
  }

  set ids(value: number) {
    this.id = value;
  }

   nazwa: string;
   img: string;
   czasTrwania: string;
   ocena: number;

  get rate(): number {
    return this.ocena;
  }

  set rate(value: number) {
    this.ocena = value;
  }

  get name(): string {
    return this.nazwa;
  }

  set name(value: string) {
    this.nazwa = value;
  }

  get imag(): string {
    return this.img;
  }

  set imag(value: string) {
    this.img = value;
  }

  get duration(): string {
    return this.czasTrwania;
  }

  set duration(value: string) {
    this.czasTrwania = value;
  }


  constructor(id: number, nazwa: string, img: string, czasTrwania: string, ocena: number) {
    this.id = id;
    this.nazwa = nazwa;
    this.img = img;
    this.czasTrwania = czasTrwania;
    this.ocena = ocena;
  }
}
