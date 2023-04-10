export type Validator<T, U> = (params: T) => U | undefined;

export const pipeValidators =
  <T, U>(...validators: Validator<T, U>[]) =>
  (params: T) =>
    validators.reduce(
      (error: U | undefined, validator: Validator<T, U>) =>
        error || validator(params),
      undefined
    );
