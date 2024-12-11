export interface Event {
  id?: number;
  name: string;
  type: string;
  location: string;
  date: string;
  hour: string;
  duration: number;
  observations?: string;
}
