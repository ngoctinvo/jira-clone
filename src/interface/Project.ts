export interface Project {
	projectName: string;
	description: string;
	categoryId: number;
	alias: string;
}

export interface ProjectCategory {
	id: number;
	projectCategoryName: string;
}
