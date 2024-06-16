export interface Hasher {
  generatePasswordHash(password: string): Promise<string>;
  comparePassword({
    password,
    passwordHash,
  }: {
    password: string;
    passwordHash: string;
  }): Promise<boolean>;
}
