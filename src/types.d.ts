interface IProject {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

interface ITask {
  id: string;
  title: string;
  description?: string | null;
  dueTo: Date;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}
