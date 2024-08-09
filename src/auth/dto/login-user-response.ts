export class LoginUserResponseDto {
  constructor(
    private id: number,
    private name: string,
    private token: string,
  ) {}
}
