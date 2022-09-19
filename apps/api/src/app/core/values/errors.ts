export class NotFountError extends Error {
  constructor(entity: string) {
    super(`${entity} not found!`);
  }
}

export class IncorrectDataError extends Error {
  constructor(entity: string) {
    super(`Incorrect data for ${entity}.`);
  }
}

export class IncorrectUserAuthError extends Error {
  constructor() {
    super('Incorrect login or password');
  }
}
