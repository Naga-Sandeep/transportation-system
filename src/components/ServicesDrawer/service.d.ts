type ServiceTypes = 'Regular' | 'Night';

interface LineStatuses {
  severity: number;
  reason: string;
}

interface Service {
  id: string;
  name: string;
  modeName: string;
  types: ServiceTypes[];
  lineStatuses: LineStatuses[];
}
