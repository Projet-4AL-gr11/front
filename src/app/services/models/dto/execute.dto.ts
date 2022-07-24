export class ExecuteDto {
  public execution_id: number;
  constructor(
      public readonly language: string,
      public readonly code: string,
      public readonly exerciseId: string,
      public readonly timerScore: number,
    ) {
    this.execution_id = -1;
  }

}
