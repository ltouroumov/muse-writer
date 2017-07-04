export class ProjectDocument {
  id: number;
  name: string;
  children: ProjectDocument[] = [];
}
