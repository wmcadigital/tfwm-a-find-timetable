export interface IServiceResult {
  id: string;
  mode: string;
  serviceNumber: string;
  hasDisruptions: boolean;
  disruptionSeverity: string;
  routes: RoutesEntity[];
}
export interface RoutesEntity {
  direction: string;
  operatorCode: string;
  operatorName: string;
  routeName: string;
  hasDisruption: boolean;
  disruptionSeverity: string;
}
