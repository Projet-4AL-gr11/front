export class ExecuteDto {
  execution_id?: number;
  constructor(
    public readonly language: string,
    public readonly code: string,
    public readonly exerciseId: string,
    public readonly timerScore: number,
  ) {
  }
}
