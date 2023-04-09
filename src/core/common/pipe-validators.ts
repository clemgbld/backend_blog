type Validator<T> = (params: T) => string | undefined;

export const pipeValidators =
  <T>(...validators: Validator<T>[]) =>
  (params: T) =>
    validators.reduce(
      (error: string | undefined, validator: Validator<T>) =>
        error || validator(params),
      undefined
    );
