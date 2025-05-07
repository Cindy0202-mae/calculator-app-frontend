export interface Calculation {
  id: number;
  operation: string;
  operand1: string;
  operand2: string | null;
  result: string;
  createdAt: string;
}
